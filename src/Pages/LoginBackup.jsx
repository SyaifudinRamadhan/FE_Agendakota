import React, { useRef, useState } from "react";
import styles from "./styles/Login.module.css";
import styles2 from "./styles/Legality.module.css";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
	const [alertDanger, setAlertDanger] = useState({
		state: false,
		content: "",
		variant: "danger",
	});
	const [loginType, setLoginType] = useState("password");
	const [loading, setLoading] = useState(false);
	// Only for login otp
	const [loginOtpState, setLoginOtpState] = useState("request");

	const navigate = useNavigate();

	const fieldLogin = {
		email: useRef(null),
		password: useRef(null),
		emailOtp: useRef(null),
		otpCode: useRef(null),
		emailRegister: useRef(null),
		fName: useRef(null),
		lName: useRef(null),
		username: useRef(null),
		passwordRegister: useRef(null),
		passwordRegister2: useRef(null),
	};

	const dummyLoad = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(false);
			}, 3000);
		});
	};

	const handleResponse = (res) => {
		if (res) {
			if (loginType === "password") {
				setAlertDanger({
					state: true,
					content: "Login berhasil",
					variant: "success",
				});
				// Redirect to home
				navigate("/events");
			} else {
				if (loginOtpState === "verify") {
					setAlertDanger({
						state: true,
						content: "Login berhasil",
						variant: "success",
					});
					// Redirect to home
					navigate("/events");
				} else {
					setAlertDanger({
						state: true,
						content: "Periksa emailmu untuk mendapatkan kode OTP",
						variant: "success",
					});
					setLoginOtpState("verify");
					setLoading(false);
				}
			}
		} else {
			setAlertDanger({
				state: true,
				content:
					"Akun tidak dapat ditemukan. Periksa email, password, ataupun kode otp mu !!!",
				variant: "danger",
			});
			setLoading(false);
			setTimeout(() => {
				setAlertDanger({
					state: false,
					content:
						"Akun tidak dapat ditemukan. Periksa email, password, ataupun kode otp mu !!!",
					variant: "danger",
				});
			}, 3000);
		}
	};
	// const handleRegister = (e) => {
	// 	e.preventDefault();
	// 	if (
	// 		!fieldLogin.emailRegister.current.value ||
	// 		fieldLogin.emailRegister.current.value === "" ||
	// 		!fieldLogin.username.current.value ||
	// 		fieldLogin.username.current.value === "" ||
	// 		!fieldLogin.fName.current.value ||
	// 		fieldLogin.fName.current.value === "" ||
	// 		!fieldLogin.lName.current.value ||
	// 		fieldLogin.lName.current.value === "" ||
	// 		!fieldLogin.passwordRegister.current.value ||
	// 		fieldLogin.passwordRegister.current.value === "" ||
	// 		!fieldLogin.passwordRegister2.current.value ||
	// 		fieldLogin.passwordRegister2.current.value === ""
	// 	) {
	// 		setAlertDanger({
	// 			state: true,
	// 			content: "Semua field wajib diisi !!!",
	// 			variant: "danger",
	// 		});
	// 		setTimeout(() => {
	// 			setAlertDanger({
	// 				state: false,
	// 				content: "Semua field wajib diisi !!!",
	// 				variant: "danger",
	// 			});
	// 		}, 3000);
	// 	} else {
	// 		setLoading(true);
	// 		dummyLoad().then((res) => {
	// 			if (res) {
	// 				setLoginType("password");
	// 				setAlertDanger({
	// 					state: true,
	// 					content: "Periksa emailmu untuk aktivasi akun agar bisa login !!!",
	// 					variant: "success",
	// 				});
	// 				setLoading(false);
	// 				setTimeout(() => {
	// 					setAlertDanger({
	// 						state: false,
	// 						content:
	// 							"Periksa emailmu untuk aktivasi akun agar bisa login !!!",
	// 						variant: "success",
	// 					});
	// 				}, 3000);
	// 			} else {
	// 				setAlertDanger({
	// 					state: true,
	// 					content: "Akun gagal dibuat. {custom message} !!!",
	// 					variant: "danger",
	// 				});
	// 				setLoading(false);
	// 				setTimeout(() => {
	// 					setAlertDanger({
	// 						state: false,
	// 						content: "Akun gagal dibuat. {custom message} !!!",
	// 						variant: "danger",
	// 					});
	// 				}, 3000);
	// 			}
	// 		});
	// 	}
	// };
	const handleLoginDef = (e) => {
		e.preventDefault();
		if (
			!fieldLogin.email.current.value ||
			fieldLogin.email.current.value === "" ||
			!fieldLogin.password.current.value ||
			fieldLogin.password.current.value === ""
		) {
			setAlertDanger({
				state: true,
				content: "Semua field wajib diisi !!!",
				variant: "danger",
			});
			setTimeout(() => {
				setAlertDanger({
					state: false,
					content: "Semua field wajib diisi !!!",
					variant: "danger",
				});
			}, 3000);
		} else {
			setLoading(true);
			dummyLoad().then(handleResponse);
		}
	};
	// const handleGetOtp = (e) => {
	// 	e.preventDefault();
	// 	if (
	// 		!fieldLogin.emailOtp.current.value ||
	// 		fieldLogin.emailOtp.current.value === ""
	// 	) {
	// 		setAlertDanger({
	// 			state: true,
	// 			content: "Field email wajib diisi !!!",
	// 			variant: "danger",
	// 		});
	// 		setTimeout(() => {
	// 			setAlertDanger({
	// 				state: false,
	// 				content: "Field email wajib diisi !!!",
	// 				variant: "danger",
	// 			});
	// 		}, 3000);
	// 	} else {
	// 		setLoading(true);
	// 		dummyLoad().then(handleResponse);
	// 	}
	// };
	// const handleVerifyOtp = (e) => {
	// 	e.preventDefault();
	// 	if (
	// 		!fieldLogin.otpCode.current.value ||
	// 		fieldLogin.otpCode.current.value === ""
	// 	) {
	// 		setAlertDanger({
	// 			state: true,
	// 			content: "Field OTP Code wajib diisi !!!",
	// 			variant: "danger",
	// 		});
	// 		setTimeout(() => {
	// 			setAlertDanger({
	// 				state: false,
	// 				content: "Field OTP Code wajib diisi !!!",
	// 				variant: "danger",
	// 			});
	// 		}, 3000);
	// 	} else {
	// 		setLoading(true);
	// 		dummyLoad().then(handleResponse);
	// 	}
	// };
	const handleLoginGoogle = (credentialData) => {
		console.log(credentialData);
		setLoading(true);
		dummyLoad().then((res) => {
			if (res) {
				setAlertDanger({
					state: true,
					content: "Login berhasil",
					variant: "success",
				});
				// Redirect to home
				navigate("/events");
			} else {
				setAlertDanger({
					state: true,
					content:
						"Akun tidak dapat ditemukan. Periksa email, password, ataupun kode otp mu !!!",
					variant: "danger",
				});
				setLoading(false);
				setTimeout(() => {
					setAlertDanger({
						state: false,
						content:
							"Akun tidak dapat ditemukan. Periksa email, password, ataupun kode otp mu !!!",
						variant: "danger",
					});
				}, 3000);
			}
		});
	};
	const handleLoginGoogleErr = () => {
		setAlertDanger({
			state: true,
			content: "Terjadi kesalahan. Silahkan coba lagi !",
			variant: "danger",
		});
		setTimeout(() => {
			setAlertDanger({
				state: false,
				content: "Terjadi kesalahan. Silahkan coba lagi !",
				variant: "danger",
			});
		}, 3000);
	};

	return (
		<div className={styles.BgLayout}>
			<div className={styles.BoxContent}>
				<div className={styles.Logo}>
					<img src="/images/logo.png" alt="" srcset="" />
				</div>
				<div className={styles.Content}>
					<div style={{ marginTop: 20 }}>
						<form onSubmit={handleLoginDef}>
							<div className={styles2.FormHeader}>
								<div className={styles2.TitleArea}>
									<h1 className={styles.Title}>Login</h1>
								</div>
							</div>
							<div>
								<div className={styles2.AlertBox}>
									<Alert
										type={alertDanger.variant}
										isShow={alertDanger.state}
										setShowFn={() => {}}
										message={alertDanger.content}
										closeBtn={false}
									/>
								</div>
								<div className={styles2.FormFieldBox}>
									<div className={styles2.TitleInput}>Email</div>
									<InputForm
										refData={fieldLogin.email}
										type={"text"}
										placeholder={"Tuliskan alamat email akunmu"}
									/>
								</div>
								<div className={styles2.FormFieldBox}>
									<div className={styles2.TitleInput}>Password</div>
									<InputForm
										refData={fieldLogin.password}
										type={"password"}
										placeholder={"Tuliskan password akun agendakota"}
									/>
								</div>
								<div className={styles2.FormFieldBox}>
									{loading ? (
										<Button
											bgColor={"rgb(212 132 169)"}
											borderColor={"rgb(212 132 169)"}
											title={"Loading ..."}
											icon={
												<div
													className="spinner-border"
													style={{ width: "20px", height: "20px" }}
													animation="border"
												/>
											}
											center={true}
											style={{ width: "100%", textAlign: "center" }}
										/>
									) : (
										<Button
											title={"Login"}
											typeBtn="submit"
											classes={[styles2.FormButton]}
											style={{ width: "100%", margin: "auto" }}
										/>
									)}
									<div
										style={{
											flexDirection: "row",
											margin: "auto",
											gap: "10px",
										}}
									>
										<div>Belum punya akun ? </div>
										<a style={{ textDecoration: "none" }} href="/register-user">
											Daftar
										</a>
									</div>
								</div>
							</div>
						</form>

						{/* <div style={{ display: loginType === "otp" ? "unset" : "none" }}>
							<form
								onSubmit={handleGetOtp}
								style={{
									display: loginOtpState === "request" ? "unset" : "none",
								}}
							>
								<div className={styles2.FormHeader}>
									<div className={styles2.TitleArea}>
										<h1 className={styles.Title}>Login</h1>
									</div>
								</div>
								<div>
									<div className={styles2.AlertBox}>
										<Alert
											type={alertDanger.variant}
											isShow={alertDanger.state}
											setShowFn={() => {}}
											message={alertDanger.content}
											closeBtn={false}
										/>
									</div>
									<div className={styles2.FormFieldBox}>
										<div className={styles2.TitleInput}>Email</div>
										<InputForm
											refData={fieldLogin.emailOtp}
											type={"text"}
											placeholder={"Tuliskan alamat email akunmu"}
										/>
									</div>
									<div className={styles2.FormFieldBox}>
										{loading ? (
											<Button
												bgColor={"rgb(212 132 169)"}
												borderColor={"rgb(212 132 169)"}
												title={"Loading ..."}
												icon={
													<div
														className="spinner-border"
														style={{ width: "20px", height: "20px" }}
														animation="border"
													/>
												}
												center={true}
												style={{ width: "100%", textAlign: "center" }}
											/>
										) : (
											<Button
												title={"Get OTP Code"}
												typeBtn="submit"
												classes={[styles2.FormButton]}
												style={{ width: "100%", margin: "auto" }}
											/>
										)}
									</div>
								</div>
							</form>
							<form
								onSubmit={handleVerifyOtp}
								style={{
									display: loginOtpState === "verify" ? "unset" : "none",
								}}
							>
								<div className={styles2.FormHeader}>
									<div className={styles2.TitleArea}>
										<h1 className={styles.Title}>Login</h1>
									</div>
								</div>
								<div>
									<div className={styles2.AlertBox}>
										<Alert
											type={alertDanger.variant}
											isShow={alertDanger.state}
											setShowFn={() => {}}
											message={alertDanger.content}
											closeBtn={false}
										/>
									</div>
									<div className={styles2.FormFieldBox}>
										<div className={styles2.TitleInput}>OTP Code</div>
										<InputForm
											refData={fieldLogin.otpCode}
											type={"password"}
											placeholder={"Tuliskan password akun agendakota"}
										/>
									</div>
									<div className={styles2.FormFieldBox}>
										{loading ? (
											<Button
												bgColor={"rgb(212 132 169)"}
												borderColor={"rgb(212 132 169)"}
												title={"Loading ..."}
												icon={
													<div
														className="spinner-border"
														style={{ width: "20px", height: "20px" }}
														animation="border"
													/>
												}
												center={true}
												style={{ width: "100%", textAlign: "center" }}
											/>
										) : (
											<Button
												title={"Login"}
												typeBtn="submit"
												classes={[styles2.FormButton]}
												style={{ width: "100%", margin: "auto" }}
											/>
										)}
									</div>
								</div>
							</form>
						</div> */}
						<div className={styles.TextCenter}>Atau</div>
						<div className={styles2.FormFieldBox}>
							<div className={styles.GoogleLoginBtn}>
								<GoogleOAuthProvider
									clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
								>
									<GoogleLogin
										theme="filled_black"
										logo_alignment="center"
										shape="pill"
										onSuccess={handleLoginGoogle}
										onError={handleLoginGoogleErr}
									></GoogleLogin>
								</GoogleOAuthProvider>
							</div>
						</div>
						{/* <div className={styles2.FormFieldBox}>
							{loginType === "password" || loginType === "register" ? (
								<Button
									title={"Login With OTP"}
									classes={[styles2.FormButton]}
									style={{ width: "150px", margin: "auto" }}
									bgColor={"white"}
									textColor={"#CA0C64"}
									fnOnClick={() => {
										setLoginType("otp");
									}}
								/>
							) : (
								<Button
									title={"Login With Password"}
									classes={[styles2.FormButton]}
									style={{ width: "200px", margin: "auto" }}
									bgColor={"white"}
									textColor={"#CA0C64"}
									fnOnClick={() => {
										setLoginType("password");
									}}
								/>
							)}
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
