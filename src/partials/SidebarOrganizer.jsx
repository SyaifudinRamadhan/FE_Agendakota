import React from "react";
import { useEffect, useRef, useState } from "react";
import BasicSidebarExt from "./BasicSidebarExt";
import styles from "./styles/SidebarUser.module.css";
import styles2 from "./styles/BasicSidebarExt.module.css";
import Select from "react-select";
import Icons from "../icons";
import Button from "../components/Button";
import Separator from "../components/Separator";
import {
  BiCertification,
  BiPlusCircle,
  BiSolidBank,
  BiUser,
} from "react-icons/bi";
import config from "../config";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAppData } from "../actions/appdata";

const SidebarOrganizer = ({
  active = "",
  orgSelected,
  setOrgSelected,
  organizers,
  waitOrganizerData,
  setOrganizers,
  setLogin,
}) => {
  const orgSelector = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [asTeam, setTeamState] = useState(false);
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
      navigate("/events");
      // window.location.reload();
    }
  };

  useEffect(() => {
    if (organizers && organizers.length !== 0) {
      let selected = organizers.find((data) => data.id === appData.activeOrg);
      // console.log("use effect selecct org sidebar");
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
        // Navigate back / home events
        navigate("/events");
      }
    } else if (organizers && organizers.length === 0 && !waitOrganizerData) {
      // console.log("FORCED NAVIGATE", waitOrganizerData);
      navigate("/events");
    }
    // console.log("waitOrganizerData", waitOrganizerData, organizers, appData);
  }, [appData, organizers, waitOrganizerData]);

  return (
    <BasicSidebarExt
      organizers={organizers}
      setLogin={setLogin}
      setOrganizers={setOrganizers}
    >
      <Select
        className={styles2.SelectMenu}
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
        className={`${styles.MenuItem} ${
          active === "events" ? styles.MenuActive : ""
        }`}
      >
        <img src={Icons.Calendar} alt="Personal Events" />
        <div className={styles.MenuText}>Events</div>
      </Link>
      <Link
        to="/organizer/activities"
        className={`${styles.MenuItem} ${
          active === "activities" ? styles.MenuActive : ""
        }`}
      >
        <img src={Icons.Chat} alt="Activities" />
        <div className={styles.MenuText}>Activities</div>
      </Link>
      {asTeam === false ? (
        <>
          <Link
            to="/organizer/create-event"
            style={{ textDecorationLine: "none", marginTop: "20px" }}
          >
            <Button
              icon={<BiPlusCircle />}
              title={"Create Event"}
              style={{ width: "100%" }}
              center={true}
            ></Button>
          </Link>
          {/* <div style={{ height: 10 }}></div> */}
          <Link
            to="/organizer/create-activity"
            style={{
              textDecorationLine: "none",
              marginTop: "10px",
            }}
          >
            <Button
              icon={<BiPlusCircle />}
              title={"Create Activity"}
              style={{
                width: "100%",
                backgroundColor: "white",
                color: config.colors.primary,
                marginBottom: "10px",
              }}
              center={true}
            ></Button>
          </Link>
          <Separator />
          <Link
            to="/organizer/billing"
            className={`${styles.MenuItem} ${
              active === "billing" ? styles.MenuActive : ""
            }`}
          >
            <img src={Icons.Ticket} alt="Billing" />
            <div className={styles.MenuText}>Billing</div>
          </Link>
          <Link
            to="/organizer/team"
            className={`${styles.MenuItem} ${
              active === "team" ? styles.MenuActive : ""
            }`}
          >
            <img src={Icons.People} alt="Team" />
            <div className={styles.MenuText}>Team</div>
          </Link>
          <Link
            to="/organizer/legality"
            className={`${styles.MenuItem} ${
              active === "legality" ? styles.MenuActive : ""
            }`}
          >
            {/* <img src={Icons.People} alt="Legality" /> */}
            <BiCertification
              style={{ width: "22px", minWidth: "22px", height: "22px" }}
            />
            <div className={styles.MenuText}>Legality</div>
          </Link>
          <Link
            to="/organizer/settings"
            className={`${styles.MenuItem} ${
              active === "settings" ? styles.MenuActive : ""
            }`}
          >
            {/* <img src={Icons.People} alt="Settings" /> */}
            <BiUser
              style={{ width: "22px", minWidth: "22px", height: "22px" }}
            />
            <div className={styles.MenuText}>Settings</div>
          </Link>
        </>
      ) : (
        <></>
      )}

      {/* <div style={{ height: 20 }}></div> */}
    </BasicSidebarExt>
  );
};

export default SidebarOrganizer;
