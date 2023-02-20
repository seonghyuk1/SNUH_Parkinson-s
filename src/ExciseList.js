/* eslint-disable*/
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

  console.log("데데", data);
  console.log("체크", checkList);

  console.log(typeof checkList);

  // 현재 페이지
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  // sorting 기본 : 오름차순, id 기준
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
  // 한 페이지에 보여줄 행의 갯수
  const rowsPerPage = 5;

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

      <center className={styles.Title}>전체 {location.state.test} Test 데이터</center>
      <div>
        <center>
          <Button variant="none" onClick={clearAll} className={styles.Btn}>
            필터 초기화
          </Button>
        </center>
      </div>

      {/* 아무래도 체크박스보단 검색형식이 나을듯 
      <Button
        className={styles.Btn}
        onClick={() => {
          setModal(!modal);
        }}
      >
        테스트
      </Button>
      <div>
        {modal &&
          checkList.map((item) => {
            return (
              <div key={item.id} style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  // 이때 value값으로 data를 지정해준다.
                  value={item.id}
                  // onChange이벤트가 발생하면 check여부와 value(data)값을 전달하여 배열에 data를 넣어준다.
                  // 3️⃣ 체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
                />
                <div>{item.id}</div>

                <input type="checkbox" value={item.count} />
                <div>{item.count}</div>

                <input type="checkbox" value={item.timeAfterTakingMedicine} />
                <div>{item.timeAfterTakingMedicine}</div>
              </div>
            );
          })}
      </div>
        */}

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

        <tbody>
          {/* 내용물 */}
          {calculatedRows.map((row, i) => {
            return (
              <tr key={row.id}>
                {columns.map((column) => {
                  // console.log("칼", calculatedRows);
                  // console.log("콜", columns);

                  return (
                    <td
                      className={styles.Content}
                      key={column.accessor}
                      onClick={() => {
                        // fileName이라 한 개 일 때
                        if (columns[columns.length - 1].accessor == "fileName") {
                          axios
                            .get("/tests/download/" + Number(calculatedRows[i].userId) + "/" + calculatedRows[i].fileName, {
                              responseType: "blob",
                              params: {
                                userId: calculatedRows[i].userId,
                                fileName: calculatedRows[i].fileName,
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
                              link.setAttribute("download", `${calculatedRows[i].fileName}`);
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }

                        // fileNameList여서 여러개 일 때
                        if (columns[columns.length - 1].accessor == "fileNameList") {
                          row.fileNameList.map((a, k) => {
                            console.log("파일명 :" + calculatedRows[i].fileNameList[k]);

                            axios
                              .get("/tests/download/" + Number(calculatedRows[i].userId) + "/" + calculatedRows[i].fileNameList[k], {
                                responseType: "blob",
                                params: {
                                  userId: calculatedRows[i].userId,
                                  fileName: calculatedRows[i].fileNameList[k],
                                },
                                headers: {
                                  contentType: "video/mp4",
                                },
                              })
                              .then((response) => {
                                console.log("파일명22 :" + calculatedRows[i].fileNameList[k]);

                                console.log("결과 ", response);
                                console.log("결과2 ", response.data);

                                const url = window.URL.createObjectURL(new Blob([response.data]));
                                const link = document.createElement("a");
                                link.href = url;
                                link.setAttribute("download", `${calculatedRows[i].fileNameList[k]}`);
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          });
                        }
                      }}
                    >
                      {column.accessor == "fileNameList" ? Array(row[column.accessor].join(",ㅤ")) : row[column.accessor]}
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
