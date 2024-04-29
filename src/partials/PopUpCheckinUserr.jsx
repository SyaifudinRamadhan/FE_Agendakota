import React, { useEffect, useState } from "react";
import styles from "./styles/PopUpCheckin.module.css";
import {
	BiArrowBack,
	BiBarcodeReader,
	BiCheckCircle,
	BiError,
	BiQrScan,
	BiX,
} from "react-icons/bi";
import { QrScanner } from "@yudiel/react-qr-scanner";
import Button from "../components/Button";
import InputForm from "../components/InputForm";
import axios from "axios";
import Loading from "../components/Loading";
import moment, { locale } from "moment";
import PopUp from "./PopUp";

// let codes = "";
// let load = 0;

let handleKeydown = null;

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

const checkin = async ({ eventId }) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/api/checkin",
			{
				event_id: eventId,
			},
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

const PopUpCheckinUser = ({
	fnClose = () => {},

	isLogin,
	fnSetLogin = () => {},
	fnSetGlobalLoding = () => {},
}) => {
	const [menu, setMenu] = useState("QR Scan");
	// const [menu, setMenu] = useState("Alert");
	const [lastMenu, setLastMenu] = useState("");
	// const [strCode, setStrCode] = useState(null);
	// const [enterCLick, setEnterClick] = useState(false);
	// const [firstLoad, setFirstLoadState] = useState(true);
	const [isLoading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		state: false,
		type: "",
		content: "",
	});
	const [pausedProcess, setPausedProcess] = useState(null);
	const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));

	const handleCheckin = (qrStr) => {
		setLoading(true);
		checkin({ eventId: qrStr }).then((res) => {
			if (res.status === 201) {
				setAlert({
					state: true,
					type: "success",
					content: (
						<div className={styles.NotifBox}>
							<div className={styles.IslandGroup}>
								Checkin
								<div className={styles.DynaminIsland}>
									<BiCheckCircle />
									<p>Success</p>
								</div>
							</div>
							<div className={styles.ProfileBox}>
								<img
									src={process.env.REACT_APP_BACKEND_URL + res.data.user.photo}
									className={styles.ProfileIcon}
								/>
								<div>
									<b>{res.data.user.name}</b>
								</div>
								<div>{res.data.user.email}</div>
								<div style={{ marginTop: "20px" }}>
									<b>
										{res.data.ticket.name} - {res.data.event.name}
									</b>
								</div>
								<div>
									{moment(res.data.purchase.created_at)
										.locale("id")
										.format("DD MMM Y")}
								</div>
								<div>
									<b>Rp. {numberFormat.format(res.data.purchase.amount)},-</b>
								</div>
								<div>
									<b>
										{" "}
										Checkin On{" "}
										{moment(res.data.checkin_on)
											.locale("id")
											.format("DD MMM Y")}
									</b>
								</div>
							</div>
						</div>
					),
				});
			} else if (res.status === 401) {
				fnSetLogin(false);
				setPausedProcess(`checkin~!@!~${qrStr}`);
			} else {
				setAlert({
					state: true,
					type: "danger",
					content:
						res.status == 404
							? "Transaksi tidak dapat ditemukan / kadaluwarsa"
							: res.status == 403
							? "Tiket sudah tidak berlaku / sudah digunakan"
							: "Error internal server. Silahkan coba lagi",
				});
			}
			setLoading(false);
		});
	};

	useEffect(() => {
		if (isLogin && pausedProcess) {
			console.log(isLogin, pausedProcess);
			handleCheckin(pausedProcess.split("~!@!~")[1]);
			setPausedProcess(null);
		}
	}, [pausedProcess, isLogin]);

	return (
		<PopUp
			isActive
			title=""
			width="45%"
			content={
				<div className={styles.MainContainer}>
					{isLoading ? (
						<Loading />
					) : (
						<>
							<div className={styles.Header}>
								<div>User Checkin</div>
								<BiX
									className={styles.Right}
									onClick={() => {
										fnClose(false);
										setMenu("QR Scan");
										// codes = "";
										// document.removeEventListener("keydown", handleKeydown);
										fnSetGlobalLoding(true);
										setTimeout(() => {
											fnSetGlobalLoding(false);
										}, 100);
									}}
								/>
							</div>
							{menu === "QR Scan" ? (
								<div id="qr-scan" className={styles.Center}>
									<QrScanner
										onDecode={(result) => {
											console.log(result);
											handleCheckin(result);
											setLastMenu(menu);
											setMenu("Alert");
										}}
										onError={(error) => {
											console.log(error?.message);
											setLastMenu(menu);
											setMenu("Alert");
										}}
									/>
								</div>
							) : (
								<div id="alert" className={`${styles.Center} ${styles.Alert}`}>
									{alert.type == "danger" ? <BiError /> : <></>}
									<div>
										{alert.content
											? alert.content
											: "Error !!! Silahkan Coba lagi !!!"}
									</div>
									<Button
										title={"Ok"}
										fnOnClick={() => {
											setMenu(lastMenu);
										}}
									/>
								</div>
							)}
						</>
					)}
				</div>
			}
		/>
	);
};

export default PopUpCheckinUser;
