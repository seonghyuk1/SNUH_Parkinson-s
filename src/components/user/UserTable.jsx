import styles from "./../../styles/Table.module.css";
import { useNavigate } from "react-router-dom";

const UserTable = ({
  data,
  heads,
  handleSort,
  sort,
  handleSearch,
  filters,
}) => {
  const navigate = useNavigate();
  return (
    <table className={styles.Table}>
      <thead className={styles.theader}>
        <tr>
          {heads.map((column) => {
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
                <button onClick={() => handleSort(column.accessor)}>
                  {sortIcon()}
                </button>
              </th>
            );
          })}
        </tr>
        <tr>
          {heads.map((column) => {
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
      <tbody>
        {data.map((row, i) => {
          return (
            <tr className={styles.Content} key={row.id}>
              {heads.map((column) => {
                return (
                  <td
                    key={column.accessor}
                    onClick={() => {
                      navigate("/user/" + (i + 1), {
                        state: {
                          name: row.name,
                          id: row.id,
                        },
                      });
                    }}
                  >
                    {row[column.accessor]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
