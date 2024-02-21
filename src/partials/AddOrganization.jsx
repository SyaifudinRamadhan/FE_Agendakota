import React, { useEffect, useRef, useState } from "react";
import {
	BiChevronDown,
	BiCircle,
	BiFilter,
	BiGroup,
	BiPlus,
	BiPlusCircle,
} from "react-icons/bi";
import Button from "../components/Button";
import PopUp from "./PopUp";
import Select from "react-select";
import TextArea from "../components/TextArea";
import Alert from "../components/Alert";
import config from "../config";
import { useNavigate } from "react-router-dom";
import InputLabeled from "../components/InputLabeled";
import FieldBox from "../components/FieldBox";
import axios from "axios";

const loadAddOrg = async ({ type, name, interest, desc }) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/api/org/register-org",
			{
				type: type,
				name: name,
				interest: interest,
				desc: desc,
			},
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
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

const AddOrganization = ({
	isPopUpAddOrg,
	setPopUpAddOrg,
	organizers,
	setOrganizers,
	setLogin,
}) => {
	const [showAlert, setShowAlert] = useState({
		state: false,
		type: "",
		content: "",
	});
	const [isLoading, setLoading] = useState(false);
	const orgName = useRef(null);
	const orgType = useRef(null);
	const interestEvt = useRef(null);
	const desc = useRef(null);
	const navigate = useNavigate();

	const resetAlert = () => {
		setShowAlert({
			state: false,
			type: "",
			content: "",
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (
			!orgName.current ||
			orgName.current.value === "" ||
			!orgType.current ||
			orgType.current.getValue().length === 0 ||
			!interestEvt.current ||
			interestEvt.current.getValue().length === 0 ||
			desc.current.value === ""
		) {
			setShowAlert({
				state: true,
				type: "danger",
				content: "Semua field wajib diisi",
			});
		} else {
			setLoading(true);
			loadAddOrg({
				type: orgType.current
					.getValue()
					.map((val) => val.value)
					.join("^~!@!~^"),
				name: orgName.current.value,
				interest: interestEvt.current
					.getValue()
					.map((val) => val.value)
					.join("^~!@!~^"),
				desc: desc.current.value,
			}).then((res) => {
				if (res.status === 201) {
					setOrganizers([...organizers, res.data.data]);
					setShowAlert({
						state: true,
						type: "success",
						content: "Data organizer berhasil ditambahkan",
					});
					setTimeout(() => {
						setPopUpAddOrg(false);
					}, 1000);
				} else if (res.status === 401) {
					setLogin(false);
					setShowAlert({
						state: true,
						type: "danger",
						content:
							"Sesi login telah habis, silahkan login dahulu dan coba lagi !!!",
					});
				} else {
					setShowAlert({
						state: true,
						type: "danger",
						content: "Pastikan semua field sudah terisi dengan benar",
					});
				}
				setLoading(false);
				setTimeout(() => {
					resetAlert();
				}, 5000);
			});
		}
	};

	return (
		<PopUp
			isActive={isPopUpAddOrg}
			setActiveFn={setPopUpAddOrg}
			width="40%"
			content={
				<form style={{ display: "grid" }} onSubmit={onSubmit}>
					<Alert
						isShow={showAlert.state}
						setShowFn={setShowAlert}
						type={showAlert.type}
						message={showAlert.content}
					/>
					<InputLabeled
						id={"org_name"}
						type={"text"}
						placeholder={"Nama Organisasi"}
						refData={orgName}
						label={"Nama Organisasi"}
						iconSvg={<BiGroup />}
					/>
					<FieldBox
						id={"type_org"}
						iconSvg={<BiFilter />}
						label={"Tipe Organisasi"}
						style={{ marginTop: "10px" }}
					>
						<Select
							id="type_org"
							options={config.orgTypeOptions}
							className="basic-multi-select"
							ref={orgType}
							styles={{
								option: (basicStyle, state) => ({
									...basicStyle,
									backgroundColor: state.isFocused ? "#fecadf" : "white",
								}),
								control: (basicStyle, state) => ({
									...basicStyle,
									// width: "100%",
									// textAlign: "left",
									// margin: "unset",
									display: "flex",
									flexDirection: "row",
									borderStyle: "none!important",
									boxShadow: "none!important",
									textAlign: "end",
								}),
								container: (basicStyle, state) => ({
									...basicStyle,
									width: "100%",
									margin: "unset",
									borderRadius: "8px",
								}),
							}}
						/>
					</FieldBox>
					<FieldBox
						id={"interest"}
						iconSvg={<BiFilter />}
						label={"Tertarik Dengan"}
						style={{ marginTop: "10px" }}
					>
						<Select
							id="interest"
							isMulti
							options={config.interestEventOptions}
							ref={interestEvt}
							className="basic-multi-select"
							styles={{
								option: (basicStyle, state) => ({
									...basicStyle,
									backgroundColor: state.isFocused ? "#fecadf" : "white",
								}),
								control: (basicStyle, state) => ({
									...basicStyle,
									// width: "100%",
									// textAlign: "left",
									// margin: "unset",
									display: "flex",
									flexDirection: "row",
									borderStyle: "none!important",
									boxShadow: "none!important",
									textAlign: "end",
								}),
								container: (basicStyle, state) => ({
									...basicStyle,
									width: "100%",
									margin: "unset",
									borderRadius: "8px",
								}),
							}}
						/>
					</FieldBox>
					<FieldBox
						id={"org_desc"}
						label={""}
						style={{
							marginTop: "10px",
							marginBottom: "20px",
							flexDirection: "column",
							height: "unset",
							alignItems: "unset",
						}}
						contentWidth={"100%"}
					>
						<TextArea
							id={"org_desc"}
							placehorder={"Deskripsi organisasi"}
							refData={desc}
							style={{
								width: "100%",
							}}
							className={"no-border-outline-shadow"}
						/>
					</FieldBox>
					{isLoading ? (
						<div style={{ display: "flex" }}>
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
						</div>
					) : (
						<div style={{ display: "flex" }}>
							<Button
								title={"Simpan"}
								typeBtn={"submit"}
								style={{ margin: "auto", width: "100%" }}
							/>
						</div>
					)}
				</form>
			}
		/>
	);
};

export default AddOrganization;
