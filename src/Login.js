/* eslint-disable*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./lib/api/auth";
import { setToken } from "./lib/api/client";
import styles from "./styles/Test.module.css";

function Login() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [pw, setPw] = useState("");

  // 헤더 설정
  useEffect(() => {
    token ? navigate("/Main") : navigate("/");
  }, []);

  const pwHandler = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  const ROGER = async (pw) => {
    try {
      const response = await login(pw);
      sessionStorage.setItem("token", response.data.token);
      setToken(response.data);
      sessionStorage.token ? navigate("/Main") : navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <center>
        <img
          src={process.env.PUBLIC_URL + "login_logo.png"}
          alt="로고"
          style={{
            width: "20%",
            display: "block",
            marginBottom: "3%",
            marginTop: "10%",
          }}
        />
        <input
          type="password"
          className="form-control form-control-lg rounded-pill"
          placeholder="admin"
          style={{ width: 300, display: "inline-block", marginBottom: 10 }}
          disabled={true}
        />
        <div>
          <input
            type="password"
            className="form-control form-control-lg rounded-pill"
            placeholder="비밀번호를 입력하세요."
            value={pw}
            onChange={pwHandler}
            style={{ width: 300, display: "inline-block" }}
          />
        </div>
        <button
          className={`${styles.Header_Btn} rounded-pill`}
          onClick={() => ROGER(pw)}
          style={{ width: 300, height: 48 }}
        >
          로그인
        </button>
      </center>
    </>
  );
}

export default Login;
