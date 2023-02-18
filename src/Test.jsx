/* eslint-disable*/
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles/Test.module.css";
import { sortRows, filterRows, paginateRows } from "./helpers";
import Pagination from "./Pagination";
import Button from "react-bootstrap/Button";

export default function Test() {
  let location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(location.state);
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

  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });

  const rowsPerPage = 5;

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
    setSort({ order: "asc", orderBy: "id" });
    setActivePage(1);
    setFilters({});
  };

  return (
    <>
      <div className={styles.Title}>
        {location.state.name} - {location.state.testName}
      </div>
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

        {/* 바디 */}
        <tbody>
          {console.log(calculatedRows)}

          {calculatedRows.map((row, i) => {
            // {
            //   console.log("쿨", calculatedRows[i]);
            // }
            return (
              <tr key={row.id}>
                {/* {console.log(columns[columns.length - 1].accessor)} */}
                {/* {console.log(columns[columns.length - 1])} */}

                {columns.map((column) => {
                  // {
                  //   console.log("콜", row[column.accessor]);
                  // }

                  // {
                  //   console.log("콜2", row.fileNameList);
                  // }

                  // {
                  //   console.log("콜2", i);
                  // }

                  return (
                    <>
                      <td
                        className={styles.Content}
                        key={column.accessor}
                        onClick={() => {
                          // fileName이라 한 개 일 때
                          if (columns[columns.length - 1].accessor == "fileName") {
                            axios
                              .get("/tests/download/" + Number(location.state.id) + "/" + calculatedRows[i].fileName, {
                                params: {
                                  userId: location.state.id,
                                  fileName: calculatedRows[i].fileName,
                                },
                                headers: {
                                  contentType: "text/csv",
                                },
                              })
                              .then((response) => {
                                console.log("결과 ", response);
                                console.log("결과2 ", response.data);
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
                              console.log("파일명 : ", calculatedRows[i].fileNameList[k]);
                              axios
                                .get("/tests/download/" + Number(location.state.id) + "/" + calculatedRows[i].fileNameList[k], {
                                  params: {
                                    userId: location.state.id,
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
                        {row[column.accessor]}
                      </td>
                    </>
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
        <center>
          <h3>해당하는 검색결과가 없습니다.</h3>
        </center>
      )}
      <div>
        <center>
          <Button className={styles.Btn} variant="none" onClick={clearAll}>
            필터 초기화
          </Button>
        </center>
      </div>
    </>
  );
}

// {calculatedRows.map((row, i) => {
//   // prepareRow(row);
//   // console.log(row.cells[row.cells.length - 1].value);

//   return (
//     <>
//       <tr key={i}>
//         {columns.map((cell) => (
//           <>
//             {/* {i == 9 && console.log(cell.value)} */}
//             return(

//             )
//             <td

//               className={cell.column.Header !== "" ? styles.Content : styles.ContentNone}
//               onClick={() => {
//                 // fileName이라 한 개 일 때
//                 if (cell.column.id == "fileName") {
//                   axios
//                     .get("/tests/download/" + Number(userId) + "/" + cell.row.original.fileName, {
//                       params: {
//                         userId: userId,
//                         fileName: cell.row.original.fileName,
//                       },
//                       headers: {
//                         contentType: "text/csv",
//                       },
//                     })
//                     .then((response) => {
//                       console.log(response);
//                       const url = window.URL.createObjectURL(new Blob([response.data]));
//                       const link = document.createElement("a");
//                       link.href = url;
//                       link.setAttribute("download", `${cell.row.original.fileName}.csv`);
//                       document.body.appendChild(link);
//                       link.click();
//                       document.body.removeChild(link);
//                     })
//                     .catch((error) => {
//                       console.log(error);
//                     });
//                 }

//                 // fileNameList여서 여러개 일 때
//                 if (cell.column.id == "fileNameList") {
//                   cell.row.original.fileNameList.map((a, i) => {
//                     axios
//                       .get("/tests/download/" + Number(userId) + "/" + cell.row.original.fileNameList[i], {
//                         params: {
//                           userId: userId,
//                           fileName: cell.row.original.fileNameList[i],
//                         },
//                         headers: {
//                           contentType: "vedio/mp4",
//                         },
//                       })
//                       .then((response) => {
//                         console.log("결과 ", response);
//                         const url = window.URL.createObjectURL(new Blob([response.data]));
//                         const link = document.createElement("a");
//                         link.href = url;
//                         link.setAttribute("download", `${cell.row.original.fileNameList[i]}.mp4`);
//                         document.body.appendChild(link);
//                         link.click();
//                         document.body.removeChild(link);
//                       })
//                       .catch((error) => {
//                         console.log(error);
//                       });
//                   });
//                 }
//                 console.log(cell.Header);
//               }}
//             >
//               {cell.render("Cell")}
//             </td>
//           </>
//         ))}
//         {/* {fileList && fileLists.map((i) => <td className={styles.Content}>{fileLists[i]}</td>)} */}
//         {/* {fileList && <td className={styles.Content}>{fileLists[0]}</td>} */}
//       </tr>
//     </>
//   );
// })}
