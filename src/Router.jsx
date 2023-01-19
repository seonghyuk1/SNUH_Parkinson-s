import { Routes, Route } from "react-router-dom";
import App from "./App";
import Test from "./Test";
import User from "./User";

const AppRouter = () => {
  return (
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
  );
};

export default AppRouter;
