import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./../styles/Excise.module.css";
import TestButtonList from "../components/common/TestButtonList";

function Excise() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    !token && navigate("/");
  }, [navigate, token]);

  return (
    <>
      <div className={styles.Container_navi}>
        <h5>
          <Link to="/" className={styles.Links}>
            홈
          </Link>
          {" > "}검사기록
        </h5>
      </div>
      <div className={styles.Container}>
        <div>
          <span className={styles.Name}>검사 기록</span>
        </div>
      </div>
      <TestButtonList />
    </>
  );
}

export default Excise;
