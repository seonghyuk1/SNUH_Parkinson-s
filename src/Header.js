/* eslint-disable*/
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/Test.module.css";

function Header() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  // 헤더를 사용하여 스토리지 변경시(로그아웃) 로그인 화면 이동
  useEffect(() => {
    token ? navigate("/Main") : navigate("/");
  }, []);

  return (
    <>
      <div className={styles.display}>
        {sessionStorage.getItem("token") && (
          <Link to="/Main">
            <img src={process.env.PUBLIC_URL + "SNUH.jpg"} alt="로고" className={styles.logo} />
          </Link>
        )}

        <button
          className={styles.Header_Btn}
          onClick={(e) => {
            e.preventDefault();
            sessionStorage.clear();
            navigate("/");
            location.reload();
          }}
        >
          로그아웃
        </button>
      </div>
      <hr style={{ marginTop: 0 }} />
    </>
  );
}

export default Header;
