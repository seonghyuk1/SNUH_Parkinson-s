import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./styles/User.module.css";
import axios from "axios";
import JSZip from "jszip";

export default function User() {
  let location = useLocation();
  let navigate = useNavigate();
  console.log(location.state);
  let zip = new JSZip();
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.UserInfo}>
          <span className={styles.Name}>{location.state.name}</span>
          <Button
            className={styles.BtnFile}
            variant="primary"
            size="lg"
            onClick={() => {
              axios
                .get("/tests/download/" + Number(location.state.id), {
                  params: {
                    userId: location.state.id,
                  },
                  headers: {
                    contentType: "application/zip",
                  },
                })
                .then((response) => {
                  console.log(response);

                  /* const url = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", `${location.state.name}.zip`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);*/
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            전체 테스트 파일 다운로드
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

function download_base64_content(filename, base64Text) {
  //window.location="data:application/octastream;base64, " + base64Text;
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/octastream;base64," + base64Text
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
