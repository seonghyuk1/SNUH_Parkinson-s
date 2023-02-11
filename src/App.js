/* eslint-disable*/
import styles from "./styles/App.module.css";
import axios from "axios";
// import Table from "./Table";
import { Table } from "./Table";

import React, { useEffect, useState, useMemo } from "react";

function App() {
  const [Rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("/users", {
        // 파라미터 전달로 최대 1,000개 받아옴
        params: { size: 1000 },
        headers: {},
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);

        setRows(response.data);
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

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>전체 명단</div>
        <Table rows={Rows} columns={columns} />
      </div>
    </>
  );
}

export default App;
