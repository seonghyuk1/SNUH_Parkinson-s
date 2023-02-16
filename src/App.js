/* eslint-disable*/
import styles from "./styles/App.module.css";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className={styles.Container}>
        <Link to="Table">
          <div className={styles.Title}>전체 명단</div>
        </Link>
      </div>
    </>
  );
}

export default App;
