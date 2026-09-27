"""Database connection helpers.

Connection settings are read from the environment only -- nothing is
hardcoded. We use the standard libpq variable names so the same config works
with psql, docker-compose and any other Postgres tooling:

    PGHOST      (default: localhost)
    PGPORT      (default: 5432)
    PGDATABASE  (default: vision)
    PGUSER      (default: vision)
    PGPASSWORD  (no default -- must be supplied via the environment)

See .env.example for a template.
"""

import os

import psycopg2


def connection_params():
    """Return psycopg2 connection kwargs sourced from the environment."""
    return {
        "host": os.environ.get("PGHOST", "localhost"),
        "port": os.environ.get("PGPORT", "5432"),
        "dbname": os.environ.get("PGDATABASE", "vision"),
        "user": os.environ.get("PGUSER", "vision"),
        # No default: a password must never be baked into the code.
        "password": os.environ.get("PGPASSWORD", ""),
    }


def connect():
    """Open a new psycopg2 connection using the environment config."""
    return psycopg2.connect(**connection_params())
