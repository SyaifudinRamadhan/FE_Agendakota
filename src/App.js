import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import PageRouter from "./Pages";
import "./App.css";
import UserRouter from "./Pages/User";
import OrganizerRouter from "./Pages/Organizer";

const changeFitSidebarContent = () => {
	try {
		let content = document.getElementsByClassName("content")[0];
		let sidebar = document.getElementById("sidebar");

		if (sidebar) {
			content.style.left = sidebar.offsetWidth + "px";
		}
	} catch (error) {
		console.log(error);
	}
};

window.addEventListener("load", () => {
	console.log("load ulang by window");
});

const App = () => {
	const [typeRouter, setTypeRouter] = useState(null);

	useEffect(() => {
		changeFitSidebarContent();
		window.addEventListener("resize", changeFitSidebarContent);

		if (
			window.location.pathname === "/" ||
			window.location.pathname === "/auth-user" ||
			window.location.pathname === "/register-user" ||
			window.location.pathname === "/create-event" ||
			(window.location.pathname.indexOf("/event/") === 0 &&
				window.location.pathname.split("/event/")[1] !== "" &&
				window.location.pathname.split("/event/")[1] !== undefined) ||
			window.location.pathname === "/404" ||
			window.location.pathname === "/explore" ||
			(window.location.pathname.indexOf("/organization-profile/") === 0 &&
				window.location.pathname.split("/organization-profile/")[1] !== "" &&
				window.location.pathname.split("/organization-profile/")[1] !==
					undefined)
		) {
			// basic route
			// NOTE: This route is in progress, add new path if create new page
			setTypeRouter("basic");
		} else if (window.location.pathname.includes("/organizer/")) {
			// organizer route
			setTypeRouter("organizer");
		} else {
			// user route
			setTypeRouter("user");
		}
	});

	return (
		<BrowserRouter>
			<PageRouter typeRouter={typeRouter} />
			<UserRouter typeRouter={typeRouter} />
			<OrganizerRouter typeRouter={typeRouter} />
		</BrowserRouter>
	);
};

export default App;
