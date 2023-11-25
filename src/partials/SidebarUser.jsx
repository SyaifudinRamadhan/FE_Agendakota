import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/SidebarUser.module.css";
import Icons from "../icons";
import Separator from "../components/Separator";
import AddCircle from "../icons/AddCircle";
import { BiChevronDown, BiCircle, BiPlus, BiPlusCircle } from "react-icons/bi";
import Button from "../components/Button";
import PopUp from "./PopUp";
import InputForm from "../components/InputForm";
import Select from "react-select";
import TextArea from "../components/TextArea";
import Alert from "../components/Alert";
import config from "../config";
import { useNavigate } from "react-router-dom";

const SidebarUser = ({ show = true, active = null }) => {
	const [isOrganizerAreaVisible, setOrganizerAreaVisible] = useState(false);
	const [width, setWidth] = useState(window.innerWidth);
	const [isPopUpAddOrg, setPopUpAddOrg] = useState(false);
	const [isShowAlert, setShowAlert] = useState(false);
	const [organizers, setOrganizers] = useState([]);
	const orgName = useRef(null);
	const orgType = useRef(null);
	const interestEvt = useRef(null);
	const desc = useRef(null);
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
		navigate("/organizer/events");
	};

	const onSubmit = (event) => {
		if (
			orgName.current.value === "" ||
			orgType.current.value === "" ||
			interestEvt.current.value === "" ||
			desc.current.value === ""
		) {
			setShowAlert(true);
		}
		event.preventDefault();
	};

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
			// console.log(window.innerWidth);
		});
		// Dummy data organizers
		if (organizers.length === 0) {
			setOrganizers([
				{
					id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
					user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
					type: "test2",
					name: "Agendakota",
					slug: "test-update",
					photo: "/images/Pattern-32.png",
					banner:
						"/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
					interest: "-",
					email: "-",
					linkedin: "-",
					instagram: "-",
					twitter: "-",
					whatsapp: "-",
					website: "-",
					desc: "lorem ipsum dolor sit amet",
					deleted: 0,
					created_at: "2023-09-17T01:25:15.000000Z",
					updated_at: "2023-09-17T01:30:44.000000Z",
				},
				{
					id: "9a26ca30-4579-48fa-99fb-7d487ac702dd",
					user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
					type: "test2",
					name: "Agendakota 2",
					slug: "test-update",
					photo: "/images/Pattern-31.png",
					banner:
						"/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
					interest: "-",
					email: "-",
					linkedin: "-",
					instagram: "-",
					twitter: "-",
					whatsapp: "-",
					website: "-",
					desc: "lorem ipsum dolor sit amet",
					deleted: 0,
					created_at: "2023-09-17T01:25:15.000000Z",
					updated_at: "2023-09-17T01:30:44.000000Z",
				},
			]);
		}
	});

	return (
		<>
			<PopUp
				isActive={isPopUpAddOrg}
				setActiveFn={setPopUpAddOrg}
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
								style={{ margin: "auto", width: "unset" }}
							/>
						</div>
					</form>
				}
			/>
			{width > 992 && show ? (
				<div className={styles.Sidebar}>
					<img
						src="/images/logo.png"
						alt="Logo Agendakota"
						className={styles.Logo}
					/>
					<div className={styles.MenuArea}>
						<a
							href="/events"
							className={`${styles.MenuItem} ${
								active === "personal-events" ? styles.MenuActive : ""
							}`}
						>
							<img src={Icons.Calendar} alt="Personal Events" />
							<div className={styles.MenuText}>Personal Events</div>
						</a>
						<a
							href="/my-tickets"
							className={`${styles.MenuItem} ${
								active === "my-tickets" ? styles.MenuActive : ""
							}`}
						>
							<img src={Icons.Ticket} alt="Tickets" />
							<div className={styles.MenuText}>My Tickets</div>
						</a>
						{/* <a href="/connections" className={`${styles.MenuItem} ${active === 'connections' ? styles.MenuActive : ''}`}>
                        <img src={Icons.People} alt="Connections" />
                        <div className={styles.MenuText}>Connections</div>
                    </a>
                    <a href="/messages" className={`${styles.MenuItem} ${active === 'messages' ? styles.MenuActive : ''}`}>
                        <img src={Icons.Chat} alt="Messages" />
                        <div className={styles.MenuText}>Messages</div>
                    </a> */}
						<a href="/create-event" style={{ textDecoration: "none" }}>
							<Button
								title={"Create Event"}
								icon={<BiPlusCircle />}
								classes={[styles.ButtonCreate]}
							/>
						</a>
					</div>

					<Separator width="100%" margin="20px 0" />

					{organizers.length == 0 ? (
						<div className={styles.OrganizerBlank}>
							<div className={styles.OrganizerBlankIcon} />
							<div className={styles.OrganizerBlankText}>
								Create Hybrid events attended by Millions
							</div>
							<Button title={"Create Organizer"} fnOnClick={openPopUporg} />
						</div>
					) : (
						<>
							<div
								className={styles.MenuText}
								style={{ color: "#aaa", fontWeight: 700, fontSize: 12 }}
							>
								ORGANIZATIONS
							</div>
							<div className={styles.OrganizerArea}>
								{organizers.map((org) => {
									return (
										<a
											href="#"
											className={styles.OrganizerItem}
											onClick={() => {
												handleOpenOrg(org.id);
											}}
										>
											<div
												className={styles.OrganizerLogo}
												style={{ backgroundImage: `url("${org.photo}")` }}
											></div>
											<div className={styles.OrganizerName}>{org.name}</div>
											{/* <div className={styles.OrganizerLabel}>Baru</div> */}
										</a>
									);
								})}
							</div>

							<div className={styles.OrganizerCreate} onClick={openPopUporg}>
								<AddCircle />
								Create Organization
							</div>
						</>
					)}
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
							{/* <a href="/connections" className={`${styles.MenuItem} ${active === 'connections' ? styles.MenuActive : ''}`}>
                            <img src={Icons.People} alt="Connections" />
                            {
                                active === 'connections' &&
                                <div className={styles.MenuText}>Connections</div>
                            }
                        </a>
                        <a href="/messages" className={`${styles.MenuItem} ${active === 'messages' ? styles.MenuActive : ''}`}>
                            <img src={Icons.Chat} alt="Messages" />
                            {
                                active === 'messages' &&
                                <div className={styles.MenuText}>Connections</div>
                            }
                        </a> */}
						</div>
						<div className={styles.OrganizerChooser}>
							<div
								className={styles.OrganizerLogo}
								onClick={() => showOrganizers()}
								style={{
									backgroundImage: `url('https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/organization/20230927233556_651459ec86c5a.jpg')`,
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
							{organizers.map((org) => {
								return (
									<a
										href="#"
										className={styles.OrganizerItem}
										onClick={() => {
											handleOpenOrg(org.id);
										}}
									>
										<div
											className={styles.OrganizerLogo}
											style={{ backgroundImage: `url("${org.photo}")` }}
										></div>
										<div className={styles.OrganizerName}>{org.name}</div>
										<div
											className={styles.OrganizerLabel}
											onClick={() => {
												handleOpenOrg(org.id);
											}}
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

export default SidebarUser;
