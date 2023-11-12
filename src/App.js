import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./Pages";
import './App.css';
import UserRouter from "./Pages/User";
import OrganizerRouter from "./Pages/Organizer";

const App = () => {
	return (
		<BrowserRouter>
			<PageRouter />
			<UserRouter />
			<OrganizerRouter />
		</BrowserRouter>
	)
}

export default App