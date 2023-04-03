import { useNavigate } from "react-router-dom";
import styles from "./../../styles/Test.module.css";
import { downloadTestFileByUserIdAndFilename } from "./../../lib/api/tests";

const TestTable = ({
  data,
  name,
  heads,
  handleSort,
  sort,
  handleSearch,
  filters,
}) => {
  const navigate = useNavigate();
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  });
  const getFormattedDate = (date) => {
    const formattedDateTime = formatter.format(date);
    const [year, month, day, timeStr] = formattedDateTime.split(" ");

    return (
      <>
        <span>
          {year.slice(0, -1)}년 {month.slice(0, -1)}월 {day.slice(0, -1)}일
        </span>
        <span>{timeStr}</span>
      </>
    );
  };

  return (
    <table className={styles.Table}>
      <thead className={styles.theader}>
        <tr>
          {heads.map((column) => {
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
        {data.map((row) => {
          return (
            <tr key={row.id}>
              {"id" in row && <td className={styles.ContentEx}>{row.id}</td>}
              {"createdAt" in row && (
                <td className={styles.ContentEx}>
                  <div
                    style={{
                      display: "grid",
                    }}
                  >
                    {getFormattedDate(new Date(row.createdAt))}
                  </div>
                </td>
              )}
              {"userId" in row && (
                <td
                  className={styles.Content}
                  onClick={() => {
                    navigate(`/user/${row.userId}`, {
                      state: {
                        id: row?.userId,
                        name: name,
                      },
                    });
                  }}
                >
                  {row.userId}
                </td>
              )}
              {"hand" in row && (
                <td className={styles.ContentEx}>{row.hand}</td>
              )}
              {"count" in row && (
                <td className={styles.ContentEx}>{row.count}</td>
              )}
              {"timeAfterTakingMedicine" in row && (
                <td className={styles.ContentEx}>
                  {row.timeAfterTakingMedicine} 분
                </td>
              )}
              {"stride" in row && (
                <td className={styles.ContentEx}>
                  {(row.stride * 100).toFixed(1)} cm
                </td>
              )}
              {"step" in row && (
                <td className={styles.ContentEx}>{row.step}</td>
              )}
              {"distance" in row && (
                <td className={styles.ContentEx}>{row.distance} m</td>
              )}
              {"time" in row && (
                <td className={styles.ContentEx}>{row.time} 분</td>
              )}
              {row?.userId && row?.fileName && (
                <td
                  className={styles.Content}
                  onClick={() =>
                    downloadTestFileByUserIdAndFilename(
                      row.userId,
                      row.fileName
                    )
                  }
                >
                  다운로드
                </td>
              )}
              {row?.userId && row?.fileNameList && (
                <td
                  className={styles.Content}
                  onClick={() => {
                    row.fileNameList.foreach((filename, j) =>
                      downloadTestFileByUserIdAndFilename(row.userId, filename)
                    );
                  }}
                >
                  다운로드
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TestTable;
