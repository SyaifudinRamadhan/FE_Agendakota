import React, { createRef, useEffect, useRef, useState } from "react";
import styles from "./styles/PopUpTrx.module.css";
import PopUp from "./PopUp";
import config, { payMethods } from "../config";
import InputForm from "../components/InputForm";
import InputImage5 from "../components/InputImage5";
import InputToogle from "../components/InputToogle";
import FieldBox from "../components/FieldBox";
import {
	BiCheckCircle,
	BiChevronDown,
	BiCopy,
	BiError,
	BiInfoCircle,
} from "react-icons/bi";
import Button from "../components/Button";
import Chip from "../components/Chip";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import moment, { locale } from "moment";
import axios from "axios";
import PopUpLogin from "./PopUpLogin";
import { FormattedMessage, IntlProvider } from "react-intl";
import QRCode from "qrcode.react";
import { InputGroup } from "react-bootstrap";
import InputLabeled from "../components/InputLabeled";
import InputCheckRadio from "../components/InputCheckRadio";

const basicForm = {
	Nama: "text",
	Email: "email",
	"No. Handphone": "tel",
	"ID Card/ KTP": "image",
};

const numberListValidator = (list) => {
	return list.reduce((current, acc) => {
		const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		if (num.indexOf(parseInt(acc)) === -1) {
			return current && false;
		} else {
			return current && true;
		}
	}, true);
};

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

