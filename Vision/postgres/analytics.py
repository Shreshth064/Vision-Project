"""Run the window-function aggregation queries and print the results.

The SQL lives in queries.sql (a single source of truth shared with the
tests). Each query is delimited by a `-- name: <key>` comment. This module
parses that file, so the SQL you read in queries.sql is exactly what runs.

Usage:
    PGPASSWORD=... python analytics.py                 # run every query
    PGPASSWORD=... python analytics.py moving_average  # run just one
"""

import os
import re
import sys

from db import connect

QUERIES_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "queries.sql")

_NAME_RE = re.compile(r"^--\s*name:\s*(\w+)\s*$", re.MULTILINE)


def load_queries(path=QUERIES_PATH):
    """Parse queries.sql into an ordered {name: sql} dict."""
    with open(path) as fh:
        text = fh.read()
    queries = {}
    matches = list(_NAME_RE.finditer(text))
    for i, match in enumerate(matches):
        name = match.group(1)
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        queries[name] = text[start:end].strip()
    return queries


def run_query(conn, sql, limit=None):
    """Execute one SQL string; return (column_names, rows)."""
    with conn.cursor() as cur:
        cur.execute(sql)
        columns = [d[0] for d in cur.description]
        rows = cur.fetchall()
    if limit is not None:
        rows = rows[:limit]
    return columns, rows


def _print_table(name, columns, rows):
    print(f"\n=== {name} ===")
    print(" | ".join(columns))
    print("-" * 60)
    for row in rows:
        print(" | ".join("" if v is None else str(v) for v in row))


def main():
    queries = load_queries()
    wanted = sys.argv[1:] or list(queries)

    conn = connect()
    try:
        for name in wanted:
            if name not in queries:
                print(f"Unknown query: {name}. Available: {', '.join(queries)}")
                continue
            columns, rows = run_query(conn, queries[name], limit=15)
            _print_table(name, columns, rows)
    finally:
        conn.close()


if __name__ == "__main__":
    main()
