/* eslint-disable*/
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./../../styles/Test.module.css";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return pathname === "/" ? (
    <></>
  ) : (
    <>
      <div className={styles.display}>
        {sessionStorage.getItem("token") && (
          <Link to="/Main">
            <img
              src={process.env.PUBLIC_URL + "SNUH.jpg"}
              alt="로고"
              className={styles.logo}
            />
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
