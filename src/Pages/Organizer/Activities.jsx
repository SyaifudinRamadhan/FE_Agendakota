import React, { useEffect, useState } from "react";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import styles from "../User/styles/PersonalEvent.module.css";
import Toggler from "../../components/Toggler";
import Event from "../../components/Event";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import CardBasic from "../../components/CardBasic";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorPage from "../../partials/ErrorPage";
import { useSelector } from "react-redux";

const handleSuccess = (res) => {
  return {
    data: res.data,
    status: res.status,
  };
};

const handleError = (error) => {
  console.log(error);
  if (error.response === undefined) {
    return {
      data: { data: [error.message] },
      status: 500,
    };
  } else {
    return {
      data: error.response,
      status: error.response.status,
    };
  }
};

const loadData = async ({ orgId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/org/" + orgId + "/events",
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const OrganizerActivities = ({ organization, fnSetLogin }) => {
  const [viewing, setViewing] = useState("Happening");
  // const [orgSelected, setOrgSelected] = useState(null);
  const [events, setEvents] = useState(null);
  const now = new Date();
  const [drafts, setDraftEvents] = useState([]);
  const [happeningEvents, setHappeningEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [endedEvents, setEndedEvent] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const appData = useSelector((state) => state.appDataReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (appData.activeOrg) {
      setLoading(true);
      loadData({ orgId: appData.activeOrg, token: appData.accessToken }).then(
        (res) => {
          if (res.status === 200) {
            setEvents(
              res.data.events.filter(
                (event) =>
                  event.event.category === "Attraction" ||
                  event.event.category === "Daily Activities" ||
                  event.event.category === "Tour Travel (recurring)"
              )
            );
          } else if (res.status === 401) {
            fnSetLogin(false);
          } else if (res.status !== 404) {
            setEvents([]);
            setErrorState(true);
          } else {
            setEvents([]);
          }
        }
      );
    }
  }, [appData]);

  useEffect(() => {
    document.title = "Activities - Agendakota";
    if (events) {
      let drafts = [];
      let happeningEvents = [];
      let endedEvents = [];
      let upcomingEvents = [];
      events.forEach((evt) => {
        let start = new Date(evt.event.start_date + "T" + evt.event.start_time);
        let end = new Date(evt.event.end_date + "T" + evt.event.end_time);
        if (evt.event.id === "9b5cacee-4bfb-42ed-8140-96d2b90b2bb2") {
          console.log(now, start, end, now >= start && now <= end, "NOW START");
        }
        if (evt.event.is_publish === 1) {
          drafts.push({
            ...evt.event,
            tickets: evt.tickets ? evt.tickets : [],
            org: evt.organization,
            available_days: evt.available_days,
          });
        } else if (now >= start && now <= end) {
          happeningEvents.push({
            ...evt.event,
            tickets: evt.tickets ? evt.tickets : [],
            org: evt.organization,
            available_days: evt.available_days,
          });
        } else if (now > end) {
          endedEvents.push({
            ...evt.event,
            tickets: evt.tickets ? evt.tickets : [],
            org: evt.organization,
            available_days: evt.available_days,
          });
        } else {
          upcomingEvents.push({
            ...evt.event,
            tickets: evt.tickets ? evt.tickets : [],
            org: evt.organization,
            available_days: evt.available_days,
          });
        }
      });
      setDraftEvents(drafts);
      setHappeningEvents(happeningEvents);
      setUpcomingEvents(upcomingEvents);
      setEndedEvent(endedEvents);
      setLoading(false);
    }
  }, [events]);

  return (
    <>
      <div className="content organizer">
        <div className={styles.DecorationBox}>
          <div className={styles.Decoration}></div>
        </div>
        {errorState ? (
          <ErrorPage />
        ) : (
          <>
            <div
              className={styles.TitleArea}
              style={{ marginBottom: "27.5px" }}
            >
              <h1 className={styles.Title}>Activities</h1>
              <Toggler
                value={viewing}
                setValue={setViewing}
                options={["Happening", "Upcoming", "Finished"]}
              />
            </div>
            {isLoading ? (
              <div style={{ marginTop: "140px", marginBottom: "120px" }}>
                <Loading />
              </div>
            ) : (
              <>
                {drafts.length === 0 &&
                happeningEvents.length === 0 &&
                upcomingEvents.length === 0 &&
                endedEvents.length === 0 ? (
                  <div className={styles.BlankData}>
                    <img
                      className={`${styles.IconBlank} ${styles.IconBlank2}`}
                      style={{ transform: "unset" }}
                      src="/images/icon_blank_act.png"
                    />
                    <div className={styles.BlankTitle}>
                      Yuk, Buat Destinasi Daily Activities
                    </div>
                    <div className={styles.BlankDesc}>
                      Session event adalah daftar acara/agenda apa saja yang
                      akan berjalan
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {drafts.length > 0 && (
                  <div>
                    <h4 style={{ marginTop: 20 }}>Draft</h4>
                    <div className={styles.Inline} style={{ marginTop: 20 }}>
                      {drafts.map((event, e) => (
                        <Event
                          maxWidth="32%"
                          data={event}
                          key={e}
                          config={{
                            coverStyle: {
                              height: 160,
                            },
                          }}
                          forOrganizer={true}
                          isActivities
                        />
                      ))}
                    </div>
                    <hr style={{ marginTop: 20 }} />
                  </div>
                )}
                {happeningEvents.length > 0 && (
                  <div id="Happening">
                    <h4 style={{ marginTop: 20 }}>Happening</h4>
                    <div className={styles.Inline} style={{ marginTop: 20 }}>
                      {happeningEvents.map((event, e) => (
                        <Event
                          maxWidth="32%"
                          data={event}
                          key={e}
                          config={{
                            coverStyle: {
                              height: 160,
                            },
                          }}
                          forOrganizer={true}
                          isActivities
                        />
                      ))}
                    </div>
                    <hr style={{ marginTop: 20 }} />
                  </div>
                )}
                {upcomingEvents.length > 0 && (
                  <div id="Upcoming">
                    <h4 style={{ marginTop: 20 }}>Upcoming</h4>
                    <div className={styles.Inline} style={{ marginTop: 20 }}>
                      {upcomingEvents.map((event, e) => (
                        <Event
                          maxWidth="32%"
                          data={event}
                          key={e}
                          config={{
                            coverStyle: {
                              height: 160,
                            },
                          }}
                          forOrganizer={true}
                          isActivities
                        />
                      ))}
                    </div>
                    <hr style={{ marginTop: 20 }} />
                  </div>
                )}
                {endedEvents.length > 0 && (
                  <div id="Finished">
                    <h4 style={{ marginTop: 20 }}>Finished</h4>
                    <div className={styles.Inline} style={{ marginTop: 20 }}>
                      {endedEvents.map((event, e) => (
                        <Event
                          maxWidth="32%"
                          data={event}
                          key={e}
                          config={{
                            coverStyle: {
                              height: 160,
                            },
                          }}
                          forOrganizer={true}
                          isActivities
                        />
                      ))}
                    </div>
                    <hr style={{ marginTop: 20 }} />
                  </div>
                )}
              </>
            )}
            <div>
              <h3 className={styles.Title} style={{ marginTop: 40 }}>
                Up your game as organizer with massive events
              </h3>
              <div className={styles.PromoArea}>
                <CardBasic
                  className={styles.CardPromo}
                  titleStyle={{
                    maxHeight: "unset",
                    overflow: "unset",
                    maxWidth: "100%",
                    display: "inline-block",
                    whiteSpace: "wrap",
                  }}
                  data={{
                    cover: "",
                    info: <div className={styles.IconPromo}></div>,
                    title:
                      "Planning and Holding multiple events for wide range of audience",
                    desc: "With AgendaKota you can invite or give your friend a surprise by buying tickets for them",
                  }}
                  customContent={
                    <Button
                      title={"Explore"}
                      style={{ backgroundColor: "black" }}
                      fnOnClick={() => navigate("/explore")}
                    />
                  }
                />
                <CardBasic
                  className={styles.CardPromo}
                  titleStyle={{
                    maxHeight: "unset",
                    overflow: "unset",
                    maxWidth: "100%",
                    display: "inline-block",
                    whiteSpace: "wrap",
                  }}
                  data={{
                    cover: "",
                    info: <div className={styles.IconPromo}></div>,
                    title:
                      "Planning and Holding multiple events for wide range of audience",
                    desc: "With AgendaKota you can invite or give your friend a surprise by buying tickets for them",
                  }}
                  customContent={
                    <Button
                      title={"Explore"}
                      style={{ backgroundColor: "black" }}
                      fnOnClick={() => navigate("/explore")}
                    />
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrganizerActivities;
