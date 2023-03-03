/* eslint-disable*/
import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { sortRows, filterRows, paginateRows } from "./helpers";
import axios from "axios";
import Button from "react-bootstrap/Button";
import styles from "./styles/Test.module.css";
import Pagination from "./Pagination";

function ExciseList() {
  // ************************************

  const [checkList, setCheckList] = useState([]);
  const [modal, setModal] = useState(false);

  // ************************************
  const [data, setData] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  console.log("로케", location.state);

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
        setCheckList(test);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = useMemo(() => [...location.state.colHead], []);

  // console.log("데데", data);
  // console.log("체크", checkList);
  // console.log(typeof checkList);

  // 현재 페이지
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  // sorting 기본 : 오름차순, id 기준
  const [sort, setSort] = useState({ order: "desc", orderBy: "id" });
  // 한 페이지에 보여줄 행의 갯수
  const rowsPerPage = 10;

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

  return (
    <>
      {console.log("들어온 데이터", data)}

      <h5>
        <Link to="/" className={styles.Links}>
          홈
        </Link>
        {" > "}
        <Link to="/Excise" className={styles.Links}>
          운동기록
        </Link>
        {" > "}
        {location.state.test} Test
      </h5>
      <div className={styles.Container}>
        <center className={styles.Title}>전체 {location.state.test} Test 데이터</center>
      </div>

      <div>
        <center>
          <Button variant="none" onClick={clearAll} className={styles.Btn}>
            필터 초기화
          </Button>
        </center>
      </div>
      {/* 아무래도 체크박스보단 검색형식이 나을듯 */}
      <div className={styles.Container}>
        {console.log(location.state)}
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

          {/* 바디 */}
          <tbody>
            {calculatedRows.map((row, i) => {
              return (
                <>
                  <tr key={row.id}>
                    {location.state.colHead.length == 6 ? (
                      <>
                        {/* Finger, Screen, QuickBlink */}
                        <td className={styles.ContentEx}>{calculatedRows[i].id}</td>
                        <td className={styles.ContentEx}>{calculatedRows[i].createdAt}</td>
                        <td
                          className={styles.Content}
                          onClick={() => {
                            // NavigateUser(calculatedRows[i].userId);
                            navigate(`/user/${calculatedRows[i].userId}`, {
                              state: {
                                id: calculatedRows[i].userId,
                              },
                            });
                          }}
                        >
                          {calculatedRows[i].userId}
                        </td>
                        <td className={styles.ContentEx}>{calculatedRows[i].count}</td>
                        <td className={styles.ContentEx}>{calculatedRows[i].timeAfterTakingMedicine}</td>
                        <td
                          className={styles.Content}
                          onClick={() => {
                            // fileName이라 한 개 일 때
                            // 클릭 했을 때 가지고 온 열들에서 fileName이 있다면 이 형식으로 Axios
                            FilenameDown(calculatedRows[i].userId, calculatedRows[i].fileName);
                          }}
                        >
                          {calculatedRows[i].fileName}
                        </td>
                      </>
                    ) : location.state.colHead.length == 5 ? (
                      <>
                        {/* Sound, Dadada, Pataka*/}
                        <td className={styles.ContentEx}>{calculatedRows[i].id}</td>
                        <td className={styles.ContentEx}>{calculatedRows[i].createdAt}</td>
                        <td
                          className={styles.Content}
                          onClick={() => {
                            navigate(`/user/${calculatedRows[i].userId}`, {
                              state: {
                                id: calculatedRows[i].userId,
                              },
                            });
                          }}
                        >
                          {calculatedRows[i].userId}
                        </td>
                        <td className={styles.ContentEx}>{calculatedRows[i].timeAfterTakingMedicine}</td>

                        <td
                          className={styles.Content}
                          onClick={() => {
                            row.fileNameList.map((a, k) => {
                              FilenameListDown(calculatedRows[i].userId, calculatedRows[i].fileNameList[k]);
                            });
                          }}
                        >
                          {Array(calculatedRows[i].fileNameList).join("")}
                        </td>
                      </>
                    ) : (
                      <>
                        {/* Gait */}
                        <td className={styles.ContentEx}>{calculatedRows[i].id}</td>
                        <td className={styles.ContentEx}>{calculatedRows[i].createdAt}</td>
                        <td
                          className={styles.Content}
                          onClick={() => {
                            navigate(`/user/${calculatedRows[i].userId}`, {
                              state: {
                                id: calculatedRows[i].userId,
                              },
                            });
                          }}
                        >
                          {calculatedRows[i].userId}
                        </td>
                        <td className={styles.ContentEx}>{calculatedRows[i].timeAfterTakingMedicine}</td>
                        <td className={styles.ContentEx}>{calculatedRows[i].stride}</td>
                        <td className={styles.ContentEx}>{calculatedRows[i].step}</td>
                        <td className={styles.ContentEx}>{calculatedRows[i].distance}</td>
                        <td className={styles.ContentEx}>{calculatedRows[i].time}</td>

                        <td
                          className={styles.Content}
                          onClick={() => {
                            FilenameDown(calculatedRows[i].userId, calculatedRows[i].fileName);
                          }}
                        >
                          {calculatedRows[i].fileName}
                        </td>
                      </>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {count > 0 ? (
        <Pagination activePage={activePage} count={count} rowsPerPage={rowsPerPage} totalPages={totalPages} setActivePage={setActivePage} />
      ) : (
        <center>{data.length === 0 ? <h3 style={{ marginTop: "3%" }}>데이터를 불러오는 중입니다.</h3> : <h3 style={{ marginTop: "3%" }}>해당하는 검색결과가 없습니다.</h3>}</center>
      )}
    </>
  );
}

export default ExciseList;

function FilenameDown(userId, Name) {
  axios
    .get("/tests/download/" + Number(userId) + "/" + Name, {
      responseType: "blob",
      params: {
        userId: userId,
        fileName: Name,
      },
      headers: {
        contentType: "text/csv",
      },
    })
    .then((response) => {
      console.log("결과 ", response);
      console.log("결과 속 ", response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${Name}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.log(error);
    });
}

function FilenameListDown(userId, NameList) {
  axios
    .get("/tests/download/" + Number(userId) + "/" + NameList, {
      responseType: "blob",
      params: {
        userId: userId,
        fileName: NameList,
      },
      headers: {
        contentType: "video/mp4",
      },
    })
    .then((response) => {
      console.log("파일명22 :" + NameList);

      console.log("결과 ", response);
      console.log("결과 속 ", response.data);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${NameList}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.log(error);
    });
}

// function NavigateUser(userId) {
//   const navigate = useNavigate();
//   navigate(`/user/${userId}`, {
//     state: {
//       id: userId,
//     },
//   });
// }
