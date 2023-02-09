import React from "react";
import styles from "./styles/Search.module.css";
// TableUser로 부터 받아온 Props
function Search({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.elements.filter.value);
  };
  return (
    <>
      {/* 페이지네이션 때문에 해당 페이지에서만 검색되는 이슈 발생 */}
      <form onSubmit={handleSubmit} className={styles.container}>
        <input name="filter" className={styles.input} />
        <button className={styles.btn}>검색하기</button>
        <h6 className={styles.info}>다시 전체목록을 보고 싶으시면 검색창을 비운 후 검색을 눌러주세요.</h6>
      </form>
    </>
  );
}

export default Search;
