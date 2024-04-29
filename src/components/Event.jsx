import React, { useEffect, useState } from "react";
import styles from "./styles/Event.module.css";
import moment, { locale } from "moment";
import {
	BiCheckCircle,
	BiCopy,
	BiDownArrow,
	BiError,
	BiQuestionMark,
	BiTrash,
	BiUpArrow,
} from "react-icons/bi";
import config from "../config";
import Button from "./Button";
import PopUp from "../partials/PopUp";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const dummyLoad = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(false);
		}, 3000);
	});
};

const Event = ({
	data,
	config = null,
	maxWidth = "32.1%",
	style = {},
	className = [],
	forOrganizer = false,
	isActivities = false,
	fnReload = () => {
		return false;
	},
	fnDelete = (eventId) => {
		return dummyLoad();
	},
	customOnClickFn = null,
	noPrice = false,
}) => {
	const classNames = [styles.Event].concat(className);
	const [startDate, setStartDate] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [nowDate, setNow] = useState(new Date());
	const [isExpandDays, setExpandDays] = useState(false);
	const [price, setPrice] = useState(-1);
	const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
	const [popUpActive, setPopUpActive] = useState(false);
	const [popUpTitle, setPopUpTitle] = useState("");
	const [isPopUpLoading, setPopUpLoading] = useState(false);
	const [popUpContent, setPopUpContent] = useState(<></>);
	const navigate = useNavigate(null);

	const mapDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const mapDayInd = [
		"Minggu",
		"Senin",
		"Selasa",
		"Rabu",
		"Kamis",
		"Jum'at",
		"Sabtu",
	];

	const copyHandle = (url) => {
		// process to copy
		navigator.clipboard.writeText(url);
		setPopUpTitle("Salin Link Event / Activites");
		setPopUpActive(true);
		setPopUpContent(
			<div className={styles.PopupNotify}>
				<div>
					Link {isActivities ? "Activities" : "Event"} berhasil di salin ke
					clipboard
				</div>
				<div className={styles.IconPopUp}>
					<BiCheckCircle color={"green"} fontWeight={"600"} />
				</div>
			</div>
		);
		setTimeout(() => {
			setPopUpActive(false);
		}, 1000);
	};

	useEffect(() => {
		if (startDate === null && nowDate !== null) {
			if (data.available_days.length > 0) {
				let stateFill = false;
				let nowDate = new Date();
				data.available_days.every((dayData) => {
					if (nowDate.getDay() === mapDay.indexOf(dayData.day)) {
						setStartDate(nowDate.toLocaleDateString("en-US"));
						setStartTime(dayData.max_limit_time);
						//console.log(dayData.max_limit_time, "set time");
						stateFill = true;
						return false;
					} else if (nowDate.getDay() < mapDay.indexOf(dayData.day)) {
						let distance = mapDay.indexOf(dayData.day) - nowDate.getDay();
						nowDate.setDate(nowDate.getDate() + distance);
						setStartDate(nowDate.toLocaleDateString("en-US"));
						setStartTime(dayData.max_limit_time);
						//console.log(dayData.max_limit_time, "set time 2");
						stateFill = true;
						return false;
					}
					return true;
				});
				if (!stateFill) {
					let distance =
						mapDay.indexOf(data.available_days[0].day) + 7 - nowDate.getDay();
					nowDate.setDate(nowDate.getDate() + distance);
					setStartDate(nowDate.toLocaleDateString("en-US"));
					setStartTime(data.available_days[0].max_limit_time);
					//console.log(data.available_days[0].day, "set time 3");
				}
			} else {
				setStartDate(data.start_date);
				setEndDate(data.end_date);
				//console.log(data.start_time, "set time 4");
			}
			//console.log(startTime, startDate);
		}
	}, [startDate, nowDate]);

	useEffect(() => {
		if (!noPrice && price == -1 && data.tickets.length > 0) {
			setPrice(parseInt(data.tickets[0].price));
			// console.log(data.tickets[0].price);
		}
	}, [price]);

	const printAvlDays = (dayData) => {
		return (
			<div className={styles.Info}>
				<div>{mapDayInd[mapDay.indexOf(dayData.day)]}</div>
				<div>
					Buka sampai{" "}
					{moment(startDate + " " + dayData.max_limit_time)
						.locale("id")
						.format("HH:mm")}{" "}
					WIB
				</div>
			</div>
		);
	};

	const openEvent = (id, slug) => {
		if (forOrganizer) {
			localStorage.setItem("active-event", id);
			navigate("/organizer/event/dashboard");
		} else {
			navigate("/event/" + id);
		}
	};

	const expand = () => {
		setExpandDays(!isExpandDays);
	};

	return (
		<>
			<PopUp
				width="45%"
				isActive={popUpActive}
				setActiveFn={setPopUpActive}
				title={popUpTitle}
				content={
					<div className={styles.PopupNotify}>
						{isPopUpLoading ? <Loading /> : popUpContent}
					</div>
				}
			/>
			{console.log(nowDate)}
			<div className={classNames.join(" ")} style={style}>
				<div className="city-label" style={{ display: "none" }}>
					{data.city.toLowerCase()}
				</div>
				<div className="name-label" style={{ display: "none" }}>
					{data.name.toLowerCase()}
				</div>
				<img
					src={process.env.REACT_APP_BACKEND_URL + data.logo}
					alt={data.name}
					className={styles.Cover}
					style={
						config !== null && config.hasOwnProperty("coverStyle")
							? config.coverStyle
							: null
					}
					onClick={() => {
						if (customOnClickFn !== null) {
							customOnClickFn(data);
						} else {
							openEvent(data.id, data.slug);
						}
					}}
				/>
				<div style={{ marginTop: 10 }}>
					<div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
						{/* {forOrganizer && (
              <Button
                style={{
                  backgroundColor: "red",
                  marginLeft: "auto",
                  marginTop: "-170px",
                  borderRadius: "8px",
                }}
                title={"Delete"}
                center
                icon={<BiTrash />}
                fnOnClick={openDelete}
              />
            )} */}
					</div>
					<div
						className={styles.Title}
						onClick={() => {
							if (customOnClickFn !== null) {
								customOnClickFn(data);
							} else {
								openEvent(data.id, data.slug);
							}
						}}
					>
						{data.name}
					</div>
					{!noPrice ? (
						<div className={styles.Price}>
							<div
								className={styles.PriceNumber}
								style={{ flexDirection: "row" }}
							>
								{price === -1 ? (
									<>Tiket Belum Tersedia</>
								) : price === 0 ? (
									<>FREE</>
								) : (
									<>RP. {numberFormat.format(price)},00</>
								)}
							</div>
						</div>
					) : (
						<></>
					)}
					<div className={styles.Info}>
						{data.available_days.length > 0 ? (
							<>
								{moment(startDate).format("ddd") ==
									new Date().toLocaleDateString("en-US", {
										weekday: "short",
									}) &&
								moment(startDate).format("D-M-Y") ===
									moment(new Date().toLocaleDateString("en-US")).format(
										"D-M-Y"
									) ? (
									<div style={{ color: "#00964E" }}>Hari Ini</div>
								) : (
									<div>
										{
											mapDayInd[
												mapDay.indexOf(
													moment(startDate).locale("id").format("ddd")
												)
											]
										}
										, {moment(startDate).locale("id").format("DD MMM Y")}
									</div>
								)}
								|
								<div>
									Buka sampai{" "}
									{moment(startDate + " " + startTime)
										.locale("id")
										.format("HH:mm")}{" "}
									WIB
								</div>
								{isExpandDays ? (
									<BiUpArrow onClick={expand} />
								) : (
									<BiDownArrow onClick={expand} />
								)}
							</>
						) : (
							<>
								{moment(startDate).format("ddd") ==
									new Date().toLocaleDateString("en-US", {
										weekday: "short",
									}) &&
								moment(startDate).format("D-M-Y") ===
									moment(new Date().toLocaleDateString("en-US")).format(
										"D-M-Y"
									) ? (
									<div style={{ color: "#00964E" }}>Hari Ini</div>
								) : (
									<div>
										{
											mapDayInd[
												mapDay.indexOf(
													moment(startDate).locale("id").format("ddd")
												)
											]
										}
										, {moment(startDate).locale("id").format("DD MMM Y")}
									</div>
								)}
								|
								{moment(endDate).format("ddd") ==
									new Date().toLocaleDateString("en-US", {
										weekday: "short",
									}) &&
								moment(startDate).format("D-M-Y") ===
									moment(new Date().toLocaleDateString("en-US")).format(
										"D-M-Y"
									) ? (
									<div style={{ color: "#00964E" }}>Hari Ini</div>
								) : (
									<div>
										{
											mapDayInd[
												mapDay.indexOf(
													moment(endDate).locale("id").format("ddd")
												)
											]
										}
										, {moment(endDate).locale("id").format("DD MMM Y")}
									</div>
								)}
							</>
						)}
					</div>
					<div>{isExpandDays && data.available_days.map(printAvlDays)}</div>
					<hr className={styles.HrSeparator}></hr>
					{forOrganizer ? (
						<div className={styles.Organizer}>
							{data.is_publish !== 1 ? (
								<>
									<div
										className={
											nowDate >=
												new Date(data.start_date + "T" + data.start_time) &&
											nowDate <= new Date(data.end_date + "T" + data.end_time)
												? `${styles.Point} ${styles.PointActive}`
												: nowDate >
												  new Date(data.end_date + "T" + data.end_time)
												? `${styles.Point} ${styles.PointDisabled}`
												: `${styles.Point} ${styles.PointEnabled}`
										}
									></div>
									<div
										style={{
											color:
												nowDate >=
													new Date(data.start_date + "T" + data.start_time) &&
												nowDate <= new Date(data.end_date + "T" + data.end_time)
													? "#F20063"
													: nowDate >
													  new Date(data.end_date + "T" + data.end_time)
													? "#767676"
													: "green",
										}}
									>
										{" "}
										{nowDate >=
											new Date(data.start_date + "T" + data.start_time) &&
										nowDate <= new Date(data.end_date + "T" + data.end_time)
											? "Happening"
											: nowDate > new Date(data.end_date + "T" + data.end_time)
											? "Finished"
											: "Upcoming"}
									</div>
									<Button
										icon={<BiCopy />}
										title={"Link"}
										style={{
											marginLeft: "auto",
											backgroundColor: "black",
											width: "75px",
										}}
										center={true}
										fnOnClick={() =>
											copyHandle(window.location.host + "/event/" + data.id)
										}
									/>
								</>
							) : (
								<>
									<div className={styles.DraftText}>Draft</div>
									<div className={styles.DraftDesc}>
										Diedit{" "}
										{moment(data.updated_at).locale("id").format("DD MMM Y")}
									</div>
									<Button
										title={"Edit"}
										style={{
											marginLeft: "auto",
											backgroundColor: "black",
											width: "50px",
										}}
										center
										fnOnClick={() => openEvent(data.id, data.slug)}
									/>
								</>
							)}
						</div>
					) : (
						<div
							className={styles.Organizer}
							style={{ cursor: "pointer" }}
							onClick={() => {
								window.location.href = "/organization-profile/" + data.org.id;
							}}
						>
							<img src={process.env.REACT_APP_BACKEND_URL + data.org.photo} />
							<b
								style={{
									maxWidth: "calc(100% - 70px)",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{data.org.name}
							</b>
							{data.org.legality && data.org.legality.status == 1 ? (
								<img
									src="/images/verify.png"
									style={{
										width: "23px",
										height: "23px",
										color: "green",
										marginTop: "auto",
										marginBottom: "auto",
									}}
								/>
							) : (
								<></>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Event;
