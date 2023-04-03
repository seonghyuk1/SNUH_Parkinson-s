import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./../styles/User.module.css";
import { downloadAllTestFilesByUserId } from "../lib/api/tests";
import { getUser } from "./../lib/api/users";
import TestButtonList from "./../components/common/TestButtonList";

export default function User() {
  const location = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    location.state.id &&
      getUser(location.state.id)
        .then((response) => {
          setUser(response.data);
        })
        .catch((e) => console.log(e));
  }, [location.state.id]);

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
          {location.state.name ? location.state.name : user?.name}
        </h5>
      </div>
      <div className={styles.Container}>
        <div className={styles.UserInfo}>
          <span className={styles.Name}>
            {location.state.name ? location.state.name : user?.name}
          </span>
          <Button
            className={styles.BtnFile}
            onClick={() => downloadAllTestFilesByUserId(location.state.id)}
          >
            모든 검사 파일 다운로드
          </Button>
        </div>
        <TestButtonList id={user?.id} name={user?.name} />
      </div>
    </>
  );
}
