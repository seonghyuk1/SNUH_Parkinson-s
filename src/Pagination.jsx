/* eslint-disable */
import styles from "./styles/App.module.css";

function Pagination({ activePage, count, rowsPerPage, totalPages, setActivePage }) {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className={styles.Container}>
        <button disabled={activePage === 1} onClick={() => setActivePage(1)} className={styles.pagelink}>
          ⏮️ 처음
        </button>
        <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)} className={styles.pagelink}>
          ⬅️ 이전
        </button>
        <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)} className={styles.pagelink}>
          다음 ➡️
        </button>
        <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)} className={styles.pagelink}>
          마지막 ⏭️
        </button>
        <p>
          쪽 : {activePage} of {totalPages}
        </p>
        <p>
          행 : {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
      </div>
    </>
  );
}
export default Pagination;
