import React, { useEffect, useState } from "react";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import styles from "../styles/PersonalEvent.module.css";
import Toggler from "../../components/Toggler";
import Event from "../../components/Event";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import CardBasic from "../../components/CardBasic";

const OrganizerEvent = () => {
  const [viewing, setViewing] = useState("Happening");
  const [orgSelected, setOrgSelected] = useState(null);

  const events = [
    {
      id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
      org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
      slug: "testing-updated",
      name: "Australia & UK Top Ranked Universities - Application Day",
      category: "-",
      topics: "-",
      logo: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230922011910.jpg",
      desc: "-",
      snk: "-",
      exe_type: "online",
      location: "-",
      province: "-",
      city: "-",
      start_date: "2023-09-20",
      end_date: "2023-09-25",
      start_time: "08:00:00",
      end_time: "12:00:00",
      is_publish: 2,
      instagram: "-",
      twitter: "-",
      website: "-",
      twn_url: "-",
      custom_fields: "",
      seat_map: null,
      single_trx: 0,
      deleted: 0,
      created_at: "2023-09-17T01:39:14.000000Z",
      updated_at: "2023-09-24T09:26:56.000000Z",
      available_days: [],
      org: {
        id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
        user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
        type: "test2",
        name: "Agendakota",
        slug: "test-update",
        photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
        banner:
          "/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
        interest: "-",
        email: "-",
        linkedin: "-",
        instagram: "-",
        twitter: "-",
        whatsapp: "-",
        website: "-",
        desc: "lorem ipsum dolor sit amet",
        deleted: 0,
        created_at: "2023-09-17T01:25:15.000000Z",
        updated_at: "2023-09-17T01:30:44.000000Z",
      },
      tickets: [
        {
          id: "9a271fce-b9e8-480e-9efc-70139a1e5633",
          event_id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
          name: "Ticket 1",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 1,
          price: 0,
          quantity: 3,
          start_date: "2023-09-17",
          end_date: "2023-09-17",
          seat_number: 0,
          max_purchase: 0,
          deleted: 0,
          created_at: "2023-09-17T05:24:40.000000Z",
          updated_at: "2023-09-21T03:19:50.000000Z",
        },
        {
          id: "9a2bde6a-0d61-4791-8155-43dd6ecbab29",
          event_id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
          name: "Ticket 3",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 3,
          price: 0,
          quantity: 7,
          start_date: "2023-09-17",
          end_date: "2023-09-19",
          seat_number: 0,
          max_purchase: 0,
          deleted: 0,
          created_at: "2023-09-19T14:00:57.000000Z",
          updated_at: "2023-09-21T06:17:23.000000Z",
        },
        {
          id: "9a27205d-cedf-4125-91e4-cb0abf12ec54",
          event_id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
          name: "Ticket 2",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 2,
          price: 25000,
          quantity: 6,
          start_date: "2023-09-17",
          end_date: "2023-09-17",
          seat_number: 0,
          max_purchase: 0,
          deleted: 0,
          created_at: "2023-09-17T05:26:14.000000Z",
          updated_at: "2023-09-21T06:17:23.000000Z",
        },
        {
          id: "9a2de1ec-8123-43cb-80a0-95d05fb64231",
          event_id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
          name: "Ticket 4.5",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 2,
          price: 25000,
          quantity: 7,
          start_date: "2023-09-17",
          end_date: "2023-09-20",
          seat_number: 0,
          max_purchase: 0,
          deleted: 0,
          created_at: "2023-09-20T14:02:25.000000Z",
          updated_at: "2023-09-20T14:03:08.000000Z",
        },
      ],
    },
    {
      id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
      org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
      slug: "testing-attraction-2",
      name: "[SOLO] MLBB SULTAN CUP RISING STAR",
      category: "Attraction",
      topics: "-",
      logo: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230926120219_651265db31ebb.jpg",
      desc: "-",
      snk: "-",
      exe_type: "offline",
      location: "-",
      province: "-",
      city: "-",
      start_date: "2023-10-20",
      end_date: "2024-10-20",
      start_time: "23:54:34",
      end_time: "23:54:34",
      is_publish: 2,
      instagram: "-",
      twitter: "-",
      website: "-",
      twn_url: "-",
      custom_fields:
        "Dapat info dari mana|Kamu tahu dari apa|Kapan kamu sadarnya",
      seat_map:
        "/storage/seat_maps/Screenshot 2023-09-18 204658_1697820874.png",
      single_trx: 1,
      deleted: 0,
      created_at: "2023-10-20T16:54:34.000000Z",
      updated_at: "2023-10-20T16:54:34.000000Z",
      available_days: [
        {
          id: "9a6a7903-5de6-45b2-a8b9-ea7af9202b50",
          event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
          day: "Tue",
          max_limit_time: "21:00:00",
          created_at: "2023-10-20T16:54:34.000000Z",
          updated_at: "2023-10-20T16:54:34.000000Z",
        },
        {
          id: "9a6a7903-624f-4e42-8b37-09e17906638f",
          event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
          day: "Wed",
          max_limit_time: "22:00:00",
          created_at: "2023-10-20T16:54:34.000000Z",
          updated_at: "2023-10-20T16:54:34.000000Z",
        },
        {
          id: "9a6a7903-65ac-419c-9fcd-bc8a5b43be35",
          event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
          day: "Thu",
          max_limit_time: "17:00:00",
          created_at: "2023-10-20T16:54:34.000000Z",
          updated_at: "2023-10-20T16:54:34.000000Z",
        },
      ],
      org: {
        id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
        user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
        type: "test2",
        name: "Agendakoat 2",
        slug: "test-update",
        photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
        banner:
          "/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
        interest: "-",
        email: "-",
        linkedin: "-",
        instagram: "-",
        twitter: "-",
        whatsapp: "-",
        website: "-",
        desc: "lorem ipsum dolor sit amet",
        deleted: 0,
        created_at: "2023-09-17T01:25:15.000000Z",
        updated_at: "2023-09-17T01:30:44.000000Z",
      },
      tickets: [
        {
          id: "9a6562c2-c65e-4156-88f4-110922e7cc48",
          event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
          name: "Ticket B",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 3,
          price: 0,
          quantity: -1,
          start_date: "2023-10-21",
          end_date: "2024-10-21",
          seat_number: 1,
          max_purchase: 3,
          deleted: 0,
          created_at: "2023-10-18T04:13:13.000000Z",
          updated_at: "2023-10-20T17:02:10.000000Z",
        },
        {
          id: "9a6562f0-d915-48b8-b147-9cde766bca95",
          event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
          name: "Ticket C",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 1,
          price: 0,
          quantity: -1,
          start_date: "2023-10-21",
          end_date: "2024-10-21",
          seat_number: 1,
          max_purchase: 2,
          deleted: 0,
          created_at: "2023-10-18T04:13:43.000000Z",
          updated_at: "2023-10-20T17:02:10.000000Z",
        },
        {
          id: "9a656237-31ab-4839-bfb8-56d6a8498955",
          event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
          name: "Ticket A",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 2,
          price: 25000,
          quantity: -1,
          start_date: "2023-10-21",
          end_date: "2024-10-21",
          seat_number: 1,
          max_purchase: 2,
          deleted: 0,
          created_at: "2023-10-18T04:11:41.000000Z",
          updated_at: "2023-10-20T17:02:10.000000Z",
        },
      ],
    },
    {
      id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
      org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
      slug: "testing-updated",
      name: "ASPEK DAN PERLINDUNGAN HUKUM ATAS MEREK",
      category: "-",
      topics: "-",
      logo: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20231012142401_65279f11e3b17.jpg",
      desc: "-",
      snk: "-",
      exe_type: "online",
      location: "-",
      province: "-",
      city: "-",
      start_date: "2023-09-20",
      end_date: "2023-09-25",
      start_time: "08:00:00",
      end_time: "12:00:00",
      is_publish: 1,
      instagram: "-",
      twitter: "-",
      website: "-",
      twn_url: "-",
      custom_fields: "",
      seat_map: null,
      single_trx: 0,
      deleted: 0,
      created_at: "2023-09-17T01:39:14.000000Z",
      updated_at: "2023-09-24T09:26:56.000000Z",
      available_days: [],
      org: {
        id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
        user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
        type: "test2",
        name: "Agendakota",
        slug: "test-update",
        photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
        banner:
          "/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
        interest: "-",
        email: "-",
        linkedin: "-",
        instagram: "-",
        twitter: "-",
        whatsapp: "-",
        website: "-",
        desc: "lorem ipsum dolor sit amet",
        deleted: 0,
        created_at: "2023-09-17T01:25:15.000000Z",
        updated_at: "2023-09-17T01:30:44.000000Z",
      },
      tickets: [],
    },
    {
      id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
      org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
      slug: "testing-attraction-2",
      name: "Rock in Solo Festival 2023",
      category: "Attraction",
      topics: "-",
      logo: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230905110542_64f6a91690d6f.jpg",
      desc: "-",
      snk: "-",
      exe_type: "offline",
      location: "-",
      province: "-",
      city: "-",
      start_date: "2023-10-20",
      end_date: "2024-10-20",
      start_time: "23:54:34",
      end_time: "23:54:34",
      is_publish: 1,
      instagram: "-",
      twitter: "-",
      website: "-",
      twn_url: "-",
      custom_fields:
        "Dapat info dari mana|Kamu tahu dari apa|Kapan kamu sadarnya",
      seat_map:
        "/storage/seat_maps/Screenshot 2023-09-18 204658_1697820874.png",
      single_trx: 1,
      deleted: 0,
      created_at: "2023-10-20T16:54:34.000000Z",
      updated_at: "2023-10-20T16:54:34.000000Z",
      available_days: [
        {
          id: "9a6a7903-5de6-45b2-a8b9-ea7af9202b50",
          event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
          day: "Tue",
          max_limit_time: "21:00:00",
          created_at: "2023-10-20T16:54:34.000000Z",
          updated_at: "2023-10-20T16:54:34.000000Z",
        },
        {
          id: "9a6a7903-624f-4e42-8b37-09e17906638f",
          event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
          day: "Wed",
          max_limit_time: "22:00:00",
          created_at: "2023-10-20T16:54:34.000000Z",
          updated_at: "2023-10-20T16:54:34.000000Z",
        },
        {
          id: "9a6a7903-65ac-419c-9fcd-bc8a5b43be35",
          event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
          day: "Thu",
          max_limit_time: "17:00:00",
          created_at: "2023-10-20T16:54:34.000000Z",
          updated_at: "2023-10-20T16:54:34.000000Z",
        },
      ],
      org: {
        id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
        user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
        type: "test2",
        name: "Agendakoat 2",
        slug: "test-update",
        photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
        banner:
          "/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
        interest: "-",
        email: "-",
        linkedin: "-",
        instagram: "-",
        twitter: "-",
        whatsapp: "-",
        website: "-",
        desc: "lorem ipsum dolor sit amet",
        deleted: 0,
        created_at: "2023-09-17T01:25:15.000000Z",
        updated_at: "2023-09-17T01:30:44.000000Z",
      },
      tickets: [
        {
          id: "9a6562c2-c65e-4156-88f4-110922e7cc48",
          event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
          name: "Ticket B",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 3,
          price: 0,
          quantity: -1,
          start_date: "2023-10-21",
          end_date: "2024-10-21",
          seat_number: 1,
          max_purchase: 3,
          deleted: 0,
          created_at: "2023-10-18T04:13:13.000000Z",
          updated_at: "2023-10-20T17:02:10.000000Z",
        },
        {
          id: "9a6562f0-d915-48b8-b147-9cde766bca95",
          event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
          name: "Ticket C",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 1,
          price: 0,
          quantity: -1,
          start_date: "2023-10-21",
          end_date: "2024-10-21",
          seat_number: 1,
          max_purchase: 2,
          deleted: 0,
          created_at: "2023-10-18T04:13:43.000000Z",
          updated_at: "2023-10-20T17:02:10.000000Z",
        },
        {
          id: "9a656237-31ab-4839-bfb8-56d6a8498955",
          event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
          name: "Ticket A",
          desc: "Lorem ipsum dolor sit amet",
          type_price: 2,
          price: 25000,
          quantity: -1,
          start_date: "2023-10-21",
          end_date: "2024-10-21",
          seat_number: 1,
          max_purchase: 2,
          deleted: 0,
          created_at: "2023-10-18T04:11:41.000000Z",
          updated_at: "2023-10-20T17:02:10.000000Z",
        },
      ],
    },
  ];
  const now = new Date();
  const [drafts, setDraftEvents] = useState([]);
  const [happeningEvents, setHappeningEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [endedEvents, setEndedEvent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Events - Agendakota";
    if (
      drafts.length === 0 &&
      happeningEvents.length == 0 &&
      upcomingEvents.length === 0 &&
      endedEvents.length === 0
    ) {
      let drafts = [];
      let happeningEvents = [];
      let endedEvents = [];
      let upcomingEvents = [];
      events.forEach((evt) => {
        let start = new Date(evt.start_date + "T" + evt.start_time + "Z");
        let end = new Date(evt.end_date + "T" + evt.end_time + "Z");
        if (evt.is_publish === 1) {
          drafts.push(evt);
        } else if (now >= start && now <= end) {
          happeningEvents.push(evt);
        } else if (now > end) {
          endedEvents.push(evt);
        } else {
          upcomingEvents.push(evt);
        }
      });
      setDraftEvents(drafts);
      setHappeningEvents(happeningEvents);
      setUpcomingEvents(upcomingEvents);
      setEndedEvent(endedEvents);
    }
  });

  return (
    <>
      <HeaderOrganizer
        active={"events"}
        activeOrg={localStorage.getItem("active-org")}
        orgSelected={orgSelected}
        setOrgSelected={setOrgSelected}
      />
      <SidebarOrganizer
        active={"events"}
        activeOrg={localStorage.getItem("active-org")}
        orgSelected={orgSelected}
        setOrgSelected={setOrgSelected}
      />
      <div className="content organizer">
        <div className={styles.TitleArea} style={{ marginBottom: "27.5px" }}>
          <h1 className={styles.Title}>Organizer Events</h1>
          <Toggler
            value={viewing}
            setValue={setViewing}
            options={["Happening", "Upcoming", "Finished"]}
          />
        </div>
        {drafts.length === 0 &&
        happeningEvents.length === 0 &&
        upcomingEvents.length === 0 &&
        endedEvents.length === 0 ? (
          <div className={styles.BlankData}>
            <img
              className={`${styles.IconBlank} ${styles.IconBlank2}`}
              src="/images/blank_events.png"
            />
            <div className={styles.BlankTitle}>
              Buat event pertamamu sebagai organizer
            </div>
            <div className={styles.BlankDesc}>
              Tap pada tombol ‘Create event’ untuk membuat event baru
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
                />
              ))}
            </div>
            <hr style={{ marginTop: 20 }} />
          </div>
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
                  fnOnClick={() => navigate("/explre")}
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
                  fnOnClick={() => navigate("/explre")}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizerEvent;
