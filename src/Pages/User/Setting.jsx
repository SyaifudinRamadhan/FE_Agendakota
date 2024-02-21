import React, { useEffect, useRef, useState } from "react";
import SidebarUser from "../../partials/SidebarUser";
import HeaderUser from "../../partials/HeaderUser";
import styles from "../styles/PersonalEvent.module.css";
import styles2 from "../styles/Legality.module.css";
import styles3 from "../styles/Settings.module.css";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import InputForm from "../../components/InputForm";
import Loading from "../../components/Loading";
import PopUp from "../../partials/PopUp";
import { BiError } from "react-icons/bi";

const Setting = () => {
	const [alertDanger, setAlertDanger] = useState({
		state: false,
		content: "Semua field wajib diisi !",
	});
	const [isLoading, setLoading] = useState(false);
	const [popUpActive, setPopUpActive] = useState(false);
	const [popUpContent, setPopUpContent] = useState(<></>);

	const fieldProfile = {
		lastPass: useRef(null),
		newPass: useRef(null),
		confirmPass: useRef(null),
	};

	const dummyLoad = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(false);
			}, 3000);
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			fieldProfile.newPass.current.value === "" ||
			fieldProfile.confirmPass.current.value === "" ||
			fieldProfile.newPass.current.value !==
				fieldProfile.confirmPass.current.value
		) {
			setAlertDanger({
				state: true,
				content:
					fieldProfile.newPass.current.value !==
					fieldProfile.confirmPass.current.value
						? "Konfirmasi password tidak sesuai dengan password baru !"
						: "Semua field selain password lama wajib diisi !!!",
			});
			setTimeout(() => {
				setAlertDanger({
					state: false,
					content: "Semua field selain password lama wajib diisi !!!",
				});
			}, 3000);
		} else {
			setLoading(true);
			dummyLoad().then((res) => {
				if (!res) {
					setPopUpContent(
						<div className={styles3.PopupNotify}>
							<div>Password gagal diperbarui. Silahkan coba lagi !</div>
							<div className={styles3.IconPopUp}>
								<BiError color="#CA0C64" fontWeight={"600"} />
							</div>
						</div>
					);
					setPopUpActive(true);
					setTimeout(() => {
						setPopUpActive(false);
						setPopUpContent(<></>);
					}, 3000);
					setLoading(false);
				} else {
					// reload data profile
					setLoading(false);
				}
			});
		}
	};

	return (
		<>
			<PopUp
				width="45%"
				isActive={popUpActive}
				setActiveFn={setPopUpActive}
				content={popUpContent}
				title="Ubah Password"
			/>
			<div className="content user">
				<div className={styles.Inline} style={{ marginTop: 20 }}>
					<form
						onSubmit={handleSubmit}
						className={`${styles2.FormLayout}`}
						style={{
							marginTop: "-10px",
						}}
					>
						<div className={styles2.FormHeader}>
							<div className={styles2.TitleArea}>
								<h1 className={styles.Title}>Atur Ulang Password</h1>
							</div>
							<div className={styles2.HeaderControl}>
								<Button
									title={"Ubah Password"}
									typeBtn="submit"
									classes={[styles2.FormButton]}
								/>
							</div>
						</div>
						<div
							style={{
								margin: "auto",
								marginTop: "150px",
								display: isLoading ? "unset" : "none",
							}}
						>
							<Loading />
						</div>
						<div
							className={styles3.ProfileLayout}
							style={{ display: isLoading ? "none" : "unset" }}
						>
							<div className={styles2.AlertBox}>
								<Alert
									type="danger"
									isShow={alertDanger.state}
									setShowFn={() => {}}
									message={alertDanger.content}
								/>
							</div>
							<div className={styles2.FormFieldBox}>
								<div className={styles2.TitleInput}>Password Lama</div>
								<InputForm
									refData={fieldProfile.lastPass}
									type={"password"}
									placeholder={"Tuliskan password lama kamu"}
								/>
							</div>
							<div className={styles2.FormFieldBox}>
								<div className={styles2.FormFooter}>
									Password lama, wajib diisi jika kamu pernah membuat password
									saat register ataupun pernah mengubah password sebelumnya.
									Jika kamu lupa password sebelumnya, silahkan hubungi admin
									Agendakota.id.
								</div>
							</div>
							<div className={styles2.FormFieldBox}>
								<div className={styles2.TitleInput}>Password Baru</div>
								<InputForm
									refData={fieldProfile.newPass}
									type={"password"}
									placeholder={"Tuliskan password baru yang diinginkan"}
								/>
							</div>
							<div className={styles2.FormFieldBox}>
								<div className={styles2.TitleInput}>Konfirmasi Password</div>
								<InputForm
									refData={fieldProfile.confirmPass}
									type={"password"}
									placeholder={"Tuliskan kembali password baru diatas"}
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Setting;
