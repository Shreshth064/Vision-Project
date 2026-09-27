"""Tests for the window-function queries.

Loads a small, hand-checkable fixture into a test database and asserts the
exact values the window queries produce. The queries themselves are read
from queries.sql via analytics.load_queries(), so these tests exercise the
real SQL, not a copy. Skipped automatically when no Postgres is reachable
(see conftest.py); CI runs them against a Postgres service.
"""

import datetime as dt
from decimal import Decimal

import analytics


def _add_months(start, n):
    total = (start.year * 12 + (start.month - 1)) + n
    return dt.date(total // 12, total % 12 + 1, 1)


# One series, 13 months, units = 100, 110, 120, ... 220 (easy to check by hand).
MONTHS = [_add_months(dt.date(2020, 1, 1), i) for i in range(13)]
UNITS = [100 + 10 * i for i in range(13)]


def _seed(conn):
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO series (code, name, node_type) "
            "VALUES ('T', 'Test', 'test') RETURNING series_id;"
        )
        series_id = cur.fetchone()[0]
        cur.executemany(
            "INSERT INTO sales_observation (series_id, month, units) "
            "VALUES (%s, %s, %s);",
            [(series_id, m, u) for m, u in zip(MONTHS, UNITS)],
        )
    conn.commit()


def _run(conn, name):
    """Run a named query and return {month: row_dict} for series 'T'."""
    sql = analytics.load_queries()[name]
    columns, rows = analytics.run_query(conn, sql)
    out = {}
    for row in rows:
        rec = dict(zip(columns, row))
        if rec["code"] == "T":
            out[rec["month"]] = rec
    return out


def test_moving_average(conn):
    _seed(conn)
    rows = _run(conn, "moving_average")

    # First month: only itself in the frame -> average is the value.
    assert rows[MONTHS[0]]["moving_avg_3m"] == Decimal("100.00")
    # Third month: mean(100, 110, 120) = 110.
    assert rows[MONTHS[2]]["moving_avg_3m"] == Decimal("110.00")
    # Fourth month: mean(110, 120, 130) = 120 (trailing 3, drops the first).
    assert rows[MONTHS[3]]["moving_avg_3m"] == Decimal("120.00")
    # 12-month window at the 13th month: mean(110..220) = 165.
    assert rows[MONTHS[12]]["moving_avg_12m"] == Decimal("165.00")


def test_running_total(conn):
    _seed(conn)
    rows = _run(conn, "running_total")

    assert rows[MONTHS[0]]["running_total_units"] == 100
    assert rows[MONTHS[1]]["running_total_units"] == 210        # 100 + 110
    assert rows[MONTHS[2]]["running_total_units"] == 330        # + 120
    assert rows[MONTHS[12]]["running_total_units"] == sum(UNITS)


def test_mom_growth(conn):
    _seed(conn)
    rows = _run(conn, "mom_growth")

    # First month has no predecessor.
    assert rows[MONTHS[0]]["mom_delta"] is None
    assert rows[MONTHS[0]]["mom_pct"] is None
    # Second month: 110 vs 100 -> +10, +10.00%.
    assert rows[MONTHS[1]]["mom_delta"] == 10
    assert rows[MONTHS[1]]["mom_pct"] == Decimal("10.00")


def test_yoy_growth(conn):
    _seed(conn)
    rows = _run(conn, "yoy_growth")

    # First 12 months have no same-month-last-year value.
    for m in MONTHS[:12]:
        assert rows[m]["yoy_delta"] is None
    # Month 13 (220) vs month 1 (100): +120, +120.00%.
    assert rows[MONTHS[12]]["yoy_delta"] == 120
    assert rows[MONTHS[12]]["yoy_pct"] == Decimal("120.00")
