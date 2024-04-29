import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Header from "../partials/Header";
import Register from "./Register";
import FrontCreateEvent from "./FrontCreateEvent";
import EventDetail from "./EventDeatail";
import Explore from "./Explore";
import OrganizationDetail from "./OrganizationDetail";

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
				<Route path="/explore" element={<Explore />} />
				<Route
					path="/organization-profile/:id"
					element={<OrganizationDetail />}
				/>
				<Route path="/auth-user" element={<Login isLogin={isLogin} />} />
				<Route path="/register-user" element={<Register isLogin={isLogin} />} />
				<Route
					path="/create-event"
					element={
						<FrontCreateEvent isLoginBasic={isLogin} fnSetLogin={setLogin} />
					}
				/>
				<Route path="/event/:id" element={<EventDetail isLogin={isLogin} />} />
				<Route
					path="*"
					element={
						<div className="content">
							<h1>404</h1>
						</div>
					}
				/>
			</Routes>
		</Header>
	);
};

export default PageRouter;
