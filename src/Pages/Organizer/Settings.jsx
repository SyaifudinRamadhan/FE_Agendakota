import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/PersonalEvent.module.css";
import styles2 from "../styles/Legality.module.css";
import styles3 from "../styles/Settings.module.css";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import config from "../../config";
import Select from "react-select";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import InputForm from "../../components/InputForm";
import InputImage from "../../components/InputImage";
import Loading from "../../components/Loading";
import PopUp from "../../partials/PopUp";
import { BiError } from "react-icons/bi";

const OrganizerSettings = () => {
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
		photo: "/images/DM_Anime_Satou.png",
		name: "gbfdbufnf",
		email: "fbuduferugnu@gamil.com",
		interest: "pariwisata|tour",
		banner: null,
		whatsapp: "087794497615",
		instagram: "udbfdbfyd",
		linkedin: "shdbfjdnf",
		twitter: "hbfunf",
		website: "dbfhdbf",
		desc: "Lorem ipsum dolor sit amet",
	};

	const fieldProfile = {
		photo: useRef(null),
		name: useRef(null),
		email: useRef(null),
		interest: useRef(null),
		banner: useRef(null),
		whatsapp: useRef(null),
		instagram: useRef(null),
		linkedin: useRef(null),
		twitter: useRef(null),
		website: useRef(null),
		desc: useRef(null),
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
			fieldProfile.name.current.value === "" ||
			fieldProfile.email.current.value === "" ||
			fieldProfile.desc.current.value === "" ||
			fieldProfile.interest.current.value === "" ||
			fieldProfile.instagram.current.value === "" ||
			fieldProfile.linkedin.current.value === "" ||
			fieldProfile.twitter.current.value === "" ||
			fieldProfile.website.current.value === "" ||
			fieldProfile.whatsapp.current.value === ""
		) {
			setAlertDanger({
				state: true,
				content: "Semua field selain foto profil dan banner wajib diisi !!!",
			});
			setTimeout(() => {
				setAlertDanger({
					state: false,
					content: "Semua field selain foto profil dan banner wajib diisi !!!",
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
			fieldProfile.name.current !== null &&
			fieldProfile.email.current !== null &&
			fieldProfile.whatsapp.current !== null &&
			fieldProfile.instagram.current !== null &&
			fieldProfile.linkedin.current !== null &&
			fieldProfile.twitter.current !== null &&
			fieldProfile.website.current !== null
		) {
			fieldProfile.name.current.value = defaultValue.name;
			fieldProfile.email.current.value = defaultValue.email;
			fieldProfile.whatsapp.current.value = defaultValue.whatsapp;
			fieldProfile.instagram.current.value = defaultValue.instagram;
			fieldProfile.linkedin.current.value = defaultValue.linkedin;
			fieldProfile.twitter.current.value = defaultValue.twitter;
			fieldProfile.website.current.value = defaultValue.website;
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
			<HeaderOrganizer
				active={"settings"}
				activeOrg={localStorage.getItem("active-org")}
				orgSelected={orgSelected}
				setOrgSelected={setOrgSelected}
			/>
			<SidebarOrganizer
				active={"settings"}
				activeOrg={localStorage.getItem("active-org")}
				orgSelected={orgSelected}
				setOrgSelected={setOrgSelected}
			/>
			<div className="content organizer">
				<form
					onSubmit={handleSubmit}
					className={`${styles2.FormLayout}`}
					style={{ marginTop: "20px" }}
				>
					<div className={styles2.FormHeader}>
						<div className={styles2.TitleArea}>
							<div className={styles.Title}>Settings</div>
							<div className={styles2.Desc}>
								Manage information about the company profile
							</div>
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
										<div className={styles2.TitleInput}>Nama Organisasi</div>
										<InputForm
											refData={fieldProfile.name}
											type={"text"}
											placeholder={"Tuliskan nama organisasi"}
										/>
									</div>
									<div className={styles2.FormFieldBox}>
										<div className={styles2.TitleInput}>Email Organisasi</div>
										<InputForm
											refData={fieldProfile.email}
											type={"text"}
											placeholder={"Tuliskan alamat email organisasi"}
										/>
									</div>
									<div className={styles2.FormFieldBox}>
										<div className={styles2.TitleInput}>
											Tertarik Mengadakan
										</div>
										<Select
											isMulti
											options={config.interestEventOptions}
											ref={fieldProfile.interest}
											className="basic-multi-select"
											styles={{
												option: (basicStyle, state) => ({
													...basicStyle,
													backgroundColor: state.isFocused
														? "#fecadf"
														: "white",
												}),
											}}
											defaultValue={
												defaultValue.interest === null
													? null
													: defaultValue.interest.split("|").map((text) => ({
															label: text,
															value: text,
													  }))
											}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className={styles2.FormFieldBox}>
							<div className={styles2.TitleInput}>Banner</div>
							<InputImage
								refData={fieldProfile.banner}
								defaultFile={defaultValue.banner}
								style={{ height: "unset", aspectRatio: 5 / 2 }}
							/>
						</div>
						<div className={styles2.FormFieldBox}>
							<div className={styles2.FormSplitBox}>
								<div className={styles2.FormSplitContent}>
									<div className={styles2.TitleInput}>WhatsApp Organizer</div>
									<InputForm
										refData={fieldProfile.whatsapp}
										type={"text"}
										placeholder={"Tuliskan alamat whatsapp organisasi"}
									/>
								</div>
								<div className={styles2.FormSplitContent}>
									<div className={styles2.TitleInput}>Instagram Organizer</div>
									<InputForm
										refData={fieldProfile.instagram}
										type={"text"}
										placeholder={"Tuliskan alamat instagram organisasi"}
									/>
								</div>
							</div>
						</div>
						<div className={styles2.FormFieldBox}>
							<div className={styles2.FormSplitBox}>
								<div className={styles2.FormSplitContent}>
									<div className={styles2.TitleInput}>LinkedIn Organizer</div>
									<InputForm
										refData={fieldProfile.linkedin}
										type={"text"}
										placeholder={"Tuliskan alamat linkedin organisasi"}
									/>
								</div>
								<div className={styles2.FormSplitContent}>
									<div className={styles2.TitleInput}>Twitter Organizer</div>
									<InputForm
										refData={fieldProfile.twitter}
										type={"text"}
										placeholder={"Tuliskan alamat twitter organisasi"}
									/>
								</div>
							</div>
						</div>
						<div className={styles2.FormFieldBox}>
							<div className={styles2.TitleInput}>Website Organizer</div>
							<InputForm
								refData={fieldProfile.website}
								type={"text"}
								placeholder={"Tuliskan alamat website organisasi"}
							/>
						</div>
						<div className={styles2.FormFieldBox}>
							<div className={styles2.TitleInput}>Deskripsi Organisasi</div>
							<TextArea
								placehorder="Deskripkan tentang organisasi"
								refData={fieldProfile.desc}
								content={defaultValue.desc}
							/>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default OrganizerSettings;
