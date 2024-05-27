import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { getAppData } from "./actions/appdata";
import WebFrame from "./partials/WebFrame";

window.addEventListener("load", () => {
	console.log("load ulang by window");
});

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAppData({
				accessToken: localStorage.getItem("access_token"),
        activeOrg: localStorage.getItem("active-org"),
        activeEvent: localStorage.getItem('active-event'),
		}));
	}, [dispatch]);

	return (
		<BrowserRouter>
			<WebFrame />
		</BrowserRouter>
	);
};

export default App;
