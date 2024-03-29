import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/SidebarUser.module.css";
import Icons from "../icons";
import Separator from "../components/Separator";
import AddCircle from "../icons/AddCircle";
import {
	BiChevronDown,
	BiCircle,
	BiFilter,
	BiGroup,
	BiPlus,
	BiPlusCircle,
} from "react-icons/bi";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import AddOrganization from "./AddOrganization";

const SidebarUser = ({
	show = true,
	active = null,
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
			// console.log(window.innerWidth);
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
			{width > 992 && show ? (
				<div id="sidebar" className={styles.Sidebar}>
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
						<a
							href="/create-event"
							style={{ textDecoration: "none", marginTop: "10px" }}
						>
							<Button
								title={"Create Event"}
								icon={<BiPlusCircle />}
								classes={[styles.ButtonCreate]}
							/>
						</a>
					</div>

					<Separator width="100%" margin="20px 0" />

					{organizers ? (
						organizers.length == 0 ? (
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
													}}
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
						)
					) : (
						<></>
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
								organizers.map((org) => {
									return (
										<a
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
												}}
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
