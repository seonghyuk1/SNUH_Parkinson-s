/* eslint-disable*/
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sortRows, filterRows, paginateRows } from "./helpers";
import axios from "axios";
import Button from "react-bootstrap/Button";
import styles from "./styles/Test.module.css";

import Pagination from "./Pagination";

// import { useAsync } from "react-async";

// async function getUsers() {
//   const response = location.state.ids.map((v, i) => {
//     axios.get("/tests/" + location.state.test, {
//       params: {
//         userId: location.state.ids[i].id,
//         size: 1000,
//       },
//       headers: {},
//     });
//     // .then((response) => {
//     //   console.log("운동 응답", response.data);

//     //   // 중간 단계인 test를 통해도 됨
//     //   test.push(...response.data);
//     //   // console.log("테스트", test);
//     //   // data.push(...response.data);

//     //   // console.log(data);
//     // })
//     // .catch((error) => {
//     //   console.log(error);
//     // });
//   });
//   console.log(response.data);
//   return response.data;
// }

function ExciseList() {
  // const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const location = useLocation();

  // useEffect(() => {
  //   location.state.ids.map((v, i) => {
  //     axios
  //       .get("/tests/" + location.state.test, {
  //         params: {
  //           userId: location.state.ids[i].id,
  //           size: 1000,
  //         },
  //         headers: {},
  //       })
  //       .then((response) => {
  //         console.log("운동 응답", response.data);

  //         // 중간 단계인 test를 통해도 됨
  //         test.push(...response.data);
  //         // console.log("테스트", test);
  //         // data.push(...response.data);

  //         // console.log(data);

  //         setData(test);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });

  //   // setData(test);
  //   console.log("얘가 렌더링 후 반복문 보다 먼저 실행 서버 통신이 비동기니 ");
  // }, []);

  useEffect(() => {
    const promises = location.state.ids.map((v, i) => {
      return axios.get("/tests/" + location.state.test, {
        params: {
          userId: location.state.ids[i].id,
          size: 1000,
        },
        headers: {},
      });
    });

    // Promise.all 사용하여 모든 처리가 끝났을 때 넣어줌
    Promise.all(promises)
      .then((responses) => {
        // flatMap 활용하여 모든 응답의 중복구조를 평면화
        const test = responses.flatMap((response) => response.data);
        setData(test);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = useMemo(() => [...location.state.colHead], []);

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

  // console.log("칼", calculatedRows);
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

  // const {
  //   data: users,
  //   error,
  //   isLoading,
  //   reload,
  // } = useAsync({
  //   promiseFn: getUsers,
  // });

  return (
    <>
      {console.log("들어온 데이터", data)}
      <div>
        <center>
          <Button variant="none" onClick={clearAll} className={styles.Btn}>
            필터 초기화
          </Button>
        </center>
      </div>
      <table className={styles.Table}>
        <thead className={styles.theader}>
          <tr>
            {/* 헤더 */}
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
                  return (
                    <td className={styles.Content} key={column.accessor}>
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
    </>
  );
}

export default ExciseList;
