/* eslint-disable*/
import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { sortRows, filterRows, paginateRows } from "../lib/utils/helpers";
import Button from "react-bootstrap/Button";
import styles from "./../styles/Test.module.css";
import Pagination from "../components/common/Pagination";
import { getTestsByTypeAndUserId } from "../lib/api/tests";

function ExciseList() {
  const [data, setData] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const ARRAY = [...location.state.ids];
    const promises = ARRAY.map((v, i) =>
      getTestsByTypeAndUserId(location.state.test, location.state.ids[i].id)
    );

    // Promise.all 사용하여 모든 처리가 끝났을 때 넣어줌
    Promise.all(promises)
      .then((responses) => {
        // flatMap 활용하여 모든 응답의 중복구조를 평면화
        const FLAT = responses.flatMap((response) => response.data);
        setData(FLAT);
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
  const [sort, setSort] = useState({ order: "desc", orderBy: "id" });
  // 한 페이지에 보여줄 행의 갯수
  const rowsPerPage = 15;

  // 필터
  // rows와 filters의 값이 바뀔 때만 실행 (첫 계산 제외)
  const filteredRows = useMemo(
    () => filterRows(data, filters),
    [data, filters]
  );

  // 결과 sort
  // filteredRows와 sort의 값이 바뀔 때만 실행 (첫 계산 제외)
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );

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
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const clearAll = () => {
    setSort({ order: "desc", orderBy: "id" });
    setActivePage(1);
    setFilters({
      count: "",
      createdAt: "",
      fileName: "",
      hand: "",
      id: "",
      timeAfterTakingMedicine: "",
      userId: "",
    });
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <>
      <div className={styles.Container}>
        <h5>
          <Link to="/" className={styles.Links}>
            홈
          </Link>
          {" > "}
          <Link to="/Excise" className={styles.Links}>
            운동기록
          </Link>
          {" > "}
          {location.state.name}
        </h5>

        <center className={styles.Title}>전체 {location.state.name} </center>
        <Button onClick={clearAll} className={styles.Btn}>
          필터 초기화
        </Button>
      </div>

      <div>
        <table className={styles.Table}>
          <thead className={styles.theader}>
            <tr>
              {columns.map((column) => {
                return (
                  <th key={column.accessor}>
                    <span>{column.Header}</span>
                    <button onClick={() => handleSort(column.accessor)}>
                      {column.accessor !== sort.orderBy
                        ? "️🔁"
                        : sort.order === "asc"
                        ? "🔼"
                        : "🔽"}
                    </button>
                  </th>
                );
              })}
            </tr>
            <tr>
              {columns.map((column) => {
                return (
                  <th>
                    <input
                      key={`${column.accessor}-search`}
                      type="search"
                      placeholder={`${column.Header} 검색`}
                      value={filters[column.accessor]}
                      onChange={(e) =>
                        handleSearch(e.target.value, column.accessor)
                      }
                    />
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
                    {location.state.test === "finger" ||
                    location.state.test === "screen-gaze" ||
                    location.state.test === "quick-blink" ? (
                      <>
                        {/* Finger, Screen, QuickBlink */}
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].id}
                        </td>
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].createdAt}
                        </td>
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
                        {location.state.test === "finger" ? (
                          <td className={styles.ContentEx}>
                            {calculatedRows[i].hand}
                          </td>
                        ) : (
                          <></>
                        )}
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].count}
                        </td>
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].timeAfterTakingMedicine}분
                        </td>
                        <td
                          className={styles.Content}
                          onClick={() => {
                            // fileName이라 한 개 일 때
                            // 클릭 했을 때 가지고 온 열들에서 fileName이 있다면 이 형식으로 client
                            FilenameDown(
                              calculatedRows[i].userId,
                              calculatedRows[i].fileName
                            );
                          }}
                        >
                          클릭하여 파일 다운로드
                        </td>
                      </>
                    ) : location.state.test === "a-sound" ||
                      location.state.test === "e-sound" ||
                      location.state.test === "dadada" ||
                      location.state.test === "pataka" ? (
                      <>
                        {/* a & e Sound, Dadada, Pataka*/}
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].id}
                        </td>
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].createdAt}
                        </td>
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
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].timeAfterTakingMedicine}분
                        </td>

                        <td
                          className={styles.Content}
                          onClick={() => {
                            row.fileNameList.map((a, k) => {
                              FilenameListDown(
                                calculatedRows[i].userId,
                                calculatedRows[i].fileNameList[k]
                              );
                            });
                          }}
                        >
                          클릭하여 파일 다운로드
                        </td>
                      </>
                    ) : (
                      <>
                        {/* Gait */}
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].id}
                        </td>
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].createdAt}
                        </td>
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
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].timeAfterTakingMedicine}분
                        </td>
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].stride}
                        </td>
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].step}
                        </td>
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].distance}
                        </td>
                        <td className={styles.ContentEx}>
                          {calculatedRows[i].time}분
                        </td>

                        <td
                          className={styles.Content}
                          onClick={() => {
                            FilenameDown(
                              calculatedRows[i].userId,
                              calculatedRows[i].fileName
                            );
                          }}
                        >
                          클릭
                        </td>
                      </>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
        {console.log(location.state)}
      </div>
    </>
  );
}

export default ExciseList;

function FilenameDown(userId, Name) {
  client
    .get("/tests/download/" + Number(userId) + "/" + Name, {
      responseType: "blob",
      params: {
        userId: userId,
        fileName: Name,
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
  client
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
      console.log("결과 ", response);

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
