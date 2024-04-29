import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PersonalEvent from "./PersonalEvent";
import UserProfile from "./Profile";
import MyTicket from "./MyTicket";
import Connection from "./Connection";
import Setting from "./Setting";
import HeaderUser from "../../partials/HeaderUser";
import SidebarUser from "../../partials/SidebarUser";
import axios from "axios";
import ErrorPage from "../../partials/ErrorPage";
import Catcher from "./Catcher";
import Invitation from "./Invitation";

const changeFitSidebarContent = () => {
	let content = document.getElementsByClassName("content")[0];
	let sidebar = document.getElementById("sidebar");

	if (sidebar) {
		console.log(sidebar.offsetWidth, content.offsetLeft, " log offset sidebar");
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

const isLoginLoad = async ({ accessToken }) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/api/is-login",
			undefined,
			{
				headers: {
					Authorization: "Bearer " + accessToken,
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
	const [errorState, setErrorState] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (typeRouter === "user") {
			// setactivepath
			let path = window.location.pathname;
			if (path === "/events") {
				setActivePath("personal-events");
			} else {
				setActivePath(path.split("/")[1]);
			}
		}
		console.log("SET NEW LOCATION");
	});

	useEffect(() => {
		if (typeRouter === "user") {
			changeFitSidebarContent();
		}
	}, [location]);

	useEffect(() => {
		console.log("type router set", typeRouter);
		if (typeRouter === "user" && !organizers && isLogin) {
			loadOrganizers().then((res) => {
				console.log(res);
				if (res.status === 200) {
					setOrganizers(res.data.organizations);
				} else if (res.status === 401) {
					setLogin(false);
				} else {
					setOrganizers([]);
					if (res.status !== 404) {
						setErrorState(true);
					}
				}
			});
		}
	}, [typeRouter, isLogin]);

	useEffect(() => {
		if (isLogin && localStorage.getItem("access_token")) {
			isLoginLoad(localStorage.getItem("access_token")).then((res) => {
				if (res.status === 200) {
					setLogin(true);
					setUserData(res.data);
				}
			});
		}
	}, [isLogin]);

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
			{errorState ? (
				<div className="content">
					<ErrorPage />
				</div>
			) : (
				<div className={`${!isLogin ? "d-none" : ""}`}>
					<Routes>
						{/* All route must have param setLogin fn for renew login state every load API */}
						<Route
							path="/events"
							element={
								<PersonalEvent isLogin={isLogin} fnSetLogin={setLogin} />
							}
						/>
						{/* Route profile must have param userData & setUserData for view user data and renew user data */}
						<Route
							path="/profile"
							element={<UserProfile isLogin={isLogin} fnSetLogin={setLogin} />}
						/>
						<Route
							path="/my-tickets"
							element={<MyTicket isLogin={isLogin} fnSetLogin={setLogin} />}
						/>
						<Route
							path="/invitations"
							element={<Invitation isLogin={isLogin} fnSetLogin={setLogin} />}
						/>
						{/* <Route path="/connections" Component={Connection} /> */}
						<Route
							path="/settings"
							element={<Setting isLogin={isLogin} fnSetLogin={setLogin} />}
						/>
						<Route path="*" element={<Catcher />} />
					</Routes>
				</div>
			)}
		</HeaderUser>
	);
};

export default UserRouter;
