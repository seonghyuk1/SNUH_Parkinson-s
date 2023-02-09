/* eslint-disable*/
import styles from "./styles/App.module.css";
import axios from "axios";
import Table from "./TableUser";
import React, { useEffect, useState, useMemo } from "react";
import Pagination from "./Pagination";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  useEffect(() => {
    axios
      .get("/users", {
        params: {},
        headers: {},
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setData(response.data);
        console.log(response.data.length);
      })
      .catch((error) => {});
  }, []);

  const columns = useMemo(
    () => [
      {
        accessor: "id", // 객체의 어느 속성을 읽어야하는지
        Header: "id", // 테이블 헤더에 보여줄 텍스트
      },
      {
        accessor: "name",
        Header: "이름",
      },
      {
        accessor: "birthdate",
        Header: "생년월일",
      },
      {
        accessor: "gender",
        Header: "성별",
      },
      {
        accessor: "diagnosis",
        Header: "진단년도",
      },
    ],
    []
  );

  const indexOfLast = currentPage * postsPerPage; // 5
  const indexOfFirst = indexOfLast - postsPerPage; // 5 - 5

  const currentPosts = (posts) => {
    let currentPosts;
    // 현재 페이지에 들어갈 갯수
    currentPosts = posts.slice(indexOfFirst, indexOfLast); // 0, 5
    return currentPosts;
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>전체 명단</div>
        <Table columns={columns} data={currentPosts(data)} />
        <Pagination className={styles.paging} postsPerPage={postsPerPage} totalPosts={data.length} paginate={setCurrentPage} currentPage={currentPage}></Pagination>
      </div>
    </>
  );
}

export default App;
