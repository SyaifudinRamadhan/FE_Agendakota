import React, { useEffect, useState } from "react";
import styles from "./styles/Header.module.css";
import {
	BiSearch,
	BiMenu,
	BiUser,
	BiCog,
	BiLogOut,
	BiLogIn,
} from "react-icons/bi";
import Icons from "../icons";
import Search from "../icons/Search";
import Compass from "../icons/Compass";
import Button from "../components/Button";
import AddCircle from "../icons/AddCircle";
import { colors } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const isLoginLoad = async (accessToken) => {
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
		if (error.response === undefined) {
			return {
				data: { data: error.message },
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

let loopLoad = 0;

const Header = ({
	isLogin,
	setLogin,
	userData,
	setUserData,
	children,
	show = false,
}) => {
	const [isProfileActive, setProfileActive] = useState(null);
	const [isMenuMobileActive, setMenuMobileActive] = useState(false);

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		setLogin(false);
		setUserData(null);
		setProfileActive(false);
	};

	// single load
	useEffect(() => {
		if (
			loopLoad === 0 &&
			localStorage.getItem("access_token") !== undefined &&
			show === true
		) {
			console.log("load is login baasic", loopLoad);
			isLoginLoad(localStorage.getItem("access_token")).then((res) => {
				if (res.status === 200) {
					setLogin(true);
					setUserData(res.data);
					console.log(res, loopLoad);
				}
			});
			loopLoad++;
		}
	});

	return show ? (
		<>
			<header className={styles.HeaderMobile}>
				<img src="/images/logo.png" alt="Logo Header" className={styles.Logo} />
				<div
					className={styles.Toggler}
					onClick={() => setMenuMobileActive(!isMenuMobileActive)}
				>
					<BiMenu />
				</div>
			</header>
			<div
				className={`${styles.MenuMobile} ${
					isMenuMobileActive ? styles.MenuMobileActive : ""
				}`}
			>
				{isLogin && (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: 20,
						}}
					>
						<div
							id="profile-icon"
							className={styles.ProfileIcon}
							style={{
								backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}${userData.photo}")`,
							}}
						></div>
						<div style={{ fontWeight: 600 }}>{userData.name}</div>
					</div>
				)}
				{isLogin ? (
					<div className={`${styles.ProfileMenu} ${styles.ProfileMenuMobile}`}>
						<a
							href="/events"
							className={`${styles.ProfileMenuItem} ${styles.ProfileMenuItemActive}`}
						>
							<img src={Icons.Calendar} alt="Calendar" />
							Dashboard
						</a>
						<a href="/profile" className={`${styles.ProfileMenuItem}`}>
							<BiUser />
							Profile
						</a>
						<a href="/settings" className={`${styles.ProfileMenuItem}`}>
							<BiCog />
							Settings
						</a>
						<div className={styles.Separator}></div>
						<a
							href="#"
							className={`${styles.ProfileMenuItem}`}
							onClick={() => {
								handleLogout();
							}}
						>
							<BiLogOut />
							Logout
						</a>
					</div>
				) : (
					<div className={`${styles.ProfileMenu} ${styles.ProfileMenuMobile}`}>
						<Button
							title={"Daftar"}
							bgColor={"#ffffff"}
							textColor={colors.primary}
							fnOnClick={() => {
								navigate("/register-user");
							}}
							style={{ width: "100%", textAlign: "center" }}
						/>
						<Button
							title={"Login"}
							fnOnClick={() => {
								navigate("/auth-user");
							}}
							style={{ width: "100%", marginTop: "10px", textAlign: "center" }}
						/>
					</div>
				)}
			</div>
			<header className={styles.Header}>
				<img src="/images/logo.png" alt="Logo Header" className={styles.Logo} />
				<form className={styles.SearchForm}>
					<Search />
					<input
						type="text"
						className={styles.SearchInput}
						placeholder="Cari event atau atraksi lainnya"
					/>
				</form>
				<nav className={styles.Menu}>
					<a href="#" className={styles.MenuItem}>
						<Compass size={80} />
						Explore Events
					</a>
					<a href="#" className={styles.MenuItem}>
						<AddCircle />
						Create Event
					</a>
					{isLogin ? (
						<div
							className={styles.ProfileIcon}
							style={{
								backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}${userData.photo}")`,
							}}
							onClick={() => setProfileActive(!isProfileActive)}
						></div>
					) : (
						<>
							<Button
								title={"Daftar"}
								bgColor={"#ffffff"}
								textColor={colors.primary}
								fnOnClick={() => {
									navigate("/register-user");
								}}
							/>
							<Button
								title={"Login"}
								fnOnClick={() => {
									navigate("/auth-user");
								}}
							/>
						</>
					)}
				</nav>
			</header>
			{isProfileActive && (
				<div id="profile-popup" className={`${styles.ProfileMenu}`}>
					<a
						href="/events"
						className={`${styles.ProfileMenuItem} ${styles.ProfileMenuItemActive}`}
					>
						<img src={Icons.Calendar} alt="Calendar" />
						Dashboard
					</a>
					<a href="/profile" className={`${styles.ProfileMenuItem}`}>
						<BiUser />
						Profile
					</a>
					<a href="/settings" className={`${styles.ProfileMenuItem}`}>
						<BiCog />
						Settings
					</a>
					<div className={styles.Separator}></div>
					<a
						href="#"
						className={`${styles.ProfileMenuItem}`}
						onClick={() => {
							handleLogout();
						}}
					>
						<BiLogOut />
						Logout
					</a>
				</div>
			)}
			{children}
		</>
	) : (
		<></>
	);
};

export default Header;
