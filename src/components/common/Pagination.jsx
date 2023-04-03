import styles from "./../../styles/App.module.css";

function Pagination({ pageInfo, setPage }) {
  const { page, size, totalElements, totalPages } = pageInfo;
  const beginning = page === 0 ? 0 : size * page;
  const end = page === totalPages ? totalElements : beginning + size;

  return (
    <>
      <div className={styles.Container}>
        <button
          disabled={page === 0}
          onClick={() => setPage(0)}
          className={styles.pagelink}
        >
          ⏮️ 처음
        </button>
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className={styles.pagelink}
        >
          ⬅️ 이전
        </button>
        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
          className={styles.pagelink}
        >
          다음 ➡️
        </button>
        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage(totalPages - 1)}
          className={styles.pagelink}
        >
          마지막 ⏭️
        </button>

        <h6 className={styles.forMargin}>
          총 {totalElements}개 중{" "}
          {beginning === end ? end : `${beginning} - ${end}`}개
        </h6>
        <h6>
          {totalPages} 페이지 중 {page + 1} 페이지
        </h6>
      </div>
    </>
  );
}

export default Pagination;
