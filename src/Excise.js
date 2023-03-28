/* eslint-disable*/
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./styles/Excise.module.css";
import client from "./client";

function Excise() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    !token && navigate("/");
  }, []);

  client.defaults.withCredentials = true;
  useEffect(() => {
    client
      .get(process.env.REACT_APP_DB_HOST + "/users", {
        params: { size: 1000 },
        headers: {},
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);

        setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={styles.Container_navi}>
        <h5>
          <Link to="/" className={styles.Links}>
            홈
          </Link>
          {" > "}운동기록
        </h5>
      </div>

      <div className={styles.Container}>
        <div>
          <span className={styles.Name}>운동 기록</span>
        </div>
      </div>

      <div className="d-grid">
        <Button
          className={styles.Btn}
          size="ml"
          onClick={() => {
            navigate("/fingerTest_Records", {
              state: {
                test: "finger",
                name: "손가락 검사 데이터",
                colHead: Finger,
                ids: rows,
              },
            });
          }}
        >
          손가락 검사 데이터
        </Button>

        <Button
          className={styles.Btn}
          size="ml"
          onClick={() => {
            navigate("/aSoundTest_Records", {
              state: {
                test: "a-sound",
                name: "소리 검사 (지속발성 'A') 데이터",
                colHead: Sound_Dadada_Pataka,
                ids: rows,
              },
            });
          }}
        >
          소리 검사 (지속발성 'A') 데이터
        </Button>

        <Button
          className={styles.Btn}
          size="ml"
          onClick={() => {
            navigate("/eSoundTest_Records", {
              state: {
                test: "e-sound",
                name: "소리 검사 (지속발성 'E') 데이터",
                colHead: Sound_Dadada_Pataka,
                ids: rows,
              },
            });
          }}
        >
          소리 검사 (지속발성 'E') 데이터
        </Button>

        <Button
          className={styles.Btn}
          size="ml"
          onClick={() => {
            navigate("/dadadaTest_Records", {
              state: {
                test: "dadada",
                name: "소리 검사 (반복발성 '다') 데이터",
                colHead: Sound_Dadada_Pataka,
                ids: rows,
              },
            });
          }}
        >
          소리 검사 (반복발성 '다') 데이터
        </Button>
        <Button
          className={styles.Btn}
          size="ml"
          onClick={() => {
            navigate("/patakaTest_Records", {
              state: {
                test: "pataka",
                name: "소리 검사 (반복발성 '파, 타, 카') 데이터",
                colHead: Sound_Dadada_Pataka,
                ids: rows,
              },
            });
          }}
        >
          소리 검사 (반복발성 '파, 타, 카') 데이터
        </Button>
        <Button
          className={styles.Btn}
          size="ml"
          onClick={() => {
            navigate("/screenGazeTest_Records", {
              state: {
                test: "screen-gaze",
                name: "눈 검사 (화면주시) 데이터",
                colHead: Screengze_Quickblink,
                ids: rows,
              },
            });
          }}
        >
          눈 검사 (화면주시) 데이터
        </Button>

        <Button
          className={styles.Btn}
          size="ml"
          onClick={() => {
            navigate("/quickBlinkTest_Records", {
              state: {
                test: "quick-blink",
                name: "눈 검사 (빠른 깜빡임) 데이터",
                colHead: Screengze_Quickblink,
                ids: rows,
              },
            });
          }}
        >
          눈 검사 (빠른 깜빡임) 데이터
        </Button>

        <Button
          className={styles.Btn}
          size="ml"
          onClick={() => {
            navigate("/gaitTest_Records", {
              state: {
                test: "gait",
                name: "걸음 검사 데이터",
                colHead: Gait,
                ids: rows,
              },
            });
          }}
        >
          걸음 검사 데이터
        </Button>
      </div>
    </>
  );
}

export default Excise;

const Screengze_Quickblink = [
  {
    accessor: "id",
    Header: "검사 번호",
  },
  {
    accessor: "createdAt",
    Header: "생성시간",
  },
  {
    accessor: "userId",
    Header: "검사자 ID",
  },

  {
    accessor: "count",
    Header: "눈 깜빡임 횟수",
  },

  {
    accessor: "timeAfterTakingMedicine",
    Header: "약복용후 지난시간",
  },
  {
    accessor: "fileName",
    Header: "파일 다운로드",
  },
];
const Sound_Dadada_Pataka = [
  {
    accessor: "id",
    Header: "검사 번호",
  },
  {
    accessor: "createdAt",
    Header: "생성시간",
  },
  {
    accessor: "userId",
    Header: "검사자 ID",
  },
  {
    accessor: "timeAfterTakingMedicine",
    Header: "약복용후 지난시간",
  },
  {
    accessor: "fileNameList",
    Header: "파일 다운로드",
  },
];

const Gait = [
  {
    accessor: "id",
    Header: "검사 번호",
  },
  {
    accessor: "createdAt",
    Header: "생성시간",
  },
  {
    accessor: "userId",
    Header: "검사자 ID",
  },
  {
    accessor: "timeAfterTakingMedicine",
    Header: "약복용후 지난시간",
  },

  {
    accessor: "stride",
    Header: "보폭",
  },
  {
    accessor: "step",
    Header: "발걸음 수",
  },
  {
    accessor: "distance",
    Header: "걸은거리",
  },
  {
    accessor: "time",
    Header: "걸은시간",
  },

  {
    accessor: "fileName",
    Header: "파일 다운로드",
  },
];
const Finger = [
  {
    accessor: "id",
    Header: "검사 번호",
  },
  {
    accessor: "createdAt",
    Header: "생성시간",
  },
  {
    accessor: "userId",
    Header: "검사자 ID",
  },
  {
    accessor: "hand",
    Header: "검사한 손",
  },
  {
    accessor: "count",
    Header: "터치 횟수",
  },
  {
    accessor: "timeAfterTakingMedicine",
    Header: "약복용후 지난시간",
  },
  {
    accessor: "fileName",
    Header: "파일 다운로드",
  },
];
