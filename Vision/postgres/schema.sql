-- PostgreSQL schema for the Vision supply-chain sales time series.
--
-- The five source CSVs (M, R1, R2, D1, D2) all share the same shape
-- (Month, sales), so instead of five wide tables we model the data in
-- long / tidy format: one row per (series, month). This is exactly the
-- shape SQL window functions consume (PARTITION BY series ORDER BY month),
-- and adding a sixth node later is a row insert, not a schema change.

-- Dimension table: one row per supply-chain node / time series.
CREATE TABLE IF NOT EXISTS series (
    series_id  SMALLSERIAL PRIMARY KEY,
    code       TEXT NOT NULL UNIQUE,   -- 'M', 'R1', 'R2', 'D1', 'D2'
    name       TEXT NOT NULL,          -- human-readable label
    node_type  TEXT NOT NULL           -- 'manufacturer' | 'retailer' | 'distributor'
);

-- Fact table: one monthly sales observation per series.
CREATE TABLE IF NOT EXISTS sales_observation (
    series_id  SMALLINT NOT NULL REFERENCES series(series_id),
    month      DATE     NOT NULL,      -- first-of-month, e.g. 2010-01-01
    units      INTEGER  NOT NULL CHECK (units >= 0),
    PRIMARY KEY (series_id, month)
);

-- Index rationale:
--
--   PRIMARY KEY (series_id, month)
--       Natural composite key. Enforces one observation per series per
--       month, which is what makes the loader idempotent. It is a btree
--       already ordered by (series_id, month), so the window queries that
--       PARTITION BY series_id ORDER BY month can read it in order and
--       often skip the sort step entirely.
--
--   idx_sales_month
--       The primary key leads with series_id, so a query that filters only
--       by month (e.g. "every node's sales in 2015-03", or a date-range
--       scan across all series) cannot use the PK's leading column. This
--       index serves those cross-series, time-first access patterns.
--
--   series.code UNIQUE (declared inline above)
--       Backs code -> series_id lookups during load and joins, and prevents
--       duplicate series definitions.
--
-- We deliberately do NOT index `units`: there are no equality/range lookups
-- on it, so an index would only add write cost for no read benefit.
CREATE INDEX IF NOT EXISTS idx_sales_month ON sales_observation (month);
