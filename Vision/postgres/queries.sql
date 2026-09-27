-- Window-function aggregation queries over the sales time series.
--
-- Every query partitions by series and orders by month, so each window
-- runs independently within a single supply-chain node's timeline. Because
-- the primary key is (series_id, month), Postgres can usually satisfy the
-- PARTITION BY / ORDER BY straight from the index without an extra sort.
--
-- Each query below is standalone; run one at a time, or see analytics.py.


-- 1. Trailing moving averages (frame clause).
--    3-month and 12-month trailing averages smooth out monthly noise. The
--    ROWS BETWEEN N PRECEDING AND CURRENT ROW frame is what makes this a
--    *trailing* average rather than a whole-partition average.
-- name: moving_average
SELECT
    s.code,
    o.month,
    o.units,
    ROUND(AVG(o.units) OVER w3,  2)  AS moving_avg_3m,
    ROUND(AVG(o.units) OVER w12, 2)  AS moving_avg_12m
FROM sales_observation o
JOIN series s USING (series_id)
WINDOW
    w3  AS (PARTITION BY o.series_id ORDER BY o.month
            ROWS BETWEEN 2  PRECEDING AND CURRENT ROW),
    w12 AS (PARTITION BY o.series_id ORDER BY o.month
            ROWS BETWEEN 11 PRECEDING AND CURRENT ROW)
ORDER BY s.code, o.month;


-- 2. Running total (cumulative sum from the start of each series).
--    ROWS UNBOUNDED PRECEDING accumulates from the first month up to the
--    current row.
-- name: running_total
SELECT
    s.code,
    o.month,
    o.units,
    SUM(o.units) OVER (
        PARTITION BY o.series_id
        ORDER BY o.month
        ROWS UNBOUNDED PRECEDING
    ) AS running_total_units
FROM sales_observation o
JOIN series s USING (series_id)
ORDER BY s.code, o.month;


-- 3. Month-over-month growth (LAG offset 1).
--    LAG pulls the previous month's value into the current row so we can
--    compute the delta and percent change. NULLIF guards the first month
--    (no previous value -> NULL rather than divide-by-zero).
-- name: mom_growth
SELECT
    s.code,
    o.month,
    o.units,
    o.units - LAG(o.units) OVER w AS mom_delta,
    ROUND(
        100.0 * (o.units - LAG(o.units) OVER w)
              / NULLIF(LAG(o.units) OVER w, 0),
        2
    ) AS mom_pct
FROM sales_observation o
JOIN series s USING (series_id)
WINDOW w AS (PARTITION BY o.series_id ORDER BY o.month)
ORDER BY s.code, o.month;


-- 4. Year-over-year growth (LAG offset 12).
--    Same idea, but the offset of 12 compares each month to the same month
--    a year earlier, which cancels seasonality.
-- name: yoy_growth
SELECT
    s.code,
    o.month,
    o.units,
    o.units - LAG(o.units, 12) OVER w AS yoy_delta,
    ROUND(
        100.0 * (o.units - LAG(o.units, 12) OVER w)
              / NULLIF(LAG(o.units, 12) OVER w, 0),
        2
    ) AS yoy_pct
FROM sales_observation o
JOIN series s USING (series_id)
WINDOW w AS (PARTITION BY o.series_id ORDER BY o.month)
ORDER BY s.code, o.month;
