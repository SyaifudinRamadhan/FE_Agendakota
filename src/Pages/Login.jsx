import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Login.module.css";
import styles2 from "./styles/Legality.module.css";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import jwtEncode from "jwt-encode";
import { BiEnvelope, BiKey } from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha";

const dummyLoad = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(false);
		}, 3000);
	});
};

const loginDefLoad = async ({ email, password }) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/api/login",
			{
				email: email,
				password: password,
			},
			{
				headers: {
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return {
			data: res.data,
			status: res.status,
		};
	} catch (error) {
		console.log(error);
		if (error.response === undefined) {
			return {
				data: { data: [error.message] },
				status: 500,
			};
		} else {
			return {
				data: error.response,
				status: error.response.status,
			};
		}
	}
};

const loginGoogleLoad = async ({ email, credential }) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/api/login-w-google",
			{
				email: email,
				credential: credential,
			},
			{
				headers: {
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return {
			data: res.data,
			status: res.status,
		};
	} catch (error) {
		console.log(error);
		if (error.response === undefined) {
			return {
				data: { data: [error.message] },
				status: 500,
			};
		} else {
			return {
				data: error.response,
				status: error.response.status,
			};
		}
	}
};

const Login = ({ isLogin }) => {
	const [alertDanger, setAlertDanger] = useState({
		state: false,
		content: "",
		variant: "danger",
	});
	const [loading, setLoading] = useState(false);
	const [inputFocus, setInputFocus] = useState(null);
	const [captcha, setCaptchaState] = useState(null);

	const navigate = useNavigate();

	const fieldLogin = {
		email: useRef(null),
		password: useRef(null),
	};

	const handleResponse = (res) => {
		if (res.status === 200) {
			setAlertDanger({
				state: true,
				content: "Login berhasil",
				variant: "success",
			});
			// Redirect to home
			localStorage.setItem("access_token", res.data.access_token);
			// window.location.reload();
			window.location.replace("/");
		} else {
			setAlertDanger({
				state: true,
				content:
					"Akun tidak dapat ditemukan. Periksa email, password, ataupun akunmu belum aktif. Coba cek emailmu untuk aktivasi !!!",
				variant: "danger",
			});
			setLoading(false);
			setTimeout(() => {
				setAlertDanger({
					state: false,
					content:
						"Akun tidak dapat ditemukan. Periksa email, password, ataupun akunmu belum aktif. Coba cek emailmu untuk aktivasi !!!",
					variant: "danger",
				});
			}, 3000);
		}
	};

	const handleLoginDef = (e) => {
		e.preventDefault();
		if (
			!fieldLogin.email.current.value ||
			fieldLogin.email.current.value === "" ||
			!fieldLogin.password.current.value ||
			fieldLogin.password.current.value === "" ||
			!captcha
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
			loginDefLoad({
				email: fieldLogin.email.current.value,
				password: fieldLogin.password.current.value,
			}).then(handleResponse);
		}
	};

	const handleLoginGoogle = (credentialData) => {
		setLoading(true);
		let data = jwtDecode(credentialData.credential);
		let encodedCredential = jwtEncode(data, process.env.REACT_APP_JWT_SECRET, {
			alg: process.env.REACT_APP_JWT_ALG,
		});
		console.log(encodedCredential);
		loginGoogleLoad({ email: data.email, credential: encodedCredential }).then(
			(res) => {
				if (res.status === 200) {
					setAlertDanger({
						state: true,
						content: "Login berhasil",
						variant: "success",
					});
					localStorage.setItem("access_token", res.data.access_token);
					// Redirect to home
					// window.location.reload();
					window.location.replace("/");
				} else {
					setAlertDanger({
						state: true,
						content: "Akun tidak dapat ditemukan. Silahkan coba lagi !!!",
						variant: "danger",
					});
					setLoading(false);
					setTimeout(() => {
						setAlertDanger({
							state: false,
							content: "Akun tidak dapat ditemukan. Silahkan coba lagi !!!",
							variant: "danger",
						});
					}, 3000);
				}
			}
		);
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

	useEffect(() => {
		if (isLogin) {
			window.location.replace("/");
		}
		window.addEventListener("click", (e) => {
			e.target === fieldLogin.email.current ||
			e.target === fieldLogin.password.current
				? e.target === fieldLogin.email.current
					? setInputFocus("email")
					: setInputFocus("password")
				: setInputFocus(null);
		});
	});

	return (
		<div className={styles.BgLayout}>
			<div className={styles.BoxContent}>
				<div className={styles.Content}>
					<div style={{ marginTop: 20 }}>
						<form onSubmit={handleLoginDef}>
							<div className={styles2.FormHeader}>
								<div className={styles2.TitleArea}>
									<h1 className={styles.Title}>Masuk atau Daftar</h1>
									<p className={styles.SubTitle}>
										Masuk ke akun agendakota mu dengan email dan password yang
										sudah terdaftar
									</p>
								</div>
							</div>
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
							<div className={`${styles.SubTitle} ${styles.TextCenter}`}>
								Atau Masuk dengan Email
							</div>
							<div>
								<div
									className={`${styles.BoxInput} ${
										inputFocus === "email"
											? styles.ShadowBoxInput2
											: inputFocus === "password"
											? styles.ShadowBoxInput1
											: ""
									}`}
								>
									<div className={styles.FormFieldInput}>
										<label
											className={styles.TitleInput}
											style={{
												color:
													inputFocus === "email" ? "rgb(202, 12, 100)" : "#000",
											}}
											htmlFor="email-input"
											onFocus={() => {
												setInputFocus("email");
											}}
										>
											<BiEnvelope />
											<div>Email</div>
										</label>
										<InputForm
											id={"email-input"}
											className={styles.FieldInput}
											refData={fieldLogin.email}
											type={"text"}
											style={{}}
											placeholder={"Tuliskan alamat email akunmu"}
										/>
									</div>
									<hr />
									<div className={styles.FormFieldInput}>
										<label
											className={styles.TitleInput}
											style={{
												color:
													inputFocus === "password"
														? "rgb(202, 12, 100)"
														: "#000",
											}}
											htmlFor="pass-input"
											onFocus={() => {
												setInputFocus("password");
											}}
										>
											<BiKey />
											<div>Password</div>
										</label>
										<InputForm
											id={"pass-input"}
											className={styles.FieldInput}
											refData={fieldLogin.password}
											hidePassBtn={false}
											type={"password"}
											placeholder={"Tuliskan password akun agendakota"}
										/>
									</div>
								</div>

								<div className={styles.CapcthaField}>
									<ReCAPTCHA
										sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
										onChange={(value) => {
											setCaptchaState(value);
										}}
										style={{ margin: "auto" }}
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
