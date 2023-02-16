/* eslint-disable*/
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import { sortRows, filterRows, paginateRows } from "./helpers";
import axios from "axios";

function ExciseList() {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log("로케", location);

    // axios
    //   .get("/users", {
    //     // 파라미터 전달로 최대 1,000개 받아옴
    //     params: { size: 1000 },
    //     headers: {},
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     console.log(response.data);

    //     setRows(response.data);
    //   })
    //   .catch((error) => {});

    // 운동정보
    axios
      .get("/tests/" + location.state.test, {
        params: {
          userId: 1,
        },
        headers: {},
      })
      .then((response) => {
        console.log("응답", response);
        const sortData = response.data.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });

        setData(sortData);
      })
      .catch((error) => {});
  }, []);

  const columns = useMemo(
    () => [
      {
        accessor: "id",
        Header: "검사 id",
      },
      {
        accessor: "createdAt",
        Header: "생성시간",
      },

      location.state.count
        ? {
            accessor: "count",
            Header: "count",
          }
        : {
            accessor: "a",
            Header: "",
          },
      {
        accessor: "timeAfterTakingMedicine",
        Header: "약복용후 지난시간",
      },

      //   location.state.test == "gait"
      //     ? {
      //         accessor: "stride",
      //         Header: "보폭",
      //       }
      //     : {
      //         accessor: "aa",
      //         Header: "",
      //       },
      //   location.state.test == "gait"
      //     ? {
      //         accessor: "step",
      //         Header: "발걸음 수",
      //       }
      //     : {
      //         accessor: "aaa",
      //         Header: "",
      //       },
      //   location.state.test == "gait"
      //     ? {
      //         accessor: "distance",
      //         Header: "걸은거리",
      //       }
      //     : {
      //         accessor: "aaaa",
      //         Header: "",
      //       },
      //   location.state.test == "gait"
      //     ? {
      //         accessor: "time",
      //         Header: "걸은시간(분)",
      //       }
      //     : {
      //         accessor: "aaaaa",
      //         Header: "",
      //       },
      //   {
      //     accessor: "userId",
      //     Header: "검사자 id",
      //   },
      location.state.sound
        ? {
            accessor: "fileNameList",
            Header: "파일 다운로드",
          }
        : {
            accessor: "fileName",
            Header: "파일 다운로드",
          },
    ],
    []
  );

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
  const filteredRows = useMemo(() => filterRows(data, filters), [data, filters]);

  // 결과 sort
  // filteredRows와 sort의 값이 바뀔 때만 실행 (첫 계산 제외)
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort]);

  // 결과 행수 계산
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  console.log("칼", calculatedRows);
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
      <table>
        <thead>
          <tr>
            {/* 헤더 */}
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
          {/* 필터  */}
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
          {/* 내용물 */}
          {calculatedRows.map((row, i) => {
            return (
              <tr key={row.id}>
                {columns.map((column) => {
                  return <td key={column.accessor}>{row[column.accessor]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ExciseList;
