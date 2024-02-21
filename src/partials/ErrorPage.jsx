import React from "react";
import styles from "./styles/ErrorPage.module.css";

const ErrorPage = () => {
	return (
		<div className={styles.ErrorPage}>
			<div className={styles.IconBlank}>
				<img src="/images/cancel.png" alt="" srcset="" />
			</div>
			<div className={styles.Title}>Terjadi Masalah Saat Memuat</div>
			<div className={styles.SubTitle}>
				Terjadi masalah saat menghubungi server. Silahkan muat ulang / reload
				halaman ini untuk memproses ulang
			</div>
		</div>
	);
};

export default ErrorPage;
