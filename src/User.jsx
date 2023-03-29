/* eslint-disable*/
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./styles/User.module.css";

export default function User() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("locationData : ", location.state);

  const url = `${process.env.REACT_APP_DB_HOST}/tests/download/` + location.state.id;

  return (
    <>
      <div className={styles.Container_navi}>
        <h5>
          <Link to="/" className={styles.Links}>
            홈
          </Link>
          {" > "}
          <Link to="/Table" className={styles.Links}>
            전체 사용자 명단
          </Link>
          {" > "}
          {location.state.name ? location.state.name : `${location.state.id}번 검사자`}
        </h5>
      </div>

      <div className={styles.Container}>
        <div className={styles.UserInfo}>
          <span className={styles.Name}>{location.state.name ? `ID : ${location.state.name}` : `${location.state.id}번 검사자`}</span>
          <Button className={styles.BtnFile}>
            <a className={styles.All} href={url}>
              전체 테스트 파일 다운로드
            </a>
          </Button>
        </div>

        <div className="d-grid">
          <Button
            className={styles.Btn}
            size="ml"
            onClick={() => {
              navigate("/fingerTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "손가락 검사",
                  test: "finger",
                  colHead: Finger,
                },
              });
            }}
          >
            손가락 검사
          </Button>

          <Button
            className={styles.Btn}
            size="ml"
            onClick={() => {
              navigate("/aSoundTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "소리 검사 (지속발성 'A')",
                  test: "a-sound",
                  colHead: Sound_Dadada_Pataka,
                },
              });
            }}
          >
            소리 검사 (지속발성 'A')
          </Button>

          <Button
            className={styles.Btn}
            size="ml"
            onClick={() => {
              navigate("/eSoundTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "소리 검사 (지속발성 'E')",
                  test: "e-sound",
                  colHead: Sound_Dadada_Pataka,
                },
              });
            }}
          >
            소리 검사 (지속발성 'E')
          </Button>
          <Button
            className={styles.Btn}
            size="ml"
            onClick={() => {
              navigate("/dadadaTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "소리 검사 (반복발성 '다')",
                  test: "dadada",
                  colHead: Sound_Dadada_Pataka,
                },
              });
            }}
          >
            소리 검사 (반복발성 '다')
          </Button>

          <Button
            className={styles.Btn}
            size="ml"
            onClick={() => {
              navigate("/patakaTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "소리 검사 (반복발성 '파, 타, 카')",
                  test: "pataka",
                  colHead: Sound_Dadada_Pataka,
                },
              });
            }}
          >
            소리 검사 (반복발성 '파, 타, 카')
          </Button>
          <Button
            className={styles.Btn}
            size="ml"
            onClick={() => {
              navigate("/screenGazeTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "눈 검사 (화면주시)",
                  test: "screen-gaze",
                  colHead: Screengze_Quickblink,
                },
              });
            }}
          >
            눈 검사 (화면주시)
          </Button>

          <Button
            className={styles.Btn}
            size="ml"
            onClick={() => {
              navigate("/quickBlinkTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "눈 검사 (빠른 깜빡임)",
                  test: "quick-blink",
                  colHead: Screengze_Quickblink,
                },
              });
            }}
          >
            눈 검사 (빠른 깜빡임)
          </Button>

          <Button
            className={styles.Btn}
            size="ml"
            onClick={() => {
              navigate("/gaitTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "걸음 검사",
                  test: "gait",
                  colHead: Gait,
                },
              });
            }}
          >
            걸음 검사
          </Button>
        </div>
      </div>
    </>
  );
}

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
