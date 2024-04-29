import React from "react";
import styles from "./styles/ErrorPage.module.css";

const ErrorPage = ({ customTitle, customMessage }) => {
  return (
    <div className={styles.ErrorPage}>
      <div className={styles.IconBlank}>
        <img src="/images/cancel.png" alt="" srcset="" />
      </div>
      <div className={styles.Title}>
        {customTitle ? customTitle : "Terjadi Masalah Saat Memuat"}
      </div>
      <div className={styles.SubTitle}>
        {customMessage
          ? customMessage
          : "Terjadi masalah saat menghubungi server. Silahkan muat ulang / reload halaman ini untuk memproses ulang"}
      </div>
    </div>
  );
};

export default ErrorPage;
