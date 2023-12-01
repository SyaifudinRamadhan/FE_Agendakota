import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import OrganizerEvent from "./Event";
import OrganizerBilling from "./Billing";
import OrganizerLegality from "./Legality";
import OrganizerActivities from "./Activities";
import OrganizerTeam from "./Team";
import OrganizerSettings from "./Settings";

const changeFitSidebarContent = () => {
	let content = document.getElementsByClassName("content")[0];
	let sidebar = document.getElementById("sidebar");

	if (sidebar) {
		console.log(sidebar.offsetWidth, content.offsetLeft);
		content.style.left = sidebar.offsetWidth + "px";
	}
};

const OrganizerRouter = () => {
	useEffect(() => {
		changeFitSidebarContent();
	});
	return (
		<Routes>
			<Route path="/organizer/events" Component={OrganizerEvent} />
			<Route path="/organizer/billing" Component={OrganizerBilling} />
			<Route path="/organizer/legality" Component={OrganizerLegality} />
			<Route path="/organizer/activities" Component={OrganizerActivities} />
			<Route path="/organizer/team" Component={OrganizerTeam} />
			<Route path="/organizer/settings" Component={OrganizerSettings} />
		</Routes>
	);
};

export default OrganizerRouter;
