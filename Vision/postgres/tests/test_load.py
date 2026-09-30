"""Pure-Python tests for CSV parsing -- no database required, always run."""

import datetime as dt
import os

import load as loader

DATASET_DIR = loader.DATASET_DIR


def _write(tmp_path, text):
    path = tmp_path / "sample.csv"
    path.write_text(text)
    return str(path)


def test_parse_skips_header_and_footer(tmp_path):
    path = _write(
        tmp_path,
        "Month,M sales\n"
        "2010-01,5130\n"
        "2010-02,4844\n"
        ",\n"            # malformed footer row present in the real files
        "M Sales,\n",    # malformed footer row present in the real files
    )
    rows = loader.parse_csv(path)
    assert rows == [
        (dt.date(2010, 1, 1), 5130),
        (dt.date(2010, 2, 1), 4844),
    ]


def test_parse_maps_month_to_first_of_month(tmp_path):
    path = _write(tmp_path, "Month,sales\n2018-09,21908\n")
    (month, units), = loader.parse_csv(path)
    assert month == dt.date(2018, 9, 1)
    assert units == 21908


def test_real_datasets_parse_cleanly():
    for _code, (filename, _name, _node) in loader.SERIES.items():
        path = os.path.join(DATASET_DIR, filename)
        rows = loader.parse_csv(path)
        assert len(rows) > 100                       # ~107 real months
        assert all(isinstance(u, int) and u >= 0 for _m, u in rows)
        months = [m for m, _u in rows]
        assert months == sorted(months)             # chronological
        assert len(set(months)) == len(months)      # no duplicate months
