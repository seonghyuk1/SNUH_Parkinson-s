/* eslint-disable*/
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sortRows, filterRows, paginateRows } from "./helpers";
import Pagination from "./Pagination";
import styles from "./styles/Table.module.css";
import axios from "axios";
import Button from "react-bootstrap/Button";

export const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/users", {
        // 파라미터 전달로 최대 1,000개 받아옴
        params: { size: 1000 },
        headers: {},
      })
      .then((response) => {
        console.log(response);

        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const navigate = useNavigate();
  // 현재 페이지
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  // sorting 기본 : 오름차순, id 기준
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
  // 한 페이지에 보여줄 행의 갯수
  const rowsPerPage = 10;

  // 헬퍼 함수 메모이제이션
  // 처음 계산된 값을 메모리에 저장하여 계산된 값을 가져와 재사용 (리턴값 동일시 재사용X)

  // 필터
  // rows와 filters의 값이 바뀔 때만 실행 (첫 계산 제외)
  const filteredRows = useMemo(() => filterRows(data, filters), [data, filters]);

  // 결과 sort
  // filteredRows와 sort의 값이 바뀔 때만 실행 (첫 계산 제외)
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort]);

  // 결과 행수 계산
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  // 결과 길이
  const count = filteredRows.length;

  // 결과 페이지 수 | 4이하 1 / 5이상 2
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (value, accessor) => {
    setActivePage(1);

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
    setActivePage(1);
    setSort((prevSort) => ({
      order: prevSort.order === "asc" && prevSort.orderBy === accessor ? "desc" : "asc",
      orderBy: accessor,
    }));
  };

  const clearAll = () => {
    setSort({ order: "asc", orderBy: "id" });
    setActivePage(1);
    setFilters({});
  };

  return (
    <>
      <h5>홈{" > "}전체 사용자 명단</h5>
      <div className={styles.Container}>
        <div className={styles.Title}>전체 사용자 명단</div>
      </div>
      <div>
        <center>
          <Button className={styles.Btn} variant="none" onClick={clearAll}>
            필터 초기화
          </Button>
        </center>
      </div>
      <div className={styles.Container}>
        <table className={styles.Table}>
          <thead className={styles.theader}>
            <tr>
              {columns.map((column) => {
                const sortIcon = () => {
                  if (column.accessor === sort.orderBy) {
                    if (sort.order === "asc") {
                      return "🔼";
                    }
                    return "🔽";
                  } else {
                    return "️🔁";
                  }
                };
                return (
                  <th key={column.accessor}>
                    <span>{column.Header}</span>
                    <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                  </th>
                );
              })}
            </tr>
            <tr>
              {columns.map((column) => {
                return (
                  <th>
                    <input key={`${column.accessor}-search`} type="search" placeholder={`${column.Header} 검색`} value={filters[column.accessor]} onChange={(e) => handleSearch(e.target.value, column.accessor)} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {calculatedRows.map((row, i) => {
              return (
                <tr key={row.id}>
                  {columns.map((column) => {
                    return (
                      <td
                        className={styles.Content}
                        key={column.accessor}
                        onClick={() => {
                          navigate("/user/" + (i + 1), {
                            // 이름과 ID 전달
                            state: {
                              name: row.name,
                              id: row.id,
                            },
                          });
                        }}
                      >
                        {row[column.accessor]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {count > 0 ? (
          <Pagination activePage={activePage} count={count} rowsPerPage={rowsPerPage} totalPages={totalPages} setActivePage={setActivePage} />
        ) : (
          <center>{data.length == 0 ? <h3 style={{ marginTop: "3%" }}>데이터를 불러오는 중입니다.</h3> : <h3 style={{ marginTop: "3%" }}>해당하는 검색결과가 없습니다.</h3>}</center>
        )}
      </div>
    </>
  );
};
