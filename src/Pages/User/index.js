import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PersonalEvent from "./PersonalEvent";
import UserProfile from "./Profile";
import MyTicket from "./MyTicket";
import Connection from "./Connection";
import Setting from "./Setting";
import HeaderUser from "../../partials/HeaderUser";
import SidebarUser from "../../partials/SidebarUser";
import axios from "axios";

const changeFitSidebarContent = () => {
	let content = document.getElementsByClassName("content")[0];
	let sidebar = document.getElementById("sidebar");

	if (sidebar) {
		console.log(sidebar.offsetWidth, content.offsetLeft);
		content.style.left = sidebar.offsetWidth + "px";
	}
};

const loadOrganizers = async () => {
	try {
		let res = await axios.get(
			process.env.REACT_APP_BACKEND_URL + "/api/org/user-orgs",
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return {
			data: res.data,
			status: res.status,
		};
	} catch (error) {
		console.log(error);
		if (error.response === undefined) {
			return {
				data: { data: [error.message] },
				status: 500,
			};
		} else {
			return {
				data: error.response,
				status: error.response.status,
			};
		}
	}
};

const UserRouter = ({ typeRouter }) => {
	const [isLogin, setLogin] = useState(true);
	const [userData, setUserData] = useState(null);
	const [activePath, setActivePath] = useState(null);
	const [organizers, setOrganizers] = useState(null);

	useEffect(() => {
		if (typeRouter === "user") {
			changeFitSidebarContent();
			// setactivepath
			let path = window.location.pathname;
			if (path === "/events") {
				setActivePath("personal-events");
			} else {
				setActivePath(path.split("/")[1]);
			}

			if (!organizers && isLogin) {
				loadOrganizers().then((res) => {
					console.log(res);
					if (res.status === 200) {
						setOrganizers(res.data.organizations);
					} else if (res.status === 401) {
						setLogin(false);
					} else {
						setOrganizers([]);
					}
				});
			}
		}
	});

	return (
		<HeaderUser
			isLogin={isLogin}
			setLogin={setLogin}
			userData={userData}
			setUserData={setUserData}
			expand={true}
			active={activePath}
			show={typeRouter === "user" ? true : false}
		>
			<SidebarUser
				active={activePath}
				organizers={organizers}
				setOrganizers={setOrganizers}
				setLogin={setLogin}
			/>
			<div className={`${!isLogin ? "d-none" : ""}`}>
				<Routes>
					{/* All route must have param setLogin fn for renew login state every load API */}
					<Route path="/events" element={<PersonalEvent />} />
					{/* Route profile must have param userData & setUserData for view user data and renew user data */}
					<Route path="/profile" element={<UserProfile />} />
					<Route path="/my-tickets" element={<MyTicket />} />
					{/* <Route path="/connections" Component={Connection} /> */}
					<Route path="/settings" element={<Setting />} />
				</Routes>
			</div>
		</HeaderUser>
	);
};

export default UserRouter;
