/* eslint-disable*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const OK = sessionStorage.getItem("OK");
  const [pw, setPw] = useState("");

  useEffect(() => {
    OK ? navigate("/Main") : navigate("/");
  }, []);

  const password = process.env.REACT_APP_PW;

  const pwHandler = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  let ROGER = (pw) => {
    if (pw === password) {
      sessionStorage.setItem("OK", "확인");
      sessionStorage.OK != null && navigate("/Main");
      window.location.replace("/");
    }
  };

  return (
    <>
      <center>
        <img src={process.env.PUBLIC_URL + "login_logo.png"} alt="로고" style={{ width: "20%", display: "block", marginBottom: "3%", marginTop: "10%" }} />
        <form onClick={ROGER(pw)}>
          <input type="password" className="form-control form-control-lg rounded-pill" placeholder="비밀번호를 입력하세요." value={pw} onChange={pwHandler} style={{ width: 300, display: "inline-block" }}></input>
        </form>
      </center>
    </>
  );
}

export default Login;
