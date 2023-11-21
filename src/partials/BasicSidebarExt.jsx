import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/SidebarUser.module.css";
import styles2 from "./styles/BasicSidebarExt.module.css";
import Icons from "../icons";
import Separator from "../components/Separator";
import AddCircle from "../icons/AddCircle";
import { BiChevronDown, BiCircle, BiPlus, BiPlusCircle } from "react-icons/bi";
import Button from "../components/Button";
import PopUp from "./PopUp";
import InputForm from "../components/InputForm";
import Select from "react-select";
import TextArea from "../components/TextArea";
import Alert from "../components/Alert";
import config from "../config";
import { useNavigate } from "react-router-dom";

const BasicSidebarExt = ({
  show = true,
  active = null,
  children,
  organizers = [],
}) => {
  const [isOrganizerAreaVisible, setOrganizerAreaVisible] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isPopUpAddOrg, setPopUpAddOrg] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  const orgName = useRef(null);
  const orgType = useRef(null);
  const interestEvt = useRef(null);
  const desc = useRef(null);
  const navigate = useNavigate();

  const overlayClick = () => {
    setOrganizerAreaVisible(false);
  };
  const showOrganizers = () => {
    setOrganizerAreaVisible(true);
  };

  const openPopUporg = () => {
    setPopUpAddOrg(true);
  };

  const handleOpenOrg = (orgId) => {
    localStorage.setItem("active-org", orgId);
    navigate("/organizer/events");
  };

  const onSubmit = (event) => {
    if (
      orgName.current.value === "" ||
      orgType.current.value === "" ||
      interestEvt.current.value === "" ||
      desc.current.value === ""
    ) {
      setShowAlert(true);
    }
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  });

  return (
    <>
      <PopUp
        isActive={isPopUpAddOrg}
        setActiveFn={setPopUpAddOrg}
        content={
          <form style={{ display: "grid" }} onSubmit={onSubmit}>
            <Alert
              isShow={isShowAlert}
              setShowFn={setShowAlert}
              type={"danger"}
              message={"Semua field wajib diisi !!!"}
            />
            <label htmlFor="org_name" className={styles.FontLabel}>
              Nama Organisasi
            </label>
            <InputForm
              id={"org_name"}
              type={"text"}
              placeholder={"Nama Organisasi"}
              refData={orgName}
            />
            <label className={styles.FontLabel}>Tipe Organisasi</label>
            <Select
              options={config.orgTypeOptions}
              className="basic-multi-select"
              ref={orgType}
              styles={{
                option: (basicStyle, state) => ({
                  ...basicStyle,
                  backgroundColor: state.isFocused ? "#fecadf" : "white",
                }),
              }}
            />
            <label className={styles.FontLabel}>
              Tertarik Mengadakan Event
            </label>
            <Select
              isMulti
              options={config.interestEventOptions}
              ref={interestEvt}
              className="basic-multi-select"
              styles={{
                option: (basicStyle, state) => ({
                  ...basicStyle,
                  backgroundColor: state.isFocused ? "#fecadf" : "white",
                }),
              }}
            />
            <label htmlFor="org_desc" className={styles.FontLabel}>
              Deskripsi Organisasi
            </label>
            <TextArea
              id={"org_desc"}
              placehorder={"Deskripsi organisasi"}
              refData={desc}
            />
            <div style={{ display: "flex" }}>
              <Button
                title={"Simpan"}
                typeBtn={"submit"}
                style={{ margin: "auto", width: "unset" }}
              />
            </div>
          </form>
        }
      />
      {width > 992 && show ? (
        <div className={`${styles.Sidebar} ${styles2.SidebarExt}`}>
          <div className={styles2.MainMenu}>
            <div className={styles.MenuArea}>
              <a
                href="/events"
                className={`${styles.MenuItem} ${
                  active === "personal-events" ? styles.MenuActive : ""
                }`}
              >
                <img src={Icons.Calendar} alt="Personal Events" />
              </a>
              <a
                href="/my-tickets"
                className={`${styles.MenuItem} ${
                  active === "my-tickets" ? styles.MenuActive : ""
                }`}
              >
                <img src={Icons.Ticket} alt="Tickets" />
              </a>
            </div>
            <Separator width="100%" margin="20px 0" />
            <div className={styles.OrganizerArea}>
              {organizers.map((org, num) => {
                return (
                  <a
                    key={num}
                    href="#"
                    className={styles.OrganizerItem}
                    onClick={() => {
                      handleOpenOrg(org.id);
                    }}
                  >
                    <div
                      className={styles.OrganizerLogo}
                      style={{ backgroundImage: `url("${org.photo}")` }}
                    ></div>
                  </a>
                );
              })}
              <div className={`${styles.OrganizerItem} ${styles2.AddOrg}`}>
                <BiPlusCircle onClick={openPopUporg} size={"20px"} />
              </div>
            </div>
          </div>
          <div className={styles2.ExtMenu}>{children}</div>
        </div>
      ) : (
        <>
          <div className={styles.SidebarMobile}>
            <div className={styles.MenuArea}>
              <a
                href="/events"
                className={`${styles.MenuItem} ${
                  active === "personal-events" ? styles.MenuActive : ""
                }`}
              >
                <img src={Icons.Calendar} alt="Personal Events" />
                {active === "personal-events" && (
                  <div className={styles.MenuText}>Events</div>
                )}
              </a>
              <a
                href="/my-tickets"
                className={`${styles.MenuItem} ${
                  active === "my-tickets" ? styles.MenuActive : ""
                }`}
              >
                <img src={Icons.Ticket} alt="Tickets" />
                {active === "my-tickets" && (
                  <div className={styles.MenuText}>My Tickets</div>
                )}
              </a>
            </div>
            <div className={styles.OrganizerChooser}>
              <div
                className={styles.OrganizerLogo}
                onClick={showOrganizers}
                style={{
                  backgroundImage: `url('https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/organization/20230927233556_651459ec86c5a.jpg')`,
                  borderRadius: 999,
                }}
              ></div>
            </div>
          </div>

          <div
            className={styles.Overlay}
            onClick={overlayClick}
            style={{
              display: isOrganizerAreaVisible ? "block" : "none",
            }}
          ></div>
          <div
            className={styles.OrganizerAreaMobile}
            style={{ bottom: isOrganizerAreaVisible ? 0 : -500 }}
          >
            <div className="inline">
              <div
                className={styles.MenuText}
                style={{
                  color: "#aaa",
                  fontWeight: 700,
                  fontSize: 12,
                  display: "flex",
                  flexGrow: 1,
                }}
              >
                ORGANIZATIONS
              </div>
              <div className={styles.OrganizerAreaClose} onClick={overlayClick}>
                <BiChevronDown />
              </div>
            </div>

            <div className={styles.OrganizerArea}>
              {organizers.map((org, num) => {
                return (
                  <a
                    key={num}
                    href="#"
                    className={styles.OrganizerItem}
                    onClick={() => {
                      handleOpenOrg(org.id);
                    }}
                  >
                    <div
                      className={styles.OrganizerLogo}
                      style={{ backgroundImage: `url("${org.photo}")` }}
                    ></div>
                    <div className={styles.OrganizerName}>{org.name}</div>
                    <div className={styles.OrganizerLabel}>Pilih</div>
                  </a>
                );
              })}
              <div className={`${styles.OrganizerItem} ${""}`}>
                <Button
                  title={"Create Organizer"}
                  classes={[styles.OrganizerCreateBottom]}
                  fnOnClick={openPopUporg}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BasicSidebarExt;
