/* eslint-disable*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [pw, setPw] = useState("");

  const client = axios.create();

  // 헤더 설정
  useEffect(() => {
    token ? navigate("/Main") : navigate("/");
  }, []);

  const password = process.env.REACT_APP_PW;

  const pwHandler = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  const ROGER = (pw) => {
    if (pw === password) {
      axios
        .post("auth/login", {
          name: "admin",
          birthdate: "1111-11-11",
          password: pw,
        })
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("token", response.data.token);

          client.defaults.headers.common["X-AUTH-TOKEN"] = response.data.token ? response.data.token : null;

          sessionStorage.token != null && navigate("/Main");
          window.location.replace("/");
        });
    }
  };

  return (
    <>
      <center>
        <img src={process.env.PUBLIC_URL + "login_logo.png"} alt="로고" style={{ width: "20%", display: "block", marginBottom: "3%", marginTop: "10%" }} />
        <input type="password" className="form-control form-control-lg rounded-pill" placeholder="admin" style={{ width: 300, display: "inline-block", marginBottom: 10 }} disabled={true}></input>
        <form onClick={ROGER(pw)}>
          <input type="password" className="form-control form-control-lg rounded-pill" placeholder="비밀번호를 입력하세요." value={pw} onChange={pwHandler} style={{ width: 300, display: "inline-block" }}></input>
        </form>
      </center>
    </>
  );
}

export default Login;
