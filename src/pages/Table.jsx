import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sortRows, filterRows } from "../lib/utils/helpers";
import Pagination from "../components/common/Pagination";
import styles from "./../styles/Table.module.css";
import Button from "react-bootstrap/Button";
import { getUsers } from "../lib/api/users";
import UserTable from "../components/user/UserTable";
import { CircularProgress } from "@mui/material";

export const Table = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    !token && navigate("/");
  }, [navigate, token]);

  useEffect(() => {
    getUsers(page)
      .then((response) => {
        setData(response.data?.data);
        setPageInfo(response.data?.pageInfo);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const columns = useMemo(
    () => [
      {
        accessor: "id", // 객체의 어느 속성을 읽어야하는지
        Header: "id", // 테이블 헤더에 보여줄 텍스트
      },
      {
        accessor: "name",
        Header: "이름",
      },
      {
        accessor: "birthdate",
        Header: "생년월일",
      },
      {
        accessor: "gender",
        Header: "성별",
      },
      {
        accessor: "diagnosis",
        Header: "진단년도",
      },
    ],
    []
  );

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "desc", orderBy: "id" });

  const sortedRows = useMemo(() => {
    const filteredRows = filterRows(data, filters);
    return sortRows(filteredRows, sort);
  }, [data, filters, sort]);

  const handleSearch = (value, accessor) => {
    value
      ? setFilters((prevFilters) => ({
          ...prevFilters,
          [accessor]: value,
        }))
      : setFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };
          delete updatedFilters[accessor];
          return updatedFilters;
        });
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
          {" > "}전체 사용자 명단
        </h5>
        <center className={styles.Title}>전체 사용자 명단</center>
        <Button className={styles.Btn} onClick={clearAll}>
          필터 초기화
        </Button>
      </div>
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
        <div>
          <UserTable
            data={sortedRows}
            heads={columns}
            handleSort={handleSort}
            sort={sort}
            handleSearch={handleSearch}
            filters={filters}
          />
          <Pagination pageInfo={pageInfo} setPage={setPage} />
        </div>
      ) : (
        <center>
          <h1 style={{ marginTop: "10%" }}>검사 기록이 없습니다.</h1>
        </center>
      )}
    </>
  );
};
