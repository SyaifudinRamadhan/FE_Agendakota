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

const Header = ({ isLogin, setLogin }) => {
	const [isProfileActive, setProfileActive] = useState(false);
	const [isMenuMobileActive, setMenuMobileActive] = useState(false);

	return (
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
							className={styles.ProfileIcon}
							style={{
								backgroundImage:
									"url(https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg)",
							}}
						></div>
						<div style={{ fontWeight: 600 }}>Riyan Satria</div>
					</div>
				)}
				{isLogin ? (
					<div className={styles.ProfileMenu}>
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
							onClick={() => setLogin(!isLogin)}
						>
							<BiLogOut />
							Logout
						</a>
					</div>
				) : (
					<div className={styles.ProfileMenu}>
						<Button
							title={"Daftar"}
							bgColor={"#ffffff"}
							textColor={colors.primary}
							fnOnClick={() => setLogin(!isLogin)}
							style={{ width: "100%", textAlign: "center" }}
						/>
						<Button
							title={"Login"}
							fnOnClick={() => setLogin(!isLogin)}
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
								backgroundImage:
									"url(https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg)",
							}}
							onClick={() => setProfileActive(!isProfileActive)}
						></div>
					) : (
						<>
							<Button
								title={"Daftar"}
								bgColor={"#ffffff"}
								textColor={colors.primary}
								fnOnClick={() => setLogin(!isLogin)}
							/>
							<Button title={"Login"} fnOnClick={() => setLogin(!isLogin)} />
						</>
					)}
				</nav>
			</header>
			{isProfileActive && (
				<div className={styles.ProfileMenu}>
					<a
						href="/evnts"
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
						onClick={() => setLogin(!isLogin)}
					>
						<BiLogOut />
						Logout
					</a>
				</div>
			)}
		</>
	);
};

export default Header;
