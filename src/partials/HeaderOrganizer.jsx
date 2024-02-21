import React from "react";
import HeaderUser from "./HeaderUser";
import styles from "./styles/HeaderUser.module.css";
import Icons from "../icons";
import Button from "../components/Button";
import Separator from "../components/Separator";
import {
	BiCertification,
	BiPlusCircle,
	BiSolidBank,
	BiUser,
} from "react-icons/bi";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";

const HeaderOrganizer = ({
	active = "events",
	orgSelected,
	setOrgSelected,
	isLogin,
	setLogin,
	show,
	organizers,
	children,
}) => {
	const [userData, setUserData] = useState(null);
	const [asTeam, setTeamState] = useState(false);

	const orgSelector = useRef(null);

	const navigate = useNavigate();

	const handleSelect = (event) => {
		let orgId = event.value;
		// Dummy re-set organizer data
		localStorage.setItem("active-org", orgId);
		let selected = organizers.find((data) => data.id === orgId);
		if (selected) {
			setOrgSelected({
				label: selected.name,
				value: selected.id,
			});
			if (selected.is_team === true) {
				setTeamState(true);
				navigate("/organizer/events");
			} else {
				setTeamState(false);
			}
		} else {
			// Navigate back / home events
			window.location.reload();
		}
	};

	useEffect(() => {
		if (organizers && organizers.length !== 0 && show) {
			let activeOrg = localStorage.getItem("active-org");
			let selected = organizers.find((data) => data.id === activeOrg);
			console.log("use effect selecct org header");
			if (selected) {
				setOrgSelected({
					label: selected.name,
					value: selected.id,
				});
				if (selected.is_team === true) {
					setTeamState(true);
				}
			} else {
				// Navigate back
				window.location.replace("/events");
			}
		} else if (organizers && organizers.length === 0) {
			window.location.replace("/events");
		}
	}, [organizers]);

	return (
		<HeaderUser
			organizerMode={true}
			active={active}
			expand={true}
			isLogin={isLogin}
			setLogin={setLogin}
			userData={userData}
			setUserData={setUserData}
			show={show}
			childrenExtra={
				<>
					<Select
						options={
							organizers &&
							organizers.map((org) => {
								return {
									value: org.id,
									label: org.name,
								};
							})
						}
						value={orgSelected}
						styles={{
							option: (basicStyle, state) => ({
								...basicStyle,
								backgroundColor: state.isFocused ? "#fecadf" : "white",
							}),
						}}
						ref={orgSelector}
						onChange={handleSelect}
					/>

					<a
						href="/organizer/events"
						className={`${styles.MenuMobileItem} ${
							active === "events" ? styles.ProfileMenuItemActive : ""
						}`}
					>
						<img src={Icons.Calendar} alt="Personal Events" />
						<div className={styles.MenuText}>Events</div>
					</a>
					<a
						href="/organizer/activities"
						className={`${styles.MenuMobileItem} ${
							active === "activities" ? styles.ProfileMenuItemActive : ""
						}`}
					>
						<img src={Icons.Chat} alt="Activities" />
						<div className={styles.MenuText}>Activities</div>
					</a>
					<Separator />
					{asTeam === false ? (
						<>
							<a
								href="/organizer/billing"
								className={`${styles.MenuMobileItem} ${
									active === "billing" ? styles.ProfileMenuItemActive : ""
								}`}
							>
								<img src={Icons.Ticket} alt="Billing" />
								<div className={styles.MenuText}>Billing</div>
							</a>
							<a
								href="/organizer/team"
								className={`${styles.MenuMobileItem} ${
									active === "team" ? styles.ProfileMenuItemActive : ""
								}`}
							>
								<img src={Icons.People} alt="Team" />
								<div className={styles.MenuText}>Team</div>
							</a>
							<a
								href="/organizer/legality"
								className={`${styles.MenuMobileItem} ${
									active === "legality" ? styles.ProfileMenuItemActive : ""
								}`}
							>
								{/* <img src={Icons.People} alt="Legality" /> */}
								<BiCertification style={{ width: "22px", height: "22px" }} />
								<div className={styles.MenuText}>Legality</div>
							</a>
							<a
								href="/organizer/settings"
								className={`${styles.MenuMobileItem} ${
									active === "settings" ? styles.ProfileMenuItemActive : ""
								}`}
							>
								{/* <img src={Icons.People} alt="Settings" /> */}
								<BiUser style={{ width: "22px", height: "22px" }} />
								<div className={styles.MenuText}>Settings</div>
							</a>

							<div style={{ height: 20 }}></div>

							<a
								href="/organizer/create-event"
								style={{ textDecorationLine: "none" }}
							>
								<Button
									title={"Create Event"}
									icon={<BiPlusCircle />}
									style={{ width: "100%", padding: "15px 20px", gap: "20px" }}
									center={true}
								/>
							</a>
							<div style={{ height: 10 }}></div>
							<a
								href="/organizer/create-activity"
								style={{ textDecorationLine: "none" }}
							>
								<Button
									title={"Create Activity"}
									icon={<BiPlusCircle />}
									style={{
										width: "100%",
										padding: "15px 20px",
										gap: "20px",
										backgroundColor: "white",
										color: config.colors.primary,
									}}
									center={true}
								/>
							</a>
						</>
					) : (
						<></>
					)}
				</>
			}
		>
			{children}
		</HeaderUser>
	);
};

export default HeaderOrganizer;
