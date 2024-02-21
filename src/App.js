import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./Pages";
import "./App.css";
import UserRouter from "./Pages/User";
import OrganizerRouter from "./Pages/Organizer";

const changeFitSidebarContent = () => {
	try {
		let content = document.getElementsByClassName("content")[0];
		let sidebar = document.getElementById("sidebar");

		if (sidebar) {
			console.log(sidebar.offsetWidth, content.offsetLeft);
			content.style.left = sidebar.offsetWidth + "px";
		}
	} catch (error) {
		console.log(error);
	}
};

const App = () => {
	const [typeRouter, setTypeRouter] = useState(null);

	useEffect(() => {
		changeFitSidebarContent();
		window.addEventListener("resize", changeFitSidebarContent);
		if (
			window.location.pathname === "/" ||
			window.location.pathname === "/auth-user" ||
			window.location.pathname === "/register-user"
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
