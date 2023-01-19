import styles from "./styles/App.module.css";
import axios from "axios";
import Table from "./TableUser";
import React, { useEffect, useState, useMemo } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/users", {
        params: {},
        headers: {},
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
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
  return (
    <div className={styles.Container}>
      <div className={styles.Title}>전체 명단</div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
