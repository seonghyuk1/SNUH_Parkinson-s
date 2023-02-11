/* eslint-disable*/
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { sortRows, filterRows, paginateRows } from "./helpers";
import Pagination from "./Pagination";
import styles from "./styles/Table.module.css";

export const Table = ({ columns, rows }) => {
  const navigate = useNavigate();
  // 현재 페이지
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  // sorting 기본 : 오름차순, id 기준
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
  // 한 페이지에 보여줄 행의 갯수
  const rowsPerPage = 5;

  // 헬퍼 함수 메모이제이션
  // 처음 계산된 값을 메모리에 저장하여 계산된 값을 가져와 재사용 (리턴값 동일시 재사용X)

  // 필터
  // rows와 filters의 값이 바뀔 때만 실행 (첫 계산 제외)
  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters]);

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
      <div className={styles.Container}>
        <table className={styles.Table}>
          <thead className={styles.theader}>
            <tr>
              {columns.map((column) => {
                const sortIcon = () => {
                  if (column.accessor === sort.orderBy) {
                    if (sort.order === "asc") {
                      return "⬆";
                    }
                    return "⬇️";
                  } else {
                    return "️↕️";
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

        {count > 0 ? <Pagination activePage={activePage} count={count} rowsPerPage={rowsPerPage} totalPages={totalPages} setActivePage={setActivePage} /> : <h3>해당하는 검색결과가 없습니다.</h3>}

        <div>
          <p>
            <button onClick={clearAll}>필터 초기화</button>
          </p>
        </div>
      </div>
    </>
  );
};
