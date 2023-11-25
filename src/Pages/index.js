import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";

const PageRouter = () => {
	return (
		<Routes>
			<Route path="/" Component={Home} />
			<Route path="/dashboard" Component={Dashboard} />
			<Route path="/login" Component={Login} />
			{/* <Route path='/register'/> */}
		</Routes>
	);
};

export default PageRouter;
