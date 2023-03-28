/* eslint-disable*/
import styles from "./styles/App.module.css";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    !token && navigate("/");
  }, []);

  return (
    <div className={styles.Container}>
      <Link to="/Table">
        <div className={styles.Title}>전체 사용자 명단</div>
      </Link>
      <Link to="/Excise">
        <div className={styles.Title}>운동 기록</div>
      </Link>
    </div>
  );
}
export default Main;
