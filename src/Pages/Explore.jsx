import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Explore.module.css";
import Skeleton from "../components/styles/Skeleton.module.css";
import Chip from "../components/Chip";
import Event from "../components/Event";
import {
  BiChevronDown,
  BiChevronRight,
  BiFilter,
  BiSearch,
} from "react-icons/bi";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import FieldBox from "../components/FieldBox";
import ErrorPage from "../partials/ErrorPage";
import SkeletonChip from "../components/skeleton/Chip";
import SkeletonEvent from "../components/skeleton/Event";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import InputToogle from "../components/InputToogle";
import Select from "react-select";
import Footer from "../partials/Footer";

const handleSuccess = (res) => {
  return {
    data: res.data,
    status: res.status,
  };
};

const handleError = (error) => {
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
};

const loadCategories = async () => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/categories",
      {
        headers: {
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const loadCities = async () => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/cities",
      {
        headers: {
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const loadTopics = async () => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/topics",
      {
        headers: {
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const loadTopicsAct = async () => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/topics-act",
      {
        headers: {
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const loadEvents = async ({ filterStr }) => {
  try {
    let param = filterStr ? filterStr : "";
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/search" + param,
      {
        headers: {
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const Explore = () => {
  // basic data
  const [categories, setCategories] = useState(null);
  const [topics, setTopics] = useState(null);
  const [cities, setCities] = useState(null);
  const [events, setEvents] = useState(null);

  // selected data
  const [selectedBasicTime, setSelectedBasicTime] = useState("Semua Waktu");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("Semua Harga");
  const [fixInterval, setFixInterval] = useState(null);
  const inputCity = useRef();
  const [selectedCity, setSelectedCity] = useState(null);
  const [queryParam, setQueryParam] = useState(null);
  const location = useLocation();

  // state control
  const [openListCat, setOpenListCatState] = useState(false);
  const [openListTopic, setOpenListTopState] = useState(false);
  const [openListPrice, setOpenListPrice] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFilterVar, setLoadingFilterVar] = useState(true);
  const [errorState, setErrorState] = useState(false);
  // basic show is 6 card event
  const [showData, setShowData] = useState(6);

  const validateSelectInterval = (e) => {
    // console.log(e.length, selectedInterval, "SELECTED DATE");
    if (e.length <= 2) {
      setSelectedInterval(e);
    } else if (e.length > 2) {
      setSelectedInterval([...selectedInterval]);
    }
  };

  const handleFilter = (
    name,
    city,
    categories,
    topics,
    interval,
    typePrice
  ) => {
    let strParams = "";
    if (name) {
      strParams +=
        strParams === ""
          ? "?event_name=" + name.replaceAll(" ", "%20").replaceAll("&", "%26")
          : "&event_name=" + name.replaceAll(" ", "%20").replaceAll("&", "%26");
    }
    if (city) {
      strParams +=
        strParams === ""
          ? "?city=" + city.replaceAll(" ", "%20").replaceAll("&", "%26")
          : "&city=" + city.replaceAll(" ", "%20").replaceAll("&", "%26");
    }
    if (categories && categories.length > 0) {
      let catParams = "";
      categories.forEach((cat) => {
        catParams === ""
          ? (catParams += `category[]=${cat}`)
          : (catParams += `&category[]=${cat}`);
      });
      strParams +=
        strParams === ""
          ? "?" + catParams.replaceAll(" ", "%20").replaceAll("&", "%26")
          : "&" + catParams.replaceAll(" ", "%20").replaceAll("&", "%26");
    }
    if (topics && topics.length > 0) {
      let topicParams = "";
      topics.forEach((topic) => {
        topicParams === ""
          ? (topicParams += `topic[]=${topic}`)
          : (topicParams += `&topic[]=${topic}`);
      });
      strParams +=
        strParams === ""
          ? "?" +
            topicParams.replaceAll(" ", "%20").replaceAll("&", "%26") +
            "&topic_delimiter=~!^!~"
          : "&" +
            topicParams.replaceAll(" ", "%20").replaceAll("&", "%26") +
            "&topic_delimiter=~!^!~";
    }
    // interval format default start - end
    if (interval) {
      strParams +=
        strParams === ""
          ? `?start_date=${interval.split(" - ")[0]}${
              interval.split(" - ").length > 1
                ? "&until_date=" + interval.split(" - ")[1]
                : ""
            }`
          : `&start_date=${interval.split(" - ")[0]}${
              interval.split(" - ").length > 1
                ? "&until_date=" + interval.split(" - ")[1]
                : ""
            }`;
    }
    if (typePrice === "Berbayar" || typePrice === "Gratis") {
      strParams +=
        strParams === ""
          ? typePrice === "Gratis"
            ? "?start_price=0&until_price=0"
            : "?start_price=1"
          : typePrice === "Gratis"
          ? "&start_price=0&until_price=0"
          : "&start_price=1";
    }
    setLoading(true);
    setLoadingFilterVar(true);
    loadEvents({ filterStr: strParams }).then((res) => {
      if (res.status === 200) {
        setEvents(res.data.events);
        setLoading(false);
        setLoadingFilterVar(false);
        // setTimeout(() => {
        //   // inputCity.current.value = city;
        //   setSelectedCity(city ? city : "");
        // }, 500);
      } else {
        setErrorState(true);
      }
    });
  };

  const handleChangeCity = (e) => {
    e.preventDefault();
    handleFilter(
      queryParam,
      // inputCity.current.value,
      selectedCity,
      selectedCategories,
      selectedTopics,
      fixInterval,
      selectedPrice
    );
  };

  // useEffect(() => {
  // 	let pathSplit = window.location.href.split("?name=");
  // 	let queryParam =
  // 		pathSplit.length > 1
  // 			? pathSplit[1].split("?").length > 1
  // 				? null
  // 				: pathSplit[1].split("&")[0]
  // 			: null;
  // 	setQueryParam(queryParam);
  // }, [location]);

  const handleLoadMore = () => {
    // 6 is show data per load
    let residual = events.length - showData - 6;
    if (residual < 0) {
      setShowData(events.length + 6);
      handleFilter(
        queryParam,
        // inputCity.current.value,
        selectedCity,
        selectedCategories,
        selectedTopics,
        fixInterval,
        selectedPrice
      );
    } else {
      setShowData(showData + 6);
    }
  };

  useEffect(() => {
    if (selectedBasicTime !== "") {
      setSelectedInterval([]);
      // console.log(selectedBasicTime, "SELECTED BASIC TIME");
      if (selectedBasicTime === "Minggu Ini") {
        let start = new Date();
        let until = new Date(
          new Date().setDate(start.getDate() + (6 - start.getDay()))
        );
        setFixInterval(
          start.getFullYear() +
            "-" +
            (start.getMonth() + 1) +
            "-" +
            start.getDate() +
            " - " +
            until.getFullYear() +
            "-" +
            (until.getMonth() + 1) +
            "-" +
            until.getDate()
        );
      } else if (selectedBasicTime === "Bulan Ini") {
        let start = new Date();
        let until = new Date(start.getFullYear(), start.getMonth() + 1, 0);
        setFixInterval(
          start.getFullYear() +
            "-" +
            (start.getMonth() + 1) +
            "-" +
            start.getDate() +
            " - " +
            until.getFullYear() +
            "-" +
            (until.getMonth() + 1) +
            "-" +
            until.getDate()
        );
      } else if (selectedBasicTime === "Minggu Depan") {
        let now = new Date();
        let start = new Date(
          new Date().setDate(now.getDate() + (6 - now.getDay()) + 1)
        );
        setFixInterval(
          start.getFullYear() +
            "-" +
            (start.getMonth() + 1) +
            "-" +
            start.getDate()
        );
      } else if (selectedBasicTime === "Bulan Depan") {
        let now = new Date();
        let start = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        setFixInterval(
          start.getFullYear() +
            "-" +
            (start.getMonth() + 1) +
            "-" +
            start.getDate()
        );
      } else {
        setFixInterval(null);
      }
    }
  }, [selectedBasicTime]);

  useEffect(() => {
    if (selectedInterval.length === 2) {
      setSelectedBasicTime("");
      setFixInterval(
        `${
          selectedInterval[0] < selectedInterval[1]
            ? selectedInterval[0].format("YYYY-M-D")
            : selectedInterval[1].format("YYYY-M-D")
        } - ${
          selectedInterval[0] > selectedInterval[1]
            ? selectedInterval[0].format("YYYY-M-D")
            : selectedInterval[1].format("YYYY-M-D")
        }`
      );
    }
  }, [selectedInterval]);

  useEffect(() => {
    if (events) {
      handleFilter(
        queryParam,
        // inputCity.current.value,
        selectedCity,
        selectedCategories,
        selectedTopics,
        fixInterval,
        selectedPrice
      );
    }
  }, [
    selectedTopics,
    selectedCategories,
    queryParam,
    fixInterval,
    selectedPrice,
    selectedCity,
  ]);

  useEffect(() => {
    if (events) {
      let pathSplit = window.location.href.split("?");
      let nameParam = null;
      if (pathSplit.length > 1) {
        nameParam =
          pathSplit[1].split("name=").length < 2
            ? null
            : pathSplit[1].split("name=")[1].split("&")[0];
        setQueryParam(nameParam);
      }
    }
  }, [location]);

  useEffect(() => {
    if (!categories && !topics && !cities) {
      setLoadingFilterVar(true);
      loadCategories().then((res) => {
        if (res.status === 200) {
          setCategories(res.data.categories);
        } else {
          setErrorState(true);
        }
      });
      loadTopics().then((res) => {
        if (res.status === 200) {
          let topicsEvt = res.data.topics;
          loadTopicsAct().then((res) => {
            if (res.status === 200) {
              setTopics([
                ...topicsEvt,
                ...Object.values(res.data.topics).flat(),
              ]);
            } else {
              setErrorState(true);
            }
          });
        } else {
          setErrorState(true);
        }
      });
      loadCities().then((res) => {
        if (res.status === 200) {
          setCities(res.data.cities);
        } else {
          setErrorState(true);
        }
      });
    } else if (categories && topics) {
      setLoadingFilterVar(false);
    }
  }, [categories, topics, cities]);

  useEffect(() => {
    if (!events) {
      setLoading(true);
      let pathSplit = window.location.href.split("?");
      let nameParam = null;
      let catParam = null;
      let topicParam = null;
      let cityParam = null;
      let strParams = null;
      if (pathSplit.length > 1) {
        nameParam =
          pathSplit[1].split("name=").length < 2
            ? null
            : pathSplit[1].split("name=")[1].split("&")[0];
        catParam =
          pathSplit[1].split("category=").length < 2
            ? null
            : pathSplit[1]
                .split("category=")[1]
                .split("&")[0]
                .toLocaleLowerCase();
        topicParam =
          pathSplit[1].split("topic=").length < 2
            ? null
            : pathSplit[1].split("topic=")[1].split("&")[0];
        cityParam =
          pathSplit[1].split("city=").length < 2
            ? null
            : pathSplit[1].split("city=")[1].split("&")[0];
        strParams =
          nameParam && catParam && cityParam && topicParam
            ? `?event_name=${nameParam}&category[]=${catParam}&city=${cityParam}&topic[]=${topicParam}&&topic_delimiter=~!^!~`
            : nameParam && catParam && cityParam
            ? `?event_name=${nameParam}&category[]=${catParam}&city=${cityParam}`
            : nameParam && cityParam && topicParam
            ? `?event_name=${nameParam}&city=${cityParam}&topic[]=${topicParam}&&topic_delimiter=~!^!~`
            : nameParam && catParam && topicParam
            ? `?event_name=${nameParam}&category[]=${catParam}&topic[]=${topicParam}&&topic_delimiter=~!^!~`
            : catParam && cityParam && topicParam
            ? `?category[]=${catParam}&city=${cityParam}&topic[]=${topicParam}&&topic_delimiter=~!^!~`
            : nameParam && catParam
            ? `?event_name=${nameParam}&category[]=${catParam}`
            : nameParam && cityParam
            ? `?event_name=${nameParam}&city=${cityParam}`
            : nameParam && topicParam
            ? `?event_name=${nameParam}&topic[]=${topicParam}&&topic_delimiter=~!^!~`
            : catParam && cityParam
            ? `?category[]=${catParam}&city=${cityParam}`
            : catParam && topicParam
            ? `?category[]=${catParam}&topic[]=${topicParam}&&topic_delimiter=~!^!~`
            : cityParam && topicParam
            ? `?city=${cityParam}&topic[]=${topicParam}&&topic_delimiter=~!^!~`
            : nameParam
            ? `?event_name=${nameParam}`
            : catParam
            ? `?category[]=${catParam}`
            : cityParam
            ? `?city=${cityParam}`
            : topicParam
            ? `?topic[]=${topicParam}&&topic_delimiter=~!^!~`
            : null;
        // console.log(strParams, "STR PARAMS");
        setSelectedCategories(
          catParam
            ? [catParam.replaceAll("%20", " ").replaceAll("%26", "&")]
            : []
        );
        setSelectedTopics(
          topicParam
            ? [topicParam.replaceAll("%20", " ").replaceAll("%26", "&")]
            : []
        );
        setSelectedCity(cityParam ? cityParam : "");
        setQueryParam(nameParam);
      }

      loadEvents({
        filterStr: strParams,
      }).then((res) => {
        if (res.status === 200) {
          setEvents(res.data.events);
          setLoading(false);
          // setTimeout(() => {
          //   // inputCity.current.value = cityParam;
          //   setSelectedCity(cityParam ? cityParam : "");
          // }, 500);
        } else {
          setErrorState(true);
        }
      });
    }
  }, [events]);

  useEffect(() => {
    document.title = "Explore - Agendakota";
  });

  return (
    <div
      className={`content ${styles.Content}`}
      style={{ padding: "24px", marginTop: "12px" }}
    >
      {errorState ? (
        <ErrorPage />
      ) : (
        <>
          {!openFilter ? (
            <Button
              classes={[styles.FloatButton]}
              icon={<BiFilter />}
              center
              fnOnClick={() => {
                setOpenFilter(!openFilter);
              }}
            />
          ) : (
            <></>
          )}
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
              Explore
            </div>
            <div
              className={styles.BasicTimeFilter}
              style={{ marginTop: "-20px" }}
            >
              {loadingFilterVar ? (
                <SkeletonChip
                  itemStyle={{ whiteSpace: "nowrap" }}
                  numOfShow={5}
                />
              ) : (
                <Chip
                  options={[
                    "Semua Waktu",
                    "Minggu Ini",
                    "Bulan Ini",
                    "Minggu Depan",
                    "Bulan Depan",
                  ]}
                  value={selectedBasicTime}
                  setValue={setSelectedBasicTime}
                  itemStyle={{ whiteSpace: "nowrap" }}
                  multiple={false}
                  containerStyle={{
                    scrollbarWidth: "none",
                  }}
                />
              )}
            </div>
          </div>

          <div className={styles.MainBody}>
            {openFilter ? <div className={styles.Wrapper}></div> : <></>}
            <div
              className={styles.FilterPanel}
              style={openFilter ? { display: "flex" } : {}}
            >
              <div
                className={styles.FilterClose}
                onClick={() => {
                  setOpenFilter(false);
                }}
              >
                <BiChevronRight />
              </div>
              {loadingFilterVar ? (
                <div className={`${styles.BoxFIlterCotent}`}>
                  <div className={styles.GroupFilter}>
                    <div
                      className={`${styles.SkeletonFilterTitle} ${Skeleton.Skeleton}`}
                    ></div>
                    <div
                      className={`${styles.SkeletonFilterForm} ${Skeleton.Skeleton}`}
                    ></div>
                  </div>
                  <div className={styles.GroupFilter}>
                    <div
                      className={`${styles.SkeletonFilterTitle} ${Skeleton.Skeleton}`}
                    ></div>
                    <div
                      className={`${styles.SkeletonFilterForm} ${Skeleton.Skeleton}`}
                    ></div>
                  </div>
                  <div className={styles.GroupFilter}>
                    <div
                      className={`${styles.SkeletonFilterTitle} ${Skeleton.Skeleton}`}
                    ></div>
                    <div
                      className={`${styles.SkeletonFilterForm} ${Skeleton.Skeleton}`}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className={styles.BoxFIlterCotent}>
                  {/* <form onSubmit={handleChangeCity}>
                    <div className={styles.GroupFilter}>
                      <div className={styles.FilterTitle}>Kota</div>

                      <div className={styles.SearchBox}>
                        <InputForm
                          placeholder={"Cari kota"}
                          refData={inputCity}
                        />
                        <Button typeBtn="submit" icon={<BiSearch />} center />
                      </div>
                    </div>
                  </form> */}
                  <div className={styles.GroupFilter}>
                    <div className={styles.FilterTitle}>Kota</div>
                    <Select
                      placeholder={"Pilih Kota"}
                      // ref={fieldFormAddBank.bank}
                      options={
                        cities
                          ? [
                              { label: "Semua Kota", value: null },
                              ...cities.map((city) => ({
                                label: city.name,
                                value: city.name,
                              })),
                            ]
                          : []
                      }
                      styles={{
                        option: (basicStyle, state) => ({
                          ...basicStyle,
                          backgroundColor: state.isFocused
                            ? "#fecadf"
                            : "white",
                          fontSize: "13px",
                        }),
                        control: (basicStyle, state) => ({
                          ...basicStyle,
                          display: "flex",
                          flexDirection: "row",
                          border: "none!important",
                          borderRadius: "8px",
                          height: "41px",
                          fontSize: "13px",
                          boxShadow: "0px 0px 10px -5px #000000a6",
                        }),
                      }}
                      value={{
                        label: selectedCity ? selectedCity : "Semua Kota",
                        value: selectedCity ? selectedCity : "Semua Kota",
                      }}
                      onChange={(value) => {
                        setSelectedCity(value.value);
                      }}
                    />
                  </div>

                  <div className={styles.GroupFilter}>
                    <div className={styles.FilterTitle}>Kategori</div>
                    <FieldBox
                      style={{
                        height: "41px",
                        fontSize: "13px",
                        overflow: "hidden",
                        gap: "0",
                      }}
                    >
                      <div
                        onClick={() => {
                          setOpenListCatState(!openListCat);
                        }}
                        className={styles.FieldDropDownLabel}
                        style={{ fontSize: "13px" }}
                      >
                        {selectedCategories.length > 0
                          ? selectedCategories.join(",")
                          : "Pilih Kategori"}
                      </div>
                      <BiChevronDown
                        onClick={() => {
                          setOpenListCatState(!openListCat);
                        }}
                        className={styles.FieldDropDownIcon}
                      />
                    </FieldBox>

                    {openListCat ? (
                      <div className={styles.BoxChipSelector}>
                        <Chip
                          options={
                            categories && categories.length > 0
                              ? categories.map((cat) => cat.name.toLowerCase())
                              : []
                          }
                          labelItem={
                            categories && categories.length > 0
                              ? categories.map((cat) => cat.name)
                              : []
                          }
                          value={selectedCategories}
                          setValue={setSelectedCategories}
                          itemStyle={{ whiteSpace: "nowrap" }}
                          containerStyle={{
                            marginTop: "5px",
                            flexWrap: "wrap",
                            fontSize: "13px",
                          }}
                          multiple
                          max={3}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className={styles.GroupFilter}>
                    <div className={styles.FilterTitle}>Topik</div>
                    <FieldBox
                      style={{ height: "41px", overflow: "hidden", gap: "0" }}
                    >
                      <div
                        onClick={() => {
                          setOpenListTopState(!openListTopic);
                        }}
                        className={styles.FieldDropDownLabel}
                        style={{ fontSize: "13px" }}
                      >
                        {selectedTopics.length > 0
                          ? selectedTopics.join(",")
                          : "Pilih Topik"}
                      </div>
                      <BiChevronDown
                        onClick={() => {
                          setOpenListTopState(!openListTopic);
                        }}
                        className={styles.FieldDropDownIcon}
                      />
                    </FieldBox>
                    {openListTopic ? (
                      <div className={styles.BoxChipSelector}>
                        <Chip
                          options={
                            topics && topics.length > 0
                              ? topics.map((topic) => topic.name)
                              : []
                          }
                          value={selectedTopics}
                          setValue={setSelectedTopics}
                          itemStyle={{ whiteSpace: "nowrap" }}
                          containerStyle={{
                            marginTop: "5px",
                            flexWrap: "wrap",
                            fontSize: "13px",
                          }}
                          multiple
                          max={3}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className={styles.GroupFilter}>
                    <div className={styles.FilterTitle}>Tanggal Event</div>
                    <DatePicker
                      className={styles.DateInput}
                      plugins={[<DatePanel />]}
                      placeholder="Pilih interval tanggal"
                      style={{
                        border: "1px solid #eaeaea",
                        width: "calc(100% - 25px)",
                        padding: "9px 12px 9px 12px",
                        boxShadow: " 0px 0px 8px 0px #0000001a",
                      }}
                      id={`dt-picker`}
                      multiple
                      value={selectedInterval}
                      onChange={(e) => {
                        validateSelectInterval(e);
                      }}
                    />
                  </div>

                  <div className={styles.GroupFilter}>
                    <div className={styles.FilterTitle}>Harga</div>
                    <FieldBox style={{ height: "41px" }}>
                      <div
                        onClick={() => {
                          setOpenListPrice(!openListPrice);
                        }}
                        className={styles.FieldDropDownLabel}
                        style={{ fontSize: "13px" }}
                      >
                        {!selectedPrice ? "Harga Event" : selectedPrice}
                      </div>
                      <BiChevronDown
                        onClick={() => {
                          setOpenListPrice(!openListPrice);
                        }}
                        className={styles.FieldDropDownIcon}
                      />
                    </FieldBox>
                    {openListPrice ? (
                      <div className={styles.BoxChipSelector}>
                        <Chip
                          options={["Semua Harga", "Gratis", "Berbayar"]}
                          value={selectedPrice}
                          setValue={setSelectedPrice}
                          itemStyle={{ whiteSpace: "nowrap" }}
                          containerStyle={{
                            marginTop: "5px",
                            flexWrap: "wrap",
                            fontSize: "13px",
                          }}
                          multiple={false}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}
            </div>
            {loading ? (
              <div className={styles.ContentPanel}>
                <SkeletonEvent className={[styles.EventCard]} />
                <SkeletonEvent className={[styles.EventCard]} />
                <SkeletonEvent className={[styles.EventCard]} />
                <SkeletonEvent className={[styles.EventCard]} />
                <SkeletonEvent className={[styles.EventCard]} />
                <SkeletonEvent className={[styles.EventCard]} />
              </div>
            ) : (
              <div className={styles.ContentPanel}>
                {events && events.length > 0 ? (
                  <>
                    {events.map((event, index) => {
                      if (index < showData) {
                        return (
                          <Event className={[styles.EventCard]} data={event} />
                        );
                      }
                    })}
                    <div className={styles.ButtonLoadBox}>
                      <Button
                        fnOnClick={handleLoadMore}
                        style={{ width: "unset" }}
                        title={"Lihat Lebih Banyak"}
                      />
                    </div>
                  </>
                ) : (
                  <div className={styles.BlankEvents}>
                    <img src="/images/blank_events.png" />
                    <div>Data Event Tidak Ditemukan !</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Explore;
