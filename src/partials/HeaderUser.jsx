import React from "react";
import {
  BiCog,
  BiCompass,
  BiGroup,
  BiLogOut,
  BiMenu,
  BiNote,
  BiQr,
  BiQrScan,
  BiUser,
} from "react-icons/bi";
import styles from "./styles/HeaderUser.module.css";
import { useEffect, useState } from "react";
import Separator from "../components/Separator";
import axios from "axios";
import PopUpLogin from "./PopUpLogin";
import PopUpCheckinUser from "./PopUpCheckinUserr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAppData } from "../actions/appdata";

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

const hideProfileMenuAuto = ({ setProfileActive }) => {
  try {
    let profileMenu = document.getElementById("profile-menu");
    let profileIcon = document.getElementById("profile-icon");
    window.addEventListener("click", (e) => {
      try {
        let profileMenuChildren = Object.values(profileMenu.children);
        if (
          e.target !== profileMenu &&
          e.target !== profileIcon &&
          profileMenuChildren.reduce((current, acc) => {
            if (acc === e.target) {
              return current || true;
            } else {
              return current;
            }
          }, false) === false
        ) {
          setProfileActive(false);
        }
      } catch (error) {}
    });
  } catch (error) {}
};

let loopLoad = 0;

const HeaderUser = ({
  isLogin,
  setLogin = () => {},
  userData,
  setUserData = () => {},
  expand = false,
  childrenExtra,
  children,
  organizerMode = false,
  active = "",
  show = false,
}) => {
  const [isProfileActive, setProfileActive] = useState(false);
  const [isMenuMobileActive, setMenuMobileActive] = useState(false);
  const [openPopUpCheckin, setPopUpQRState] = useState(false);
  const appData = useSelector((state) => state.appDataReducer);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    let target = e.target;
    let classes = target.classList[0]?.split("_");
    // console.log(classes);

    if (window.innerWidth > 480) {
      if (
        classes === undefined ||
        (classes.indexOf("HeaderUser") < 0 && isProfileActive)
      ) {
        setProfileActive(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.setItem("access_token", "");
    dispatch(
      getAppData({
        accessToken: "",
        activeOrg: localStorage.getItem("active-org"),
        activeEvent: localStorage.getItem("active-event"),
      })
    );
    navigate("/");
    // setLogin(false);
    // setUserData(null);
    // setProfileActive(false);
    // console.log("logout clickedd");
  };

  useEffect(() => {
    hideProfileMenuAuto({ setProfileActive: setProfileActive });
    console.log("MASUK PAGE HEADER USER");
  });

  useEffect(() => {
    if (show === true) {
      isLoginLoad({ accessToken: appData.accessToken }).then((res) => {
        if (res.status === 200) {
          setLogin(true);
          setUserData(res.data);
          loopLoad++;
        } else {
          setLogin(false);
        }
      });
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [appData]);

  useEffect(() => {
    setMenuMobileActive(false);
  }, [appData, location]);

  return show ? (
    <>
      {/* ======== Login Pop Up =========== */}
      {isLogin === false ? <PopUpLogin setLogin={setLogin} /> : <></>}
      {/* ================================= */}
      {/* ========= User Checkin Pop Up ========= */}
      {console.log("HEADER USER ===> ", isLogin)}
      {openPopUpCheckin ? (
        <PopUpCheckinUser
          fnSetLogin={setLogin}
          isLogin={isLogin}
          fnClose={setPopUpQRState}
        />
      ) : (
        <></>
      )}
      {/* ======================================= */}
      <div className={styles.HeaderMobile}>
        <div className={styles.LogoArea}>
          <img
            onClick={() => {
              navigate("/");
            }}
            src="/images/logo.png"
            alt="Logo Agendakota"
            className={`${styles.Logo} pointer`}
          />
        </div>
        <div
          className={styles.Toggler}
          onClick={() => setMenuMobileActive(!isMenuMobileActive)}
        >
          <BiMenu />
        </div>
      </div>
      <div
        className={`${styles.MenuMobile} ${
          isMenuMobileActive ? styles.MenuMobileActive : ""
        }`}
      >
        {organizerMode ? (
          childrenExtra
        ) : (
          <>
            <Link
              to="/explore"
              className={styles.MenuMobileItem}
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#ddd",
              }}
            >
              <BiCompass size={20} />
              Explore Events
            </Link>
            <div
              onClick={() => {
                setPopUpQRState(true);
                console.log("CLICK OPEN POPUP CHECKIN");
              }}
              className={`${styles.MenuMobileItem}`}
              style={{ flexDirection: "row", cursor: "pointer" }}
            >
              <BiQrScan size={20} />
              QR Check-in
            </div>
            {/* <a href="/invitations" className={styles.MenuMobileItem}>
							<BiGroup size={20} />
							Invitations
						</a> */}
          </>
        )}

        <div
          className={styles.Separator}
          style={{ margin: "20px 0px", width: "100%" }}
        ></div>
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
              backgroundImage: `url("${
                userData
                  ? process.env.REACT_APP_BACKEND_URL + userData.photo
                  : ""
              }")`,
            }}
          ></div>
          <div style={{ fontWeight: 600 }}>
            {userData ? userData.name : "Loading ..."}
          </div>
        </div>

        <div className={`${styles.ProfileMenu} ${styles.ProfileMenuMobile}`}>
          <Link
            to="/profile"
            className={`${styles.ProfileMenuItem} ${
              active === "profile" ? styles.ProfileMenuItemActive : ""
            }`}
          >
            <BiUser />
            Profile
          </Link>
          <Link
            to="/settings"
            className={`${styles.ProfileMenuItem} ${
              active === "settings" ? styles.ProfileMenuItemActive : ""
            }`}
          >
            <BiCog />
            Settings
          </Link>
          <Separator />
          <a
            href="#"
            className={`${styles.ProfileMenuItem}`}
            onClick={handleLogout}
          >
            <BiLogOut />
            Logout
          </a>
        </div>
      </div>
      <div className={styles.Header} style={{ left: expand ? "0%" : "20%" }}>
        {expand && (
          <div className={styles.LogoArea}>
            <img
              onClick={() => {
                navigate("/");
              }}
              src="/images/logo.png"
              alt="Logo Agendakota"
              className={`${styles.Logo} pointer`}
            />
          </div>
        )}
        {/* <div className={styles.Left}>Boost</div> */}
        <div className={styles.Right}>
          <Link
            to="/explore"
            className={styles.Item}
            style={{ border: "1px solid #ddd" }}
          >
            <BiCompass />
            Explore Events
          </Link>
          <div
            className={`${styles.Item}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPopUpQRState(true);
              console.log("CLICK OPEN POPUP CHECKIN");
            }}
          >
            <BiQr />
            QR Check-in
          </div>
          {/* <a href="/invitations" className={styles.Item}>
						<BiNote />
						Invitations
					</a> */}
          <div
            id="profile-icon"
            className={styles.ProfileIcon}
            onClick={() => setProfileActive(!isProfileActive)}
            style={{
              backgroundImage: `url("${
                userData
                  ? process.env.REACT_APP_BACKEND_URL + userData.photo
                  : ""
              }")`,
            }}
          ></div>
        </div>
      </div>
      {isProfileActive && (
        <div id="profile-menu" className={styles.ProfileMenu}>
          <Link
            to="/profile"
            onClick={() => {
              setProfileActive(false);
            }}
            className={`${styles.ProfileMenuItem} ${
              active === "profile" ? styles.ProfileMenuItemActive : ""
            }`}
          >
            <BiUser />
            Profile
          </Link>
          <Link
            to="/settings"
            onClick={() => {
              setProfileActive(false);
            }}
            className={`${styles.ProfileMenuItem} ${
              active === "settings" ? styles.ProfileMenuItemActive : ""
            }`}
          >
            <BiCog />
            Settings
          </Link>
          <div className={styles.Separator}></div>
          <a
            href="#"
            className={`${styles.ProfileMenuItem}`}
            onClick={handleLogout}
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

export default HeaderUser;
