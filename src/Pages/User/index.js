import React from "react";
import { Route, Routes } from "react-router-dom";
import PersonalEvent from "./PersonalEvent";
import UserProfile from "./Profile";
import MyTicket from "./MyTicket";
import Connection from "./Connection";
import Setting from "./Setting";

const UserRouter = () => {
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
