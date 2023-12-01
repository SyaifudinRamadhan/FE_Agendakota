import React, { useEffect, useRef, useState } from "react";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import styles from "../styles/PersonalEvent.module.css";
import styles2 from "../styles/Legality.module.css";
import Button from "../../components/Button";
import {
	BiCheckCircle,
	BiError,
	BiPlusCircle,
	BiQuestionMark,
} from "react-icons/bi";
import PopUp from "../../partials/PopUp";
import InputForm from "../../components/InputForm";
import InputImage from "../../components/InputImage";
import Select from "react-select";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

const FormLayout = ({
	fnSetPopUpActive = () => {},
	fnSetIsLoading = () => {},
	fieldLegality = {
		picName: null,
		ktpStr: null,
		ktpImage: null,
		npwpStr: null,
		npwpImage: null,
		compName: null,
		compType: null,
	},
	isEdit = false,
	readOnly = false,
	cancelBtn = true,
	defaultValue = {
		picName: null,
		ktpStr: null,
		ktpImage: null,
		npwpStr: null,
		npwpImage: null,
		compName: null,
		compType: null,
		type: null,
		isVerfied: null,
	},
	fnSetPopUpContent = () => {},
}) => {
	const [inputBtn, setInputBtnValue] = useState("Individu");
	const [alertDanger, setAlertDanger] = useState({
		state: false,
		content: "Semua field form ini wajib diisi !!!",
	});
	const [loop, setLoop] = useState(0);

	const dummyLoad = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 3000);
		});
	};

	const hanldeAlertDanger = (message) => {
		setAlertDanger({ state: true, content: message });
		setTimeout(() => {
			setAlertDanger({
				state: false,
				content: "Semua field form ini wajib diisi !!!",
			});
		}, 3000);
	};

	const handleResponse = (res) => {
		res
			? fnSetPopUpActive(false)
			: setAlertDanger({
					state: true,
					content: "Data legalitas, gagal dibuat !!!",
			  });
		fnSetIsLoading(false);
		if (!res) {
			setTimeout(() => {
				setAlertDanger({
					state: false,
					content: "Semua field form ini wajib diisi !!!",
				});
			}, 3000);
		} else {
			fnSetPopUpContent(<></>);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			!fieldLegality.picName.current.value ||
			fieldLegality.picName.current.value === "" ||
			fieldLegality.picName.current.value === " " ||
			!fieldLegality.ktpStr.current.value ||
			fieldLegality.ktpStr.current.value === "" ||
			fieldLegality.ktpStr.current.value === " " ||
			!fieldLegality.npwpStr.current.value ||
			fieldLegality.npwpStr.current.value === "" ||
			fieldLegality.npwpStr.current.value === " " ||
			(isEdit === false &&
				(!fieldLegality.ktpImage.current.value ||
					fieldLegality.ktpImage.current.value === "" ||
					fieldLegality.ktpImage.current.value === " " ||
					!fieldLegality.npwpImage.current.value ||
					fieldLegality.npwpImage.current.value === "" ||
					fieldLegality.npwpImage.current.value === " "))
		) {
			// set content to error
			hanldeAlertDanger("Semua field form ini wajib diisi !!!");
		} else {
			if (inputBtn === "Perusahaan") {
				if (
					!fieldLegality.compName.current.value ||
					fieldLegality.compName.current.value === "" ||
					fieldLegality.compName.current.value === " " ||
					!fieldLegality.compType.current.value ||
					fieldLegality.compType.current.value === "" ||
					fieldLegality.compType.current.value === " "
				) {
					// set content to error
					hanldeAlertDanger("Semua field form ini wajib diisi !!!");
				} else {
					fnSetIsLoading(true);
					dummyLoad().then(handleResponse);
				}
			} else {
				fnSetIsLoading(true);
				dummyLoad().then(handleResponse);
			}
		}
	};

	useEffect(() => {
		if (isEdit) {
			if (
				fieldLegality.picName.current !== null &&
				fieldLegality.picName.current.value === ""
			) {
				fieldLegality.picName.current.value = defaultValue.picName;
			}
			if (
				fieldLegality.ktpStr.current !== null &&
				fieldLegality.ktpStr.current.value === ""
			) {
				fieldLegality.ktpStr.current.value = defaultValue.ktpStr;
			}
			if (
				fieldLegality.npwpStr.current !== null &&
				fieldLegality.npwpStr.current.value === ""
			) {
				fieldLegality.npwpStr.current.value = defaultValue.npwpStr;
			}
			if (
				fieldLegality.compName.current !== null &&
				fieldLegality.compName.current.value === ""
			) {
				fieldLegality.compName.current.value = defaultValue.compName;
			}
			if (
				fieldLegality.compType.current !== null &&
				(fieldLegality.compType.current.value === "" ||
					!fieldLegality.compType.current.value)
			) {
				fieldLegality.compType.current.value = defaultValue.compType;
			}
			if (defaultValue.type !== null && readOnly === true) {
				setInputBtnValue(defaultValue.type);
			} else if (defaultValue.type !== null && loop < 1) {
				setInputBtnValue(defaultValue.type);
				setLoop(loop + 1);
			}
		}
	});

	return (
		<form onSubmit={handleSubmit} className={styles2.FormLayout}>
			{readOnly === false ? (
				<div className={styles2.FormHeader}>
					<div className={styles2.TitleArea}>
						<div className={styles.Title}>Legality</div>
						<div className={styles2.Desc}>
							Manage information about the company and PIC representing your
							organizers
						</div>
					</div>
					<div className={styles2.HeaderControl}>
						<Button
							title={"Simpan"}
							typeBtn="submit"
							classes={[styles2.FormButton]}
						/>
						{cancelBtn ? (
							<Button
								title={"Batal"}
								classes={[styles2.FormButton]}
								bgColor={"white"}
								textColor={"#ca0c64"}
								fnOnClick={() => fnSetPopUpActive(false)}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
			) : (
				<></>
			)}
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
				{isEdit && defaultValue.isVerfied ? (
					<Alert
						type="success"
						isShow={true}
						setShowFn={() => {}}
						message={
							<div className={styles2.VerifiedBanner}>
								<BiCheckCircle />
								<div className={styles2.VerifiedText}>Verified</div>
							</div>
						}
						closeBtn={false}
					/>
				) : (
					<></>
				)}
			</div>
			<div className={styles2.FormFieldBox}>
				<div className={styles2.TitleInput}>Jenis Perusahaan</div>
				<div className={styles2.FormSplitBoxFixed}>
					<Button
						fnOnClick={() => {
							setInputBtnValue("Individu");
						}}
						title={"Individu"}
						classes={[
							styles2.FormButton,
							styles2.InputButton,
							inputBtn === "Individu"
								? styles2.InputButtonActive
								: styles2.InputButtonInactive,
						]}
					/>
					<Button
						fnOnClick={() => {
							setInputBtnValue("Perusahaan");
						}}
						title={"Perusahaan"}
						classes={[
							styles2.FormButton,
							styles2.InputButton,
							inputBtn === "Perusahaan"
								? styles2.InputButtonActive
								: styles2.InputButtonInactive,
						]}
					/>
				</div>
			</div>
			<div className={styles2.FormFieldBox}>
				<div className={styles2.TitleInput}>Nama PIC</div>
				<InputForm
					refData={fieldLegality.picName}
					type={"text"}
					placeholder={"Tuliskan nama penanggung jawab"}
					readOnly={readOnly}
				/>
			</div>
			{inputBtn === "Individu" ? (
				<></>
			) : (
				<>
					<div className={styles2.FormFieldBox}>
						<div className={styles2.FormSplitBox}>
							<div className={styles2.FormSplitContent}>
								<div className={styles2.TitleInput}>Nama Perusahaan</div>
								<InputForm
									refData={fieldLegality.compName}
									type={"text"}
									placeholder={"Tuliskan nama perusahaan"}
									readOnly={readOnly}
								/>
							</div>
							<div className={styles2.FormSplitContent}>
								<div className={styles2.TitleInput}>Badan Usaha</div>

								{readOnly ? (
									<Select
										ref={fieldLegality.compType}
										options={[
											{
												label: "Peseroan Terbatas (PT)",
												value: "Peseroan Terbatas (PT)",
											},
											{ label: "CV", value: "CV" },
										]}
										placeholder={"Pilih Jenis Badan Usaha"}
										styles={{
											option: (basicStyle, state) => ({
												...basicStyle,
												backgroundColor: state.isFocused ? "#fecadf" : "white",
											}),
										}}
										value={{
											label: defaultValue.compType,
											value: defaultValue.compType,
										}}
									/>
								) : (
									<Select
										ref={fieldLegality.compType}
										options={[
											{
												label: "Peseroan Terbatas (PT)",
												value: "Peseroan Terbatas (PT)",
											},
											{ label: "CV", value: "CV" },
										]}
										placeholder={"Pilih Jenis Badan Usaha"}
										onChange={(e) => {
											fieldLegality.compType.current.value = e.value;
										}}
										styles={{
											option: (basicStyle, state) => ({
												...basicStyle,
												backgroundColor: state.isFocused ? "#fecadf" : "white",
											}),
										}}
										defaultValue={
											defaultValue.compType === null
												? null
												: {
														label: defaultValue.compType,
														value: defaultValue.compType,
												  }
										}
									/>
								)}
							</div>
						</div>
					</div>
				</>
			)}
			<div className={styles2.FormFieldBox}>
				<div className={styles2.FormSplitBox}>
					<div className={styles2.FormPictureArea}>
						<div className={styles2.TitleInput}>e-KTP PIC</div>
						<InputForm
							readOnly={readOnly}
							refData={fieldLegality.ktpStr}
							type={"text"}
							placeholder={"Tuliskan nomor e-KTP PIC"}
						/>
						<InputImage
							refData={fieldLegality.ktpImage}
							defaultFile={defaultValue.ktpImage}
							hiddenDelete={readOnly}
						/>
					</div>
					<div className={styles2.FormPictureArea}>
						<div className={styles2.TitleInput}>NPWP</div>
						<InputForm
							readOnly={readOnly}
							refData={fieldLegality.npwpStr}
							type={"text"}
							placeholder={"Tuliskan nomor NPWP PIC"}
						/>
						<InputImage
							refData={fieldLegality.npwpImage}
							defaultFile={defaultValue.npwpImage}
							hiddenDelete={readOnly}
						/>
					</div>
				</div>
			</div>
			<div className={styles2.FormFieldBox}>
				<div className={styles2.FormFooter}>
					e-KTP dan NPWP Perusahaan akan berguna untuk mengecheck pada saat
					tahap : pengecheckan pajak, memastikan identitas pengguna origanizer
				</div>
			</div>
		</form>
	);
};

const OrganizerLegality = () => {
	const [orgSelected, setOrgSelected] = useState("");
	const [popUpActive, setPopUpActive] = useState(false);
	const [popUpTitle, setPopUpTitle] = useState("");
	const [popUpContent, setPopUpContent] = useState(<></>);
	const [isLoading, setLoading] = useState(false);

	const legalityData = {
		picName: "sdgbfuydbfubds",
		ktpStr: "gsdujsdbf",
		ktpImage: "/images/certificate.png",
		npwpStr: "ydyufshufh",
		npwpImage: "/images/certificate.png",
		compName: null,
		compType: "Peseroan Terbatas (PT)",
		type: "Perusahaan",
		isVerfied: true,
	};

	// const legalityData = null;

	const fieldLegality = {
		picName: useRef(null),
		ktpStr: useRef(null),
		ktpImage: useRef(null),
		npwpStr: useRef(null),
		npwpImage: useRef(null),
		compName: useRef(null),
		compType: useRef(null),
	};

	const handleOpenAdd = () => {
		setPopUpContent(
			<FormLayout
				fnSetIsLoading={setLoading}
				fnSetPopUpActive={setPopUpActive}
				fieldLegality={fieldLegality}
				fnSetPopUpContent={setPopUpContent}
			/>
		);
		setPopUpActive(true);
	};

	// const handleOpenEdit = () => {
	// 	setPopUpContent(
	// 		<FormLayout
	// 			fnSetIsLoading={setLoading}
	// 			fnSetPopUpActive={setPopUpActive}
	// 			fieldLegality={fieldLegality}
	// 			defaultValue={legalityData}
	// 			fnSetPopUpContent={setPopUpContent}
	// 			isEdit={true}
	// 		/>
	// 	);
	// 	setPopUpActive(true);
	// };

	useEffect(() => {
		document.title = "Legality - Agendakota";
	});
	return (
		<>
			<PopUp
				title={popUpTitle}
				content={
					<>
						<div style={{ display: isLoading ? "unset" : "none" }}>
							<Loading />
						</div>
						<div style={{ display: isLoading ? "none" : "unset" }}>
							{popUpContent}
						</div>
					</>
				}
				isActive={popUpActive}
				setActiveFn={setPopUpActive}
				width="95%"
			/>
			<HeaderOrganizer
				active={"legality"}
				activeOrg={localStorage.getItem("active-org")}
				orgSelected={orgSelected}
				setOrgSelected={setOrgSelected}
			/>
			<SidebarOrganizer
				active={"legality"}
				activeOrg={localStorage.getItem("active-org")}
				orgSelected={orgSelected}
				setOrgSelected={setOrgSelected}
			/>
			<div className="content organizer">
				<div className={styles2.FormSplitBox}>
					{legalityData !== null ? (
						<></>
					) : (
						<h1 className={styles.Title}>Legality</h1>
					)}

					{/* {legalityData !== null ? (
						<Button
							title={"Edit Data"}
							classes={[styles2.FormButton]}
							style={{
								marginLeft: "auto",
								width: "200px",
							}}
							fnOnClick={handleOpenEdit}
						/>
					) : (
						<></>
					)} */}
				</div>
				{legalityData !== null ? (
					<div style={{ marginTop: "40px" }}>
						<FormLayout
							fnSetIsLoading={setLoading}
							fnSetPopUpActive={setPopUpActive}
							fieldLegality={fieldLegality}
							defaultValue={legalityData}
							fnSetPopUpContent={setPopUpContent}
							isEdit={true}
							cancelBtn={false}
						/>
					</div>
				) : (
					<>
						<div className={styles.BlankData}>
							<img
								className={`${styles.IconBlank}`}
								src="/images/certificate.png"
								style={{ width: "unset", marginTop: "40px" }}
							/>
							<div className={styles.BlankTitle}>
								Buat data legalitas untuk organisasimu
							</div>
							<div className={styles.BlankDesc}>
								Kamu wajib membuat data legalitas untuk organisasimu agar event{" "}
								<br />
								yang kamu buat dapat diplubikasikan. Serta agar kamu bisa
								melakukan <br />
								pengajuan penarikan dana (withdraw) penjualan tiketmu.
							</div>
							<Button
								icon={<BiPlusCircle />}
								title={"Buat Legalitas"}
								style={{ width: "unset", margin: "auto" }}
								fnOnClick={handleOpenAdd}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default OrganizerLegality;
