import React, { useEffect, useRef, useState } from "react";
import SidebarUser from "../../partials/SidebarUser";
import HeaderUser from "../../partials/HeaderUser";
import styles from "../styles/PersonalEvent.module.css";
import styles2 from "../styles/Legality.module.css";
import styles3 from "../styles/Settings.module.css";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import InputForm from "../../components/InputForm";
import InputImage from "../../components/InputImage";
import Loading from "../../components/Loading";
import PopUp from "../../partials/PopUp";
import { BiError } from "react-icons/bi";

const UserProfile = () => {
	const [orgSelected, setOrgSelected] = useState("");
	const [alertDanger, setAlertDanger] = useState({
		state: false,
		content: "Semua field wajib diisi !",
	});
	const [popUpContent, setPopUpContent] = useState(<></>);
	const [isLoading, setLoading] = useState(false);
	const [popUpActive, setPopUpActive] = useState(false);
	const [loop, setLoop] = useState(0);

	const defaultValue = {
		f_name: "Ahmad",
		l_name: "Syaifudin",
		name: "ASR",
		email: "syaifudinramadhan@gmail.com",
		photo: "/images/DM_Anime_Satou.png",
		phone: "088217466532",
		linkedin: "-",
		instagram: "-",
		twitter: "-",
		whatsapp: "-",
	};

	const fieldProfile = {
		fName: useRef(null),
		lName: useRef(null),
		name: useRef(null),
		email: useRef(null),
		photo: useRef(null),
		phone: useRef(null),
		linkedin: useRef(null),
		instagram: useRef(null),
		twitter: useRef(null),
		whatsapp: useRef(null),
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
			fieldProfile.fName.current.value === "" ||
			fieldProfile.lName.current.value === "" ||
			fieldProfile.name.current.value === "" ||
			fieldProfile.email.current.value === "" ||
			fieldProfile.phone.current.value === "" ||
			fieldProfile.linkedin.current.value === "" ||
			fieldProfile.instagram.current.value === "" ||
			fieldProfile.twitter.current.value === "" ||
			fieldProfile.whatsapp.current.value === ""
		) {
			setAlertDanger({
				state: true,
				content: "Semua field selain foto profil wajib diisi !!!",
			});
			setTimeout(() => {
				setAlertDanger({
					state: false,
					content: "Semua field selain foto profil wajib diisi !!!",
				});
			}, 3000);
		} else {
			setLoading(true);
			dummyLoad().then((res) => {
				if (!res) {
					setPopUpContent(
						<div className={styles3.PopupNotify}>
							<div>Data profile gagal diperbarui. Silahkan coba lagi !</div>
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

	useEffect(() => {
		document.title = "Settings - Agendakota";
		if (
			loop < 1 &&
			(fieldProfile.fName.current !== null ||
				fieldProfile.lName.current !== null ||
				fieldProfile.name.current !== null ||
				fieldProfile.email.current !== null ||
				fieldProfile.phone.current !== null ||
				fieldProfile.linkedin.current !== null ||
				fieldProfile.instagram.current !== null ||
				fieldProfile.twitter.current !== null ||
				fieldProfile.whatsapp.current !== null)
		) {
			fieldProfile.fName.current.value = defaultValue.f_name;
			fieldProfile.lName.current.value = defaultValue.l_name;
			fieldProfile.name.current.value = defaultValue.name;
			fieldProfile.email.current.value = defaultValue.email;
			fieldProfile.phone.current.value = defaultValue.phone;
			fieldProfile.linkedin.current.value = defaultValue.linkedin;
			fieldProfile.instagram.current.value = defaultValue.instagram;
			fieldProfile.twitter.current.value = defaultValue.twitter;
			fieldProfile.whatsapp.current.value = defaultValue.whatsapp;
			setLoop(loop + 1);
		}
	});
	return (
		<>
			<PopUp
				width="45%"
				isActive={popUpActive}
				setActiveFn={setPopUpActive}
				content={popUpContent}
				title="Update Profile"
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
								<h1 className={styles.Title}>Profil Akun</h1>
							</div>
							<div className={styles2.HeaderControl}>
								<Button
									title={"Simpan"}
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
								<div className={styles2.FormSplitBox}>
									<div>
										<div className={styles2.FormFieldBox}>
											<div className={styles2.TitleInput}>Photo Profile</div>
											<InputImage
												refData={fieldProfile.photo}
												defaultFile={defaultValue.photo}
												style={{ width: "200px", aspectRatio: 1 / 1 }}
											/>
										</div>
									</div>
									<div style={{ width: "100%" }}>
										<div className={styles2.FormFieldBox}>
											<div className={styles2.TitleInput}>Username</div>
											<InputForm
												refData={fieldProfile.name}
												type={"text"}
												placeholder={"Tuliskan username mu"}
											/>
										</div>
										<div className={styles2.FormFieldBox}>
											<div className={styles2.TitleInput}>Email</div>
											<InputForm
												refData={fieldProfile.email}
												type={"text"}
												placeholder={"Tuliskan alamat emailmu"}
											/>
										</div>
										<div className={styles2.FormFieldBox}>
											<div className={styles2.TitleInput}>Nama Depan</div>
											<InputForm
												refData={fieldProfile.fName}
												type={"text"}
												placeholder={"Tuliskan nama depanmu"}
											/>
										</div>
										<div className={styles2.FormFieldBox}>
											<div className={styles2.TitleInput}>Nama Belakang</div>
											<InputForm
												refData={fieldProfile.lName}
												type={"text"}
												placeholder={"Tuliskan belakangmu"}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className={styles2.FormFieldBox}>
								<div className={styles2.FormSplitBox}>
									<div className={styles2.FormSplitContent}>
										<div className={styles2.TitleInput}>WhatsApp</div>
										<InputForm
											refData={fieldProfile.whatsapp}
											type={"text"}
											placeholder={"Tuliskan nomor whatsappmu yang aktif"}
										/>
									</div>
									<div className={styles2.FormSplitContent}>
										<div className={styles2.TitleInput}>Instagram</div>
										<InputForm
											refData={fieldProfile.instagram}
											type={"text"}
											placeholder={"Tuliskan alamat instagram aktifmu"}
										/>
									</div>
								</div>
							</div>
							<div className={styles2.FormFieldBox}>
								<div className={styles2.FormSplitBox}>
									<div className={styles2.FormSplitContent}>
										<div className={styles2.TitleInput}>LinkedIn</div>
										<InputForm
											refData={fieldProfile.linkedin}
											type={"text"}
											placeholder={"Tuliskan alamat linkedin"}
										/>
									</div>
									<div className={styles2.FormSplitContent}>
										<div className={styles2.TitleInput}>Twitter</div>
										<InputForm
											refData={fieldProfile.twitter}
											type={"text"}
											placeholder={"Tuliskan alamat twitter"}
										/>
									</div>
								</div>
							</div>
							<div className={styles2.FormFieldBox}>
								<div className={styles2.TitleInput}>Nomor Ponsel</div>
								<InputForm
									refData={fieldProfile.phone}
									type={"text"}
									placeholder={"Tuliskan nomor ponselmu yang aktif"}
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
