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
import axios from "axios";
import ErrorPage from "../../partials/ErrorPage";

const handleSuccess = (res) => {
	return {
		data: res.data,
		status: res.status,
	};
};

const handleError = (error) => {
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
};

const loadData = async ({ orgId }) => {
	try {
		let res = await axios.get(
			process.env.REACT_APP_BACKEND_URL + "/api/org/" + orgId + "/org-legality",
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return handleSuccess(res);
	} catch (error) {
		return handleError(error);
	}
};

const addData = async ({
	orgId,
	type_legality,
	pic_name,
	nic_number,
	nic_image,
	tax_id_number,
	tax_image,
	company_name,
	business_entity,
}) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL +
				"/api/org/" +
				orgId +
				"/org-legality/create",
			{
				type_legality: type_legality,
				pic_name: pic_name,
				nic_number: nic_number,
				nic_image: nic_image.files[0],
				tax_id_number: tax_id_number,
				tax_image: tax_image.files[0],
				company_name: company_name,
				business_entity: business_entity,
			},
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return handleSuccess(res);
	} catch (error) {
		return handleError(error);
	}
};

const updateData = async ({
	orgId,
	type_legality,
	pic_name,
	nic_number,
	nic_image,
	tax_id_number,
	tax_image,
	company_name,
	business_entity,
}) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL +
				"/api/org/" +
				orgId +
				"/org-legality/update",
			{
				type_legality: type_legality,
				pic_name: pic_name,
				nic_number: nic_number,
				nic_image: nic_image.files.length === 0 ? null : nic_image.files[0],
				tax_id_number: tax_id_number,
				tax_image: tax_image.files.length === 0 ? null : tax_image.files[0],
				company_name: company_name,
				business_entity: business_entity,
				_method: "PUT",
			},
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return handleSuccess(res);
	} catch (error) {
		return handleError(error);
	}
};

