import { useNavigate, Link } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import styles from "./styles/Table.module.css";

function Table({ columns, data }) {
  let navigate = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <>
      <div className={styles.Container}>
        <table {...getTableProps()} className={styles.Table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={styles.Head}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ⬇︎"
                          : " ⬆︎"
                        : ""}
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
