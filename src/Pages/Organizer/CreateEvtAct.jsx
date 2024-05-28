import React, { useEffect, useState } from "react";
import styles from "./styles/CreateEvtAct.module.css";
import PopUp from "../../partials/PopUp";
import EditorAddEvtAct from "../../partials/EditorAddEvtAct";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CreateEvtAct = ({
  organization,
  isLogin,
  fnSetLogin,
  forEvent = true,
}) => {
  const cards = forEvent
    ? [
        {
          title: "Onsite Event",
          icon: "/images/icon_card_evt1.png",
          active: true,
          content: (
            <ul>
              <li>Peserta menghadiri event secara fisik</li>
              <li>
                Perlu menyiapkan tempat event seperti gedung dan keperluan
                logistik lainnya
              </li>
            </ul>
          ),
        },
        {
          title: "Online Event",
          icon: "/images/icon_card_evt2.png",
          active: false,
          content: (
            <ul>
              <li>Peserta menghadiri event secara online</li>
              <li>
                Perlu menyiapkan link live streaming dari penyedia layanan
                seperti Zoom, Youtube Streaming, dsb.
              </li>
              <li>Peserta dapat membuat pameran online, class, dll</li>
            </ul>
          ),
        },
        {
          title: "Hybrid Event",
          icon: "/images/icon_card_evt3.png",
          active: false,
          content: (
            <ul>
              <li>Event diadakan secara online dan fisik</li>
              <li>
                Peserta dapat memilih untuk menghadiri event secara online atau
                fisik
              </li>
              <li>Peserta dapat membuat pameran online, class, dll</li>
            </ul>
          ),
        },
      ]
    : [
        {
          title: "Attraction",
          icon: "/images/icon_card_evt4.png",
          active: true,
          content: (
            <ul>
              <li>
                Untuk anda yang menjual paket seperti Playground, Themepark,
                Recreation, Landmark, Waterpark, Museum, Alam & Kebun, Sport
              </li>
            </ul>
          ),
        },
        {
          title: "Tour Travel",
          icon: "/images/icon_card_evt5.png",
          active: true,
          content: (
            <ul>
              <li>
                Untuk anad yang ingin menjual paket tour travel seperti kegiatan
                Open Trip, Paket Wisata, Paket Liburan, Hotel Promo, Jelajah
                Tempat, Wisata Tematics, dll
              </li>
            </ul>
          ),
        },
        {
          title: "Daily Activities",
          icon: "/images/icon_card_evt6.png",
          active: true,
          content: (
            <ul>
              <li>
                Untuk anda yang ingin menjual paket seperti Beauty Spa &
                Relaxation, Food, Games & Activities, Lifestyle, Entertaiment,
                Classes, Wellness, Treatment, Medical Treatment, dll
              </li>
            </ul>
          ),
        },
      ];
  const infoContent = forEvent ? (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dicta sunt
      animi excepturi accusantium iusto iure quas vel earum unde ipsum
      perspiciatis, consequatur ab. Eligendi dignissimos unde consectetur
      debitis commodi.
    </p>
  ) : (
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam laborum
      tempora incidunt alias mollitia. Tempore adipisci magni dolorem numquam
      fugiat. Provident repellat rem dolor consequatur et quae fugit culpa
      deserunt.
    </p>
  );

  const [popUpOpen, setPopUp] = useState(false);
  const [openEditor, setOpenEditor] = useState(null);
  const appData = useSelector((state) => state.appDataReducer);
  const location = useLocation();

  useEffect(() => {
    console.log("use effect landing create evt act");
  });

  useEffect(() => {
    setOpenEditor(null);
    setPopUp(false);
  }, [location]);

  useEffect(() => {
    document.title = "Create Event - Agendakota";
  });

  return (
    <>
      <div className="content organizer">
        <div className={styles.DecorationBox}>
          <div className={styles.Decoration}></div>
        </div>
        {!appData.activeOrg ? (
          <div style={{ marginTop: "100px" }}>
            <Loading />
          </div>
        ) : openEditor ? (
          <div className={styles.EditorContent}>
            <EditorAddEvtAct
              forEvtAct={openEditor}
              setForEvtAct={setOpenEditor}
              // eventId={"fda63e9e-5068-4097-b2ca-12115b71f456"}
              selectedOrgId={appData.activeOrg}
              isLogin={isLogin}
              fnSetLogin={fnSetLogin}
            />
          </div>
        ) : (
          <div className={styles.MainContainer}>
            <PopUp
              isActive={popUpOpen}
              setActiveFn={setPopUp}
              title="Informasi"
              content={infoContent}
            />
            <div className={styles.Title}>
              Create New {forEvent ? "Event" : "Activity"}
            </div>
            <div className={styles.SubTitle}>
              Choose what type of event do you want to create
            </div>
            <div className={styles.ContentCard}>
              {cards.map((card) => (
                <div
                  className={`${styles.CardBox} ${
                    card.active === false ? styles.Disabled : ""
                  }`}
                  onClick={() => {
                    card.active
                      ? setOpenEditor(
                          card.title === "Tour Travel"
                            ? "Tour Travel (recurring)"
                            : card.title
                        )
                      : setOpenEditor(null);
                  }}
                >
                  {card.active === false ? (
                    <div className={styles.Badge}>Coming Soon</div>
                  ) : (
                    <></>
                  )}
                  <div
                    className={styles.CardContainer}
                    style={{ opacity: card.active ? 1 : 0.5 }}
                  >
                    <div className={styles.IconCard}>
                      <img src={card.icon} alt="" srcset="" />
                    </div>
                    <div className={styles.TitleCard}>{card.title}</div>
                    <div className={styles.Info}>{card.content}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div
              className={styles.OpenNote}
              onClick={() => {
                setPopUp(true);
              }}
            >
              Apa perbedaan dari ketiga tipe {forEvent ? "event" : "activity"} ?
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default CreateEvtAct;
