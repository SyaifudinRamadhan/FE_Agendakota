import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Header from "../partials/Header";
import Register from "./Register";

const PageRouter = ({ typeRouter }) => {
	const [isLogin, setLogin] = useState(false);
	const [userData, setUserData] = useState(null);

	return (
		<Header
			isLogin={isLogin}
			setLogin={setLogin}
			userData={userData}
			setUserData={setUserData}
			show={typeRouter === "basic" ? true : false}
		>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/dashboard" Component={Dashboard} /> */}
				<Route path="/auth-user" element={<Login isLogin={isLogin} />} />
				<Route path="/register-user" element={<Register isLogin={isLogin} />} />
			</Routes>
		</Header>
	);
};

export default PageRouter;
