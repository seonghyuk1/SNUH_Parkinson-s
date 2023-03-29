/* eslint-disable*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./lib/api/auth";
import { setToken } from "./lib/api/client";

function Login() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [pw, setPw] = useState("");

  // 헤더 설정
  useEffect(() => {
    token ? navigate("/Main") : navigate("/");
  }, []);

  const password = process.env.REACT_APP_PW;

  const pwHandler = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  useEffect(() => {
    if (pw === password) ROGER(pw);
  }, [pw]);

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
        ></input>
        <form>
          <input
            type="password"
            className="form-control form-control-lg rounded-pill"
            placeholder="비밀번호를 입력하세요."
            value={pw}
            onChange={pwHandler}
            style={{ width: 300, display: "inline-block" }}
          ></input>
        </form>
      </center>
    </>
  );
}

export default Login;
