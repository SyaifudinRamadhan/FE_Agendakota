import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./Pages";
import "./App.css";
import UserRouter from "./Pages/User";
import OrganizerRouter from "./Pages/Organizer";

const changeFitSidebarContent = () => {
	let content = document.getElementsByClassName("content")[0];
	let sidebar = document.getElementById("sidebar");

	if (sidebar) {
		console.log(sidebar.offsetWidth, content.offsetLeft);
		content.style.left = sidebar.offsetWidth + "px";
	}
};

const App = () => {
	useEffect(() => {
		changeFitSidebarContent();
		window.addEventListener("resize", changeFitSidebarContent);
	});

	return (
		<BrowserRouter>
			<PageRouter />
			<UserRouter />
			<OrganizerRouter />
		</BrowserRouter>
	);
};

export default App;
