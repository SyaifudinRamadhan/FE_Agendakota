import React, { useEffect, useState } from "react";
import Header from "./Header";
import HeaderUser from "./HeaderUser";
import HeaderOrganizer from "./HeaderOrganizer";
import SidebarUser from "./SidebarUser";
import SidebarOrganizer from "./SidebarOrganizer";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import Home from "../Pages/Home";
import Explore from "../Pages/Explore";
import OrganizationDetail from "../Pages/OrganizationDetail";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import FrontCreateEvent from "../Pages/FrontCreateEvent";
import EventDetail from "../Pages/EventDeatail";
import PersonalEvent from "../Pages/User/PersonalEvent";
import UserProfile from "../Pages/User/Profile";
import MyTicket from "../Pages/User/MyTicket";
import Invitation from "../Pages/User/Invitation";
import Setting from "../Pages/User/Setting";
import Catcher from "../Pages/User/Catcher";
import OrganizerEvent from "../Pages/Organizer/Event";
import OrganizerBilling from "../Pages/Organizer/Billing";
import OrganizerLegality from "../Pages/Organizer/Legality";
import OrganizerActivities from "../Pages/Organizer/Activities";
import OrganizerTeam from "../Pages/Organizer/Team";
import OrganizerSettings from "../Pages/Organizer/Settings";
import CreateEvtAct from "../Pages/Organizer/CreateEvtAct";
import EventDashboard from "../Pages/Organizer/EventManagement/EventDashboard";
import ErrorPage from "./ErrorPage";
import { useSelector } from "react-redux";
import Blank from "../Pages/Blank";
import Category from "../Pages/Category";
import SpecialPage from "../Pages/SpecialPage";
import TermConditions from "../Pages/TermConditions";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import RefundCancelEvent from "../Pages/RefundCancelEvent";
import Price from "../Pages/Price";
import SelfCheckin from "../Pages/User/SelfCheckin";

// let firstLoad = true;

const changeFitSidebarContent = () => {
  let errState = false;
  do {
    // // console.log("SIDEBAR OFFSET CHANGED");
    try {
      let content = document.getElementsByClassName("content")[0];
      let sidebar = document.getElementById("sidebar");
      // console.log("CHANGE FIT SIDEBAR", sidebar);
      if (sidebar) {
        // // console.log(
        //   sidebar.offsetWidth,
        //   content.offsetLeft,
        //   " log offset sidebar"
        // );
        content.style.left = sidebar.offsetWidth + "px";
        errState = false;
      }
    } catch (error) {
      errState = true;
    }
  } while (errState);
};

