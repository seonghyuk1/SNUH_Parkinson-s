import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import styles from "./styles/Table.module.css";

function Table({ columns, data, testName, userId }) {
  let navigate = useNavigate();
  let str = "test한글";
  let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <table {...getTableProps()} className={styles.Table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.Header !== "" ? styles.Header : styles.HeaderNone
                }
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " ⬇︎" : " ⬆︎") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className={
                    cell.column.Header !== ""
                      ? styles.Content
                      : styles.ContentNone
                  }
                  onClick={() => {
                    if (cell.column.id == "fileName") {
                      axios
                        .get(
                          "/tests/download/" +
                            Number(userId) +
                            "/" +
                            cell.row.original.fileName,
                          {
                            params: {
                              userId: userId,
                              fileName: cell.row.original.fileName,
                            },
                            headers: {
                              contentType: "text/csv",
                            },
                          }
                        )
                        .then((response) => {
                          console.log(response);
                          const url = window.URL.createObjectURL(
                            new Blob([response.data])
                          );
                          const link = document.createElement("a");
                          link.href = url;
                          link.setAttribute(
                            "download",
                            `${cell.row.original.fileName}.csv`
                          );
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                    if (cell.column.id == "fileNameList") {
                      cell.row.original.fileNameList.map((a, i) => {
                        axios
                          .get(
                            "/tests/download/" +
                              Number(userId) +
                              "/" +
                              cell.row.original.fileNameList[i],
                            {
                              params: {
                                userId: userId,
                                fileName: cell.row.original.fileNameList[i],
                              },
                              headers: {
                                contentType: "vedio/mp4",
                              },
                            }
                          )
                          .then((response) => {
                            console.log(response);
                            const url = window.URL.createObjectURL(
                              new Blob([response.data])
                            );
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute(
                              "download",
                              `${cell.row.original.fileNameList[i]}.mp4`
                            );
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      });
                    }
                    console.log(cell.Header);
                  }}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
