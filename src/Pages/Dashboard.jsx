import React, { useEffect } from "react";
import HeaderUser from "../partials/HeaderUser";
import SidebarUser from "../partials/SidebarUser";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Agendakota";
  });

  return (
    <>
      <HeaderUser />
      <SidebarUser />
    </>
  );
};

export default Dashboard;
