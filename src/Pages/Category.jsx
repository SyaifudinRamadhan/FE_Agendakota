import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./styles/Home.module.css";
import stylesSkeleton from "../components/styles/Skeleton.module.css";
import styles2 from "./styles/Category.module.css";
import { BiChevronLeft, BiChevronRight, BiPlusCircle } from "react-icons/bi";
import HeaderSkeleton from "../components/skeleton/HeaderBox";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

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

const handleBasicScroll = ({ type = "left", value = 10, idTarget = "" }) => {
  try {
    let scrollVal = document.getElementById(idTarget).scrollLeft;

    document.getElementById(idTarget).scrollLeft +=
      type === "left" ? value : -value;

    if (
      scrollVal === document.getElementById(idTarget).scrollLeft &&
      scrollVal > 0
    ) {
      document.getElementById(idTarget).scrollLeft = 0;
    } else if (
      scrollVal === document.getElementById(idTarget).scrollLeft &&
      scrollVal === 0
    ) {
      document.getElementById(idTarget).scrollLeft =
        document.getElementById(idTarget).scrollWidth;
    }
  } catch (error) {}
};

const Category = ({ type = "basic" }) => {
  const [categories, setCategories] = useState(null);
  const [topicsEvents, setTopicsEvent] = useState(null);

  // s===================== sate control ================
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!categories && !topicsEvents) {
      mainGetRequest({ path: "categories" }).then((res) => {
        if (res.status === 200) {
          setCategories(res.data.categories);
        } else {
          setCategories([]);
        }
      });
      mainGetRequest({
        path: type === "activities" ? "topics-act" : "topics",
      }).then((res) => {
        if (res.status === 200) {
          setTopicsEvent(res.data.topics);
        } else {
          setTopicsEvent([]);
        }
      });
    }
  }, [categories, topicsEvents]);

  useEffect(() => {
    if (categories && topicsEvents) {
      setLoading(false);
    }
  }, [categories, topicsEvents]);

  return (
    <div className="content" style={{ height: "calc(100% - 80px)" }}>
      <section style={{ marginTop: "auto", marginBottom: "auto" }}>
        {!isLoading && categories && topicsEvents ? (
          <>
            <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
              Temukan Berbagai Kategori{" "}
              {type === "activities" ? "Aktivitas" : "Event"}
            </h3>
            <div className={`${styles.CategoryArea} ${styles2.CategoryArea}`}>
              {categories.map((category, c) => {
                if (
                  type === "activities"
                    ? category.name == "Daily Activities" ||
                      category.name == "Tour Travel (recurring)" ||
                      category.name == "Attraction"
                    : category.name != "Daily Activities" &&
                      category.name != "Tour Travel (recurring)" &&
                      category.name != "Attraction"
                ) {
                  return (
                    <div
                      key={c}
                      className={`${styles.CategoryItem} ${styles2.CategoryItem}`}
                      onClick={() => {
                        navigate(`/explore?category=${category.name}`);
                      }}
                    >
                      <img
                        src={process.env.REACT_APP_BACKEND_URL + category.photo}
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
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className={styles.SliderContainer} style={{ padding: "15px" }}>
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

              {type === "activities" ? (
                <div
                  id="topic-act"
                  className={styles.SlideBox}
                  style={{ padding: "5px" }}
                >
                  {Object.values(topicsEvents).map((topicGroup) => {
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
              ) : (
                <div
                  id="topic-evt"
                  className={styles.SlideBox}
                  style={{ padding: "5px" }}
                >
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
              )}
            </div>
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </section>
    </div>
  );
};

export default Category;
