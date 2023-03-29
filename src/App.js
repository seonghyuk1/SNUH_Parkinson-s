/* eslint-disable*/
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Table } from "./Table";
import Test from "./Test";
import User from "./User";
import Excise from "./Excise";
import ExciseList from "./ExciseList";
import Login from "./Login";
import Header from "./Header";

import Main from "./Main";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/table" element={<Table />} />
        <Route path="/Excise" element={<Excise />} />

        <Route path="/user/:id" element={<User />} />

        <Route path="/fingerTest" element={<Test />} />
        <Route path="/screenGazeTest" element={<Test />} />
        <Route path="/quickBlinkTest" element={<Test />} />
        <Route path="/gaitTest" element={<Test />} />
        <Route path="/aSoundTest" element={<Test />} />
        <Route path="/eSoundTest" element={<Test />} />
        <Route path="/dadadaTest" element={<Test />} />
        <Route path="/patakaTest" element={<Test />} />

        <Route path="/fingerTest_Records" element={<ExciseList />} />
        <Route path="/screenGazeTest_Records" element={<ExciseList />} />
        <Route path="/quickBlinkTest_Records" element={<ExciseList />} />
        <Route path="/gaitTest_Records" element={<ExciseList />} />
        <Route path="/aSoundTest_Records" element={<ExciseList />} />
        <Route path="/eSoundTest_Records" element={<ExciseList />} />
        <Route path="/dadadaTest_Records" element={<ExciseList />} />
        <Route path="/patakaTest_Records" element={<ExciseList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
