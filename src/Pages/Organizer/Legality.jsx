import React, { useEffect } from "react";
import HeaderUser from "../../partials/HeaderUser";
import SidebarSimplified from "../../partials/SidebarSimplified";
import OrganizerMenu from "../../partials/OrganizerMenu";
import SidebarUser from "../../partials/SidebarUser";
import styles from "../styles/PersonalEvent.module.css";

const OrganizerLegality = () => {
    useEffect(() => {
        document.title = "Legality - Agendakota"
    })
    return (
        <>
            <HeaderUser expand={true} />
            <SidebarSimplified />
            <SidebarUser show={false} />
            <OrganizerMenu active={'legality'} />
            <div className="content organizer">
                <h1 className={styles.Title}>Legality</h1>
            </div>
        </>
    )
}

export default OrganizerLegality;