const submitSurvey = async ({ event_id, files_data, survey_ans }) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/api/fill-survey",
			{
				event_id,
				files_data,
				survey_ans,
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

const createTrx = async ({
	ticket_ids,
	pay_method,
	custom_prices,
	visit_dates,
	seat_numbers,
	cashtag,
	mobile_number,
}) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/api/buy-ticket",
			{
				ticket_ids,
				pay_method,
				custom_prices,
				visit_dates,
				seat_numbers,
				cashtag,
				mobile_number,
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

const HeaderPopUp = () => {
	return (
		<div className={styles.HeaderBox}>
			<div className={styles.HeaderTitle}>
				<div className={styles.Title}>Checkout</div>
				<div className={styles.Desc}>Manage information about the company</div>
			</div>
		</div>
	);
};

const ReviewContent = ({
	dataTrx,
	dataEvent,
	fnSetDataTrxSurvey,
	alert,
	setAlert,
	fnSetActive,
}) => {
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [trxMethod, setTrxMethod] = useState("");
	const [showTrxMethods, setShowTrxMethods] = useState(false);
	const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));

	// ref data survey fields
	const formFields = new Array(dataEvent.custom_fields.length)
		.fill()
		.map((_, index) => createRef());
	const [formTypeState, setFormTypeState] = useState([]);
	const refOvoJn = useRef();

	const prepareTrxNFormData = () => {
		let failedIndicator = false;
		// create data survey fields

		const answers = {
			event_id: dataEvent.id,
			survey_ans: [],
			files_data: [],
		};
		for (let index = 0; index < formFields.length; index++) {
			let field = formFields[index];
			if (
				(formTypeState[index].required &&
					!(formTypeState[index].type === "file"
						? field.current.files.length
						: formTypeState[index].type === "boolean"
						? field.current.value !== ""
						: field.current.value)) ||
				(formTypeState[index].type === "email" &&
					field.current.value.split("@").length != 2) ||
				(formTypeState[index].type === "tel" &&
					((field.current.value.split("").length < 10 &&
						field.current.value.split("").length > 13) ||
						!numberListValidator(field.current.value.split("")))) ||
				(formTypeState[index].type === "number" &&
					!numberListValidator(field.current.value.split("")))
			) {
				setAlert({
					state: true,
					type: "danger",
					content: `Field form ${
						dataEvent.custom_fields[index].split("~!!!~")[0]
					} wajib diisi dengan benar!`,
				});
				// resetAlert();
				failedIndicator = true;
				index = formFields.length;
			} else {
				if (
					formTypeState[index].type === "file" &&
					field.current.files.length > 0
				) {
					answers.files_data.push(field.current.files[0]);
				}
				answers.survey_ans.push(
					formTypeState[index].type === "file"
						? field.current.files.length > 0
							? answers.files_data.length - 1
							: -1
						: field.current.value
				);
			}
		}

		// create data trx
		const trxData = {
			ticket_ids: [],
			pay_method: trxMethod,
			custom_prices: {},
			visit_dates: {},
			seat_numbers: {},
			voucher_code: null,
		};
		if (!failedIndicator) {
			console.log(dataTrx, "CART DATA");
			let totalPrice = 0;
			dataTrx.forEach((cart) => {
				for (let i = 0; i < cart.count; i++) {
					trxData.ticket_ids.push(cart.data.id);
					if (cart.visitDate) {
						if (!trxData.visit_dates[cart.data.id]) {
							trxData.visit_dates[cart.data.id] = [cart.visitDate.format()];
						} else {
							trxData.visit_dates[cart.data.id].push(cart.visitDate.format());
						}
					}
					if (cart.customPrice) {
						if (!trxData.custom_prices[cart.data.id]) {
							trxData.custom_prices[cart.data.id] = [cart.customPrice];
						} else {
							trxData.custom_prices[cart.data.id].push(cart.customPrice);
						}
						totalPrice += parseInt(cart.customPrice);
					} else {
						totalPrice += parseInt(cart.data.price);
					}
				}
				if (cart.seatNumbers.length > 0) {
					if (!trxData.seat_numbers[cart.data.id]) {
						trxData.seat_numbers[cart.data.id] = cart.seatNumbers;
					} else {
						trxData.seat_numbers[cart.data.id] = trxData.seat_numbers[
							cart.data.id
						].concat(cart.seatNumbers);
					}
				}
			});
			if (
				(trxMethod === "" ||
					((trxMethod === "014" || trxMethod === "015") &&
						!refOvoJn.current.value)) &&
				totalPrice > 0
			) {
				setAlert({
					state: true,
					type: "danger",
					content: "Metode pembayaran wajib diisi",
				});
				// resetAlert();
			} else {
				trxData.pay_method = trxMethod;
				trxMethod === "014"
					? (trxData.mobile_number = refOvoJn.current.value)
					: (trxData.cashtag = refOvoJn.current.value);
				console.log(answers, trxData, totalPrice);
				fnSetDataTrxSurvey({
					trx: trxData,
					surveyFields: answers,
				});
			}
		}
	};

	useEffect(() => {
		let start = new Date(dataEvent.start_date + " " + dataEvent.start_time);
		let end = new Date(dataEvent.end_date + " " + dataEvent.end_time);
		setStart(
			`${config.days[start.getDay()]}, ${start.getDate()} ${
				config.months[start.getMonth()]
			} ${start.getFullYear()} | ${start
				.getHours()
				.toString()
				.padStart(2, "0")}:${start
				.getMinutes()
				.toString()
				.padStart(2, "0")} WIB`
		);
		setEnd(
			`${config.days[end.getDay()]}, ${end.getDate()} ${
				config.months[end.getMonth()]
			} ${end.getFullYear()} | ${end
				.getHours()
				.toString()
				.padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")} WIB`
		);
	}, [dataEvent]);

	useEffect(() => {
		console.log(formFields, formTypeState);
	});

	return (
		<div className={styles.MainContent}>
			<div className={styles.Split2}>
				<div className={styles.Banner}>
					<img
						src={process.env.REACT_APP_BACKEND_URL + dataEvent.logo}
						alt=""
					/>
				</div>
				<div className={styles.Info}>
					<h5 className={styles.InfoTitle}>{dataEvent.name}</h5>
					<div
						className={styles.InfoLocation}
						dangerouslySetInnerHTML={{ __html: dataEvent.location }}
					></div>
					<div className={styles.InfoTime}>
						{dataEvent.category !== "Attraction" &&
						dataEvent.category !== "Daily Activities" &&
						dataEvent.category !== "Tour Travel (recurring)" ? (
							start && end ? (
								<>
									<div className={styles.Time}>
										<p className={styles.Date}>{start.split("|")[0]}</p>
										<p className={styles.Clock}>
											{" "}
											|&nbsp; {start.split("|")[1]}
										</p>
									</div>
									<div className={styles.Time}>
										<p className={styles.Date}>{end.split("|")[0]}</p>
										<p className={styles.Clock}> |&nbsp; {end.split("|")[1]}</p>
									</div>
								</>
							) : (
								<></>
							)
						) : (
							dataEvent.available_days.map((avldt, index) => {
								// return <p className={styles.Time}>{avldt}</p>;
								return (
									<div id={index} className={styles.Time}>
										<p className={styles.Date}>
											{config.dayEnToInd[avldt.day]}
										</p>
										<p className={styles.Clock}>
											{avldt.start_time.slice(0, 5).toString()}
											{" - "}
											{avldt.max_limit_time.slice(0, 5)} WIB
										</p>
									</div>
								);
							})
						)}
					</div>
				</div>
				<div className={styles.Form}>
					{dataEvent.custom_fields.map((csForm, index) => {
						let formData = csForm.split("~!!!~");
						if (formTypeState.length < dataEvent.custom_fields.length) {
							formTypeState.push({
								index,
								type: basicForm[formData[0]]
									? basicForm[formData[0]] === "image"
										? "file"
										: basicForm[formData[0]]
									: formData[1],
								required: formData[2] === "required" ? true : false,
							});
						}
						return (
							<div className={styles.GroupInput}>
								<label htmlFor={`form-${index}`}>{formData[0]}</label>
								{basicForm[formData[0]] ? (
									basicForm[formData[0]] === "image" ? (
										<InputImage5
											style={{
												aspectRatio: "215 / 126",
												maxWidth: "315px",
												width: "100%",
												height: "unset",
											}}
											maxFile={1024}
											// refData={seatMapGlobalImg}
											textMsg={
												<div>
													<div className={styles.TitleInputImage}>
														ID Card / KTP
													</div>
													<div className={styles.SubTitleInputImage}>
														215 : 126 PNG or JPG Max 1 MB
													</div>
												</div>
											}
											refData={formFields[index]}
											fnSetAlert={setAlert}
										/>
									) : (
										<InputForm
											id={`form-${index}`}
											placeholder={formData[0]}
											type={basicForm[formData[0]]}
											refData={formFields[index]}
										/>
									)
								) : formData[1] === "boolean" ? (
									// <InputToogle
									// 	id={`form-${index}`}
									// 	refData={formFields[index]}
									// />
									<>
										<input
											id={`form-${index}-radio-hidden-tmp`}
											type="hidden"
											ref={formFields[index]}
										/>
										<InputCheckRadio
											id={`form-${index}-radio-1`}
											type={"radio"}
											radioName={`form-${index}-radio`}
											label={"Ya"}
											onChange={() => {
												formFields[index].current.value = 1;
											}}
										/>
										<InputCheckRadio
											id={`form-${index}-radio-2`}
											type={"radio"}
											radioName={`form-${index}-radio`}
											label={"Tidak"}
											onChange={() => {
												formFields[index].current.value = 0;
											}}
										/>
									</>
								) : (
									<InputForm
										id={`form-${index}`}
										placeholder={formData[0]}
										type={formData[1]}
										refData={formFields[index]}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<div className={`${styles.Split2} ${styles.Right}`}>
				<div className={styles.Invoice}>
					<div className={styles.Total}>
						<p>Total</p>
						<div>
							Rp.
							{numberFormat.format(
								dataTrx.reduce((currentVal, prevVal) => {
									if (prevVal.customPrice) {
										return (
											currentVal +
											parseInt(prevVal.customPrice) * parseInt(prevVal.count)
										);
									} else {
										return (
											currentVal +
											parseInt(prevVal.data.price) * parseInt(prevVal.count)
										);
									}
								}, 0)
							)}
						</div>
					</div>
					<div className={styles.Separation}></div>
					<div>
						<div
							style={{ marginBottom: "24px" }}
							className={styles.TextSecondary}
						>
							Rincian Pembayaran
						</div>

						{dataTrx.map((trx) => (
							<div style={{ gap: "8px", marginBottom: "10px" }}>
								<div className={styles.TextPrimary}>
									{trx.data.name}
									{trx.visitDate
										? ` - ${new Date(trx.visitDate).toLocaleDateString(
												new Intl.Locale("id-ID")
										  )}`
										: ""}
								</div>
								<div className={styles.FlexRow}>
									<div className={styles.InvoiceDesc}>
										{trx.customPrice ? trx.customPrice : trx.data.price} x{" "}
										{trx.count}
									</div>
									<div
										style={{ marginLeft: "auto" }}
										className={styles.TextPrimary}
									>
										Rp.
										{numberFormat.format(
											parseInt(
												trx.customPrice ? trx.customPrice : trx.data.price
											) * parseInt(trx.count)
										)}
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={styles.Separation}></div>
					<div className={styles.FlexRow}>
						<div className={styles.TextPrimary}>Subtotal</div>
						<div style={{ marginLeft: "auto" }} className={styles.TextPrimary}>
							Rp.
							{numberFormat.format(
								dataTrx.reduce((currentVal, prevVal) => {
									if (prevVal.customPrice) {
										return (
											currentVal +
											parseInt(prevVal.customPrice) * parseInt(prevVal.count)
										);
									} else {
										return (
											currentVal +
											parseInt(prevVal.data.price) * parseInt(prevVal.count)
										);
									}
								}, 0)
							)}
						</div>
					</div>
					{dataTrx.reduce((currentVal, prevVal) => {
						if (prevVal.customPrice) {
							return (
								currentVal +
								parseInt(prevVal.customPrice) * parseInt(prevVal.count)
							);
						} else {
							return (
								currentVal +
								parseInt(prevVal.data.price) * parseInt(prevVal.count)
							);
						}
					}, 0) === 0 ? (
						<></>
					) : (
						<>
							<div className={styles.Separation}></div>
							<div
								style={{ marginBottom: "24px" }}
								className={styles.TextSecondary}
							>
								Metode Pembayaran
							</div>
							<div
								onClick={() => {
									setShowTrxMethods(!showTrxMethods);
								}}
								className={styles.Pointer}
							>
								<FieldBox>
									<div className={styles.InvoiceDesc}>
										Pilih Metode Pembayaran
									</div>
									<BiChevronDown style={{ marginLeft: "auto" }} />
								</FieldBox>
							</div>
						</>
					)}
					<div
						className={`${
							trxMethod === "014" || trxMethod === "015" ? "" : "d-none"
						}`}
						style={{ marginTop: "20px" }}
					>
						<InputLabeled
							label={`${trxMethod === "014" ? "Nomor HP OVO" : "$Cashtag"}`}
							placeholder={`${
								trxMethod === "014" ? "Nomor HP OVO" : "$Cashtag"
							}`}
							refData={refOvoJn}
						/>
					</div>

					{showTrxMethods ? (
						<div className={styles.PaymentMethods}>
							{Object.entries(config.payMethods).map((payMethod) => {
								return (
									<div className={styles.GroupMethod}>
										<div
											style={{ fontSize: "14px" }}
											className={styles.TextSecondary}
										>
											{payMethod[0] === "e-wallet"
												? "E-Wallet"
												: payMethod[0] === "qris"
												? "QRIS"
												: "Virtual Account / BANK"}
										</div>
										<Chip
											options={Object.entries(payMethod[1]).map(
												(value, index) => value[0].toString()
											)}
											value={trxMethod}
											setValue={setTrxMethod}
											labelItem={Object.entries(payMethod[1]).map(
												(value, index) => (
													<div className={styles.PaymentBtn}>
														<img src={`/icons/${value[1][0]}.png`} alt="" />
														<div>{value[1][1]}</div>
													</div>
												)
											)}
											multiple={false}
											itemStyle={{ padding: "10px 10px" }}
											containerStyle={{ flexWrap: "wrap" }}
										/>
									</div>
								);
							})}
						</div>
					) : (
						<></>
					)}

					<Button
						style={{ marginTop: "48px", width: "100%" }}
						center
						title={"Lanjutkan ke Pembayaran"}
						fnOnClick={prepareTrxNFormData}
					/>
					<Button
						style={{ marginTop: "20px", width: "100%" }}
						center
						bgColor={"white"}
						textColor={"#ca0c64"}
						borderColor={"#ca0c64"}
						title={"Batalkan"}
						fnOnClick={() => {
							fnSetActive(false);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

const TrxContent = ({
	dataTrx,
	resTrx,
	payMethod,
	dataEvent,
	fnSetAlert = () => {},
}) => {
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [payHint, setPayHint] = useState(false);
	const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
	const [loop, setLoop] = useState(0);
	const [showInterval, setShowInterval] = useState("");

	const handleCopy = (text) => {
		navigator.clipboard.writeText(text);
		fnSetAlert({
			state: true,
			type: "success",
			content: "Virtual Account berhasil disalin",
		});
	};

	useEffect(() => {
		let start = new Date(dataEvent.start_date + " " + dataEvent.start_time);
		let end = new Date(dataEvent.end_date + " " + dataEvent.end_time);
		setStart(
			`${config.days[start.getDay()]}, ${start.getDate()} ${
				config.months[start.getMonth()]
			} ${start.getFullYear()} | ${start
				.getHours()
				.toString()
				.padStart(2, "0")}:${start
				.getMinutes()
				.toString()
				.padStart(2, "0")} WIB`
		);
		setEnd(
			`${config.days[end.getDay()]}, ${end.getDate()} ${
				config.months[end.getMonth()]
			} ${end.getFullYear()} | ${end
				.getHours()
				.toString()
				.padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")} WIB`
		);
	}, [dataEvent]);

	useEffect(() => {
		if (loop === 0 && payMethod) {
			let interval =
				parseInt(payMethod) >= 11 && parseInt(payMethod) <= 15
					? new Date(resTrx.payment.created.split("Z")[0]).setMinutes(
							new Date(resTrx.payment.created.split("Z")[0]).getMinutes() + 2
					  ) - new Date(resTrx.payment.created.split("Z")[0])
					: parseInt(payMethod) === 21 || parseInt(payMethod) === 22
					? new Date(resTrx.payment.expires_at.split("Z")[0]) - new Date()
					: new Date(resTrx.payment.expiration_date.split("Z")[0]) - new Date();
			if (interval > 0) {
				setInterval(() => {
					if (interval > 0) {
						interval -= 1000;
						let intervalObj = new Date(interval);
						setShowInterval(
							`${Math.floor((intervalObj % 86400000) / 3600000)}j ${Math.floor(
								((intervalObj % 86400000) % 3600000) / 60000
							)}m ${Math.floor(
								(((intervalObj % 86400000) % 3600000) % 60000) / 1000
							)}d`
						);
					} else {
						setShowInterval("0j 0m 0d");
					}
				}, [1000]);
			} else {
				interval = 0;
				setShowInterval("0j 0m 0d");
			}
		}
		setLoop(1);
	}, [resTrx]);

	return (
		<div className={styles.MainContent}>
			<div className={styles.Split2}>
				<div className={styles.Banner}>
					<img
						src={process.env.REACT_APP_BACKEND_URL + dataEvent.logo}
						alt=""
					/>
				</div>
				<div className={styles.Info}>
					<h5 className={styles.InfoTitle}>{dataEvent.name}</h5>
					<div
						className={styles.InfoLocation}
						dangerouslySetInnerHTML={{ __html: dataEvent.location }}
					></div>
					<div className={styles.InfoTime}>
						{dataEvent.category !== "Attraction" &&
						dataEvent.category !== "Daily Activities" &&
						dataEvent.category !== "Tour Travel (recurring)" ? (
							start && end ? (
								<>
									<div className={styles.Time}>
										<p className={styles.Date}>{start.split("|")[0]}</p>
										<p className={styles.Clock}>
											{" "}
											|&nbsp; {start.split("|")[1]}
										</p>
									</div>
									<div className={styles.Time}>
										<p className={styles.Date}>{end.split("|")[0]}</p>
										<p className={styles.Clock}> |&nbsp; {end.split("|")[1]}</p>
									</div>
								</>
							) : (
								<></>
							)
						) : (
							dataEvent.available_days.map((avldt, index) => {
								// return <p className={styles.Time}>{avldt}</p>;
								return (
									<div id={index} className={styles.Time}>
										<p className={styles.Date}>
											{config.dayEnToInd[avldt.day]}
										</p>
										<p className={styles.Clock}>
											{avldt.start_time.slice(0, 5).toString()}
											{" - "}
											{avldt.max_limit_time.slice(0, 5)} WIB
										</p>
									</div>
								);
							})
						)}
					</div>
				</div>
				<div className={styles.Separation}></div>
				<div>
					<div
						style={{ marginBottom: "24px" }}
						className={styles.TextSecondary}
					>
						Rincian Pembayaran
					</div>

					{dataTrx.map((trx) => (
						<div style={{ gap: "8px", marginBottom: "10px" }}>
							<div className={styles.TextPrimary}>
								{trx.data.name}
								{trx.visitDate
									? ` - ${new Date(trx.visitDate).toLocaleDateString(
											new Intl.Locale("id-ID")
									  )}`
									: ""}
							</div>
							<div className={styles.FlexRow}>
								<div className={styles.InvoiceDesc}>
									{trx.customPrice ? trx.customPrice : trx.data.price} x{" "}
									{trx.count}
								</div>
								<div
									style={{ marginLeft: "auto" }}
									className={styles.TextPrimary}
								>
									Rp.
									{numberFormat.format(
										parseInt(
											trx.customPrice ? trx.customPrice : trx.data.price
										) * parseInt(trx.count)
									)}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={styles.Separation}></div>
				<div className={styles.FlexRow}>
					<div className={styles.TextPrimary}>Subtotal</div>
					<div style={{ marginLeft: "auto" }} className={styles.TextPrimary}>
						Rp.
						{numberFormat.format(
							dataTrx.reduce((currentVal, prevVal) => {
								if (prevVal.customPrice) {
									return (
										currentVal +
										parseInt(prevVal.customPrice) * parseInt(prevVal.count)
									);
								} else {
									return (
										currentVal +
										parseInt(prevVal.data.price) * parseInt(prevVal.count)
									);
								}
							}, 0)
						)}
					</div>
				</div>
			</div>
			<div className={`${styles.Split2} ${styles.Right}`}>
				<div className={styles.Invoice}>
					<div className={styles.Total}>
						<p>Total</p>
						<div>
							Rp.
							{numberFormat.format(
								dataTrx.reduce((currentVal, prevVal) => {
									if (prevVal.customPrice) {
										return (
											currentVal +
											parseInt(prevVal.customPrice) * parseInt(prevVal.count)
										);
									} else {
										return (
											currentVal +
											parseInt(prevVal.data.price) * parseInt(prevVal.count)
										);
									}
								}, 0)
							)}
						</div>
					</div>

					<div className={styles.Highlight}>
						<p>Sisa Waktu Pembayaran</p>
						<div>{showInterval}</div>
					</div>
					{payMethod &&
					(parseInt(payMethod) == 21 || parseInt(payMethod) == 22) ? (
						<div className={styles.QRBox}>
							<div className={styles.TextPrimary}>AGENDAKOTA</div>
							<div className={styles.TextSecondary}>
								NMID: {resTrx.payment.reference_id}
							</div>
							<QRCode
								id="qr-event"
								size={200}
								value={resTrx.payment.qr_string}
								level="H"
								includeMargin={true}
								className={styles.QRCode}
							/>
						</div>
					) : (
						<></>
					)}
					{payMethod &&
					parseInt(payMethod) >= 31 &&
					parseInt(payMethod) <= 41 ? (
						<div className={styles.Highlight}>
							<p>Harap Transfer ke Virtual Account</p>
							<div>
								<span>
									{resTrx.payment.account_number}&nbsp;
									<BiCopy
										style={{ cursor: "pointer" }}
										onClick={() => {
											handleCopy(resTrx.payment.account_number);
										}}
									/>
								</span>
							</div>
							<p>PT. Cipta Wisata Medika</p>
						</div>
					) : (
						<></>
					)}
					{payMethod ? (
						<>
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
									{parseInt(payMethod) >= 11 && parseInt(payMethod) <= 15 ? (
										<div className={styles.PayHint}>
											<p>
												1. Untuk langsung membayar, silahkan klik tombol bayar
												sekarang di bawah ini.
											</p>
											<p>
												2. Jika ingin membayar nanti, silahkan masuk ke menu
												my-tickets, dan klik tombol bayar sekarang pada tiket
												anda.
											</p>
											<p>
												3. Anda akan diarahkan ke halaman pembayaran E-Wallet
												dari Xendit. Silahkan isi form yang disediakan.
											</p>
											<p>
												4. Setelah pembayaran selesai, silahkan tunggu, anda
												akan dikembalikan secara otomatis ke halaman my-tickets
												Agenndakota.id.
											</p>
											<p>
												5. Pastikan anda melakukan pembayaran sebelum batas
												akhir yang sudah ditentukan.
											</p>
										</div>
									) : parseInt(payMethod) === 21 ||
									  parseInt(payMethod) === 22 ? (
										<div className={styles.PayHint}>
											<p>
												1. Untuk langsung membayar, silahkan buka aplikasi QRIS
												sesuai pilihan anda.
											</p>
											<p>
												2. Jika ingin membayar nanti, silahkan klik tombol
												selesai. Maka anda akan dirahkan ke halaman my-tickets.
											</p>
											<p>
												3. Untuk melihat QR pembayaran yang tertunda, anda dapat
												mengklik tombol bayar sekarang.
											</p>
											<p>
												4. Jika anda sudah selesai melakukan pembayaran dengan
												QRIS, silhakan klik tombol selesai. Dan tunggu beberapa
												saat sampai status pembayaran berubah otomatis.
											</p>
											<p>
												5. Pastikan anda melakukan pembayaran sebelum batas
												akhir yang sudah ditentukan.
											</p>
										</div>
									) : (
										<div className={styles.PayHint}>
											<p>
												1. Untuk langsung membayar, silahkan buka aplikasi
												mobile banking atau ATM sesuai pilihan anda.
											</p>
											<p>
												2. Jika ingin membayar nanti, silahkan klik tombol
												selesai. Maka anda akan dirahkan ke halaman my-tickets.
											</p>
											<p>
												3. Untuk melihat VA pembayaran yang tertunda, anda dapat
												mengklik tombol bayar sekarang.
											</p>
											<p>
												4. Selanjutnya untuk membayar, anda dapat memilih menu
												pembayaran atau menu transfer pada m-banking atau ATM
												anda.
											</p>
											<p>
												5. Jika anda memilih menu m-banking, anda dapat langsung
												memasukkan nomor VA dan nominal pembayarannya. Lalu
												lakukan transfer.
											</p>
											<p>
												6. Jika anda melalui menu transfer, silahkan masukkan
												kode bank diikuti dengan nomor VA. Serta inputkan
												nominal pembayaran, lalu transfer.
											</p>
											<p>
												7. Jika pemmbayaran sudah selesai, klik tombol selesai.
												Dan status pembayaran akan berubah otomatis setelah
												beberapa saat.
											</p>
											<p>
												8. Pastikan anda melakukan pembayaran sebelum batas
												akhir yang sudah ditentukan.
											</p>
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
									{console.log(payMethod)}
									<div className={styles.PaymentBtn}>
										<img
											src={`/icons/${
												config.payMethods[
													parseInt(payMethod) >= 11 && parseInt(payMethod) <= 15
														? "e-wallet"
														: parseInt(payMethod) === 21 ||
														  parseInt(payMethod) === 22
														? "qris"
														: "VA"
												][payMethod][0]
											}.png`}
											alt=""
										/>
										<div>
											{
												config.payMethods[
													parseInt(payMethod) >= 11 && parseInt(payMethod) <= 15
														? "e-wallet"
														: parseInt(payMethod) === 21 ||
														  parseInt(payMethod) === 22
														? "qris"
														: "VA"
												][payMethod][1]
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
									{resTrx.payment.id}
								</div>
							</div>
							<Button
								style={{ marginTop: "48px", width: "100%" }}
								center
								title={
									parseInt(payMethod) >= 11 && parseInt(payMethod) <= 13
										? "Bayar Sekarang"
										: "Selesai"
								}
								fnOnClick={() => {
									parseInt(payMethod) >= 11 && parseInt(payMethod) <= 13
										? (window.location.href = resTrx.payment.actions
												.desktop_web_checkout_url
												? resTrx.payment.actions.desktop_web_checkout_url
												: resTrx.payment.actions.mobile_web_checkout_url
												? resTrx.payment.actions.mobile_web_checkout_url
												: resTrx.payment.actions.mobile_deeplink_checkout_url)
										: (window.location.href = "/my-tickets");
								}}
							/>
						</>
					) : (
						<>
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
									{resTrx.payment.id}
								</div>
							</div>
							<Button
								style={{ marginTop: "48px", width: "100%" }}
								center
								title={"Selesai"}
								fnOnClick={() => (window.location.href = "/my-tickets")}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const PopUpTrxFront = ({ fnSetActive, cartData, eventData }) => {
	const [viewState, setViewState] = useState("review");
	const [resTrx, setResTrx] = useState(null);
	const [loading, setLoading] = useState(false);
	const [finalData, setFinalData] = useState({
		trx: null,
		surveyFields: null,
	});
	const [pausedProcess, setPausedProcess] = useState("");
	const [interuptProcess, setInteruptProcess] = useState("");
	const [isLogin, setLogin] = useState(true);
	const [alert, setAlert] = useState({
		state: false,
		type: "",
		content: "",
	});

	const handleBuyNSubmit = (trx, surveyData) => {
		setLoading(true);
		if (interuptProcess === "fill-survey") {
			handleSurvey(surveyData);
		} else {
			createTrx({ ...trx }).then((res) => {
				if (res.status === 201) {
					console.log(res.data);
					setResTrx(res.data);
					if (eventData.custom_fields.length > 0) {
						handleSurvey(surveyData);
					} else {
						setViewState("trx");
						setLoading(false);
					}
				} else if (res.status === 401) {
					setLogin(false);
					setPausedProcess("create-trx");
					setLoading(false);
				} else if (res.status === 500) {
					setAlert({
						state: true,
						type: "danger",
						content: "Terjadi masalah saat memuat data. Tolong coba lagi",
					});
					setFinalData({
						trx: null,
						surveyFields: null,
					});
					setLoading(false);
				} else {
					setAlert({
						state: true,
						type: "danger",
						content: res.data.data.error,
					});
					setFinalData({
						trx: null,
						surveyFields: null,
					});
					setLoading(false);
				}
			});
		}
	};

	const handleSurvey = (surveyData) => {
		setLoading(true);
		submitSurvey({ ...surveyData }).then((res) => {
			if (res.status === 201) {
				setViewState("trx");
				setInteruptProcess(null);
			} else if (res.status === 401) {
				setLogin(false);
				setPausedProcess("fill-survey");
			} else if (res.status === 500) {
				setAlert({
					state: true,
					type: "danger",
					content: "Terjadi masalah saat memuat data. Tolong coba lagi",
				});
				setInteruptProcess("fill-survey");
				setFinalData({
					trx: null,
					surveyFields: null,
				});
			} else {
				setAlert({
					state: true,
					type: "danger",
					content: res.data.data.error,
				});
				setInteruptProcess("fill-survey");
				setFinalData({
					trx: null,
					surveyFields: null,
				});
			}
			setLoading(false);
		});
	};

	useEffect(() => {
		if (finalData.surveyFields !== null && finalData.trx !== null) {
			handleBuyNSubmit(finalData.trx, finalData.surveyFields);
		}
	}, [finalData]);

	useEffect(() => {
		if (isLogin) {
			if (pausedProcess === "create-trx") {
				handleBuyNSubmit(finalData.trx, finalData.surveyFields);
			} else if (pausedProcess === "fill-survey") {
				handleSurvey(finalData.surveyFields);
			}
			setPausedProcess("");
		}
	}, [pausedProcess, isLogin]);

	return (
		<>
			<div className={`${isLogin ? "d-none" : ""}`}>
				<PopUpLogin
					setLogin={setLogin}
					addtionalStyle={{
						top: "71px",
						height: "calc(100% - 71px)",
						paddingTop: "20px",
						paddingBottom: "20px",
					}}
				/>
			</div>
			{alert.state ? (
				<PopUp
					isActive
					setActiveFn={() => {
						setAlert({ state: false, type: "", content: "" });
					}}
					title="Notifikasi Transaksi"
					customStyleWrapper={{ height: "calc(100% - 71px)", zIndex: "999" }}
					content={
						<div className={styles.PopUpAlert}>
							{alert.type === "danger" ? (
								<BiError color="#ca0c64" />
							) : alert.type === "warning" ? (
								<BiInfoCircle color="yellow" />
							) : (
								<BiCheckCircle color="green" />
							)}
							<div className={styles.AlertContent}>{alert.content}</div>
							<Button
								title={"Ok"}
								fnOnClick={() => {
									setAlert({ state: false, type: "", content: "" });
								}}
							/>
						</div>
					}
					width="45%"
				/>
			) : (
				<></>
			)}

			<PopUp
				isActive={isLogin}
				setActiveFn={fnSetActive}
				customStyleWrapper={{ height: "calc(100% - 71px)", paddingTop: "30px" }}
				title=""
				customTitle={<HeaderPopUp />}
				content={
					<>
						<div
							style={{ marginTop: "50px", marginBottom: "50px" }}
							className={`${loading ? "" : "d-none"}`}
						>
							<Loading />
						</div>
						<div className={`${loading ? "d-none" : ""}`}>
							{viewState === "review" ? (
								<ReviewContent
									dataTrx={cartData}
									dataEvent={eventData}
									fnSetDataTrxSurvey={setFinalData}
									alert={alert}
									setAlert={setAlert}
									fnSetActive={fnSetActive}
								/>
							) : (
								<TrxContent
									dataTrx={cartData}
									resTrx={resTrx}
									dataEvent={eventData}
									payMethod={finalData.trx.pay_method}
									fnSetAlert={setAlert}
								/>
							)}
						</div>
					</>
				}
			/>
		</>
	);
};

export default PopUpTrxFront;