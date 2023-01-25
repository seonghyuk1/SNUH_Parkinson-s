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
        setData(response.data);
        console.log(response.data.length);
      })
      .catch((error) => {});
  }, []);

  const columns = useMemo(
    () => [
      {
        accessor: "id",
        Header: "id",
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

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  return (
    <div className={styles.Container}>
      <div className={styles.Title}>전체 명단</div>
      <Table columns={columns} data={currentPosts(data)} />
      <Pagination
        className={styles.paging}
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
}

export default App;
