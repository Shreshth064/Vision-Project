"""Shared pytest fixtures.

Makes the postgres/ modules importable and provides a `conn` fixture that
connects to Postgres via the standard env vars. If no database is reachable,
DB-backed tests are skipped rather than failed, so the suite still runs on a
machine (or laptop) without Postgres. CI provides a real Postgres service, so
those tests execute there.
"""

import os
import sys

import psycopg2
import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import load as loader  # noqa: E402
from db import connect  # noqa: E402


@pytest.fixture
def conn():
    try:
        connection = connect()
    except psycopg2.OperationalError as exc:
        pytest.skip(f"no Postgres reachable: {exc}")
    # Start each test from a clean, freshly loaded schema.
    loader.reset_schema(connection)
    loader.apply_schema(connection)
    try:
        yield connection
    finally:
        connection.close()
