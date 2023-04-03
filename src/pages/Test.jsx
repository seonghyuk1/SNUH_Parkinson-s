import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./../styles/Test.module.css";
import { sortRows, filterRows } from "../lib/utils/helpers";
import Pagination from "../components/common/Pagination";
import Button from "react-bootstrap/Button";
import { getTestsByTypeAndUserId } from "../lib/api/tests";
import TestTable from "./../components/test/TestTable";
import { CircularProgress } from "@mui/material";

export default function Test() {
  let location = useLocation();
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTestsByTypeAndUserId(location.state.test, location.state.id, page)
      .then((response) => {
        setData(response.data?.data);
        setPageInfo(response.data?.pageInfo);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [location.state, page]);

  // 스프레드 문법을 통해 받아온 객체를 리스트 안에
  const columns = useMemo(
    () => [...location.state.colHead],
    [location.state.colHead]
  );

  const [filters, setFilters] = useState({});

  const [sort, setSort] = useState({ order: "desc", orderBy: "id" });

  const filteredRows = useMemo(
    () => filterRows(data, filters),
    [data, filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );

  const handleSearch = (value, accessor) => {
    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor) => {
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const clearAll = () => {
    setSort({ order: "desc", orderBy: "id" });
    setFilters({});
  };

  return (
    <>
      <div className={styles.Container}>
        <h5>
          <Link to="/" className={styles.Links}>
            홈
          </Link>
          {" > "}
          {location.state.id && location.state.name ? (
            <>
              <Link to="/Table" className={styles.Links}>
                전체 사용자 명단
              </Link>
              {" > "}
              <Link
                to={`/user/ + ${location.state.id}`}
                state={{ id: location.state.id, name: location.state.name }}
                className={styles.Links}
              >
                {location.state.name
                  ? location.state.name
                  : `${location.state.id}번 검사자`}
              </Link>
            </>
          ) : (
            <Link to="/Excise" className={styles.Links}>
              검사기록
            </Link>
          )}
          {" > "}
          {location.state.title}
        </h5>

        <div className={styles.Title}>
          {location.state.name && `${location.state.name}님의 `}
          {location.state.title}
        </div>
        <Button onClick={clearAll} className={styles.Btn}>
          필터 초기화
        </Button>
      </div>
      <div>
        {isLoading ? (
          <center
            style={{
              display: "grid",
              height: "400px",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={80} thickness={2.8} />
          </center>
        ) : sortedRows.length > 0 ? (
          <>
            <TestTable
              data={sortedRows}
              location={location.state.name}
              heads={columns}
              handleSort={handleSort}
              sort={sort}
              handleSearch={handleSearch}
              filters={filters}
            ></TestTable>
            <Pagination pageInfo={pageInfo} setPage={setPage} />
          </>
        ) : (
          <center>
            <h1 style={{ marginTop: "10%" }}>검사 기록이 없습니다.</h1>
          </center>
        )}
      </div>
    </>
  );
}
