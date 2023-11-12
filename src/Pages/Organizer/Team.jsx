import React, { useEffect } from "react";
import HeaderUser from "../../partials/HeaderUser";
import SidebarSimplified from "../../partials/SidebarSimplified";
import OrganizerMenu from "../../partials/OrganizerMenu";
import SidebarUser from "../../partials/SidebarUser";
import styles from "../styles/PersonalEvent.module.css";

const OrganizerTeam = () => {
    useEffect(() => {
        document.title = "Team - Agendakota"
    })
    return (
        <>
            <HeaderUser expand={true} />
            <SidebarSimplified />
            <SidebarUser show={false} />
            <OrganizerMenu active={'team'} />
            <div className="content organizer">
                <h1 className={styles.Title}>Team</h1>
            </div>
        </>
    )
}

export default OrganizerTeam;