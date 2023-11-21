import React from "react";
import styles from "./styles/SidebarSimplified.module.css";
import Icons from "../icons";
import { BiPlus, BiPlusCircle } from "react-icons/bi";

const SidebarSimplified = () => {
    if (window.innerWidth > 992) {
        return (
            <div className={styles.Sidebar}>
                <div className={styles.MenuArea}>
                    <a href="/events" className={`${styles.MenuItem}`}>
                        <img src={Icons.Calendar} alt="Personal Events" />
                    </a>
                    <a href="/my-tickets" className={`${styles.MenuItem}`}>
                        <img src={Icons.Ticket} alt="Tickets" />
                    </a>
                    <a href="/connections" className={`${styles.MenuItem}`}>
                        <img src={Icons.People} alt="Connections" />
                    </a>
                    <a href="/messages" className={`${styles.MenuItem}`}>
                        <img src={Icons.Chat} alt="Messages" />
                    </a>
                </div>

                <div className={styles.OrganizerArea}>
                    <div className={styles.OrganizerItem}>
                        <div className={styles.OrganizerLogo}></div>
                    </div>
                    <div className={styles.OrganizerItem}>
                        <div className={styles.OrganizerLogo}></div>
                    </div>

                    <div className={styles.CreateOrganizerButton}>
                        <BiPlusCircle />
                    </div>
                </div>
            </div>
        )
    }
}

export default SidebarSimplified;