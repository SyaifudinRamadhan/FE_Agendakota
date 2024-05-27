import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/SidebarUser.module.css";
import Icons from "../icons";
import Separator from "../components/Separator";
import AddCircle from "../icons/AddCircle";
import {
  BiCertification,
  BiCheckCircle,
  BiChevronDown,
  BiCircle,
  BiFilter,
  BiGroup,
  BiNote,
  BiPlus,
  BiPlusCircle,
} from "react-icons/bi";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import AddOrganization from "./AddOrganization";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAppData } from "../actions/appdata";

const SidebarUser = ({
  show = true,
  active = null,
  organizers,
  setOrganizers,
  setLogin,
}) => {
  const [isOrganizerAreaVisible, setOrganizerAreaVisible] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isPopUpAddOrg, setPopUpAddOrg] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appData = useSelector((state) => state.appDataReducer);

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
    dispatch(
      getAppData({
        accessToken: appData.accessToken,
        activeOrg: orgId,
        activeEvent: localStorage.getItem("active-event"),
      })
    );
    navigate("/organizer/events");
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      // console.log(window.innerWidth);
    });
  });

  return (
    <>
      <AddOrganization
        isPopUpAddOrg={isPopUpAddOrg}
        setPopUpAddOrg={setPopUpAddOrg}
        organizers={organizers}
        setOrganizers={setOrganizers}
        setLogin={setLogin}
      />
      {console.log(active, "ACTIVE PATH")}
      {width > 992 && show ? (
        <div id="sidebar" className={styles.Sidebar}>
          <img
            src="/images/logo.png"
            alt="Logo Agendakota"
            className={styles.Logo}
          />
          <div className={styles.MenuArea}>
            <Link
              to="/events"
              className={`${styles.MenuItem} ${
                active === "personal-events" ? styles.MenuActive : ""
              }`}
            >
              <img src={Icons.Calendar} alt="Personal Events" />
              <div className={styles.MenuText}>Personal Events</div>
            </Link>
            <Link
              to="/my-tickets"
              className={`${styles.MenuItem} ${
                active === "my-tickets" ? styles.MenuActive : ""
              }`}
            >
              <img src={Icons.Ticket} alt="Tickets" />
              <div className={styles.MenuText}>My Tickets</div>
            </Link>
            <Link
              to="/invitations"
              className={`${styles.MenuItem} ${
                active === "invitations" ? styles.MenuActive : ""
              }`}
            >
              <BiNote style={{ width: "21px", height: "21px" }} />
              <div className={styles.MenuText}>Invitations</div>
            </Link>
            {/* <a href="/connections" className={`${styles.MenuItem} ${active === 'connections' ? styles.MenuActive : ''}`}>
                        <img src={Icons.People} alt="Connections" />
                        <div className={styles.MenuText}>Connections</div>
                    </a>
                    <a href="/messages" className={`${styles.MenuItem} ${active === 'messages' ? styles.MenuActive : ''}`}>
                        <img src={Icons.Chat} alt="Messages" />
                        <div className={styles.MenuText}>Messages</div>
                    </a> */}
            <Link
              to="/create-event"
              style={{ textDecoration: "none", marginTop: "10px" }}
            >
              <Button
                title={"Create Event"}
                icon={<BiPlusCircle />}
                classes={[styles.ButtonCreate]}
              />
            </Link>
          </div>

          <Separator width="100%" margin="20px 0" />

          {organizers ? (
            organizers.length == 0 ? (
              <div className={styles.OrganizerBlank}>
                <div className={styles.OrganizerBlankIcon} />
                <div className={styles.OrganizerBlankText}>
                  Create events attended by Millions
                </div>
                <Button title={"Create Organizer"} fnOnClick={openPopUporg} />
              </div>
            ) : (
              <>
                <div
                  className={styles.MenuText}
                  style={{ color: "#aaa", fontWeight: 700, fontSize: 12 }}
                >
                  ORGANIZATIONS
                </div>
                <div className={styles.OrganizerArea}>
                  {organizers.map((org) => {
                    return (
                      <Link
                        to="/organizer/events"
                        className={styles.OrganizerItem}
                        onClick={() => {
                          handleOpenOrg(org.id);
                        }}
                      >
                        <div
                          className={styles.OrganizerLogo}
                          style={{
                            backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}${org.photo}")`,
                          }}
                        ></div>
                        <div
                          className={styles.OrganizerName}
                          style={{ maxWidth: "calc(100% - 100px)" }}
                        >
                          {org.name}
                        </div>
                        {org.legality && org.legality.status == 1 ? (
                          <img
                            src="/images/verify.png"
                            style={{
                              color: "green",
                              width: "23px",
                              height: "23px",
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {/* <div className={styles.OrganizerLabel}>Baru</div> */}
                      </Link>
                    );
                  })}
                </div>

                {/* <div className={styles.OrganizerCreate} onClick={openPopUporg}>
									<AddCircle />
									Create Organization
								</div> */}
                <div
                  className={styles.OrganizerBlank}
                  style={{ marginTop: "20px" }}
                >
                  <div className={styles.OrganizerBlankIcon} />
                  <div className={styles.OrganizerBlankText}>
                    Create events attended by Millions
                  </div>
                  <Button title={"Create Organizer"} fnOnClick={openPopUporg} />
                </div>
              </>
            )
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          <div className={styles.SidebarMobile}>
            <div className={styles.MenuArea}>
              <Link
                to="/events"
                className={`${styles.MenuItem} ${
                  active === "personal-events" ? styles.MenuActive : ""
                }`}
              >
                <img src={Icons.Calendar} alt="Personal Events" />
                {active === "personal-events" && (
                  <div className={styles.MenuText}>Events</div>
                )}
              </Link>
              <Link
                to="/my-tickets"
                className={`${styles.MenuItem} ${
                  active === "my-tickets" ? styles.MenuActive : ""
                }`}
              >
                <img src={Icons.Ticket} alt="Tickets" />
                {active === "my-tickets" && (
                  <div className={styles.MenuText}>My Tickets</div>
                )}
              </Link>
              <Link
                to="/invitations"
                className={`${styles.MenuItem} ${
                  active === "invitations" ? styles.MenuActive : ""
                }`}
              >
                <BiNote style={{ width: "21px", height: "21px" }} />
                {active === "invitations" && (
                  <div className={styles.MenuText}>Invitations</div>
                )}
              </Link>
              {/* <a href="/connections" className={`${styles.MenuItem} ${active === 'connections' ? styles.MenuActive : ''}`}>
                            <img src={Icons.People} alt="Connections" />
                            {
                                active === 'connections' &&
                                <div className={styles.MenuText}>Connections</div>
                            }
                        </a>
                        <a href="/messages" className={`${styles.MenuItem} ${active === 'messages' ? styles.MenuActive : ''}`}>
                            <img src={Icons.Chat} alt="Messages" />
                            {
                                active === 'messages' &&
                                <div className={styles.MenuText}>Connections</div>
                            }
                        </a> */}
            </div>
            <div className={styles.OrganizerChooser}>
              <div
                className={styles.OrganizerLogo}
                onClick={() => showOrganizers()}
                style={{
                  backgroundImage: `url("/images/Pattern-31.png")`,
                  borderRadius: 999,
                  position: "relative",
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
              {organizers &&
                organizers.map((org) => {
                  return (
                    <Link
                      to="/organizer/events"
                      className={styles.OrganizerItem}
                      onClick={() => {
                        handleOpenOrg(org.id);
                      }}
                    >
                      <div
                        className={styles.OrganizerLogo}
                        style={{
                          backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}${org.photo}")`,
                        }}
                      ></div>
                      <div
                        className={styles.OrganizerName}
                        style={{ maxWidth: "calc(100% - 170px)" }}
                      >
                        {org.name}
                      </div>
                      {org.legality && org.legality.status == 1 ? (
                        <img
                          src="/images/verify.png"
                          style={{
                            color: "green",
                            width: "23px",
                            height: "23px",
                          }}
                        />
                      ) : (
                        <></>
                      )}
                      <div
                        className={styles.OrganizerLabel}
                        onClick={() => {
                          handleOpenOrg(org.id);
                        }}
                        style={{
                          marginLeft: "auto",
                        }}
                      >
                        Pilih
                      </div>
                    </Link>
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

export default SidebarUser;
