import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../partials/Header";
import styles from "./styles/Home.module.css";
import stylesSkeleton from "../components/styles/Skeleton.module.css";
import Compass from "../icons/Compass";
import AddCircle from "../icons/AddCircle";
import Chip from "../components/Chip";
import ChipSkeleton from "../components/skeleton/Chip";
import Footer from "../partials/Footer";
import Event from "../components/Event";
import CategoryIcons from "../icons/categories";
import Slider from "../components/Slider";
import Button from "../components/Button";
import { BiChevronLeft, BiChevronRight, BiPlusCircle } from "react-icons/bi";
import Carousel from "../components/Carousel";
import CityCard from "../components/CityCard";
import CardBasic from "../components/CardBasic";
import axios from "axios";
import HeaderSkeleton from "../components/skeleton/HeaderBox";
import EventSkeleton from "../components/skeleton/Event";
import CarouselSkeleton from "../components/skeleton/Carousel";
import CityCardSkeleton from "../components/skeleton/CityCard";

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
  }
};

const handleBasicScroll = ({ type = "left", value = 10, idTarget = "" }) => {
  try {
    document.getElementById(idTarget).scrollLeft +=
      type === "left" ? value : -value;
  } catch (error) {}
};

const Home = () => {
  let loopLoad = 0;

  const [city, setCity] = useState("Semua");
  const [categories, setCategories] = useState(null);
  const [topicsEvents, setTopicsEvent] = useState(null);
  const [topicsAct, setTopicsAct] = useState(null);
  const [events, setEvents] = useState(null);
  const [spotlightEvent, setSpotlightEvent] = useState(null);
  const [specialDayEvent, setSpcDayEvent] = useState(null);
  const [frontBanners, setFBanners] = useState(null);
  const [selectedEvent, setSlcEvent] = useState(null);
  const [selectedActivity, setSlcActivity] = useState(null);
  const [cities, setCities] = useState(null);
  const [showData, setShow] = useState(true);

  const navigate = useNavigate();

  const popEventSection = useRef();

  useEffect(() => {
    if (
      loopLoad === 0 &&
      !categories &&
      !events &&
      !spotlightEvent &&
      !specialDayEvent &&
      !frontBanners &&
      !selectedActivity &&
      !selectedEvent &&
      !cities &&
      !topicsEvents &&
      !topicsAct
    ) {
      mainGetRequest({ path: "categories" }).then((res) => {
        if (res.status === 200) {
          setCategories(res.data.categories);
        } else {
          setCategories([]);
        }
      });
      setTimeout(() => {
        mainGetRequest({ path: "cities" }).then((res) => {
          if (res.status === 200) {
            setCities(res.data.cities);
          } else {
            setCities([]);
          }
        });
        setTimeout(() => {
          mainGetRequest({ path: "front-banners" }).then((res) => {
            if (res.status === 200) {
              setFBanners(res.data.f_banners);
            } else {
              setFBanners([]);
            }
          });
          setTimeout(() => {
            mainGetRequest({ path: "spotlight" }).then((res) => {
              if (res.status === 200) {
                setSpotlightEvent(res.data.spotlight);
              } else {
                setSpotlightEvent([]);
              }
            });
            setTimeout(() => {
              mainGetRequest({ path: "special-day" }).then((res) => {
                if (res.status === 200) {
                  setSpcDayEvent(res.data.special_day);
                } else {
                  setSpcDayEvent([]);
                }
              });
              setTimeout(() => {
                mainGetRequest({ path: "selected-event" }).then((res) => {
                  if (res.status === 200) {
                    setSlcEvent(res.data.selected_event);
                  } else {
                    setSlcEvent([]);
                  }
                });
                setTimeout(() => {
                  mainGetRequest({ path: "selected-activity" }).then((res) => {
                    if (res.status === 200) {
                      setSlcActivity(res.data.selected_activity);
                    } else {
                      setSlcActivity([]);
                    }
                  });
                  setTimeout(() => {
                    mainGetRequest({ path: "pop-events" }).then((res) => {
                      if (res.status === 200) {
                        setEvents(res.data.events);
                      } else {
                        setEvents([]);
                      }
                    });
                    setTimeout(() => {
                      mainGetRequest({ path: "topics" }).then((res) => {
                        if (res.status === 200) {
                          setTopicsEvent(res.data.topics);
                        } else {
                          setTopicsEvent([]);
                        }
                      });
                      setTimeout(() => {
                        mainGetRequest({ path: "topics-act" }).then((res) => {
                          if (res.status === 200) {
                            setTopicsAct(res.data.topics);
                          } else {
                            setTopicsAct([]);
                          }
                        });
                      }, 50);
                    }, 50);
                  }, 50);
                }, 50);
              }, 50);
            }, 50);
          }, 50);
        }, 50);
      }, 50);
      loopLoad++;
    }
  }, [
    categories,
    events,
    spotlightEvent,
    specialDayEvent,
    frontBanners,
    selectedActivity,
    selectedEvent,
    cities,
    topicsEvents,
    topicsAct,
  ]);

  useEffect(() => {
    if (
      city &&
      popEventSection.current &&
      popEventSection.current.getElementsByClassName("event-card").length > 0
    ) {
      popEventSection.current.getElementsByClassName(
        "pop-content"
      )[0].style.display = "unset";
      popEventSection.current.getElementsByClassName(
        "pop-blank"
      )[0].style.display = "none";
      if (city === "Semua") {
        let cards =
          popEventSection.current.getElementsByClassName("event-card");
        for (let i = 0; i < cards.length; i++) {
          cards[i].style.display = "flex";
        }
      } else {
        let cards =
          popEventSection.current.getElementsByClassName("event-card");
        let toHidden = 0;
        for (let i = 0; i < cards.length; i++) {
          if (
            cards[i]
              .getElementsByClassName("city-label")[0]
              .innerHTML.toLowerCase() === city.toLowerCase()
          ) {
            cards[i].style.display = "flex";
          } else {
            cards[i].style.display = "none";
            toHidden++;
          }
          if (toHidden === cards.length) {
            popEventSection.current.getElementsByClassName(
              "pop-content"
            )[0].style.display = "none";
            popEventSection.current.getElementsByClassName(
              "pop-blank"
            )[0].style.display = "block";
          }
        }
      }
    }
  }, [city]);

  useEffect(() => {
    document.title = "Agendakota";
  });

  return (
    <>
      <div className="content">
        <div className={styles.JumboTop}>
          <div className={styles.JumboTitle}>
            Platform Management
            <span className={styles.JumboTitleSpecial}>event,</span>
            Ticketing, & Reservation
          </div>
          <div className={styles.JumboDescription}>
            Nonton konser idolamu hingga belajar skill baru{" "}
            <div className={styles.DesktopEOL}></div> kini bisa kamu lakukan
            hanya dari rumah
          </div>

          <div className={styles.JumboButtonArea}>
            <button
              className={styles.JumboButton}
              onClick={() => navigate("/explore")}
            >
              <Compass />
              Explore Event
            </button>
            <button
              className={styles.JumboButton}
              onClick={() => navigate("/create-event")}
            >
              <AddCircle />
              Create Event
            </button>
          </div>

          <div className={`${styles.JumboChip} ${styles.JumboOnline}`}>
            Online
          </div>
          <div className={`${styles.JumboChip} ${styles.JumboOnsite}`}>
            Onsite
          </div>
          <div className={`${styles.JumboChip} ${styles.JumboHybrid}`}>
            Hybrid
          </div>
        </div>
        <section ref={popEventSection}>
          {events ? (
            <h3 style={{ marginTop: 0 }}>
              Trending Events and Activities in Various Cities
            </h3>
          ) : (
            <HeaderSkeleton />
          )}

          {cities ? (
            <Chip
              options={["Semua", ...cities.map((city) => city.name)]}
              value={city}
              setValue={setCity}
              multiple={false}
              showLimit={9}
            />
          ) : (
            <ChipSkeleton />
          )}
          <div className="pop-content">
            {events ? (
              events.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "30px",
                    fontSize: "20px",
                    color: "#CA0C64",
                    fontWeight: "bold",
                  }}
                  className="pop-blank"
                >
                  Data Event Belum Tersedia
                </div>
              ) : (
                <Slider
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    gap: 20,
                    display: "flex",
                  }}
                  distanceCard={20}
                  content={[
                    ...events.map((event, e) => (
                      <Event
                        className={["event-card"]}
                        style={{ maxWidth: "313px", flexBasis: "1000%" }}
                        data={event}
                        key={e}
                      />
                    )),
                  ]}
                />
              )
            ) : (
              <Slider
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  gap: 20,
                  display: "flex",
                }}
                distanceCard={20}
                content={[
                  <EventSkeleton />,
                  <EventSkeleton />,
                  <EventSkeleton />,
                  <EventSkeleton />,
                  <EventSkeleton />,
                ]}
              />
            )}
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
              fontSize: "20px",
              color: "#CA0C64",
              fontWeight: "bold",
              display: "none",
            }}
            className="pop-blank"
          >
            Data Tidak Ditemukan
          </div>
        </section>

        {spotlightEvent &&
        spotlightEvent.events &&
        spotlightEvent.events.length > 0 ? (
          <section className={styles.CustomSpotlight}>
            <div>
              <div
                className={styles.CustomSpotBox}
                style={{
                  backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}${spotlightEvent.data.banner}")`,
                }}
              >
                <div className={styles.CustomSpotText}>
                  <div className={styles.CustomSpotTitle}>
                    {spotlightEvent.data.title}
                  </div>
                  <div className={styles.CustomSpotSubtitle}>
                    {spotlightEvent.data.sub_title}
                  </div>
                  <Button
                    title={"Create Event"}
                    icon={<BiPlusCircle />}
                    classes={[styles.ButtonBasic]}
                    style={{ width: "unset", marginRight: "auto" }}
                    fnOnClick={() => navigate("/create-event")}
                  />
                </div>
                <div className={styles.CustomSpotEvents}>
                  <Slider
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      gap: 20,
                      display: "flex",
                      padding: "0px",
                    }}
                    distanceCard={20}
                    navigatorClasses={[styles.CustomNavSlideSpot]}
                    content={[
                      ...spotlightEvent.events.map((event, e) => (
                        <Event
                          style={{ maxWidth: "313px", flexBasis: "100%" }}
                          data={event}
                          key={e}
                        />
                      )),
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : !spotlightEvent ? (
          <section className={styles.CustomSpotlight}>
            <div>
              <div
                className={styles.CustomSpotBox}
                style={{ backgroundColor: "#eaeaea" }}
              >
                <div className={styles.CustomSpotText}>
                  <div className={styles.CustomSpotTitle}>
                    <HeaderSkeleton />
                  </div>
                  <div className={styles.CustomSpotSubtitle}>
                    <HeaderSkeleton />
                  </div>
                  <ChipSkeleton />
                </div>
                <div className={styles.CustomSpotEvents}>
                  <Slider
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      gap: 20,
                      display: "flex",
                      padding: "0px",
                    }}
                    distanceCard={20}
                    navigatorClasses={[styles.CustomNavSlideSpot]}
                    content={[
                      <EventSkeleton />,
                      <EventSkeleton />,
                      <EventSkeleton />,
                      <EventSkeleton />,
                      <EventSkeleton />,
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
              fontSize: "20px",
              color: "#CA0C64",
              fontWeight: "bold",
              display: "none",
            }}
            className="pop-blank"
          >
            Data Tidak Ditemukan
          </div>
        )}

        {specialDayEvent &&
        specialDayEvent.events &&
        specialDayEvent.events.length > 0 ? (
          <section>
            <h3 style={{ marginTop: 0 }}>{specialDayEvent.data.title}</h3>
            <Slider
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 20,
                display: "flex",
              }}
              distanceCard={20}
              content={specialDayEvent.events.map((event, e) => (
                <Event style={{ maxWidth: "313px" }} data={event} key={e} />
              ))}
            />
            <div className={styles.SelectedEvent}>
              <Button
                title={<div>Lihat Semuanya</div>}
                classes={[styles.ButtonBasic]}
              />
            </div>
          </section>
        ) : !specialDayEvent ? (
          <section>
            <HeaderSkeleton />
            <Slider
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 20,
                display: "flex",
              }}
              distanceCard={20}
              content={[
                <EventSkeleton />,
                <EventSkeleton />,
                <EventSkeleton />,
                <EventSkeleton />,
                <EventSkeleton />,
              ]}
            />
          </section>
        ) : (
          <></>
        )}

        {frontBanners && frontBanners.length > 0 ? (
          <section>
            <Carousel
              contents={frontBanners}
              navigatorClasses={[styles.CustomNavCarousel]}
            />
          </section>
        ) : !frontBanners ? (
          <section>
            <CarouselSkeleton />
          </section>
        ) : (
          <></>
        )}

        {selectedEvent &&
        selectedEvent.events &&
        selectedEvent.events.length > 0 ? (
          <section>
            <h3 style={{ marginTop: 0 }}>{selectedEvent.data.title}</h3>
            <Slider
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 20,
                display: "flex",
              }}
              distanceCard={20}
              content={selectedEvent.events.map((event, e) => (
                <Event style={{ maxWidth: "313px" }} data={event} key={e} />
              ))}
            />
            <div className={styles.SelectedEvent}>
              <Button
                title={<div>Lihat Semuanya</div>}
                classes={[styles.ButtonBasic]}
              />
            </div>
          </section>
        ) : !selectedEvent ? (
          <section>
            <HeaderSkeleton />
            <Slider
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 20,
                display: "flex",
              }}
              distanceCard={20}
              content={[
                <EventSkeleton />,
                <EventSkeleton />,
                <EventSkeleton />,
                <EventSkeleton />,
                <EventSkeleton />,
              ]}
            />
          </section>
        ) : (
          <></>
        )}

        <section>
          {categories && topicsEvents ? (
            <>
              <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
                Temukan Berbagai Kategori Event
              </h3>
              <div className={styles.CategoryArea}>
                {categories.map((category, c) => {
                  if (
                    category.name != "Daily Activities" &&
                    category.name != "Tour Travel (recurring)" &&
                    category.name != "Attraction"
                  ) {
                    return (
                      <div
                        key={c}
                        className={styles.CategoryItem}
                        onClick={() => {
                          navigate(`/explore?category=${category.name}`);
                        }}
                      >
                        <img
                          src={
                            process.env.REACT_APP_BACKEND_URL + category.photo
                          }
                          alt={category.name}
                          width={"52px"}
                          height={"52px"}
                        />
                        <div className={styles.CategoryInfo}>
                          <div className={styles.CategoryName}>
                            {category.name}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className={styles.SliderContainer}>
                <div
                  className={`${styles.ArrowTopic} ${styles.ArrowTopicLeft}`}
                  onClick={() => {
                    handleBasicScroll({
                      type: "left",
                      value: 100,
                      idTarget: "topic-evt",
                    });
                  }}
                >
                  <BiChevronLeft />
                </div>
                <div
                  className={`${styles.ArrowTopic} ${styles.ArrowTopicRight}`}
                  onClick={() => {
                    handleBasicScroll({
                      type: "right",
                      value: 100,
                      idTarget: "topic-evt",
                    });
                  }}
                >
                  <BiChevronRight />
                </div>
                <div id="topic-evt" className={styles.SlideBox}>
                  {topicsEvents.map((topic, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          navigate(`/explore?topic=${topic.name}`);
                        }}
                        className={styles.CategoryItem}
                      >
                        <div className={styles.TopicInfo}>
                          <div className={styles.TopicName}>{topic.name}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <HeaderSkeleton />
              <div
                style={{ marginTop: "10px" }}
                className={styles.CategoryArea}
              >
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
              </div>
            </>
          )}
        </section>

        <section>
          {categories && topicsAct ? (
            <>
              <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
                Temukan Berbagai Kategori Aktivitas
              </h3>
              <div className={styles.CategoryArea}>
                {categories.map((category, c) => {
                  if (
                    category.name == "Daily Activities" ||
                    category.name == "Tour Travel (recurring)" ||
                    category.name == "Attraction"
                  ) {
                    return (
                      <div
                        key={c}
                        className={styles.CategoryItem}
                        onClick={() => {
                          navigate(`/explore?category=${category.name}`);
                        }}
                      >
                        <img
                          src={
                            process.env.REACT_APP_BACKEND_URL + category.photo
                          }
                          alt={category.name}
                          width={"52px"}
                          height={"52px"}
                        />
                        <div className={styles.CategoryInfo}>
                          <div className={styles.CategoryName}>
                            {category.name === "Tour Travel (recurring)"
                              ? "Tour Travel"
                              : category.name}
                          </div>
                          {/* <div className={styles.CategoryEvents}>
												{category.event_count} events
											</div> */}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className={styles.SliderContainer}>
                <div
                  className={`${styles.ArrowTopic} ${styles.ArrowTopicLeft}`}
                  onClick={() => {
                    handleBasicScroll({
                      type: "left",
                      value: 100,
                      idTarget: "topic-evt",
                    });
                  }}
                >
                  <BiChevronLeft />
                </div>
                <div
                  className={`${styles.ArrowTopic} ${styles.ArrowTopicRight}`}
                  onClick={() => {
                    handleBasicScroll({
                      type: "right",
                      value: 100,
                      idTarget: "topic-evt",
                    });
                  }}
                >
                  <BiChevronRight />
                </div>
                <div id="topic-act" className={styles.SlideBox}>
                  {Object.values(topicsAct).map((topicGroup) => {
                    return topicGroup.map((topic, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            navigate(`/explore?topic=${topic.name}`);
                          }}
                          className={styles.CategoryItem}
                        >
                          <div className={styles.TopicInfo}>
                            <div className={styles.TopicName}>{topic.name}</div>
                          </div>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <HeaderSkeleton />
              <div
                style={{ marginTop: "10px" }}
                className={styles.CategoryArea}
              >
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
                <div
                  className={`${styles.CategoryItem} ${stylesSkeleton.Skeleton}`}
                  style={{ height: "72px" }}
                ></div>
              </div>
            </>
          )}
        </section>

        {selectedActivity &&
        selectedActivity.events &&
        selectedActivity.events.length > 0 ? (
          <section>
            <h3 style={{ marginTop: 0 }}>{selectedActivity.data.title}</h3>
            {/* <Chip
						options={[
							"Hiburan",
							"Kuliner",
							"Shoping",
							"Healing",
							"Kesehatan",
							"Kecantikan",
						]}
						value={city}
						setValue={setCity}
						multiple={false}
					/> */}
            <Slider
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 20,
                display: "flex",
              }}
              distanceCard={20}
              content={selectedActivity.events.map((event, e) => (
                <Event style={{ maxWidth: "313px" }} data={event} key={e} />
              ))}
            />
            <div className={styles.SelectedEvent}>
              <Button
                title={<div>Lihat Semuanya</div>}
                classes={[styles.ButtonBasic]}
              />
            </div>
          </section>
        ) : !selectedActivity ? (
          <section>
            <HeaderSkeleton />
            <Slider
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 20,
                display: "flex",
              }}
              distanceCard={20}
              content={[
                <EventSkeleton />,
                <EventSkeleton />,
                <EventSkeleton />,
                <EventSkeleton />,
                <EventSkeleton />,
              ]}
            />
          </section>
        ) : (
          <></>
        )}

        <section>
          {cities ? (
            <>
              <h3 style={{ marginTop: 0 }}>Event di kota lain</h3>
              <Slider
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  gap: 20,
                  display: "flex",
                }}
                distanceCard={20}
                widthCard={135.5}
                content={cities.map((city, index) => (
                  <CityCard
                    key={index}
                    style={{ maxWidth: "140px", cursor: "pointer" }}
                    data={city}
                    fnOnClick={() => {
                      navigate(`/explore?city=${city.name}`);
                    }}
                  />
                ))}
              />
            </>
          ) : (
            <>
              <HeaderSkeleton />
              <Slider
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  gap: 20,
                  display: "flex",
                }}
                distanceCard={20}
                widthCard={135.5}
                content={[
                  <CityCardSkeleton />,
                  <CityCardSkeleton />,
                  <CityCardSkeleton />,
                  <CityCardSkeleton />,
                ]}
              />
            </>
          )}
        </section>

        <section className={styles.CustomSpotlight}>
          <div className={`${styles.JumboTop} ${styles.AbsoluteBg}`} />
          <div className={styles.JumboSec}>
            <div className={styles.JumboSecL}>
              <div className={styles.JumboTitle}>
                Atur dan buat event meriahmu sendiri!
              </div>
              <div className={styles.JumboDescription}>
                Agenda kota juga merupakan platform dimana kamu bisa membuat
                eventmu mulai dari gratis hingga berbayar loh!{" "}
              </div>
              <Button
                title={"Create Event"}
                icon={<BiPlusCircle />}
                classes={[styles.ButtonBasic]}
                style={{ width: "unset", marginRight: "auto" }}
                onClick={() => navigate("/create-event")}
              />
            </div>
            <div className={styles.JumboSecR}>
              <img src="/images/FrontCover1.png" alt="" srcset="" />
            </div>
          </div>
        </section>

        <section>
          <div className={styles.JumboSec} style={{ gap: "80px" }}>
            <div className={styles.Col2}>
              <img
                className={styles.FrontCover2}
                style={{
                  marginTop: "16px",
                  marginBottom: "16px",
                  maxWidth: "530px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src="/images/FrontCover2.png"
              />
            </div>
            <div className={styles.Col2}>
              <div className={styles.JumboTitle}>
                Amati penjualan tiket dari eventmu dengan mudah!
              </div>
              <div className={styles.JumboDescription}>
                Agenda kota juga merupakan platform dimana kamu bisa membuat
                eventmu mulai dari gratis hingga berbayar loh!
              </div>
              <Button
                title={"Create Event"}
                icon={<BiPlusCircle />}
                classes={[styles.ButtonBasic]}
                style={{ width: "unset", marginRight: "auto" }}
                onClick={() => navigate("/create-event")}
              />
            </div>
          </div>
        </section>

        {/* <section>
					<h3 style={{ marginTop: 0 }}>Agenda Inspiration</h3>
					<Slider
						style={{
							flexDirection: "row",
							marginTop: 20,
							gap: 20,
							display: "flex",
						}}
						distanceCard={20}
						content={articles.map((article) => {
							return <CardBasic data={article} />;
						})}
					/>
				</section> */}

        <Footer />
      </div>
    </>
  );
};

export default Home;
