import React, { useEffect } from "react";
import styles from "./styles/Blank.module.css";

const Blank = () => {
  useEffect(() => {
    document.title = "404 - Agendakota";
  });

  return (
    <div className={`content ${styles.MainContent}`}>
      <div>
        <h1>404</h1>
        <h5>Halaman yang Kamu Tuju Tidak Tersedia</h5>
      </div>
    </div>
  );
};

export default Blank;
