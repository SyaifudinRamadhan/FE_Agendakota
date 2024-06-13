import React, { useEffect, useState } from "react";
import styles from "./styles/SpecialPage.module.css";
import Footer from "../partials/Footer";
import axios from "axios";
import Event from "../components/Event";
import Loading from "../components/Loading";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

const mainGetRequest = async ({ path = "" }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/" + path,
      {
        headers: {
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    // console.log(error);
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
  }
};

const SpecialPage = ({ type }) => {
  const [title, setTitle] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!events) {
      if (type === "special-day") {
        mainGetRequest({ path: "special-day" }).then((res) => {
          if (res.status === 200) {
            setEvents(res.data.special_day);
            setTitle(res.data.special_day.data.title);
          } else {
            setEvents([]);
          }
          setLoading(false);
        });
      } else if (type === "selected-event") {
        mainGetRequest({ path: "selected-event" }).then((res) => {
          if (res.status === 200) {
            setEvents(res.data.selected_event);
            setTitle(res.data.selected_event.data.title);
          } else {
            setEvents([]);
          }
          setLoading(false);
        });
      } else {
        mainGetRequest({ path: "selected-activity" }).then((res) => {
          if (res.status === 200) {
            setEvents(res.data.selected_activity);
            setTitle(res.data.selected_activity.data.title);
          } else {
            setEvents([]);
          }
          setLoading(false);
        });
      }
    }
  }, [events]);

  return (
    <div className="content">
      <section>
        <div className={styles.NavigationPanel}>
          <div className={styles.NavItemSecondary}>
            <Link to="/">Home</Link>
          </div>
          <div className={styles.NavItemSecondary}>
            <BiChevronRight />
          </div>
          <div
            className={styles.NavItemPrimary}
            style={{ marginRight: "100px" }}
          >
            Special Events
          </div>
        </div>
        {loading ? (
          <div
            style={{
              marginTop: "100px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Loading />
          </div>
        ) : (
          <>
            <h3 style={{ marginTop: 0, padding: 0 }}>{title}</h3>
            <div className={styles.Content}>
              {events.length === 0 ? (
                <div className={styles.BlankState}>Data Tidak Ditemukan</div>
              ) : (
                events.events.map((event, e) => <Event data={event} key={e} />)
              )}
            </div>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default SpecialPage;
