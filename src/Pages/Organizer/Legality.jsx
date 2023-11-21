import React, { useEffect, useState } from "react";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import styles from "../styles/PersonalEvent.module.css";
import Button from "../../components/Button";
import {
  BiCheckCircle,
  BiError,
  BiPlusCircle,
  BiQuestionMark,
} from "react-icons/bi";

const OrganizerLegality = () => {
  const [orgSelected, setOrgSelected] = useState("");

  const handleOpenAdd = () => {};

  useEffect(() => {
    document.title = "Legality - Agendakota";
  });
  return (
    <>
      <HeaderOrganizer
        active={"legality"}
        activeOrg={localStorage.getItem("active-org")}
        orgSelected={orgSelected}
        setOrgSelected={setOrgSelected}
      />
      <SidebarOrganizer
        active={"legality"}
        activeOrg={localStorage.getItem("active-org")}
        orgSelected={orgSelected}
        setOrgSelected={setOrgSelected}
      />
      <div className="content organizer">
        <h1 className={styles.Title}>Legality</h1>
        <div className={styles.BlankData}>
          <img
            className={`${styles.IconBlank}`}
            src="/images/certificate.png"
            style={{ width: "unset", marginTop: "40px" }}
          />
          <div className={styles.BlankTitle}>
            Buat data legalitas untuk organisasimu
          </div>
          <div className={styles.BlankDesc}>
            Kamu wajib membuat data legalitas untuk organisasimu agar event{" "}
            <br />
            yang kamu buat dapat diplubikasikan. Serta agar kamu bisa melakukan{" "}
            <br />
            pengajuan penarikan dana (withdraw) penjualan tiketmu.
          </div>
          <Button
            icon={<BiPlusCircle />}
            title={"Buat Legalitas"}
            style={{ width: "unset", margin: "auto" }}
            fnOnClick={handleOpenAdd}
          />
        </div>
      </div>
    </>
  );
};

export default OrganizerLegality;
