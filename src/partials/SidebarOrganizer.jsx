import React from "react";
import { useEffect, useRef, useState } from "react";
import BasicSidebarExt from "./BasicSidebarExt";
import styles from "./styles/SidebarUser.module.css";
import styles2 from "./styles/BasicSidebarExt.module.css";
import Select from "react-select";
import Icons from "../icons";
import Button from "../components/Button";
import Separator from "../components/Separator";
import {
	BiCertification,
	BiPlusCircle,
	BiSolidBank,
	BiUser,
} from "react-icons/bi";
import config from "../config";
import { useNavigate } from "react-router-dom";

const SidebarOrganizer = ({
	active = "",
	orgSelected,
	setOrgSelected,
	organizers,
	setOrganizers,
	setLogin,
}) => {
	const orgSelector = useRef(null);
	const navigate = useNavigate();

	const [asTeam, setTeamState] = useState(false);

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
			// navigate("/events");
			window.location.reload();
		}
	};

	useEffect(() => {
		if (organizers && organizers.length !== 0) {
			let selected = organizers.find(
				(data) => data.id === localStorage.getItem("active-org")
			);
			console.log("use effect selecct org sidebar");
			if (selected) {
				setOrgSelected({
					label: selected.name,
					value: selected.id,
				});
				if (selected.is_team === true) {
					setTeamState(true);
				}
			} else {
				// Navigate back / home events
				window.location.replace("/events");
			}
		} else if (organizers && organizers.length === 0) {
			window.location.replace("/events");
		}
	}, [organizers]);

	return (
		<BasicSidebarExt
			organizers={organizers}
			setLogin={setLogin}
			setOrganizers={setOrganizers}
		>
			{/* {console.log(orgSelected)} */}
			<Select
				className={styles2.SelectMenu}
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
				className={`${styles.MenuItem} ${
					active === "events" ? styles.MenuActive : ""
				}`}
			>
				<img src={Icons.Calendar} alt="Personal Events" />
				<div className={styles.MenuText}>Events</div>
			</a>
			<a
				href="/organizer/activities"
				className={`${styles.MenuItem} ${
					active === "activities" ? styles.MenuActive : ""
				}`}
			>
				<img src={Icons.Chat} alt="Activities" />
				<div className={styles.MenuText}>Activities</div>
			</a>
			{asTeam === false ? (
				<>
					<a
						href="/organizer/create-event"
						style={{ textDecorationLine: "none", marginTop: "20px" }}
					>
						<Button
							icon={<BiPlusCircle />}
							title={"Create Event"}
							style={{ width: "100%" }}
							center={true}
						></Button>
					</a>
					{/* <div style={{ height: 10 }}></div> */}
					<a
						href="/organizer/create-activity"
						style={{
							textDecorationLine: "none",
							marginTop: "10px",
						}}
					>
						<Button
							icon={<BiPlusCircle />}
							title={"Create Activity"}
							style={{
								width: "100%",
								backgroundColor: "white",
								color: config.colors.primary,
								marginBottom: "10px",
							}}
							center={true}
						></Button>
					</a>
					<Separator />
					<a
						href="/organizer/billing"
						className={`${styles.MenuItem} ${
							active === "billing" ? styles.MenuActive : ""
						}`}
					>
						<img src={Icons.Ticket} alt="Billing" />
						<div className={styles.MenuText}>Billing</div>
					</a>
					<a
						href="/organizer/team"
						className={`${styles.MenuItem} ${
							active === "team" ? styles.MenuActive : ""
						}`}
					>
						<img src={Icons.People} alt="Team" />
						<div className={styles.MenuText}>Team</div>
					</a>
					<a
						href="/organizer/legality"
						className={`${styles.MenuItem} ${
							active === "legality" ? styles.MenuActive : ""
						}`}
					>
						{/* <img src={Icons.People} alt="Legality" /> */}
						<BiCertification
							style={{ width: "22px", minWidth: "22px", height: "22px" }}
						/>
						<div className={styles.MenuText}>Legality</div>
					</a>
					<a
						href="/organizer/settings"
						className={`${styles.MenuItem} ${
							active === "settings" ? styles.MenuActive : ""
						}`}
					>
						{/* <img src={Icons.People} alt="Settings" /> */}
						<BiUser
							style={{ width: "22px", minWidth: "22px", height: "22px" }}
						/>
						<div className={styles.MenuText}>Settings</div>
					</a>
				</>
			) : (
				<></>
			)}

			{/* <div style={{ height: 20 }}></div> */}
		</BasicSidebarExt>
	);
};

export default SidebarOrganizer;
