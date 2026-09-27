# Project Overview
A project for providing AI powered solution for managing supply chains and increasing transparency and coordination in supply chain.
# Developed By
- Shreshth Garg
# Deployment
For project evaluation and testing kindly visit the following routes:
1. https://team-visionnaires.vercel.app/
2. https://team-visionnaires.vercel.app/login
3. https://team-visionnaires.vercel.app/dashboard

(Dashboard route is otherwise authentication protected, however for purpose of demonstration it has been kept accessible through above link.)

# PostgreSQL Data Layer

A relational data layer (`postgres/`) models the monthly sales time series in
PostgreSQL alongside the existing MongoDB ingestion, and computes trend
aggregations with SQL window functions. The five source series in
`model/dataset/` (`M`, `R1`, `R2`, `D1`, `D2`) are loaded into an indexed
schema, and analytics such as moving averages and running totals are expressed
as `OVER (PARTITION BY ... ORDER BY ...)` queries rather than in application
code.

## Schema

Data is stored in long / tidy format — one row per (series, month) — which is
the natural input for window functions.

```
series                              sales_observation
------------------------            ----------------------------------
series_id  SMALLSERIAL PK           series_id  SMALLINT  FK -> series
code       TEXT UNIQUE              month      DATE          }  PK
name       TEXT                     units      INTEGER  >= 0  }
node_type  TEXT
```

**Indexes**

| Index | Why it exists |
|-------|---------------|
| `PRIMARY KEY (series_id, month)` | Natural key; enforces one row per series per month (idempotent loads). Already ordered by `(series_id, month)`, so the window queries can read it in partition/order without a sort. |
| `idx_sales_month (month)` | The PK leads with `series_id`, so month-only or cross-series time-range queries can't use it. This index serves those. |
| `series.code UNIQUE` | Backs `code -> series_id` lookups and prevents duplicate series. |

`units` is intentionally **not** indexed — there are no lookups on it, so an
index would only add write cost.

## Window-function queries (`queries.sql`)

| Query | Window feature |
|-------|----------------|
| `moving_average` | 3- and 12-month trailing averages via `ROWS BETWEEN N PRECEDING AND CURRENT ROW` |
| `running_total` | cumulative sum via `ROWS UNBOUNDED PRECEDING` |
| `mom_growth` | month-over-month change via `LAG(units)` |
| `yoy_growth` | year-over-year change via `LAG(units, 12)` |

## Configuration

Connection settings come from the environment (standard libpq names) — nothing
is hardcoded. Copy `postgres/.env.example` and set the values:

```
PGHOST  PGPORT  PGDATABASE  PGUSER  PGPASSWORD
```

## Running it

With Docker Compose (from the repository root):

```bash
docker compose up -d                         # starts a postgres:16 service
```

Or a plain container instead of Compose:

```bash
docker run -d --name vision-postgres -p 5432:5432 \
  -e POSTGRES_DB=vision -e POSTGRES_USER=vision -e POSTGRES_PASSWORD=vision \
  postgres:16-alpine
```

Then load the data and run the analytics:

```bash
cd Vision/postgres
pip install -r requirements.txt
export PGHOST=localhost PGPORT=5432 PGDATABASE=vision PGUSER=vision PGPASSWORD=vision
python load.py --reset        # create schema + ingest all five CSVs
python analytics.py           # run every window query (or: python analytics.py moving_average)
```

## Tests

```bash
cd Vision/postgres
pytest -v
```

`test_load.py` (CSV parsing) needs no database and always runs. `test_windows.py`
loads a small fixture and asserts the exact values each window query produces;
it skips automatically when no Postgres is reachable. CI
(`.github/workflows/postgres-ci.yml`) runs the full suite against a Postgres
service container on every push and PR.
