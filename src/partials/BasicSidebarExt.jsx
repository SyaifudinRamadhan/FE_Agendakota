import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/SidebarUser.module.css";
import styles2 from "./styles/BasicSidebarExt.module.css";
import Icons from "../icons";
import Separator from "../components/Separator";
import AddCircle from "../icons/AddCircle";
import {
	BiCheckCircle,
	BiChevronDown,
	BiCircle,
	BiNote,
	BiPlus,
	BiPlusCircle,
} from "react-icons/bi";
import Button from "../components/Button";
import PopUp from "./PopUp";
import InputForm from "../components/InputForm";
import Select from "react-select";
import TextArea from "../components/TextArea";
import Alert from "../components/Alert";
import config from "../config";
import { useNavigate } from "react-router-dom";
import AddOrganization from "./AddOrganization";

const BasicSidebarExt = ({
	show = true,
	active = null,
	children,
	organizers,
	setOrganizers,
	setLogin,
}) => {
	const [isOrganizerAreaVisible, setOrganizerAreaVisible] = useState(false);
	const [width, setWidth] = useState(window.innerWidth);
	const [isPopUpAddOrg, setPopUpAddOrg] = useState(false);
	const navigate = useNavigate();

	const overlayClick = () => {
		setOrganizerAreaVisible(false);
	};
	const showOrganizers = () => {
		setOrganizerAreaVisible(true);
	};

	const openPopUporg = () => {
		setPopUpAddOrg(true);
	};

	const handleOpenOrg = (orgId) => {
		localStorage.setItem("active-org", orgId);
		window.location.replace("/organizer/events");
	};

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
		});
	});

	return (
		<>
			<AddOrganization
				isPopUpAddOrg={isPopUpAddOrg}
				setPopUpAddOrg={setPopUpAddOrg}
				organizers={organizers}
				setOrganizers={setOrganizers}
				setLogin={setLogin}
			/>
			{/* <PopUp
				isActive={isPopUpAddOrg}
				setActiveFn={setPopUpAddOrg}
				width="40%"
				content={
					<form style={{ display: "grid" }} onSubmit={onSubmit}>
						<Alert
							isShow={isShowAlert}
							setShowFn={setShowAlert}
							type={"danger"}
							message={"Semua field wajib diisi !!!"}
						/>
						<label htmlFor="org_name" className={styles.FontLabel}>
							Nama Organisasi
						</label>
						<InputForm
							id={"org_name"}
							type={"text"}
							placeholder={"Nama Organisasi"}
							refData={orgName}
						/>
						<label className={styles.FontLabel}>Tipe Organisasi</label>
						<Select
							options={config.orgTypeOptions}
							className="basic-multi-select"
							ref={orgType}
							styles={{
								option: (basicStyle, state) => ({
									...basicStyle,
									backgroundColor: state.isFocused ? "#fecadf" : "white",
								}),
							}}
						/>
						<label className={styles.FontLabel}>
							Tertarik Mengadakan Event
						</label>
						<Select
							isMulti
							options={config.interestEventOptions}
							ref={interestEvt}
							className="basic-multi-select"
							styles={{
								option: (basicStyle, state) => ({
									...basicStyle,
									backgroundColor: state.isFocused ? "#fecadf" : "white",
								}),
							}}
						/>
						<label htmlFor="org_desc" className={styles.FontLabel}>
							Deskripsi Organisasi
						</label>
						<TextArea
							id={"org_desc"}
							placehorder={"Deskripsi organisasi"}
							refData={desc}
						/>
						<div style={{ display: "flex" }}>
							<Button
								title={"Simpan"}
								typeBtn={"submit"}
								style={{ margin: "auto", width: "100%" }}
							/>
						</div>
					</form>
				}
			/> */}
			{width > 992 && show ? (
				<div id="sidebar" className={`${styles.Sidebar} ${styles2.SidebarExt}`}>
					<div className={styles2.MainMenu}>
						<div className={styles.MenuArea}>
							<a
								href="/events"
								className={`${styles.MenuItem} ${
									active === "personal-events" ? styles.MenuActive : ""
								}`}
							>
								<img src={Icons.Calendar} alt="Personal Events" />
							</a>
							<a
								href="/my-tickets"
								className={`${styles.MenuItem} ${
									active === "my-tickets" ? styles.MenuActive : ""
								}`}
							>
								<img src={Icons.Ticket} alt="Tickets" />
							</a>
							<a
								href="/invitations"
								className={`${styles.MenuItem} ${
									active === "invitations" ? styles.MenuActive : ""
								}`}
							>
								<BiNote style={{ width: "21px", height: "21px" }} />
							</a>
						</div>
						<Separator width="40px" margin="20px 0" />
						<div className={styles.OrganizerArea} style={{ width: "40px" }}>
							{organizers &&
								organizers.map((org, num) => {
									return (
										<a
											key={num}
											href="/organizer/events"
											className={styles.OrganizerItem}
											onClick={() => {
												handleOpenOrg(org.id);
											}}
										>
											<div
												className={styles.OrganizerLogo}
												style={{
													backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}${org.photo}")`,
													position: "relative",
												}}
											>
												{org.legality && org.legality.status == 1 ? (
													<img
														src="/images/verify.png"
														alt=""
														srcset=""
														style={{
															width: "20px",
															height: "20px",
															color: "green",
															position: "absolute",
															top: "-7px",
															right: "-12px",
														}}
													/>
												) : (
													<></>
												)}
											</div>
										</a>
									);
								})}
							<div className={`${styles.OrganizerItem} ${styles2.AddOrg}`}>
								<BiPlusCircle onClick={openPopUporg} size={"20px"} />
							</div>
						</div>
					</div>
					<div className={styles2.ExtMenu}>{children}</div>
				</div>
			) : (
				<>
					<div className={styles.SidebarMobile}>
						<div className={styles.MenuArea}>
							<a
								href="/events"
								className={`${styles.MenuItem} ${
									active === "personal-events" ? styles.MenuActive : ""
								}`}
							>
								<img src={Icons.Calendar} alt="Personal Events" />
								{active === "personal-events" && (
									<div className={styles.MenuText}>Events</div>
								)}
							</a>
							<a
								href="/my-tickets"
								className={`${styles.MenuItem} ${
									active === "my-tickets" ? styles.MenuActive : ""
								}`}
							>
								<img src={Icons.Ticket} alt="Tickets" />
								{active === "my-tickets" && (
									<div className={styles.MenuText}>My Tickets</div>
								)}
							</a>
							<a
								href="/invitations"
								className={`${styles.MenuItem} ${
									active === "invitations" ? styles.MenuActive : ""
								}`}
							>
								<BiNote style={{ width: "21px", height: "21px" }} />
								{active === "invitations" && (
									<div className={styles.MenuText}>Invitations</div>
								)}
							</a>
						</div>
						<div className={styles.OrganizerChooser}>
							<div
								className={styles.OrganizerLogo}
								onClick={showOrganizers}
								style={{
									backgroundImage: `url("/images/Pattern-31.png")`,
									borderRadius: 999,
								}}
							></div>
						</div>
					</div>

					<div
						className={styles.Overlay}
						onClick={overlayClick}
						style={{
							display: isOrganizerAreaVisible ? "block" : "none",
						}}
					></div>
					<div
						className={styles.OrganizerAreaMobile}
						style={{ bottom: isOrganizerAreaVisible ? 0 : -500 }}
					>
						<div className="inline">
							<div
								className={styles.MenuText}
								style={{
									color: "#aaa",
									fontWeight: 700,
									fontSize: 12,
									display: "flex",
									flexGrow: 1,
								}}
							>
								ORGANIZATIONS
							</div>
							<div className={styles.OrganizerAreaClose} onClick={overlayClick}>
								<BiChevronDown />
							</div>
						</div>

						<div className={styles.OrganizerArea}>
							{organizers &&
								organizers.map((org, num) => {
									return (
										<a
											key={num}
											href="#"
											className={styles.OrganizerItem}
											onClick={() => {
												handleOpenOrg(org.id);
											}}
										>
											<div
												className={styles.OrganizerLogo}
												style={{
													backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}${org.photo}")`,
												}}
											></div>
											<div
												className={styles.OrganizerName}
												style={{ maxWidth: "calc(100% - 170px)" }}
											>
												{org.name}
											</div>
											{org.legality && org.legality.status == 1 ? (
												<img
													src="/images/verify.png"
													style={{
														color: "green",
														width: "23px",
														height: "23px",
													}}
												/>
											) : (
												<></>
											)}
											<div
												className={styles.OrganizerLabel}
												style={{ marginLeft: "auto" }}
											>
												Pilih
											</div>
										</a>
									);
								})}
							<div className={`${styles.OrganizerItem} ${""}`}>
								<Button
									title={"Create Organizer"}
									classes={[styles.OrganizerCreateBottom]}
									fnOnClick={openPopUporg}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default BasicSidebarExt;
