import React, { useRef, useState } from "react";
import styles from "./styles/Login.module.css";
import styles2 from "./styles/Legality.module.css";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import Alert from "../components/Alert";

const Login = () => {
	const [alertDanger, setAlertDanger] = useState(false);

	const fieldLogin = {
		email: useRef(null),
		password: useRef(null),
		otpCode: useRef(null),
	};

	const handleSubmit = () => {};

	return (
		<div className={styles.BgLayout}>
			<div className={styles.BoxContent}>
				<div className={styles.Logo}>
					<img src="/images/logo.png" alt="" srcset="" />
				</div>
				<div className={styles.Content}>
					<div style={{ marginTop: 20 }}>
						<form onSubmit={handleSubmit}>
							<div className={styles2.FormHeader}>
								<div className={styles2.TitleArea}>
									<h1 className={styles.Title}>Login</h1>
								</div>
							</div>
							<div>
								<div className={styles2.AlertBox}>
									{alertDanger.state ? (
										<Alert variant="danger">{alertDanger.content}</Alert>
									) : (
										<></>
									)}
									<Alert
										type="danger"
										isShow={alertDanger.state}
										setShowFn={() => {}}
										message={alertDanger.content}
									/>
								</div>
								<div className={styles2.FormFieldBox}>
									<div className={styles2.TitleInput}>Email</div>
									<InputForm
										refData={fieldLogin.lastPass}
										type={"text"}
										placeholder={"Tuliskan alamat email akunmu"}
									/>
								</div>
								<div className={styles2.FormFieldBox}>
									<div className={styles2.TitleInput}>Password</div>
									<InputForm
										refData={fieldLogin.newPass}
										type={"password"}
										placeholder={"Tuliskan password akun agendakota"}
									/>
								</div>
								<div className={styles2.FromFieldBox}>
									<Button
										title={"Login"}
										typeBtn="submit"
										classes={[styles2.FormButton]}
										style={{ width: "150px", margin: "auto" }}
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
