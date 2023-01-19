import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Table from "./TableTest";

export default function Test_F_QB_SG() {
  let location = useLocation();
  const [data, setData] = useState([]);
  console.log(location.state.test);
  useEffect(() => {
    axios
      .get("/tests/" + location.state.test, {
        params: {
          userId: location.state.id,
        },
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
      location.state.test == "finger"
        ? {
            accessor: "count",
            Header: "count",
          }
        : {
            accessor: "a",
            Header: "",
          },
      {
        accessor: "createdAt",
        Header: "생성시간",
      },
      {
        accessor: "timeAfterTakingMedicine",
        Header: "약복용후 지난시간",
      },

      location.state.test == "gait"
        ? {
            accessor: "stride",
            Header: "보폭",
          }
        : {
            accessor: "aa",
            Header: "",
          },
      location.state.test == "gait"
        ? {
            accessor: "step",
            Header: "발걸음 수",
          }
        : {
            accessor: "aaa",
            Header: "",
          },
      location.state.test == "gait"
        ? {
            accessor: "distance",
            Header: "걸은거리",
          }
        : {
            accessor: "aaaa",
            Header: "",
          },
      location.state.test == "gait"
        ? {
            accessor: "time",
            Header: "걸은시간(분)",
          }
        : {
            accessor: "aaaaa",
            Header: "",
          },
      location.state.sound
        ? {
            accessor: "fileNameList",
            Header: "파일 다운로드",
          }
        : {
            accessor: "fileName",
            Header: "파일 다운로드",
          },
    ],
    []
  );
  return (
    <>
      <div>
        {location.state.name} - {location.state.testName}
      </div>
      <Table
        columns={columns}
        data={data}
        testName="fingerTest"
        userId={location.state.id}
      />
    </>
  );
}
