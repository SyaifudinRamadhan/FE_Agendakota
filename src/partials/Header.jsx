import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

  const searchForm = useRef();

  const navigate = useNavigate();
  const appData = useSelector((state) => state.appDataReducer);

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
    setUserData(null);
    setProfileActive(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let searchParam = searchForm.current.value;
    navigate("/explore?name=" + searchParam);
    // window.location.href = "/explore?name=" + searchParam;
  };

  useEffect(() => {
    hideProfileMenuAuto({ setProfileActive: setProfileActive });
    // console.log("MASUK PAGE HEADER");
  });

  // single load
  useEffect(() => {
    if (show === true) {
      // console.log("load is login baasic", loopLoad);
      isLoginLoad(appData.accessToken).then((res) => {
        if (res.status === 200) {
          setLogin(true);
          setUserData(res.data);
          // console.log(res, loopLoad);
        }
      });
      // loopLoad++;
    }
  }, [appData]);

  return show ? (
    <>
      <header className={styles.HeaderMobile}>
        <img
          onClick={() => {
            navigate("/");
          }}
          src="/images/logo.png"
          alt="Logo Header"
          className={`${styles.Logo} pointer`}
        />
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
                backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}${userData.photo}")`,
              }}
            ></div>
            <div style={{ fontWeight: 600 }}>{userData.name}</div>
          </div>
        )}
        {isLogin ? (
          <div className={`${styles.ProfileMenu} ${styles.ProfileMenuMobile}`}>
            <Link
              to="/events"
              className={`${styles.ProfileMenuItem} ${styles.ProfileMenuItemActive}`}
            >
              <img src={Icons.Calendar} alt="Calendar" />
              Dashboard
            </Link>
            <Link to="/profile" className={`${styles.ProfileMenuItem}`}>
              <BiUser />
              Profile
            </Link>
            <Link to="/settings" className={`${styles.ProfileMenuItem}`}>
              <BiCog />
              Settings
            </Link>
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
                setMenuMobileActive(false);
              }}
              style={{ width: "100%", textAlign: "center" }}
            />
            <Button
              title={"Login"}
              fnOnClick={() => {
                navigate("/auth-user");
                setMenuMobileActive(false);
              }}
              style={{ width: "100%", marginTop: "10px", textAlign: "center" }}
            />
          </div>
        )}
      </div>
      <header className={styles.Header}>
        <img
          onClick={() => {
            navigate("/");
          }}
          src="/images/logo.png"
          alt="Logo Header"
          className={`${styles.Logo} pointer`}
        />
        <form className={styles.SearchForm} onSubmit={handleSearch}>
          <Search />
          <input
            type="text"
            className={styles.SearchInput}
            placeholder="Cari event atau atraksi lainnya"
            ref={searchForm}
            defaultValue={
              window.location.href.split("name=").length > 1
                ? window.location.href.split("name=")[1].split("&")[0]
                : ""
            }
          />
        </form>
        <nav className={styles.Menu}>
          <Link to="/explore" className={styles.MenuItem}>
            <Compass size={80} />
            Explore Events
          </Link>
          <Link to="/create-event" className={styles.MenuItem}>
            <AddCircle />
            Create Event
          </Link>
          {isLogin ? (
            <div
              id="profile-icon"
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
        <div id="profile-menu" className={`${styles.ProfileMenu}`}>
          <Link
            to="/events"
            className={`${styles.ProfileMenuItem} ${styles.ProfileMenuItemActive}`}
          >
            <img src={Icons.Calendar} alt="Calendar" />
            Dashboard
          </Link>
          <Link to="/profile" className={`${styles.ProfileMenuItem}`}>
            <BiUser />
            Profile
          </Link>
          <Link to="/settings" className={`${styles.ProfileMenuItem}`}>
            <BiCog />
            Settings
          </Link>
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
