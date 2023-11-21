import React from "react";
import HeaderUser from "../../partials/HeaderUser";
import SidebarUser from "../../partials/SidebarUser";

const Connection = () => {
    return (
        <>
            <HeaderUser />
            <SidebarUser active={'connections'} />
            <div className="content user">
                <h1>Connections</h1>
            </div>
        </>
    )
}

export default Connection;