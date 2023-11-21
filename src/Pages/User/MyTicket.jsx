import React from "react";
import HeaderUser from "../../partials/HeaderUser";
import SidebarUser from "../../partials/SidebarUser";

const MyTicket = () => {
    return (
        <>
            <HeaderUser />
            <SidebarUser active={'my-tickets'} />
            <div className="content user">
                <h1>My Tickets</h1>
            </div>
        </>
    )
}

export default MyTicket;