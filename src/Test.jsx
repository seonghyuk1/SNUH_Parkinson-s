/* eslint-disable*/
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Table from "./TableTest";
import Pagination from "./Pagination";
import styles from "./styles/Test.module.css";

export default function Test_F_QB_SG() {
  let location = useLocation();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
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
        const sortData = response.data.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });

        setData(sortData);
      })
      .catch((error) => {});
  }, []);

  {
    /* 

finger : id, count, timeAfterTakingMedicine, fileName, createdAt, userId
screen-gaze : id, count, timeAfterTakingMedicine, fileName, createdAt, userId
quick-blink : id, count, timeAfterTakingMedicine, fileName, createdAt, userId


gait : id, "stride, step, distance, time", timeAfterTakingMedicine, fileName, createdAt, userId

a-sound : id, timeAfterTakingMedicine, fileNameList[], createdAt, userId
e-sound : id, timeAfterTakingMedicine, fileNameList[], createdAt, userId
dadada : id, timeAfterTakingMedicine, fileNameList[], createdAt, userId
pataka : id, timeAfterTakingMedicine, fileNameList[], createdAt, userId

*/
  }

  const columns = useMemo(
    () => [
      {
        accessor: "id",
        Header: "검사 id",
      },
      {
        accessor: "createdAt",
        Header: "생성시간",
      },

      location.state.count
        ? {
            accessor: "count",
            Header: "count",
          }
        : {
            accessor: "a",
            Header: "",
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
      {
        accessor: "userId",
        Header: "검사자 id",
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

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  return (
    <>
      <div className={styles.Title}>
        {location.state.name} - {location.state.testName}
      </div>
      <Table columns={columns} data={currentPosts(data)} testName="fingerTest" userId={location.state.id} />
    </>
  );
}
