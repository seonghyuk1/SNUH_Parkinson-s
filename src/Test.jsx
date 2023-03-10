/* eslint-disable*/
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/Test.module.css";
import { sortRows, filterRows, paginateRows } from "./helpers";
import Pagination from "./Pagination";
import Button from "react-bootstrap/Button";

export default function Test() {
  let location = useLocation();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("로케", location.state);
    console.log("헤드", location.state.colHead);

    axios
      .get("/tests/" + location.state.test, {
        params: {
          userId: location.state.id,
          size: 1000,
        },
        headers: {},
      })
      .then((response) => {
        console.log(response);

        setData(response.data);
      })
      .catch((error) => {});
  }, []);

  {
    /* 
finger : id, count, timeAfterTakingMedicine, fileName, createdAt, userId
screen-gaze : id, count, timeAfterTakingMedicine, fileName, createdAt, userId
quick-blink : id, count, timeAfterTakingMedicine, fileName, createdAt, userId

gait : id, "stride, step, distance, time", timeAfterTakingMedicine, fileName, createdAt, userId

a-sound : id, timeAfterTakingMedicine, fileNameList[], createdAt, userId
e-sound : id, timeAfterTakingMedicine, fileNameList[], createdAt, userId
dadada : id, timeAfterTakingMedicine, fileNameList[], createdAt, userId
pataka : id, timeAfterTakingMedicine, fileNameList[], createdAt, userId
*/
  }

  // 스프레드 문법을 통해 받아온 객체를 리스트 안에
  const columns = useMemo(() => [...location.state.colHead], []);

  // const navigate = useNavigate();

  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});

  const [sort, setSort] = useState({ order: "desc", orderBy: "id" });

  const rowsPerPage = 15;

  const filteredRows = useMemo(() => filterRows(data, filters), [data, filters]);
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort]);
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;

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
    setSort({ order: "desc", orderBy: "id" });
    setActivePage(1);
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
          <Link to="/Table" className={styles.Links}>
            전체 사용자 명단
          </Link>
          {" > "}
          <Link to={`/user/ + ${location.state.id}`} state={{ id: location.state.id, name: location.state.name }} className={styles.Links}>
            {location.state.name ? location.state.name : `${location.state.id}번 검사자`}
          </Link>
          {" > "}
          {location.state.testName}
        </h5>

        <div className={styles.Title}>
          {location.state.name ? `${location.state.name}님의` : `${location.state.id}번 검사자`} {location.state.testName}{" "}
        </div>
        <Button onClick={clearAll} className={styles.Btn}>
          필터 초기화
        </Button>
      </div>

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

        {/* 바디 */}
        <tbody>
          {console.log(calculatedRows)}

          {calculatedRows.map((row, i) => {
            return (
              <tr key={row.id}>
                {/* Finger, Screen, QuickBlink */}
                {location.state.colHead.length == 6 ? (
                  <>
                    <td className={styles.ContentEx}>{calculatedRows[i].id}</td>
                    <td className={styles.ContentEx}>{calculatedRows[i].createdAt}</td>
                    <td
                      className={styles.Content}
                      onClick={() => {
                        navigate(`/user/${calculatedRows[i].userId}`, {
                          state: {
                            id: calculatedRows[i].userId,
                            name: location.state.name,
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
                            name: location.state.name,
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
                            name: location.state.name,
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
            );
          })}
        </tbody>
      </table>
      {count > 0 ? <Pagination activePage={activePage} count={count} rowsPerPage={rowsPerPage} totalPages={totalPages} setActivePage={setActivePage} /> : <center>{<h3 style={{ marginTop: "3%" }}>해당하는 검색결과가 없습니다.</h3>}</center>}
    </>
  );
}

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
