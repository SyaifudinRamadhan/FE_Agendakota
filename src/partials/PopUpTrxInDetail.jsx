import React, { useEffect, useState } from "react";
import styles from "./styles/PopUpTrxInDetail.module.css";
import QRCode from "qrcode.react";
import {
	BiCheckCircle,
	BiChevronDown,
	BiCopy,
	BiError,
	BiInfoCircle,
} from "react-icons/bi";
import config from "../config";
import Button from "../components/Button";
import PopUp from "./PopUp";

const PopUpTrxInDetail = ({ trxData }) => {
	const [payHint, setPayHint] = useState(false);
	const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
	const [interval, setIntervalData] = useState("0j 0m 0d");
	const [firstLoad, setFirstLoaad] = useState(true);
	const [alert, setAlert] = useState({
		state: false,
		type: "",
		content: "",
	});

	const handleCopy = (text) => {
		navigator.clipboard.writeText(text);
		setAlert({
			state: true,
			type: "success",
			content: "Virtual Account berhasil disalin",
		});
	};

	useEffect(() => {
		if (firstLoad) {
			let intervalIn = new Date(trxData.payment.expired) - new Date();
			if (intervalIn > 0) {
				setInterval(() => {
					if (intervalIn > 0) {
						intervalIn -= 1000;
						let objDateTime = new Date(intervalIn);
						setIntervalData(
							`${Math.floor((objDateTime % 86400000) / 3600000)}j ${Math.floor(
								((objDateTime % 8640000) % 3600000) / 60000
							)}m ${Math.floor(
								(((objDateTime % 86400000) % 3600000) % 60000) / 1000
							)}d`
						);
					}
				}, 1000);
			}
			setFirstLoaad(false);
		}
	}, [firstLoad]);

	return (
		<>
			{alert.state ? (
				<PopUp
					isActive
					title="Notifikasi"
					content={
						<div className={styles.PopUpAlert}>
							{alert.type === "danger" ? (
								<BiError style={{ color: "#ca0c64" }} />
							) : alert.type === "warning" ? (
								<BiInfoCircle style={{ color: "yellow" }} />
							) : (
								<BiCheckCircle style={{ color: "green" }} />
							)}
							<div className={styles.AlertContent}>{alert.content}</div>
							<Button
								fnOnClick={() => {
									setAlert({
										state: false,
										type: "",
										content: "",
									});
								}}
								title={"Ok"}
							/>
						</div>
					}
					setActiveFn={() => {
						setAlert({
							state: false,
							type: "",
							content: "",
						});
					}}
				/>
			) : (
				<></>
			)}
			<div className={styles.Container}>
				<div className={styles.Invoice}>
					<div className={styles.Total}>
						<p>Total</p>
						<div>
							Rp.
							{numberFormat.format(trxData.payment.price)}
						</div>
					</div>

					<div className={styles.Highlight}>
						<p>Sisa Waktu Pembayaran</p>
						<div>{interval}</div>
					</div>

					{trxData.payment.qr_str ? (
						<div className={styles.QRBox}>
							<div className={styles.TextPrimary}>AGENDAKOTA</div>
							<div className={styles.TextSecondary}>
								NMID: {trxData.payment.order_id}
							</div>
							<QRCode
								id="qr-event"
								size={200}
								// value={resTrx.payment.qr_string}
								value={trxData.payment.qr_str}
								level="H"
								includeMargin={true}
								className={styles.QRCode}
							/>
						</div>
					) : (
						<div className={styles.Highlight}>
							<p>Harap Transfer ke Virtual Account</p>
							<div>
								<span>
									{trxData.payment.virtual_acc}&nbsp;
									<BiCopy
										style={{ cursor: "pointer" }}
										onClick={() => {
											handleCopy(trxData.payment.virtual_acc);
										}}
									/>
								</span>
							</div>
							<p>PT. Cipta Wisata Medika</p>
						</div>
					)}
					<div style={{ marginTop: "24px" }}>
						<div
							className={`${styles.FlexRow} ${styles.TextPrimary} ${styles.Pointer}`}
							onClick={() => {
								setPayHint(!payHint);
							}}
						>
							<div>Petunjuk Pembayaran</div>
							<BiChevronDown style={{ marginLeft: "auto" }} />
						</div>
					</div>
					{payHint ? (
						<div style={{ marginTop: "24px" }}>
							{trxData.payment.qr_str ? (
								<div className={styles.PayHint}>
									PETUNJUK QRIS Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Error, magni atque. Et doloribus
									exercitationem, sequi eum architecto, labore sunt iure quo
									minus unde, saepe maiores aut harum ea enim inventore.
								</div>
							) : (
								<div className={styles.PayHint}>
									PETUNJUK VA Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Error, magni atque. Et doloribus
									exercitationem, sequi eum architecto, labore sunt iure quo
									minus unde, saepe maiores aut harum ea enim inventore.
								</div>
							)}
						</div>
					) : (
						<></>
					)}
					<div className={styles.Separation}></div>
					<div
						className={styles.FlexRow}
						style={{ gap: "5px", marginTop: "10px" }}
					>
						<div className={styles.TextSecondary}>Metode Pembayaran</div>
						<div style={{ marginLeft: "auto" }}>
							<div className={styles.PaymentBtn}>
								<img
									src={`/icons/${
										config.payMethods[
											parseInt(trxData.payment.code_method) >= 11 &&
											parseInt(trxData.payment.code_method) <= 15
												? "e-wallet"
												: parseInt(trxData.payment.code_method) === 21 ||
												  parseInt(trxData.payment.code_method) === 22
												? "qris"
												: "VA"
										][trxData.payment.code_method][0]
									}.png`}
									alt=""
								/>

								<div>
									{
										config.payMethods[
											parseInt(trxData.payment.code_method) >= 11 &&
											parseInt(trxData.payment.code_method) <= 15
												? "e-wallet"
												: parseInt(trxData.payment.code_method) === 21 ||
												  parseInt(trxData.payment.code_method) === 22
												? "qris"
												: "VA"
										][trxData.payment.code_method][1]
									}
								</div>
							</div>
						</div>
					</div>
					<div
						className={styles.FlexRow}
						style={{ gap: "5px", marginTop: "10px" }}
					>
						<div
							className={styles.TextSecondary}
							style={{ minWidth: "120px", whiteSpace: "nowrap" }}
						>
							Transaction ID
						</div>
						<div
							style={{
								marginLeft: "auto",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
							className={styles.TextPrimary}
						>
							{trxData.payment.token_trx}
						</div>
					</div>
					<Button
						style={{ marginTop: "48px", width: "100%" }}
						center
						title={"Selesai"}
						fnOnClick={() => {
							window.location.reload();
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default PopUpTrxInDetail;
