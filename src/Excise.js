/* eslint-disable*/
import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./styles/Excise.module.css";
import axios from "axios";

function Excise() {
  const [rows, setRows] = useState([]);

  //   let test = [];
  //   const [userId, setUserId] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

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

        // rows.map((v, i) => {
        //   test.push(rows[i].id);
        // });

        // console.log(test);

        // setUserId(...[test]);
        // console.log("유저", userId);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
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
                testName: "finger Test",
                test: "finger",
                count: true,
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
                testName: "Screen Gaze Test",
                test: "screen-gaze",
                count: true,
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
                testName: "Quick Blink Test",
                test: "quick-blink",
                count: true,
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
                testName: "Gait Test",
                test: "gait",
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
                testName: "A Sound Test",
                test: "a-sound",
                sound: true,
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
                testName: "E Sound Test",
                test: "e-sound",
                sound: true,
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
                testName: "DaDaDa Test",
                test: "dadada",
                sound: true,
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
                testName: "PaTaKa Test",
                test: "pataka",
                sound: true,
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
