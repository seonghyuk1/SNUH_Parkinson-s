/* eslint-disable*/
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./styles/Excise.module.css";
import axios from "axios";

function Excise() {
  const [rows, setRows] = useState([]);

  // const location = useLocation();
  // console.log("로케", location.state);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users", {
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
      <h5>
        <Link to="/" className={styles.Links}>
          홈
        </Link>
        {" > "}운동기록{" "}
      </h5>
      <div className={styles.Container}>
        <div className={styles.Title}>운동 기록</div>
      </div>

      <div className="d-grid">
        <Button
          className={styles.Btn}
          size="lg"
          onClick={() => {
            navigate("/fingerTest_Records", {
              state: {
                test: "finger",
                colHead: Finger_Screengaze_Quickblink,
                ids: rows,
              },
            });
          }}
        >
          Finger Test 기록
        </Button>

        <Button
          className={styles.Btn}
          size="lg"
          onClick={() => {
            navigate("/screenGazeTest_Records", {
              state: {
                test: "screen-gaze",
                colHead: Finger_Screengaze_Quickblink,
                ids: rows,
              },
            });
          }}
        >
          Screen Gaze Test 기록
        </Button>

        <Button
          className={styles.Btn}
          size="lg"
          onClick={() => {
            navigate("/quickBlinkTest_Records", {
              state: {
                test: "quick-blink",
                colHead: Finger_Screengaze_Quickblink,
                ids: rows,
              },
            });
          }}
        >
          Quick Blink Test 기록
        </Button>

        <Button
          className={styles.Btn}
          size="lg"
          onClick={() => {
            navigate("/gaitTest_Records", {
              state: {
                test: "gait",
                colHead: Gait,
                ids: rows,
              },
            });
          }}
        >
          Gait Test 기록
        </Button>

        <Button
          className={styles.Btn}
          size="lg"
          onClick={() => {
            navigate("/aSoundTest_Records", {
              state: {
                test: "a-sound",
                colHead: Sound_Dadada_Pataka,
                ids: rows,
              },
            });
          }}
        >
          A Sound Test 기록
        </Button>

        <Button
          className={styles.Btn}
          size="lg"
          onClick={() => {
            navigate("/eSoundTest_Records", {
              state: {
                test: "e-sound",
                colHead: Sound_Dadada_Pataka,
                ids: rows,
              },
            });
          }}
        >
          E Sound Test 기록
        </Button>
        <Button
          className={styles.Btn}
          size="lg"
          onClick={() => {
            navigate("/dadadaTest_Records", {
              state: {
                test: "dadada",
                colHead: Sound_Dadada_Pataka,
                ids: rows,
              },
            });
          }}
        >
          DaDaDa Test 기록
        </Button>
        <Button
          className={styles.Btn}
          size="lg"
          onClick={() => {
            navigate("/patakaTest_Records", {
              state: {
                test: "pataka",
                colHead: Sound_Dadada_Pataka,
                ids: rows,
              },
            });
          }}
        >
          PaTaKa Test 기록
        </Button>
      </div>
    </>
  );
}

export default Excise;

const Finger_Screengaze_Quickblink = [
  {
    accessor: "id",
    Header: "검사 번호",
  },
  {
    accessor: "count",
    Header: "터치 횟수",
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
    Header: "걸은시간(분)",
  },
  {
    accessor: "userId",
    Header: "검사자 ID",
  },
  {
    accessor: "fileName",
    Header: "파일 다운로드",
  },
];
