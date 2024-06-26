import React from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import styles from "./styles/OrganizerMenu.module.css";
import Icons from "../icons";
import { useState } from "react";
import Separator from "../components/Separator";
import { Link } from "react-router-dom";

const OrganizerMenu = ({ active = null }) => {
  const [mobileShowMenu, setMobileShowMenu] = useState(false);

  if (window.innerWidth > 480) {
    return (
      <div className={styles.Menu}>
        <div className="inline">
          <div className={styles.OrganizerLogo}></div>
          <div
            className="title"
            style={{ display: "flex", flexGrow: 1, fontSize: 16 }}
          >
            Medical Toursim Ind...
          </div>
        </div>

        <div className={styles.MenuArea}>
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
            to="/organizer/activities"
            className={`${styles.MenuItem} ${
              active === "activities" ? styles.MenuActive : ""
            }`}
          >
            <img src={Icons.Chat} alt="Activities" />
            <div className={styles.MenuText}>Activities</div>
          </Link>
          <Separator />
          <Link
            to="/organizer/legality"
            className={`${styles.MenuItem} ${
              active === "legality" ? styles.MenuActive : ""
            }`}
          >
            <img src={Icons.People} alt="Legality" />
            <div className={styles.MenuText}>Legality</div>
          </Link>
          <Link
            to="/organizer/bank-account"
            className={`${styles.MenuItem} ${
              active === "bank-account" ? styles.MenuActive : ""
            }`}
          >
            <img src={Icons.People} alt="Bank Account" />
            <div className={styles.MenuText}>Bank Account</div>
          </Link>
          <Link
            to="/organizer/settings"
            className={`${styles.MenuItem} ${
              active === "settings" ? styles.MenuActive : ""
            }`}
          >
            <img src={Icons.People} alt="Settings" />
            <div className={styles.MenuText}>Settings</div>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.MenuMobile}>
        <div
          className="inline"
          onClick={() => setMobileShowMenu(!mobileShowMenu)}
        >
          <div
            className="title"
            style={{ display: "flex", flexGrow: 1, fontSize: 14 }}
          >
            Medical Toursim Indonesia
          </div>
          <div>{mobileShowMenu ? <BiChevronUp /> : <BiChevronDown />}</div>
        </div>

        {mobileShowMenu && (
          <div className={styles.MenuArea}>
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
              to="/organizer/billing"
              className={`${styles.MenuItem} ${
                active === "billing" ? styles.MenuActive : ""
              }`}
            >
              <img src={Icons.Ticket} alt="Tickets" />
              <div className={styles.MenuText}>Billing</div>
            </Link>
            <Link
              to="/organizer/team"
              className={`${styles.MenuItem} ${
                active === "team" ? styles.MenuActive : ""
              }`}
            >
              <img src={Icons.People} alt="Connections" />
              <div className={styles.MenuText}>Team</div>
            </Link>
            <Link
              to="/organizer/activities"
              className={`${styles.MenuItem} ${
                active === "activities" ? styles.MenuActive : ""
              }`}
            >
              <img src={Icons.Chat} alt="Messages" />
              <div className={styles.MenuText}>Activities</div>
            </Link>
            <Separator />
            <Link
              to="/organizer/legality"
              className={`${styles.MenuItem} ${
                active === "legality" ? styles.MenuActive : ""
              }`}
            >
              <img src={Icons.Calendar} alt="Personal Events" />
              <div className={styles.MenuText}>Legality</div>
            </Link>
            <Link
              to="/organizer/bank-account"
              className={`${styles.MenuItem} ${
                active === "bank-account" ? styles.MenuActive : ""
              }`}
            >
              <img src={Icons.Calendar} alt="Personal Events" />
              <div className={styles.MenuText}>Bank Account</div>
            </Link>
            <Link
              to="/organizer/settings"
              className={`${styles.MenuItem} ${
                active === "settings" ? styles.MenuActive : ""
              }`}
            >
              <img src={Icons.Calendar} alt="Personal Events" />
              <div className={styles.MenuText}>Settings</div>
            </Link>
          </div>
        )}
      </div>
    );
  }
};

export default OrganizerMenu;
