import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import OrganizerEvent from "./Event";
import OrganizerBilling from "./Billing";
import OrganizerLegality from "./Legality";
import OrganizerActivities from "./Activities";
import OrganizerTeam from "./Team";
import OrganizerSettings from "./Settings";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import axios from "axios";
import CreateEvtAct from "./CreateEvtAct";
import EventDashboard from "./EventManagement/EventDashboard";
import ErrorPage from "../../partials/ErrorPage";
import Catcher from "../User/Catcher";

const changeFitSidebarContent = () => {
	let content = document.getElementsByClassName("content")[0];
	let sidebar = document.getElementById("sidebar");

	if (sidebar) {
		console.log(sidebar.offsetWidth, content.offsetLeft);
		content.style.left = sidebar.offsetWidth + "px";
	}
};

const loadOrganizers = async () => {
	try {
		let res = await axios.get(
			process.env.REACT_APP_BACKEND_URL + "/api/org/user-orgs",
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return {
			data: res.data,
			status: res.status,
		};
	} catch (error) {
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
	}
};

const OrganizerRouter = ({ typeRouter }) => {
	const [orgSelected, setOrgSelected] = useState(null);
	const [isLogin, setLogin] = useState(true);
	const [activePath, setActivePath] = useState(null);
	const [organizers, setOrganizers] = useState(null);
	const [errorState, setErrorState] = useState(false);
	const location = useLocation();

	useEffect(() => {
		console.log("log use location ", location);
			setActivePath(window.location.pathname.split("/organizer/")[1]);
		if (typeRouter === "organizer") {
			changeFitSidebarContent();
			console.log("use effect type organizer");
		}
		console.log("change fit sidebar ", typeRouter);
	}, [location]);

	// useEffect(() => {
	// 	setActivePath(window.location.pathname.split("/organizer/")[1]);
	// 	if (typeRouter === "organizer") {
	// 		changeFitSidebarContent();
	// 		console.log("use effect type organizer");
	// 	}
	// 	console.log("change fit sidebar ", typeRouter);
	// });

	useEffect(() => {
		if (isLogin && typeRouter === "organizer" && !organizers) {
			console.log("use effect type organizer load orgs data");
			loadOrganizers().then((res) => {
				console.log(res);
				if (res.status === 200) {
					setOrganizers(res.data.organizations);
				} else if (res.status === 401) {
					setLogin(false);
				} else {
					setOrganizers([]);
					if (res.status !== 404) {
						setErrorState(true);
					}
				}
			});
		} else if (!isLogin) {
			setOrganizers(null);
		}
	}, [isLogin, organizers, typeRouter]);
	return (
		<HeaderOrganizer
			active={activePath}
			orgSelected={orgSelected}
			setOrgSelected={setOrgSelected}
			isLogin={isLogin}
			setLogin={setLogin}
			show={typeRouter === "organizer" ? true : false}
			organizers={organizers}
		>
			<SidebarOrganizer
				active={activePath}
				orgSelected={orgSelected}
				setOrgSelected={setOrgSelected}
				setOrganizers={setOrganizers}
				setLogin={setLogin}
				organizers={organizers}
			/>
			{errorState ? (
				<div className="content">
					<ErrorPage />
				</div>
			) : (
				<div className={`${!isLogin ? "d-none" : ""}`}>
					<Routes>
						{/* All route must have isLogin and setLogin fn for renew login state every loading data */}
						<Route
							path="/organizer/events"
							element={
								<OrganizerEvent
									organization={
										organizers && orgSelected
											? organizers.filter((org) => org.id === orgSelected.value)
											: []
									}
									fnSetLogin={setLogin}
								/>
							}
						/>
						<Route
							path="/organizer/billing"
							element={
								<OrganizerBilling
									organization={
										organizers && orgSelected
											? organizers.filter((org) => org.id === orgSelected.value)
											: []
									}
									isLogin={isLogin}
									fnSetLogin={setLogin}
								/>
							}
						/>
						<Route
							path="/organizer/legality"
							element={
								<OrganizerLegality
									organization={
										organizers && orgSelected
											? organizers.filter((org) => org.id === orgSelected.value)
											: []
									}
									fnSetLogin={setLogin}
									isLogin={isLogin}
								/>
							}
						/>
						<Route
							path="/organizer/activities"
							element={
								<OrganizerActivities
									organization={
										organizers && orgSelected
											? organizers.filter((org) => org.id === orgSelected.value)
											: []
									}
									fnSetLogin={setLogin}
								/>
							}
						/>
						<Route
							path="/organizer/team"
							element={
								<OrganizerTeam
									fnSetLogin={setLogin}
									isLogin={isLogin}
									organization={
										organizers && orgSelected
											? organizers.filter((org) => org.id === orgSelected.value)
											: []
									}
								/>
							}
						/>
						<Route
							path="/organizer/settings"
							element={
								<OrganizerSettings
									organization={
										organizers && orgSelected
											? organizers.filter((org) => org.id === orgSelected.value)
											: []
									}
									loginState={isLogin}
									fnSetLogin={setLogin}
								/>
							}
						/>
						<Route
							path="/organizer/create-event"
							element={
								<CreateEvtAct
									organization={
										organizers && orgSelected
											? organizers.filter((org) => org.id === orgSelected.value)
											: []
									}
									fnSetLogin={setLogin}
									isLogin={isLogin}
								/>
							}
						/>
						<Route
							path="/organizer/create-activity"
							element={
								<CreateEvtAct
									organization={
										organizers && orgSelected
											? organizers.filter((org) => org.id === orgSelected.value)
											: []
									}
									loginState={isLogin}
									fnSetLogin={setLogin}
									forEvent={false}
								/>
							}
						/>
						<Route
							path="/organizer/event/dashboard"
							element={
								<EventDashboard
									organization={
										organizers && orgSelected
											? organizers.filter((org) => org.id === orgSelected.value)
											: []
									}
									isLogin={isLogin}
									fnSetLogin={setLogin}
								/>
							}
						/>
						<Route path="*" element={<Catcher />} />
					</Routes>
				</div>
			)}
		</HeaderOrganizer>
	);
};

export default OrganizerRouter;
