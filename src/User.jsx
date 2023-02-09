/* eslint-disable*/
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./styles/User.module.css";
import axios from "axios";

export default function User() {
  let location = useLocation();
  let navigate = useNavigate();
  console.log(location.state);
  let url = "https://kwhcclab.com:20757/tests/download/" + location.state.id;

  return (
    <>
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
                  count: true,
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
                  count: true,
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
                  count: true,
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
                  sound: true,
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
                  sound: true,
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
                  sound: true,
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
                  sound: true,
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
