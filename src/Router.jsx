import { Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Test from "./Test";
import User from "./User";

const AppRouter = () => {
  return (
    <>
      <Link to="/">
        <img src={process.env.PUBLIC_URL + "SNUH.jpg"} style={{ display: "block", margin: "2%", width: "300px" }} alt="로고" />
      </Link>
      <Routes>
        <>
          <Route exact path="/" element={<App />} />
          <Route exact path="/user/:id" element={<User />} />
          <Route exact path="/fingerTest" element={<Test />} />
          <Route exact path="/screenGazeTest" element={<Test />} />
          <Route exact path="/quickBlinkTest" element={<Test />} />
          <Route exact path="/gaitTest" element={<Test />} />
          <Route exact path="/aSoundTest" element={<Test />} />
          <Route exact path="/eSoundTest" element={<Test />} />
          <Route exact path="/dadadaTest" element={<Test />} />
          <Route exact path="/patakaTest" element={<Test />} />
        </>
      </Routes>
    </>
  );
};

export default AppRouter;
