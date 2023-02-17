// /* eslint-disable*/
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useTable, useGlobalFilter, useSortBy } from "react-table";
// import Pagination from "./Pagination";
// import { useState, useMemo, useEffect } from "react";
// import Search from "./Search";
// import styles from "./styles/Table.module.css";

// import { sortRows, filterRows, paginateRows } from "./helpers";

// function TableTest({ columns, data }) {
//   // let navigate = useNavigate();
//   // let str = "test한글";
//   // let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

//   // *****
//   // const location = useLocation();
//   // const userId = location.state.id;
//   // const fileList = location.state.sound;
//   // const [fileLists, setFilelists] = useState([]);
//   // *****

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable({ columns, data }, useGlobalFilter, useSortBy);

//   const navigate = useNavigate();

//   const [activePage, setActivePage] = useState(1);
//   const [filters, setFilters] = useState({});

//   const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
//   const rowsPerPage = 5;

//   const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters]);
//   const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort]);
//   const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

//   const count = filteredRows.length;

//   const totalPages = Math.ceil(count / rowsPerPage);

//   // useEffect(() => {
//   //   // headerGroups.push("d");
//   //   // console.log(fileList);
//   //   console.log(location.state.test);
//   //   location.state.sound && headerGroups[0].headers.push({ Header: "파일 다운로드" });
//   //   fileList &&
//   //     axios
//   //       .get("/tests/" + location.state.test, {
//   //         params: {
//   //           userId: location.state.id,
//   //         },
//   //         headers: {},
//   //       })
//   //       .then((res) => {
//   //         console.log("결과", res.data);
//   //         setFilelists(...res.data);
//   //       });
//   // }, []);

//   const handleSearch = (value, accessor) => {
//     setActivePage(1);

//     if (value) {
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         [accessor]: value,
//       }));
//     } else {
//       setFilters((prevFilters) => {
//         const updatedFilters = { ...prevFilters };
//         delete updatedFilters[accessor];

//         return updatedFilters;
//       });
//     }
//   };

//   const handleSort = (accessor) => {
//     setActivePage(1);
//     setSort((prevSort) => ({
//       order: prevSort.order === "asc" && prevSort.orderBy === accessor ? "desc" : "asc",
//       orderBy: accessor,
//     }));
//   };

//   const clearAll = () => {
//     setSort({ order: "asc", orderBy: "id" });
//     setActivePage(1);
//     setFilters({});
//   };

//   return (
//     <>
//       <Search onSubmit={setGlobalFilter} />
//       {/* 헤더 */}
//       <table {...getTableProps()} className={styles.Table}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())} className={column.Header !== "" ? styles.Header : styles.HeaderNone}>
//                   {column.render("Header")}
//                   <span>{column.isSorted ? (column.isSortedDesc ? " ⬇︎" : " ⬆︎") : ""}</span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         {/* 바디 */}
//         <tbody {...getTableBodyProps()}>
//           {calculatedRows.map((row, i) => {
//             prepareRow(row);
//             // console.log(row.cells[row.cells.length - 1].value);

//             return (
//               <>
//                 <tr {...row.getRowProps()} key={i}>
//                   {row.cells.map((cell) => (
//                     <>
//                       {/* {i == 9 && console.log(cell.value)} */}
//                       <td
//                         {...cell.getCellProps()}
//                         className={cell.column.Header !== "" ? styles.Content : styles.ContentNone}
//                         onClick={() => {
//                           // fileName이라 한 개 일 때
//                           if (cell.column.id == "fileName") {
//                             axios
//                               .get("/tests/download/" + Number(userId) + "/" + cell.row.original.fileName, {
//                                 params: {
//                                   userId: userId,
//                                   fileName: cell.row.original.fileName,
//                                 },
//                                 headers: {
//                                   contentType: "text/csv",
//                                 },
//                               })
//                               .then((response) => {
//                                 console.log(response);
//                                 const url = window.URL.createObjectURL(new Blob([response.data]));
//                                 const link = document.createElement("a");
//                                 link.href = url;
//                                 link.setAttribute("download", `${cell.row.original.fileName}.csv`);
//                                 document.body.appendChild(link);
//                                 link.click();
//                                 document.body.removeChild(link);
//                               })
//                               .catch((error) => {
//                                 console.log(error);
//                               });
//                           }

//                           // fileNameList여서 여러개 일 때
//                           if (cell.column.id == "fileNameList") {
//                             cell.row.original.fileNameList.map((a, i) => {
//                               axios
//                                 .get("/tests/download/" + Number(userId) + "/" + cell.row.original.fileNameList[i], {
//                                   params: {
//                                     userId: userId,
//                                     fileName: cell.row.original.fileNameList[i],
//                                   },
//                                   headers: {
//                                     contentType: "vedio/mp4",
//                                   },
//                                 })
//                                 .then((response) => {
//                                   console.log("결과 ", response);
//                                   const url = window.URL.createObjectURL(new Blob([response.data]));
//                                   const link = document.createElement("a");
//                                   link.href = url;
//                                   link.setAttribute("download", `${cell.row.original.fileNameList[i]}.mp4`);
//                                   document.body.appendChild(link);
//                                   link.click();
//                                   document.body.removeChild(link);
//                                 })
//                                 .catch((error) => {
//                                   console.log(error);
//                                 });
//                             });
//                           }
//                           console.log(cell.Header);
//                         }}
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     </>
//                   ))}
//                   {/* {fileList && fileLists.map((i) => <td className={styles.Content}>{fileLists[i]}</td>)} */}
//                   {/* {fileList && <td className={styles.Content}>{fileLists[0]}</td>} */}
//                 </tr>
//               </>
//             );
//           })}
//         </tbody>
//       </table>
//       {count > 0 ? <Pagination activePage={activePage} count={count} rowsPerPage={rowsPerPage} totalPages={totalPages} setActivePage={setActivePage} /> : <p>No data found</p>}
//     </>
//   );
// }

// export default TableTest;
