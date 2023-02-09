/* eslint-disable*/
import { useNavigate, Link } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table"; // 리액트 테이블
import Search from "./Search";
import styles from "./styles/Table.module.css";

function Table({ columns, data }) {
  let navigate = useNavigate();

  // Props로 받아온 colums와 data 객체를 매개변수로 넘기면 테이블을 마크업할 때 사용할 수 있는 다양한 함수와 배열을 반환해줌
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <>
      {/* getTableProps와 getTableBodyProps 함수는 각각 table과 tbody 엘리먼트에 적용해줘야할 prop를 제공 */}
      {/* headerGroups 배열은 thead부분에서 렌더링을 해야하는 데이터를 담음 */}
      {/* rows 배열은 tbody부분에서 렌더링 해야하는 데이터를 담음  */}
      {/* prepareRow 함수는 렌더링할 데이터를 준비해주는 유틸리티 함수  */}
      <div className={styles.Container}>
        <Search onSubmit={setGlobalFilter} />
        <table {...getTableProps()} className={styles.Table}>
          <thead style={{ backgroundColor: "#122389", color: "white", fontSize: "15px" }}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.Head}>
                    {column.render("Header")}
                    <span>{column.isSorted && (column.isSortedDesc ? "⬇︎" : "⬆︎")}</span>
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
                      className={styles.Content}
                      onClick={() => {
                        navigate("/user/" + (i + 1), {
                          state: {
                            name: row.original.name,
                            id: row.original.id,
                          },
                        });
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
      </div>
    </>
  );
}

export default Table;
