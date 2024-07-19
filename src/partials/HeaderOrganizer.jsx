import React from "react";
import HeaderUser from "./HeaderUser";
import styles from "./styles/HeaderUser.module.css";
import Icons from "../icons";
import Button from "../components/Button";
import Separator from "../components/Separator";
import {
  BiArrowBack,
  BiCertification,
  BiPlusCircle,
  BiSolidBank,
  BiUser,
} from "react-icons/bi";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import config from "../config";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAppData } from "../actions/appdata";

const HeaderOrganizer = ({
  active = "events",
  orgSelected,
  setOrgSelected,
  isLogin,
  setLogin,
  show,
  organizers,
  waitOrganizerData,
  children,
}) => {
  const [userData, setUserData] = useState(null);
  const [asTeam, setTeamState] = useState(false);

  const orgSelector = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appData = useSelector((state) => state.appDataReducer);

  const handleSelect = (event) => {
    let orgId = event.value;
    // Dummy re-set organizer data
    localStorage.setItem("active-org", orgId);
    let selected = organizers.find((data) => data.id === orgId);
    if (selected) {
      setOrgSelected({
        label: selected.name,
        value: selected.id,
      });
      dispatch(
        getAppData({
          accessToken: appData.accessToken,
          activeOrg: orgId,
          activeEvent: localStorage.getItem("active-event"),
        })
      );
      if (selected.is_team === true) {
        setTeamState(true);
        navigate("/organizer/events");
      } else {
        setTeamState(false);
      }
    } else {
      // Navigate back / home events
      // window.location.reload();

      navigate("/events");
    }
  };

  useEffect(() => {
    if (organizers && organizers.length !== 0 && show) {
      let selected = organizers.find((data) => data.id === appData.activeOrg);
      // console.log("use effect selecct org header");
      if (selected) {
        setOrgSelected({
          label: selected.name,
          value: selected.id,
        });
        if (selected.is_team === true) {
          setTeamState(true);
        } else {
          setTeamState(false);
        }
      } else {
        // Navigate back
        navigate("/events");
      }
    } else if (organizers && organizers.length === 0 && !waitOrganizerData) {
      navigate("/events");
    }
  }, [appData, organizers, waitOrganizerData]);

  return (
    <HeaderUser
      organizerMode={true}
      active={active}
      expand={true}
      isLogin={isLogin}
      setLogin={setLogin}
      userData={userData}
      setUserData={setUserData}
      show={show}
      childrenExtra={
        <>
          <div
            onClick={() => {
              navigate("/my-tickets");
              // console.log("CLICK OPEN POPUP CHECKIN");
            }}
            className={`${styles.MenuMobileItem}`}
            style={{
              borderWidth: 1,
              borderRadius: "15px",
              flexDirection: "row",
              paddingTop: "0",
            }}
          >
            <BiArrowBack size={20} />
            Back User Basic
          </div>
          <hr
            style={{
              marginBottom: "15px",
            }}
          />
          <Select
            options={
              organizers &&
              organizers.map((org) => {
                return {
                  value: org.id,
                  label: org.name,
                };
              })
            }
            value={orgSelected}
            styles={{
              option: (basicStyle, state) => ({
                ...basicStyle,
                backgroundColor: state.isFocused ? "#fecadf" : "white",
              }),
            }}
            ref={orgSelector}
            onChange={handleSelect}
          />

          <Link
            to="/organizer/events"
            className={`${styles.MenuMobileItem} ${
              active === "events" ? styles.ProfileMenuItemActive : ""
            }`}
          >
            <img src={Icons.Calendar} alt="Personal Events" />
            <div className={styles.MenuText}>Events</div>
          </Link>
          <Link
            to="/organizer/activities"
            className={`${styles.MenuMobileItem} ${
              active === "activities" ? styles.ProfileMenuItemActive : ""
            }`}
          >
            <img src={Icons.Chat} alt="Activities" />
            <div className={styles.MenuText}>Activities</div>
          </Link>
          <Separator />
          {asTeam === false ? (
            <>
              <Link
                to="/organizer/billing"
                className={`${styles.MenuMobileItem} ${
                  active === "billing" ? styles.ProfileMenuItemActive : ""
                }`}
              >
                <img src={Icons.Ticket} alt="Billing" />
                <div className={styles.MenuText}>Billing</div>
              </Link>
              <Link
                to="/organizer/team"
                className={`${styles.MenuMobileItem} ${
                  active === "team" ? styles.ProfileMenuItemActive : ""
                }`}
              >
                <img src={Icons.People} alt="Team" />
                <div className={styles.MenuText}>Team</div>
              </Link>
              <Link
                to="/organizer/legality"
                className={`${styles.MenuMobileItem} ${
                  active === "legality" ? styles.ProfileMenuItemActive : ""
                }`}
              >
                {/* <img src={Icons.People} alt="Legality" /> */}
                <BiCertification style={{ width: "22px", height: "22px" }} />
                <div className={styles.MenuText}>Legality</div>
              </Link>
              <Link
                to="/organizer/settings"
                className={`${styles.MenuMobileItem} ${
                  active === "settings" ? styles.ProfileMenuItemActive : ""
                }`}
              >
                {/* <img src={Icons.People} alt="Settings" /> */}
                <BiUser style={{ width: "22px", height: "22px" }} />
                <div className={styles.MenuText}>Settings</div>
              </Link>

              <div style={{ height: 20 }}></div>

              <Link
                to="/organizer/create-event"
                style={{ textDecorationLine: "none" }}
              >
                <Button
                  title={"Create Event"}
                  icon={<BiPlusCircle />}
                  style={{ width: "100%", padding: "15px 20px", gap: "20px" }}
                  center={true}
                />
              </Link>
              <div style={{ height: 10 }}></div>
              <Link
                to="/organizer/create-activity"
                style={{ textDecorationLine: "none" }}
              >
                <Button
                  title={"Create Activity"}
                  icon={<BiPlusCircle />}
                  style={{
                    width: "100%",
                    padding: "15px 20px",
                    gap: "20px",
                    backgroundColor: "white",
                    color: config.colors.primary,
                  }}
                  center={true}
                />
              </Link>
            </>
          ) : (
            <></>
          )}
        </>
      }
    >
      {children}
    </HeaderUser>
  );
};

export default HeaderOrganizer;