const FormLayout = ({
	fnSetLoad = () => {},
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
	orgId,
	fnSetLogin,
	isLogin,
	fnSetData,
}) => {
	const [inputBtn, setInputBtnValue] = useState("Individu");
	const [alertDanger, setAlertDanger] = useState({
		state: false,
		variant: "danger",
		content: "Semua field form ini wajib diisi !!!",
	});
	const [loop, setLoop] = useState(0);
	const [pausedProcess, setPausedProcess] = useState(null);

	const dummyLoad = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 3000);
		});
	};

	const hanldeAlertDanger = (message) => {
		setAlertDanger({ state: true, variant: "danger", content: message });
		setTimeout(() => {
			setAlertDanger({
				state: false,
				variant: "danger",
				content: "Semua field form ini wajib diisi !!!",
			});
		}, 3000);
	};

	const handleResponse = (res) => {
		if (res.status === 201 || res.status === 202) {
			fnSetData(res.data.data);
			setAlertDanger({
				state: true,
				variant: "success",
				content: "Data legalitas berhasil disimpan / diperbarui",
			});
			setTimeout(() => {
				setAlertDanger({
					state: false,
					variant: "success",
					content: "Data legalitas berhasil disimpan / diperbarui",
				});
			}, 3000);
		} else if (res.status === 401) {
			fnSetLogin(false);
			setPausedProcess("submit");
			if (!isEdit) {
				fnSetPopUpActive(true);
			}
		} else {
			setAlertDanger({
				state: true,
				variant: "danger",
				content: "Terjadi kesalahan. Mohon periksa ulang dan coba lagi !!!",
			});
			setTimeout(() => {
				setAlertDanger({
					state: false,
					variant: "danger",
					content: "Terjadi kesalahan. Mohon periksa ulang dan coba lagi !!!",
				});
				if (!isEdit) {
					fnSetPopUpActive(true);
				}
			}, 3000);
		}
		fnSetIsLoading(false);
	};

	const handleSubmit = (e) => {
		if (e) {
			e.preventDefault();
		}
		if (
			!fieldLegality.picName.current ||
			fieldLegality.picName.current.value === "" ||
			fieldLegality.picName.current.value === " " ||
			!fieldLegality.ktpStr.current ||
			fieldLegality.ktpStr.current.value === "" ||
			fieldLegality.ktpStr.current.value === " " ||
			!fieldLegality.npwpStr.current ||
			fieldLegality.npwpStr.current.value === "" ||
			fieldLegality.npwpStr.current.value === " " ||
			(isEdit === false &&
				(!fieldLegality.ktpImage.current ||
					fieldLegality.ktpImage.current.files.length === 0 ||
					!fieldLegality.npwpImage.current ||
					fieldLegality.npwpImage.current.files.length === 0))
		) {
			// set content to error
			hanldeAlertDanger("Semua field form ini wajib diisi !!!");
		} else if (
			inputBtn === "Perusahaan" &&
			(!fieldLegality.compName.current ||
				fieldLegality.compName.current.value === "" ||
				fieldLegality.compName.current.value === " " ||
				!fieldLegality.compType.current ||
				fieldLegality.compType.current.getValue().length === 0)
		) {
			hanldeAlertDanger("Semua field form ini wajib diisi !!!");
		} else {
			fnSetIsLoading(true);
			fnSetPopUpActive(false);
			isEdit
				? updateData({
						orgId: orgId,
						type_legality: inputBtn,
						pic_name: fieldLegality.picName.current.value,
						nic_number: fieldLegality.ktpStr.current.value,
						nic_image: fieldLegality.ktpImage.current,
						tax_id_number: fieldLegality.npwpStr.current.value,
						tax_image: fieldLegality.npwpImage.current,
						company_name:
							inputBtn === "Perusahaan"
								? fieldLegality.compName.current.value
								: null,
						business_entity:
							inputBtn === "Perusahaan"
								? fieldLegality.compType.current.getValue()[0].value
								: null,
				  }).then(handleResponse)
				: addData({
						orgId: orgId,
						type_legality: inputBtn,
						pic_name: fieldLegality.picName.current.value,
						nic_number: fieldLegality.ktpStr.current.value,
						nic_image: fieldLegality.ktpImage.current,
						tax_id_number: fieldLegality.npwpStr.current.value,
						tax_image: fieldLegality.npwpImage.current,
						company_name:
							inputBtn === "Perusahaan"
								? fieldLegality.compName.current.value
								: null,
						business_entity:
							inputBtn === "Perusahaan"
								? fieldLegality.compType.current.getValue()[0].value
								: null,
				  }).then(handleResponse);
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

	useEffect(() => {
		if (pausedProcess && isLogin) {
			handleSubmit();
			setPausedProcess(null);
		}
	}, [isLogin, pausedProcess]);

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
				<Alert
					type={alertDanger.variant}
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
							viewOnClick={true}
							fnSetAlert={(alert) => {
								setAlertDanger({
									state: alert.state,
									variant: "danger",
									content: alert.content,
								});
							}}
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
							viewOnClick={true}
							fnSetAlert={(alert) => {
								setAlertDanger({
									state: alert.state,
									variant: "danger",
									content: alert.content,
								});
							}}
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

const OrganizerLegality = ({ organization, fnSetLogin, isLogin }) => {
	const [orgSelected, setOrgSelected] = useState("");
	const [popUpActive, setPopUpActive] = useState(false);
	const [popUpTitle, setPopUpTitle] = useState("");
	const [popUpContent, setPopUpContent] = useState(<></>);
	const [isLoading, setLoading] = useState(true);
	const [legalityData, setData] = useState(null);
	const [firstLoad, setFirstLoad] = useState(true);
	const [errorState, setErrorState] = useState(false);

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
				fnSetLoad={setFirstLoad}
				fnSetIsLoading={setLoading}
				fnSetPopUpActive={setPopUpActive}
				fieldLegality={fieldLegality}
				fnSetPopUpContent={setPopUpContent}
				orgId={orgSelected}
				fnSetLogin={fnSetLogin}
				isLogin={isLogin}
				fnSetData={setData}
			/>
		);
		setPopUpActive(true);
	};

	useEffect(() => {
		document.title = "Legality - Agendakota";
		if (organization.length > 0) {
			setLoading(true);
			setErrorState(false);
			loadData({ orgId: organization[0].id }).then((res) => {
				if (res.status === 200) {
					console.log(res.data.data.legality_data);
					setData(res.data.data.legality_data);
					setFirstLoad(false);
				} else if (res.status === 401) {
					fnSetLogin(false);
				} else {
					setErrorState(true);
				}
				setLoading(false);
			});
			setOrgSelected(organization[0].id);
			setPopUpContent(<></>);
		}
	}, [organization]);
	return (
		<>
			<PopUp
				title={popUpTitle}
				content={
					<>
						<div style={{ display: isLoading ? "none" : "unset" }}>
							{popUpContent}
						</div>
					</>
				}
				isActive={popUpActive}
				setActiveFn={setPopUpActive}
				width="95%"
			/>
			<div className="content organizer">
				<div className={styles.DecorationBox}>
					<div className={styles.Decoration}></div>
				</div>
				{errorState ? (
					<ErrorPage />
				) : (
					<>
						<div
							style={{
								display: isLoading ? "unset" : "none",
								margin: "auto",
								marginTop: "150px",
							}}
						>
							<Loading />
						</div>
						<div style={{ display: isLoading ? "none" : "unset" }}>
							<div className={styles2.FormSplitBox}>
								{legalityData !== null ? (
									<></>
								) : (
									<h1 className={styles.Title}>Legality</h1>
								)}
							</div>
							{legalityData !== null ? (
								<div style={{ marginTop: "40px" }}>
									<FormLayout
										fnSetLoad={setFirstLoad}
										fnSetIsLoading={setLoading}
										fnSetPopUpActive={setPopUpActive}
										fieldLegality={fieldLegality}
										defaultValue={{
											picName: legalityData.pic_name,
											ktpStr: legalityData.pic_nic,
											ktpImage:
												process.env.REACT_APP_BACKEND_URL +
												legalityData.pic_nic_image,
											npwpStr: legalityData.tax_id_number,
											npwpImage:
												process.env.REACT_APP_BACKEND_URL +
												legalityData.tax_image,
											compName: legalityData.company_name,
											compType: legalityData.business_entity,
											type: legalityData.type_legality,
											isVerfied: legalityData.status,
										}}
										fnSetPopUpContent={setPopUpContent}
										isEdit={true}
										cancelBtn={false}
										orgId={orgSelected}
										fnSetLogin={fnSetLogin}
										fnSetData={setData}
										isLogin={isLogin}
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
											Kamu wajib membuat data legalitas untuk organisasimu agar
											event <br />
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
				)}
			</div>
		</>
	);
};

export default OrganizerLegality;
