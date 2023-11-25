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
	activeOrg,
	active = "",
	orgSelected,
	setOrgSelected,
}) => {
	const [organizers, setOrganizers] = useState([]);
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
		} else {
			// Navigate back / home events
			navigate("/events");
		}
	};

	useEffect(() => {
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

	useEffect(() => {
		if (organizers.length !== 0) {
			let selected = organizers.find((data) => data.id === activeOrg);
			// console.log(selected, activeOrg, organizers);
			if (selected) {
				setOrgSelected({
					label: selected.name,
					value: selected.id,
				});
			} else {
				// Navigate back / home events
				navigate("/events");
			}
		}
	}, [organizers]);

	return (
		<BasicSidebarExt organizers={organizers}>
			{/* {console.log(orgSelected)} */}
			<Select
				className={styles2.SelectMenu}
				options={organizers.map((org) => {
					return {
						value: org.id,
						label: org.name,
					};
				})}
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
				href="/organizer/activities"
				className={`${styles.MenuItem} ${
					active === "activities" ? styles.MenuActive : ""
				}`}
			>
				<img src={Icons.Chat} alt="Activities" />
				<div className={styles.MenuText}>Activities</div>
			</a>
			<Separator />
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
				<BiUser style={{ width: "22px", minWidth: "22px", height: "22px" }} />
				<div className={styles.MenuText}>Settings</div>
			</a>

			{/* <div style={{ height: 20 }}></div> */}

			<a
				href="/organizer/123/create-event"
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
				href="/organizer/123/create-activity"
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
		</BasicSidebarExt>
	);
};

export default SidebarOrganizer;
