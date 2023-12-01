import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PersonalEvent from "./PersonalEvent";
import UserProfile from "./Profile";
import MyTicket from "./MyTicket";
import Connection from "./Connection";
import Setting from "./Setting";

const changeFitSidebarContent = () => {
	let content = document.getElementsByClassName("content")[0];
	let sidebar = document.getElementById("sidebar");

	if (sidebar) {
		console.log(sidebar.offsetWidth, content.offsetLeft);
		content.style.left = sidebar.offsetWidth + "px";
	}
};

const UserRouter = () => {
	useEffect(() => {
		changeFitSidebarContent();
	});
	return (
		<Routes>
			<Route path="/events" Component={PersonalEvent} />
			<Route path="/profile" Component={UserProfile} />
			<Route path="/my-tickets" Component={MyTicket} />
			{/* <Route path="/connections" Component={Connection} /> */}
			<Route path="/settings" Component={Setting} />
		</Routes>
	);
};

export default UserRouter;
