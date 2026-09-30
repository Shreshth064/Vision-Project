"""Ingest the sales time-series CSVs into PostgreSQL.

Usage:
    PGPASSWORD=... python load.py           # apply schema + load all series
    PGPASSWORD=... python load.py --reset    # drop + recreate first

The load is idempotent: re-running it upserts rows via
INSERT ... ON CONFLICT, so it can be run repeatedly without creating
duplicates.
"""

import argparse
import csv
import datetime as dt
import os
import re

from psycopg2.extras import execute_values

from db import connect

HERE = os.path.dirname(os.path.abspath(__file__))
SCHEMA_PATH = os.path.join(HERE, "schema.sql")
DATASET_DIR = os.path.normpath(os.path.join(HERE, "..", "model", "dataset"))

# Series metadata: code -> (CSV filename, human name, node type).
SERIES = {
    "M":  ("M Sales.csv",  "Manufacturer", "manufacturer"),
    "R1": ("R1 Sales.csv", "Retailer 1",   "retailer"),
    "R2": ("R2 Sales.csv", "Retailer 2",   "retailer"),
    "D1": ("D1 Sales.csv", "Distributor 1", "distributor"),
    "D2": ("D2 Sales.csv", "Distributor 2", "distributor"),
}

_MONTH_RE = re.compile(r"^\d{4}-\d{2}$")


def parse_csv(path):
    """Parse a sales CSV into a list of (month_date, units) tuples.

    Robust to the header row and to the malformed footer rows present in
    the source files (e.g. a bare ',' line or a 'M Sales,' line): any row
    whose month is not YYYY-MM or whose value is not an integer is skipped.
    """
    rows = []
    with open(path, newline="") as fh:
        for record in csv.reader(fh):
            if len(record) < 2:
                continue
            month_raw, units_raw = record[0].strip(), record[1].strip()
            if not _MONTH_RE.match(month_raw):
                continue  # header ('Month') or junk footer
            try:
                units = int(units_raw)
            except ValueError:
                continue
            month = dt.datetime.strptime(month_raw, "%Y-%m").date()
            rows.append((month, units))
    return rows


def apply_schema(conn):
    """Create the tables and indexes (idempotent -- IF NOT EXISTS)."""
    with open(SCHEMA_PATH) as fh, conn.cursor() as cur:
        cur.execute(fh.read())
    conn.commit()


def reset_schema(conn):
    """Drop the tables so the next apply_schema starts clean."""
    with conn.cursor() as cur:
        cur.execute("DROP TABLE IF EXISTS sales_observation, series CASCADE;")
    conn.commit()


def upsert_series(conn):
    """Insert the series dimension rows; return {code: series_id}."""
    ids = {}
    with conn.cursor() as cur:
        for code, (_file, name, node_type) in SERIES.items():
            cur.execute(
                """
                INSERT INTO series (code, name, node_type)
                VALUES (%s, %s, %s)
                ON CONFLICT (code) DO UPDATE
                    SET name = EXCLUDED.name, node_type = EXCLUDED.node_type
                RETURNING series_id;
                """,
                (code, name, node_type),
            )
            ids[code] = cur.fetchone()[0]
    conn.commit()
    return ids


def load_observations(conn, series_id, observations):
    """Bulk upsert (month, units) rows for one series."""
    if not observations:
        return
    values = [(series_id, month, units) for month, units in observations]
    with conn.cursor() as cur:
        execute_values(
            cur,
            """
            INSERT INTO sales_observation (series_id, month, units)
            VALUES %s
            ON CONFLICT (series_id, month) DO UPDATE
                SET units = EXCLUDED.units;
            """,
            values,
        )
    conn.commit()


def load_all(conn, dataset_dir=DATASET_DIR):
    """Apply schema, upsert series, and load every series' CSV."""
    apply_schema(conn)
    ids = upsert_series(conn)
    total = 0
    for code, (filename, _name, _node) in SERIES.items():
        rows = parse_csv(os.path.join(dataset_dir, filename))
        load_observations(conn, ids[code], rows)
        total += len(rows)
        print(f"  {code:>2}: loaded {len(rows)} observations")
    print(f"Done. {total} observations across {len(SERIES)} series.")
    return total


def main():
    parser = argparse.ArgumentParser(description="Load sales CSVs into Postgres.")
    parser.add_argument(
        "--reset", action="store_true", help="drop and recreate tables first"
    )
    args = parser.parse_args()

    conn = connect()
    try:
        if args.reset:
            reset_schema(conn)
        load_all(conn)
    finally:
        conn.close()


if __name__ == "__main__":
    main()
