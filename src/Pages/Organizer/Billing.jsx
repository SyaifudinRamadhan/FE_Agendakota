import React, { useEffect } from "react";
import HeaderUser from "../../partials/HeaderUser";
import SidebarSimplified from "../../partials/SidebarSimplified";
import OrganizerMenu from "../../partials/OrganizerMenu";
import SidebarUser from "../../partials/SidebarUser";
import styles from "../styles/PersonalEvent.module.css";

const OrganizerBilling = () => {
    useEffect(() => {
        document.title = "Billing - Agendakota"
    })
    return (
        <>
            <HeaderUser expand={true} />
            <SidebarSimplified />
            <SidebarUser show={false} />
            <OrganizerMenu active={'billing'} />
            <div className="content organizer">
                <h1 className={styles.Title}>Billing</h1>
            </div>
        </>
    )
}

export default OrganizerBilling;