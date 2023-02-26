/* eslint-disable*/
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./styles/User.module.css";

export default function User() {
  let location = useLocation();
  let navigate = useNavigate();
  console.log("로케", location.state);
  let url = "https://kwhcclab.com:20757/tests/download/" + location.state.id;

  return (
    <>
      <h5>
        {" "}
        <Link to="/" className={styles.Links}>
          홈
        </Link>
        {" > "}
        <Link to="/Table" className={styles.Links}>
          전체 사용자 명단
        </Link>
        {" > "}
        {location.state.name}님
      </h5>

      <div className={styles.Container}>
        <div className={styles.UserInfo}>
          <span className={styles.Name}>ID : {location.state.name}</span>
          <Button className={styles.BtnFile} size="lg">
            <a className={styles.All} href={url}>
              {console.log(url)}
              전체 테스트 파일 다운로드
            </a>
          </Button>
        </div>
        <div className="d-grid gap-2">
          <Button
            className={styles.Btn}
            variant="primary"
            size="lg"
            onClick={() => {
              navigate("/fingerTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "finger Test",
                  test: "finger",
                  colHead: Finger_Screengaze_Quickblink,
                },
              });
            }}
          >
            Finger Test
          </Button>
          <Button
            className={styles.Btn}
            variant="primary"
            size="lg"
            onClick={() => {
              navigate("/screenGazeTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "Screen Gaze Test",
                  test: "screen-gaze",
                  colHead: Finger_Screengaze_Quickblink,
                },
              });
            }}
          >
            Screen Gaze Test
          </Button>
          <Button
            className={styles.Btn}
            variant="primary"
            size="lg"
            onClick={() => {
              navigate("/quickBlinkTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "Quick Blink Test",
                  test: "quick-blink",
                  colHead: Finger_Screengaze_Quickblink,
                },
              });
            }}
          >
            Quick Blink Test
          </Button>
          <Button
            className={styles.Btn}
            variant="primary"
            size="lg"
            onClick={() => {
              navigate("/gaitTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "Gait Test",
                  test: "gait",
                  colHead: Gait,
                },
              });
            }}
          >
            Gait Test
          </Button>
          <Button
            className={styles.Btn}
            variant="primary"
            size="lg"
            onClick={() => {
              navigate("/aSoundTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "A Sound Test",
                  test: "a-sound",
                  colHead: Sound_Dadada_Pataka,
                },
              });
            }}
          >
            A Sound Test
          </Button>
          <Button
            className={styles.Btn}
            variant="primary"
            size="lg"
            onClick={() => {
              navigate("/eSoundTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "E Sound Test",
                  test: "e-sound",
                  colHead: Sound_Dadada_Pataka,
                },
              });
            }}
          >
            E Sound Test
          </Button>
          <Button
            className={styles.Btn}
            variant="primary"
            size="lg"
            onClick={() => {
              navigate("/dadadaTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "DaDaDa Test",
                  test: "dadada",
                  colHead: Sound_Dadada_Pataka,
                },
              });
            }}
          >
            DaDaDa Test
          </Button>
          <Button
            className={styles.Btn}
            variant="primary"
            size="lg"
            onClick={() => {
              navigate("/patakaTest", {
                state: {
                  id: location.state.id,
                  name: location.state.name,
                  testName: "PaTaKa Test",
                  test: "pataka",
                  colHead: Sound_Dadada_Pataka,
                },
              });
            }}
          >
            PaTaKa Test
          </Button>
        </div>
      </div>
    </>
  );
}

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