const loadOrganizers = async ({ token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/org/user-orgs",
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    // console.log(error);
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
    // console.log(error);
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

window.addEventListener("click", changeFitSidebarContent);
window.addEventListener("resize", changeFitSidebarContent);

const resetMetaData = () => {
  // change favicon
  // document.getElementsByTagName("link")[0].href = "/logoApp.png";
  // document.getElementsByTagName("link")[2].href = "/logoApp.png";
  // change meta description content
  document.getElementsByTagName("meta")[2].content =
    "Agendakota.id memberikan solusi lengkap untuk membuat, mengelola, dan mempromosikan acara. Dari acara gratis hingga berbayar, semua bisa dilakukan disini.";
};

const WebFrame = () => {
  // From pages routers
  const [isLogin, setLogin] = useState(null);
  const [userData, setUserData] = useState(null);
  // From user routers
  const [activePath, setActivePath] = useState(null);
  const [organizers, setOrganizers] = useState(null);
  const [waitingOrgDatas, setWaitOrgDatasState] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const location = useLocation();
  // From organizer routers
  const [orgSelected, setOrgSelected] = useState(null);

  const [typeRouter, setTypeRouter] = useState(null);
  const appData = useSelector((state) => state.appDataReducer);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    changeFitSidebarContent();

    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/auth-user" ||
      window.location.pathname === "/register-user" ||
      window.location.pathname === "/create-event" ||
      window.location.pathname === "/categories" ||
      window.location.pathname === "/special-day" ||
      window.location.pathname === "/selected-events" ||
      window.location.pathname === "/selected-activities" ||
      window.location.pathname === "/activity-categories" ||
      window.location.pathname === "/term-conditions" ||
      window.location.pathname === "/privacy-policy" ||
      window.location.pathname === "/refund-cancel-event" ||
      window.location.pathname === "/trx-price" ||
      (window.location.pathname.indexOf("/event/") === 0 &&
        window.location.pathname.split("/event/")[1] !== "" &&
        window.location.pathname.split("/event/")[1] !== undefined) ||
      window.location.pathname === "/404" ||
      window.location.pathname === "/explore" ||
      (window.location.pathname.indexOf("/organization-profile/") === 0 &&
        window.location.pathname.split("/organization-profile/")[1] !== "" &&
        window.location.pathname.split("/organization-profile/")[1] !==
          undefined)
    ) {
      // basic route
      // NOTE: This route is in progress, add new path if create new page
      setTypeRouter("basic");
    } else if (window.location.pathname.includes("/organizer/")) {
      // organizer route
      setTypeRouter("organizer");
    } else {
      // user route
      setTypeRouter("user");
    }
  });

  // Effect control from user routers
  useEffect(() => {
    if (typeRouter === "organizer") {
      setActivePath(window.location.pathname.split("/organizer/")[1]);
    } else if (typeRouter === "user") {
      let path = window.location.pathname;
      if (path === "/events") {
        setActivePath("personal-events");
      } else {
        setActivePath(path.split("/")[1]);
      }
    }
    if (typeRouter === "organizer" || typeRouter === "user") {
      changeFitSidebarContent();
    } else {
      try {
        document.getElementsByClassName("content")[0].style.left = "0";
      } catch (error) {}
    }
    if (
      typeRouter === "basic" &&
      window.location.pathname.split("/")[1] !== "event"
    ) {
      resetMetaData();
    }
  }, [location, typeRouter]);

  useEffect(() => {
    if (isLogin && appData.accessToken) {
      isLoginLoad({ accessToken: appData.accessToken }).then((res) => {
        if (res.status === 200) {
          setLogin(true);
          setUserData(res.data);
        }
      });
    }
    if (
      isLogin &&
      window.location.pathname !== "/auth-user" &&
      window.location.pathname !== "/register-user"
    ) {
      loadOrganizers({ token: appData.accessToken }).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setOrganizers(res.data.organizations);
          setTimeout(() => {
            setWaitOrgDatasState(false);
          }, 100);
        } else if (res.status === 401) {
          setLogin(false);
        } else {
          setOrganizers([]);
          if (res.status !== 404) {
            setErrorState(true);
          } else {
            setTimeout(() => {
              setWaitOrgDatasState(false);
            }, 100);
          }
        }
      });
    } else if (!isLogin) {
      setOrganizers(null);
    }
  }, [isLogin, appData]);

  // useEffect(() => {
  //   // console.log("USE EFFECT SET LOGIN STATE RUNNING IN FRAME", firstLoad);
  //   if (isLogin === null && appData.accessToken && firstLoad) {
  //     setFirstLoad(false);
  //     isLoginLoad({ accessToken: appData.accessToken }).then((res) => {
  //       if (res.status === 200) {
  //         setLogin(true);
  //         setUserData(res.data);
  //       } else {
  //         setLogin(false);
  //       }
  //     });
  //   }
  // }, [firstLoad]);

  return (
    <>
      {typeRouter === "basic" ? (
        <Header
          isLogin={isLogin}
          setLogin={setLogin}
          userData={userData}
          setUserData={setUserData}
          show={typeRouter === "basic" ? true : false}
        />
      ) : typeRouter === "user" ? (
        <>
          <HeaderUser
            isLogin={isLogin}
            setLogin={setLogin}
            userData={userData}
            setUserData={setUserData}
            expand={true}
            active={activePath}
            show={typeRouter === "user" ? true : false}
          />
          <SidebarUser
            active={activePath}
            organizers={organizers}
            setOrganizers={setOrganizers}
            setLogin={setLogin}
          />
        </>
      ) : typeRouter === "organizer" ? (
        <>
          <HeaderOrganizer
            active={activePath}
            orgSelected={orgSelected}
            setOrgSelected={setOrgSelected}
            isLogin={isLogin}
            setLogin={setLogin}
            show={typeRouter === "organizer" ? true : false}
            organizers={organizers}
            waitOrganizerData={waitingOrgDatas}
          />
          <SidebarOrganizer
            active={activePath}
            orgSelected={orgSelected}
            setOrgSelected={setOrgSelected}
            setOrganizers={setOrganizers}
            setLogin={setLogin}
            organizers={organizers}
            waitOrganizerData={waitingOrgDatas}
          />
        </>
      ) : (
        <></>
      )}
      {errorState ? (
        <div className="content">
          <ErrorPage />
        </div>
      ) : (
        <div
          className={`${
            !isLogin && (typeRouter === "organizer" || typeRouter === "user")
              ? "d-none"
              : ""
          }`}
        >
          <Routes>
            {/* Routes basic */}
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Category />} />
            <Route
              path="/activity-categories"
              element={<Category type="activities" />}
            />
            <Route path="/explore" element={<Explore />} />
            <Route
              path="/special-day"
              element={<SpecialPage type={"special-day"} />}
            />
            <Route
              path="/selected-events"
              element={<SpecialPage type={"selected-event"} />}
            />
            <Route
              path="/selected-activities"
              element={<SpecialPage type={"selected-activity"} />}
            />
            <Route path="/term-conditions" element={<TermConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/refund-cancel-event"
              element={<RefundCancelEvent />}
            />
            <Route path="/trx-price" element={<Price />} />
            <Route
              path="/organization-profile/:id"
              element={<OrganizationDetail />}
            />
            <Route path="/auth-user" element={<Login isLogin={isLogin} />} />
            <Route
              path="/register-user"
              element={<Register isLogin={isLogin} />}
            />
            <Route
              path="/create-event"
              element={
                <FrontCreateEvent
                  isLoginBasic={isLogin}
                  fnSetLogin={setLogin}
                />
              }
            />
            <Route
              path="/event/:id"
              element={<EventDetail isLogin={isLogin} />}
            />

            {/* Routes user */}
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
              path="/self-checkin/:id"
              element={<SelfCheckin isLogin={isLogin} fnSetLogin={setLogin} />}
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

            {/* Routes Organizer */}
            {/* All route must have isLogin and setLogin fn for renew login state every loading data */}
            <Route
              path="/organizer/events"
              element={
                <OrganizerEvent
                  organization={
                    organizers && orgSelected
                      ? organizers.filter((org) => org.id === orgSelected.value)
                      : []
                  }
                  fnSetLogin={setLogin}
                />
              }
            />
            <Route
              path="/organizer/billing"
              element={
                <OrganizerBilling
                  organization={
                    organizers && orgSelected
                      ? organizers.filter((org) => org.id === orgSelected.value)
                      : []
                  }
                  isLogin={isLogin}
                  fnSetLogin={setLogin}
                />
              }
            />
            <Route
              path="/organizer/legality"
              element={
                <OrganizerLegality
                  organization={
                    organizers && orgSelected
                      ? organizers.filter((org) => org.id === orgSelected.value)
                      : []
                  }
                  fnSetLogin={setLogin}
                  isLogin={isLogin}
                />
              }
            />
            <Route
              path="/organizer/activities"
              element={
                <OrganizerActivities
                  organization={
                    organizers && orgSelected
                      ? organizers.filter((org) => org.id === orgSelected.value)
                      : []
                  }
                  fnSetLogin={setLogin}
                />
              }
            />
            <Route
              path="/organizer/team"
              element={
                <OrganizerTeam
                  fnSetLogin={setLogin}
                  isLogin={isLogin}
                  organization={
                    organizers && orgSelected
                      ? organizers.filter((org) => org.id === orgSelected.value)
                      : []
                  }
                />
              }
            />
            <Route
              path="/organizer/settings"
              element={
                <OrganizerSettings
                  organization={
                    organizers && orgSelected
                      ? organizers.filter((org) => org.id === orgSelected.value)
                      : []
                  }
                  loginState={isLogin}
                  fnSetLogin={setLogin}
                />
              }
            />
            <Route
              path="/organizer/create-event"
              element={
                <CreateEvtAct
                  organization={
                    organizers && orgSelected
                      ? organizers.filter((org) => org.id === orgSelected.value)
                      : []
                  }
                  fnSetLogin={setLogin}
                  isLogin={isLogin}
                />
              }
            />
            <Route
              path="/organizer/create-activity"
              element={
                <CreateEvtAct
                  organization={
                    organizers && orgSelected
                      ? organizers.filter((org) => org.id === orgSelected.value)
                      : []
                  }
                  loginState={isLogin}
                  fnSetLogin={setLogin}
                  forEvent={false}
                />
              }
            />
            <Route
              path="/organizer/event/dashboard"
              element={
                <EventDashboard
                  organization={
                    organizers && orgSelected
                      ? organizers.filter((org) => org.id === orgSelected.value)
                      : []
                  }
                  isLogin={isLogin}
                  fnSetLogin={setLogin}
                />
              }
            />

            {/* Catcher router */}
            <Route path="/404" element={<Blank />} />
            <Route path="*" element={<Catcher />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default WebFrame;
