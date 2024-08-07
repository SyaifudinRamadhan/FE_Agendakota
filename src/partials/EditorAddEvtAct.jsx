import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/EditorAddEvtAct.module.css";
import styles2 from "./styles/PopUpTicket.module.css";
import {
  BiArrowBack,
  BiBookOpen,
  BiCalendar,
  BiCard,
  BiCurrentLocation,
  BiError,
  BiFilter,
  BiInfoCircle,
  BiLeftArrow,
  BiLocationPlus,
  BiLockOpen,
  BiMap,
  BiMapPin,
  BiNews,
  BiPlusCircle,
  BiQuestionMark,
  BiSitemap,
  BiSolidCity,
  BiTrash,
} from "react-icons/bi";
import InputLabeled from "../components/InputLabeled";
import Button from "../components/Button";
import InputForm from "../components/InputForm";
import InputImage4 from "../components/InputImage4";
import FieldBox from "../components/FieldBox";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PopUp2 from "./PopUp2";

import PopUpTicket from "./PopUpTicket";
import InputCheckRadio from "../components/InputCheckRadio";
import axios from "axios";
import Loading from "../components/Loading";
import PopUp from "./PopUp";
import ErrorPage from "./ErrorPage";
import config from "../config";
import { useNavigate } from "react-router-dom";
import AddSelectOrgFront from "./AddSelectOrgFront";
import { useDispatch, useSelector } from "react-redux";
import { getAppData } from "../actions/appdata";

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

const loadOrgTypes = async () => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/org-types",
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

const loadTopics = async ({ activity = false }) => {
  try {
    let res = activity
      ? await axios.get(process.env.REACT_APP_BACKEND_URL + "/api/topics-act", {
          headers: { "x-api-key": process.env.REACT_APP_BACKEND_KEY },
        })
      : await axios.get(process.env.REACT_APP_BACKEND_URL + "/api/topics", {
          headers: { "x-api-key": process.env.REACT_APP_BACKEND_KEY },
        });
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};
const addData = async ({
  orgId,
  // required field for all
  name,
  category,
  topics,
  logo,
  desc,
  snk,
  exe_type,
  location,
  province,
  city,
  is_publish,
  // date and time is only required for reguler event type
  start_date,
  start_time,
  end_date,
  end_time,
  // required field for all
  instagram,
  twitter,
  website,
  twn_url,
  // optional field for all
  custom_fields,
  single_trx,
  seat_map,
  // required field for all
  visibility,
  // optional data in other table (array, array, array, integer)
  available_days,
  daily_limit_times,
  daily_start_times,
  breakdowns,
  limit_reschedule,
  allow_refund,
  token,
}) => {
  try {
    // console.log("start - ", daily_limit_times, daily_start_times);
    let finalStartEvent = new Date(start_date + "T" + start_time);
    let finalEndEvent = new Date(end_date + "T" + end_time);
    let originDistance = finalEndEvent.getTime() - finalStartEvent.getTime();
    // if (originDistance < 3600000) {
    //   originDistance = 3600000;
    // }
    if (new Date() >= finalStartEvent) {
      finalStartEvent = new Date().setMinutes(
        new Date().getMinutes() + 5,
        0,
        0
      );
      let iso = new Date(
        finalStartEvent -
          new Date(finalStartEvent).getTimezoneOffset() * 1000 * 60
      )
        .toISOString()
        .split(":00.")[0];
      start_date = iso.split("T")[0];
      start_time = iso.split("T")[1];
    }
    if (finalEndEvent - finalStartEvent < originDistance) {
      finalEndEvent = new Date(finalStartEvent);
      finalEndEvent.setTime(finalEndEvent.getTime() + originDistance);
      let iso = new Date(
        finalEndEvent - new Date(finalEndEvent).getTimezoneOffset() * 1000 * 60
      )
        .toISOString()
        .split(":00.")[0];
      end_date = iso.split("T")[0];
      end_time = iso.split("T")[1];
    }
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/org/" + orgId + "/event/create",
      {
        // required field for all
        name,
        category,
        topics,
        logo,
        desc,
        snk,
        exe_type,
        location,
        province,
        city,
        is_publish,
        // date and time is only required for reguler event type
        start_date,
        start_time,
        end_date,
        end_time,
        // required field for all
        instagram,
        twitter,
        website,
        twn_url,
        // optional field for all
        custom_fields,
        single_trx,
        seat_map,
        // required field for all
        visibility,
        // optional data in other table (array, array, array, integer)
        available_days,
        daily_limit_times,
        daily_start_times,
        breakdowns,
        limit_reschedule,
        allow_refund,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    // console.log(error);
    return handleError(error);
  }
};
const updateData = async ({
  orgId,
  event_id,
  // required field for all
  name,
  category,
  topics,
  logo,
  desc,
  snk,
  exe_type,
  location,
  province,
  city,
  // date and time is only required for reguler event type
  start_date,
  start_time,
  end_date,
  end_time,
  // required field for all
  instagram,
  twitter,
  website,
  twn_url,
  // optional field for all
  custom_fields,
  single_trx,
  seat_map,
  // required field for all
  visibility,
  // optional data in other table (array, array, array, integer)
  available_days,
  daily_limit_times,
  daily_start_times,
  breakdowns,
  limit_reschedule,
  token,
}) => {
  try {
    // console.log("start - ", daily_limit_times, daily_start_times);
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/org/" + orgId + "/event/update",
      {
        // required field for all
        event_id,
        name,
        category,
        topics,
        logo,
        desc,
        snk,
        exe_type,
        location,
        province,
        city,
        // date and time is only required for reguler event type
        start_date,
        start_time,
        end_date,
        end_time,
        // required field for all
        instagram,
        twitter,
        website,
        twn_url,
        // optional field for all
        custom_fields,
        single_trx,
        seat_map,
        // required field for all
        visibility,
        // optional data in other table (array, array, array, integer)
        available_days,
        daily_limit_times,
        daily_start_times,
        breakdowns,
        limit_reschedule,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};
const createTickets = async ({
  orgId,
  eventId,
  ticketDatas = [
    {
      // basic required for all
      name: null,
      desc: null,
      type_price: null,
      max_purchase: null,
      // optional field for all
      seat_map: null,
      enable_seat_number: null,
      // required field for type event reguler
      quantity: null,
      start_date: null,
      end_date: null,
      // required field for type activities
      cover: null,
      daily_limit_qty: null,
      meet_link: null,
    },
  ],
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/ticket/create-bulk",
      {
        ticket_datas: ticketDatas,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(res);
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};
const setPublish = async ({ orgId, event_id, code_pub_state, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/change-state",
      {
        event_id,
        code_pub_state,
      },
      {
        headers: {
          Authorization: "Bearer" + token,
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};
const loadDetail = async ({ orgId, eventId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event?event_id=" +
        eventId,
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

const ConfirmContent = ({
  fnHandleOk = () => {},
  fnHandleCancel = () => {},
  content = "",
}) => {
  return (
    <div className={styles.AlertBox}>
      <BiQuestionMark
        style={{
          color: "#ca0c64",
        }}
      />
      <div>{content}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          gap: "10px",
        }}
      >
        <Button
          bgColor={"#fff"}
          textColor={"#ca0c64"}
          borderColor={"#ca0c64"}
          title={"Batal"}
          fnOnClick={fnHandleCancel}
        />
        <Button title={"Ok"} fnOnClick={fnHandleOk} />
      </div>
    </div>
  );
};

const EditorAddEvtAct = ({
  selectedOrgId,
  forEvtAct,
  setForEvtAct,
  eventId = null,
  isLogin,
  fnSetLogin,
  typeEditor = "inner",
}) => {
  const [isPopActive, setPopUpActive] = useState(false);
  const [titlePopUp, setPopUpTitle] = useState("");
  const [categories, setCategories] = useState(null);
  const [rawCategories, setRawCategories] = useState(null);
  const [topics, setTopics] = useState(null);
  const [cities, setCities] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [orgTypes, setOrgTypes] = useState(null);
  const [alert, setAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const [alertConfirm, setAlertConfirm] = useState({
    state: false,
    content: <></>,
    fnHandleOk: () => {},
    fnHandleCancel: () => {},
  });
  const [loading, setLoading] = useState(true);
  const [errorLoad, setErrorState] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [failedSetEdit, setEditState] = useState(true);
  const [pausedProcess, setPausedProcess] = useState(null);
  const [interuptProcess, setInteruptProcess] = useState(null);
  const [savedEventId, setSavedEvtId] = useState(null);
  const [orgId, setOrgId] = useState(selectedOrgId);
  const [defImgCover, setDefImgCover] = useState(null);
  const [firtsLoad, setFirstLoad] = useState(false);
  // const [actionInFrontType, setActionInFrontType] = useState(null);
  const [openOrganizerWindow, setOrganizerWindowState] = useState(false);
  const [finalDataFrontType, setFinalDataFrontType] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [startEvent, setStartEvent] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= State Control =======================
  const [blankTitle, setBlankTitle] = useState(false);
  const [blankStart, setBlankStart] = useState(false);
  const [blankEnd, setBlankEnd] = useState(false);
  const [blankVisibility, setBlankVs] = useState(false);
  const [blankCat, setBlankCat] = useState(false);
  const [blankTopic, setBlankTopic] = useState(false);
  const [blankCitu, setBlankCity] = useState(false);
  const [blankProv, setBlankProv] = useState(false);
  const [blankAddres, setBlankAddress] = useState(false);
  const [blankSnk, setBlankSnk] = useState(false);
  const [blankDesc, setBlankDesc] = useState(false);
  // =======================================================

  // ***************** form data ****************************
  const title = useRef();
  const inputCover = useRef();
  // const category = useRef();
  // const topic = useRef();
  // const city = useRef();
  // const province = useRef();
  // const visbibilty = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const delBtnImg = useRef();
  const availableDayTime = {
    Minggu: { day: useRef(), startTime: useRef(), endTime: useRef() },
    Senin: { day: useRef(), startTime: useRef(), endTime: useRef() },
    Selasa: { day: useRef(), startTime: useRef(), endTime: useRef() },
    Rabu: { day: useRef(), startTime: useRef(), endTime: useRef() },
    Kamis: { day: useRef(), startTime: useRef(), endTime: useRef() },
    "Jum'at": { day: useRef(), startTime: useRef(), endTime: useRef() },
    Sabtu: { day: useRef(), startTime: useRef(), endTime: useRef() },
  };
  const appData = useSelector((state) => state.appDataReducer);

  const [visbibilty, setDefVisbility] = useState(null);
  const [category, setDefCategory] = useState(null);
  const [topic, setDefTopic] = useState([]);
  const [city, setDefCity] = useState(null);
  const [province, setDefProvince] = useState(null);
  const [address, setAddress] = useState("");
  const [snk, setSnk] = useState("");
  const [desc, setDesc] = useState("");
  // ---- optional field -----
  const [breakdowns, setBreakdowns] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticketSettings, setTicketSettingsData] = useState({
    limitPchs: 5,
    singleTrxs: null,
    maxLimitRsc: -1,
    globalSeatMap: null,
    enableRefundReq: false,
  });
  const [orderForm, setOrderForm] = useState([]);

  // ---------------------------
  // ********************************************************

  const resetAlert = (timeout) => {
    setTimeout(() => {
      setAlert({
        state: false,
        type: "",
        content: "",
      });
    }, timeout);
  };

  const resetAllForm = () => {
    // basic fields (all)
    title.current.value = "";
    delBtnImg.current.click();
    setDefImgCover(null);
    setDefTopic(null);
    setDefVisbility(null);
    setDefCity(null);
    setDefProvince(null);
    setAddress("");
    setSnk("");
    setDesc("");

    if (
      forEvtAct === "Onsite Event" ||
      forEvtAct === "Online Event" ||
      forEvtAct === "Hybrid Event"
    ) {
      // only event fields
      endDate.current.value = "";
      startDate.current.value = "";
      setDefCategory(null);
    } else {
      // only activity fields
      Object.values(availableDayTime).forEach((ref) => {
        ref.day.current.checked = false;
        ref.endTime.current.value = "23:59";
        ref.startTime.current.value = "07:00";
      });
    }
  };

  const basicValidator = () => {
    if (
      // required for all (base useRef data)
      title.current.value === "" ||
      (!eventId && inputCover.current.files.length === 0) ||
      title.current.value.length > 200 ||
      // reuired for all (base useState)
      visbibilty === "" ||
      visbibilty === null ||
      topic.length === 0 ||
      city === "" ||
      city === null ||
      province === "" ||
      province === null ||
      address === "" ||
      snk === "" ||
      desc === "" ||
      (!orgId && typeEditor === "inner") ||
      // required for only event type (non activities data)
      ((forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event") &&
        (startDate.current.value === "" ||
          endDate.current.value === "" ||
          category === "" ||
          category === null))
    ) {
      let content = "Semua field kecuali ticket wajib diisi";
      if (title.current.value === "" || title.current.value.length > 200) {
        setBlankTitle(true);
      }
      if (title.current.value.length > 200) {
        content = "Maksimal judul 200 karakter termasuk spasi";
      }
      if (!eventId && inputCover.current.files.length === 0) {
        content = "Cover / Gambar Event / Aktivitas wajib diisi";
      }
      if (visbibilty === "" || visbibilty === null) {
        setBlankVs(true);
      }
      if (topic.length === 0) {
        setBlankTopic(true);
      }
      if (city === "" || city === null) {
        setBlankCity(true);
      }
      if (province === "" || province === null) {
        setBlankProv(true);
      }
      if (address === "") {
        setBlankAddress(true);
      }
      if (snk === "") {
        setBlankSnk(true);
      }
      if (desc === "") {
        setBlankDesc(true);
      }
      if (
        (forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event") &&
        startDate.current.value === ""
      ) {
        setBlankStart(true);
      }
      if (
        (forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event") &&
        endDate.current.value === ""
      ) {
        setBlankEnd(true);
      }
      if (
        (forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event") &&
        (category === "" || category === null)
      ) {
        setBlankCat(true);
      }

      let avlDays = Object.entries(availableDayTime)
        .filter(
          (avldt) =>
            avldt[1].day.current.checked === true &&
            avldt[1].startTime.current.value !== "" &&
            avldt[1].endTime.current.value !== ""
        )
        .map((avldt) => config.dayIndToEn[avldt[0]]);
      let avlDaysEnd = Object.entries(availableDayTime)
        .filter(
          (avldt) =>
            avldt[1].day.current.checked === true &&
            avldt[1].startTime.current.value !== "" &&
            avldt[1].endTime.current.value !== ""
        )
        .map((avldt) => avldt[1].endTime.current.value);
      let avlDayStart = Object.entries(availableDayTime)
        .filter(
          (avldt) =>
            avldt[1].day.current.checked === true &&
            avldt[1].startTime.current.value !== "" &&
            avldt[1].endTime.current.value !== ""
        )
        .map((avldt) => avldt[1].startTime.current.value);

      if (
        forEvtAct !== "Onsite Event" &&
        forEvtAct !== "Online Event" &&
        forEvtAct !== "Hybrid Event" &&
        (avlDays.length === 0 ||
          avlDaysEnd.length === 0 ||
          avlDayStart.length === 0)
      ) {
        setBlankStart(true);
        content = "Field waktu opsional wajib diisi !";
      }

      setAlert({
        state: true,
        type: "danger",
        content: content,
      });
      resetAlert(3000);
      return false;
    } else if (
      !eventId &&
      (forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event") &&
      (new Date(startDate.current.value) >= new Date(endDate.current.value) ||
        new Date() > new Date(startDate.current.value))
    ) {
      setBlankStart(true);
      setBlankEnd(true);
      setAlert({
        state: true,
        type: "danger",
        content:
          "Periksa input tanggal dan waktu. Pastikan tidak terbalik / melebihi tanggal saat ini",
      });
      resetAlert(3000);
      return false;
    } else {
      return true;
    }
  };

  const handleSavePubFrontType = (type) => {
    let start = null;
    let end = null;
    if (
      forEvtAct === "Online Event" ||
      forEvtAct === "Onsite Event" ||
      forEvtAct === "Hybrid Event"
    ) {
      start = startDate.current.value;
      end = endDate.current.value;
    }
    if (basicValidator()) {
      // setActionInFrontType(type);
      setOrganizerWindowState(true);
      setFinalDataFrontType({
        event: {
          orgId: orgId,
          // required field for all
          name: title.current.value,
          category:
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Online Event" ||
            forEvtAct === "Hybrid Event"
              ? category.value
              : forEvtAct,
          topics: topic.map((t) => t.value).join("~!^!~"),
          logo: inputCover.current.files[0],
          desc: desc,
          snk: snk,
          exe_type:
            forEvtAct === "Online Event"
              ? "online"
              : forEvtAct === "Hybrid Event"
              ? "hybrid"
              : "offline",
          location: address,
          province: province.value,
          city: city.value,
          // date and time is only required for reguler event type
          start_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[0]
              : null,
          start_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[1].split("Z")[0]
              : null,
          end_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().split("T")[0]
              : null,
          end_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().split("T")[1].split("Z")[0]
              : null,
          // required field for all
          instagram: "-",
          twitter: "-",
          website: "-",
          twn_url: "-",
          // optional field for all
          custom_fields: orderForm,
          single_trx: ticketSettings.singleTrxs ? 1 : 0,
          seat_map: ticketSettings.globalSeatMap,
          // required field for all
          visibility: visbibilty.value,
          // optional data in other table (array, array, array, integer)
          available_days: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => config.dayIndToEn[avldt[0]]),
          daily_limit_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].endTime.current.value),
          daily_start_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].startTime.current.value),
          breakdowns: breakdowns,
          limit_reschedule: ticketSettings.maxLimitRsc,
          is_publish: type === "save" ? 0 : 1,
          allow_refund: ticketSettings.enableRefundReq ? 1 : 0,
        },
        tickets: tickets.map((ticket) => ({
          name: ticket.name,
          desc: ticket.desc,
          type_price: ticket.type_price,
          price: ticket.price,
          max_purchase: ticketSettings.limitPchs,
          seat_map: ticket.seat_map,
          enable_seat_number: ticket.seat_number == false ? false : true,
          quantity: ticket.quantity,
          start_date: ticket.start_date,
          end_date: ticket.end_date,
          cover: ticket.cover,
          daily_limit_qty: ticket.limit_daily,
          meet_link: ticket.meet_link,
        })),
      });
    }
  };

  const handleSave = (interuptProcess, savedEventId) => {
    let start = null;
    let end = null;
    if (
      forEvtAct === "Online Event" ||
      forEvtAct === "Onsite Event" ||
      forEvtAct === "Hybrid Event"
    ) {
      start = startDate.current.value;
      end = endDate.current.value;
    }

    if (interuptProcess === "ticket") {
      if (basicValidator()) {
        setLoading(true);
        updateData({
          orgId: orgId,
          event_id: savedEventId,
          // required field for all
          name: title.current.value,
          category:
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Online Event" ||
            forEvtAct === "Hybrid Event"
              ? category.value
              : forEvtAct,
          topics: topic.map((t) => t.value).join("~!^!~"),
          logo: inputCover.current.files[0],
          desc: desc,
          snk: snk,
          exe_type:
            forEvtAct === "Online Event"
              ? "online"
              : forEvtAct === "Hybrid Event"
              ? "hybrid"
              : "offline",
          location: address,
          province: province.value,
          city: city.value,
          // date and time is only required for reguler event type
          start_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[0]
              : null,
          start_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[1].split("Z")[0]
              : null,
          end_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().split("T")[0]
              : null,
          end_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().toString().split("T")[1].split("Z")[0]
              : null,
          // required field for all
          instagram: "-",
          twitter: "-",
          website: "-",
          twn_url: "-",
          // optional field for all
          custom_fields: orderForm,
          single_trx: ticketSettings.singleTrxs ? 1 : 0,
          seat_map: ticketSettings.globalSeatMap,
          // required field for all
          visibility: visbibilty.value,
          // optional data in other table (array, array, array, integer)
          available_days: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => config.dayIndToEn[avldt[0]]),
          daily_limit_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].endTime.current.value),
          daily_start_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].startTime.current.value),
          breakdowns: breakdowns,
          limit_reschedule: ticketSettings.maxLimitRsc,
          token: appData.accessToken,
        }).then((res) => {
          if (res.status === 202) {
            if (tickets.length > 0) {
              createTickets({
                orgId: orgId,
                eventId: savedEventId,
                ticketDatas: tickets.map((ticket) => ({
                  name: ticket.name,
                  desc: ticket.desc,
                  type_price: ticket.type_price,
                  price: ticket.price,
                  max_purchase: ticketSettings.limitPchs,
                  seat_map: ticket.seat_map,
                  enable_seat_number:
                    ticket.seat_number == false ? false : true,
                  quantity: ticket.quantity,
                  start_date: ticket.start_date,
                  end_date: ticket.end_date,
                  cover: ticket.cover,
                  daily_limit_qty: ticket.limit_daily,
                  meet_link: ticket.meet_link,
                })),
                token: appData.accessToken,
              }).then((res) => {
                // console.log(res);
                if (res.status === 201) {
                  setAlert({
                    state: true,
                    type: "success",
                    content: "Data berhasil disimpan sebagai draft",
                  });
                  setInteruptProcess(null);
                  // resetAllForm();
                  localStorage.setItem("active-event", savedEventId);
                  dispatch(
                    getAppData({
                      accessToken: appData.accessToken,
                      activeOrg: localStorage.getItem("active-org"),
                      activeEvent: savedEventId,
                    })
                  );
                  setTimeout(() => {
                    navigate("/organizer/event/dashboard");
                  }, 50);
                } else if (res.status === 401) {
                  fnSetLogin(false);
                  setPausedProcess("ticket-1");
                } else {
                  setInteruptProcess("ticket");
                  setAlert({
                    state: true,
                    type: "danger",
                    content:
                      res.status === 500
                        ? "Terjadi masalah jaringan. Silahkan coba beberapa saat lagi."
                        : Object.values(res.data.data).reduce(
                            (current, acc) => {
                              return (
                                (current === "" ? current : current + ", ") +
                                (Array.isArray(acc) ? acc.join(", ") : acc)
                              );
                            },
                            ""
                          ),
                  });
                  setLoading(false);
                }
                resetAlert(3000);
              });
            } else {
              setAlert({
                state: true,
                type: "success",
                content: "Data berhasil disimpan sebagai draft",
              });
              // resetAllForm();
              localStorage.setItem("active-event", savedEventId);
              dispatch(
                getAppData({
                  accessToken: appData.accessToken,
                  activeOrg: localStorage.getItem("active-org"),
                  activeEvent: savedEventId,
                })
              );
              setTimeout(() => {
                navigate("/organizer/event/dashboard");
              }, 50);
            }
          } else if (res.status === 401) {
            fnSetLogin(false);
            setPausedProcess("create-event-1");
          } else {
            setLoading(false);
            setAlert({
              state: true,
              type: "danger",
              content:
                res.status === 500
                  ? "Terjadi masalah jaringan. Silahkan coba beberapa saat lagi."
                  : Object.values(res.data.data).reduce((current, acc) => {
                      return (
                        (current === "" ? current : current + ", ") +
                        (Array.isArray(acc) ? acc.join(", ") : acc)
                      );
                    }, ""),
            });
            resetAlert(3000);
          }
        });
      }
    } else {
      if (basicValidator()) {
        setLoading(true);
        addData({
          orgId: orgId,
          // required field for all
          name: title.current.value,
          category:
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Online Event" ||
            forEvtAct === "Hybrid Event"
              ? category.value
              : forEvtAct,
          topics: topic.map((t) => t.value).join("~!^!~"),
          logo: inputCover.current.files[0],
          desc: desc,
          snk: snk,
          exe_type:
            forEvtAct === "Online Event"
              ? "online"
              : forEvtAct === "Hybrid Event"
              ? "hybrid"
              : "offline",
          location: address,
          province: province.value,
          city: city.value,
          // date and time is only required for reguler event type
          start_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[0]
              : null,
          start_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[1].split("Z")[0]
              : null,
          end_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().split("T")[0]
              : null,
          end_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().split("T")[1].split("Z")[0]
              : null,
          // required field for all
          instagram: "-",
          twitter: "-",
          website: "-",
          twn_url: "-",
          // optional field for all
          custom_fields: orderForm,
          single_trx: ticketSettings.singleTrxs ? 1 : 0,
          seat_map: ticketSettings.globalSeatMap,
          // required field for all
          visibility: visbibilty.value,
          // optional data in other table (array, array, array, integer)
          available_days: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => config.dayIndToEn[avldt[0]]),
          daily_limit_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].endTime.current.value),
          daily_start_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].startTime.current.value),
          breakdowns: breakdowns,
          limit_reschedule: ticketSettings.maxLimitRsc,
          allow_refund: ticketSettings.enableRefundReq ? 1 : 0,
          is_publish: 0,
          token: appData.accessToken,
        }).then((res) => {
          if (res.status === 201) {
            let eventId = res.data.event.id;
            setSavedEvtId(res.data.event.id);
            if (tickets.length > 0) {
              createTickets({
                orgId: orgId,
                eventId: res.data.event.id,
                ticketDatas: tickets.map((ticket) => ({
                  name: ticket.name,
                  desc: ticket.desc,
                  type_price: ticket.type_price,
                  price: ticket.price,
                  max_purchase: ticketSettings.limitPchs,
                  seat_map: ticket.seat_map,
                  enable_seat_number:
                    ticket.seat_number == false ? false : true,
                  quantity: ticket.quantity,
                  start_date: ticket.start_date,
                  end_date: ticket.end_date,
                  cover: ticket.cover,
                  daily_limit_qty: ticket.limit_daily,
                  meet_link: ticket.meet_link,
                })),
                token: appData.accessToken,
              }).then((res) => {
                // console.log(res);
                if (res.status === 201) {
                  setAlert({
                    state: true,
                    type: "success",
                    content: "Data berhasil disimpan sebagai draft",
                  });
                  // resetAllForm();
                  localStorage.setItem("active-event", eventId);
                  dispatch(
                    getAppData({
                      accessToken: appData.accessToken,
                      activeOrg: localStorage.getItem("active-org"),
                      activeEvent: eventId,
                    })
                  );
                  setTimeout(() => {
                    navigate("/organizer/event/dashboard");
                  }, 50);
                } else if (res.status === 401) {
                  fnSetLogin(false);
                  setPausedProcess("ticket-1");
                } else {
                  setInteruptProcess("ticket");
                  setAlert({
                    state: true,
                    type: "danger",
                    content:
                      res.status === 500
                        ? "Terjadi masalah jaringan. Silahkan coba beberapa saat lagi."
                        : Object.values(res.data.data).reduce(
                            (current, acc) => {
                              return (
                                (current === "" ? current : current + ", ") +
                                (Array.isArray(acc) ? acc.join(", ") : acc)
                              );
                            },
                            ""
                          ),
                  });
                  setLoading(false);
                }
                resetAlert(3000);
              });
            } else {
              setAlert({
                state: true,
                type: "success",
                content: "Data berhasil disimpan sebagai draft",
              });
              // resetAllForm();
              localStorage.setItem("active-event", eventId);
              dispatch(
                getAppData({
                  accessToken: appData.accessToken,
                  activeOrg: localStorage.getItem("active-org"),
                  activeEvent: eventId,
                })
              );
              setTimeout(() => {
                navigate("/organizer/event/dashboard");
              }, 50);
            }
          } else if (res.status === 401) {
            fnSetLogin(false);
            setPausedProcess("create-event-1");
          } else {
            setLoading(false);
            setAlert({
              state: true,
              type: "danger",
              content:
                res.status === 500
                  ? "Terjadi masalah jaringan. Silahkan coba beberapa saat lagi."
                  : Object.values(res.data.data).reduce((current, acc) => {
                      return (
                        (current === "" ? current : current + ", ") +
                        (Array.isArray(acc) ? acc.join(", ") : acc)
                      );
                    }, ""),
            });
            resetAlert(3000);
          }
        });
      }
    }
  };

  const handlePublish = (interuptProcess, savedEventId) => {
    let start = null;
    let end = null;
    if (
      forEvtAct === "Online Event" ||
      forEvtAct === "Onsite Event" ||
      forEvtAct === "Hybrid Event"
    ) {
      start = startDate.current.value;
      end = endDate.current.value;
    }
    // console.log(forEvtAct);
    if (interuptProcess === "ticket") {
      if (basicValidator()) {
        setLoading(true);
        updateData({
          orgId: orgId,
          event_id: savedEventId,
          // required field for all
          name: title.current.value,
          category:
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Online Event" ||
            forEvtAct === "Hybrid Event"
              ? category.value
              : forEvtAct,
          topics: topic.map((t) => t.value).join("~!^!~"),
          logo: inputCover.current.files[0],
          desc: desc,
          snk: snk,
          exe_type:
            forEvtAct === "Online Event"
              ? "online"
              : forEvtAct === "Hybrid Event"
              ? "hybrid"
              : "offline",
          location: address,
          province: province.value,
          city: city.value,
          // date and time is only required for reguler event type
          start_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[0]
              : null,
          start_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[1].split("Z")[0]
              : null,
          end_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().split("T")[0]
              : null,
          end_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().split("T")[1].split("Z")[0]
              : null,
          // required field for all
          instagram: "-",
          twitter: "-",
          website: "-",
          twn_url: "-",
          // optional field for all
          custom_fields: orderForm,
          single_trx: ticketSettings.singleTrxs ? 1 : 0,
          seat_map: ticketSettings.globalSeatMap,
          // required field for all
          visibility: visbibilty.value,
          // optional data in other table (array, array, array, integer)
          available_days: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => config.dayIndToEn[avldt[0]]),
          daily_limit_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].endTime.current.value),
          daily_start_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].startTime.current.value),
          breakdowns: breakdowns,
          limit_reschedule: ticketSettings.maxLimitRsc,
          token: appData.accessToken,
        }).then((res) => {
          if (res.status === 202) {
            // interupt poin 0 = "ticket"
            if (tickets.length > 0) {
              createTickets({
                orgId: orgId,
                eventId: savedEventId,
                ticketDatas: tickets.map((ticket) => ({
                  name: ticket.name,
                  desc: ticket.desc,
                  type_price: ticket.type_price,
                  price: ticket.price,
                  max_purchase: ticketSettings.limitPchs,
                  seat_map: ticket.seat_map,
                  enable_seat_number:
                    ticket.seat_number == false ? false : true,
                  quantity: ticket.quantity,
                  start_date: ticket.start_date,
                  end_date: ticket.end_date,
                  cover: ticket.cover,
                  daily_limit_qty: ticket.limit_daily,
                  meet_link: ticket.meet_link,
                })),
                token: appData.accessToken,
              }).then((res) => {
                // console.log(res);
                if (res.status === 201) {
                  // interupt poin 1 = "publish"
                  setAlert({
                    state: true,
                    type: "success",
                    content: "Data berhasil disimpan sebagai draft",
                  });
                  setInteruptProcess(null);
                  // resetAllForm();
                  localStorage.setItem("active-event", savedEventId);
                  dispatch(
                    getAppData({
                      accessToken: appData.accessToken,
                      activeOrg: localStorage.getItem("active-org"),
                      activeEvent: savedEventId,
                    })
                  );
                  setTimeout(() => {
                    navigate("/organizer/event/dashboard");
                  }, 50);
                } else if (res.status === 401) {
                  fnSetLogin(false);
                  setPausedProcess("ticket-2");
                } else {
                  setInteruptProcess("ticket");
                  setAlert({
                    state: true,
                    type: "danger",
                    content:
                      res.status === 500
                        ? "Terjadi masalah jaringan. Silahkan coba beberapa saat lagi."
                        : Object.values(res.data.data).reduce(
                            (current, acc) => {
                              return (
                                (current === "" ? current : current + ", ") +
                                (Array.isArray(acc) ? acc.join(", ") : acc)
                              );
                            },
                            ""
                          ),
                  });
                  setLoading(false);
                }
                resetAlert(3000);
              });
            } else {
              setAlert({
                state: true,
                type: "success",
                content: "Data berhasil disimpan sebagai draft",
              });
              // resetAllForm();
              localStorage.setItem("active-event", savedEventId);
              dispatch(
                getAppData({
                  accessToken: appData.accessToken,
                  activeOrg: localStorage.getItem("active-org"),
                  activeEvent: savedEventId,
                })
              );
              setTimeout(() => {
                navigate("/organizer/event/dashboard");
              }, 50);
            }
          } else if (res.status === 401) {
            fnSetLogin(false);
            setPausedProcess("create-event-2");
          } else {
            setLoading(false);
            setAlert({
              state: true,
              type: "danger",
              content:
                res.status === 500
                  ? "Terjadi masalah jaringan. Silahkan coba beberapa saat lagi."
                  : Object.values(res.data.data).reduce((current, acc) => {
                      return (
                        (current === "" ? current : current + ", ") +
                        (Array.isArray(acc) ? acc.join(", ") : acc)
                      );
                    }, ""),
            });
            resetAlert(3000);
          }
        });
      }
    } else {
      if (basicValidator()) {
        setLoading(true);
        addData({
          orgId: orgId,
          // required field for all
          name: title.current.value,
          category:
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Online Event" ||
            forEvtAct === "Hybrid Event"
              ? category.value
              : forEvtAct,
          topics: topic.map((t) => t.value).join("~!^!~"),
          logo: inputCover.current.files[0],
          desc: desc,
          snk: snk,
          exe_type:
            forEvtAct === "Online Event"
              ? "online"
              : forEvtAct === "Hybrid Event"
              ? "hybrid"
              : "offline",
          location: address,
          province: province.value,
          city: city.value,
          // date and time is only required for reguler event type
          start_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[0]
              : null,
          start_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? start.toString().split("T")[1].split("Z")[0]
              : null,
          end_date:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().split("T")[0]
              : null,
          end_time:
            forEvtAct === "Online Event" ||
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Hybrid Event"
              ? end.toString().split("T")[1].split("Z")[0]
              : null,
          // required field for all
          instagram: "-",
          twitter: "-",
          website: "-",
          twn_url: "-",
          // optional field for all
          custom_fields: orderForm,
          single_trx: ticketSettings.singleTrxs ? 1 : 0,
          seat_map: ticketSettings.globalSeatMap,
          // required field for all
          visibility: visbibilty.value,
          // optional data in other table (array, array, array, integer)
          available_days: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => config.dayIndToEn[avldt[0]]),
          daily_limit_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].endTime.current.value),
          daily_start_times: Object.entries(availableDayTime)
            .filter(
              (avldt) =>
                avldt[1].day.current.checked === true &&
                avldt[1].startTime.current.value !== "" &&
                avldt[1].endTime.current.value !== ""
            )
            .map((avldt) => avldt[1].startTime.current.value),
          breakdowns: breakdowns,
          limit_reschedule: ticketSettings.maxLimitRsc,
          allow_refund: ticketSettings.enableRefundReq ? 1 : 0,
          is_publish: 1,
          token: appData.accessToken,
        }).then((res) => {
          if (res.status === 201) {
            let eventId = res.data.event.id;
            setSavedEvtId(res.data.event.id);
            if (tickets.length > 0) {
              // interupt poin 0 = "ticket"
              createTickets({
                orgId: orgId,
                eventId: res.data.event.id,
                ticketDatas: tickets.map((ticket) => ({
                  name: ticket.name,
                  desc: ticket.desc,
                  type_price: ticket.type_price,
                  price: ticket.price,
                  max_purchase: ticketSettings.limitPchs,
                  seat_map: ticket.seat_map,
                  enable_seat_number:
                    ticket.seat_number == false ? false : true,
                  quantity: ticket.quantity,
                  start_date: ticket.start_date,
                  end_date: ticket.end_date,
                  cover: ticket.cover,
                  daily_limit_qty: ticket.limit_daily,
                  meet_link: ticket.meet_link,
                })),
                token: appData.accessToken,
              }).then((res) => {
                // console.log(res);
                if (res.status === 201) {
                  setAlert({
                    state: true,
                    type: "success",
                    content: "Data berhasil disimpan dan dipublish",
                  });
                  // resetAllForm();
                  localStorage.setItem("active-event", eventId);
                  dispatch(
                    getAppData({
                      accessToken: appData.accessToken,
                      activeOrg: localStorage.getItem("active-org"),
                      activeEvent: eventId,
                    })
                  );
                  setTimeout(() => {
                    navigate("/organizer/event/dashboard");
                  }, 50);
                } else if (res.status === 401) {
                  fnSetLogin(false);
                  setPausedProcess("ticket-2");
                } else {
                  setInteruptProcess("ticket");
                  setAlert({
                    state: true,
                    type: "danger",
                    content:
                      res.status === 500
                        ? "Terjadi masalah jaringan. Silahkan coba beberapa saat lagi."
                        : Object.values(res.data.data).reduce(
                            (current, acc) => {
                              return (
                                (current === "" ? current : current + ", ") +
                                (Array.isArray(acc) ? acc.join(", ") : acc)
                              );
                            },
                            ""
                          ),
                  });
                  setLoading(false);
                }
                resetAlert(3000);
              });
            } else {
              setAlert({
                state: true,
                type: "success",
                content: "Data berhasil disimpan dan dipublish",
              });
              // resetAllForm();
              localStorage.setItem("active-event", eventId);
              dispatch(
                getAppData({
                  accessToken: appData.accessToken,
                  activeOrg: localStorage.getItem("active-org"),
                  activeEvent: eventId,
                })
              );
              setTimeout(() => {
                navigate("/organizer/event/dashboard");
              }, 50);
            }
          } else if (res.status === 401) {
            fnSetLogin(false);
            setPausedProcess("create-event-2");
          } else {
            setLoading(false);
            setAlert({
              state: true,
              type: "danger",
              content:
                res.status === 500
                  ? "Terjadi masalah jaringan. Silahkan coba beberapa saat lagi."
                  : Object.values(res.data.data).reduce((current, acc) => {
                      return (
                        (current === "" ? current : current + ", ") +
                        (Array.isArray(acc) ? acc.join(", ") : acc)
                      );
                    }, ""),
            });
            resetAlert(3000);
          }
        });
      }
    }
  };

  const handleUpdate = () => {
    let start = null;
    let end = null;
    if (
      forEvtAct === "Online Event" ||
      forEvtAct === "Onsite Event" ||
      forEvtAct === "Hybrid Event"
    ) {
      start = startDate.current.value;
      end = endDate.current.value;
    }
    // console.log(forEvtAct);
    if (basicValidator()) {
      setLoading(true);
      updateData({
        orgId: orgId,
        event_id: eventId,
        // required field for all
        name: title.current.value,
        category:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? category.value
            : forEvtAct,
        topics: topic.map((t) => t.value).join("~!^!~"),
        logo:
          inputCover.current.files.length > 0
            ? inputCover.current.files[0]
            : null,
        desc: desc,
        snk: snk,
        exe_type:
          forEvtAct === "Online Event"
            ? "online"
            : forEvtAct === "Hybrid Event"
            ? "hybrid"
            : "offline",
        location: address,
        province: province.value,
        city: city.value,
        // date and time is only required for reguler event type
        start_date:
          forEvtAct === "Online Event" ||
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Hybrid Event"
            ? start.toString().split("T")[0]
            : null,
        start_time:
          forEvtAct === "Online Event" ||
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Hybrid Event"
            ? start.toString().split("T")[1].split("Z")[0]
            : null,
        end_date:
          forEvtAct === "Online Event" ||
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Hybrid Event"
            ? end.toString().split("T")[0]
            : null,
        end_time:
          forEvtAct === "Online Event" ||
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Hybrid Event"
            ? end.toString().split("T")[1].split("Z")[0]
            : null,
        // required field for all
        instagram: "-",
        twitter: "-",
        website: "-",
        twn_url: "-",
        // optional field for all
        custom_fields: orderForm,
        single_trx: ticketSettings.singleTrxs ? 1 : 0,
        seat_map: ticketSettings.globalSeatMap,
        // required field for all
        visibility: visbibilty.value,
        // optional data in other table (array, array, array, integer)
        available_days: Object.entries(availableDayTime)
          .filter(
            (avldt) =>
              avldt[1].day.current.checked === true &&
              avldt[1].startTime.current.value !== "" &&
              avldt[1].endTime.current.value !== ""
          )
          .map((avldt) => config.dayIndToEn[avldt[0]]),
        daily_limit_times: Object.entries(availableDayTime)
          .filter(
            (avldt) =>
              avldt[1].day.current.checked === true &&
              avldt[1].startTime.current.value !== "" &&
              avldt[1].endTime.current.value !== ""
          )
          .map((avldt) => avldt[1].endTime.current.value),
        daily_start_times: Object.entries(availableDayTime)
          .filter(
            (avldt) =>
              avldt[1].day.current.checked === true &&
              avldt[1].startTime.current.value !== "" &&
              avldt[1].endTime.current.value !== ""
          )
          .map((avldt) => avldt[1].startTime.current.value),
        breakdowns: breakdowns,
        limit_reschedule: ticketSettings.maxLimitRsc,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 202) {
          setAlert({
            state: true,
            type: "success",
            content: "Data berhasil disimpan dan dipublish",
          });
          // resetAllForm();
          window.location.reload();
        } else if (res.status === 401) {
          fnSetLogin(false);
          setPausedProcess("update-event");
        } else {
          setAlert({
            state: true,
            type: "danger",
            content:
              res.status === 500
                ? "Terjadi masalah jaringan. Silahkan coba beberapa saat lagi."
                : Object.values(res.data.data).reduce((current, acc) => {
                    return (
                      (current === "" ? current : current + ", ") +
                      (Array.isArray(acc) ? acc.join(", ") : acc)
                    );
                  }, ""),
          });
          setLoading(false);
        }
        resetAlert(3000);
      });
    }
  };

  const selectedSTartEvent = (e) => {
    setStartEvent(e.target.value);
    if (new Date(e.target.value) > new Date(endDate.current.value)) {
      endDate.current.value = "";
    }
  };

  // const handleSetPublish = (eventId) => {
  // 	setLoading(true);
  // 	setInteruptProcess(null);
  // 	setPublish({
  // 		orgId: orgId,
  // 		event_id: eventId,
  // 		code_pub_state: 2,
  // 	}).then((res) => {
  // 		if (res.status === 202) {
  // 			setAlert({
  // 				state: true,
  // 				type: "success",
  // 				content: "Data event / activities berhasil di publish",
  // 			});
  // 		} else if (res.status === 401) {
  // 			fnSetLogin(false);
  // 			setPausedProcess("set-publish");
  // 		} else {
  // 			setInteruptProcess("set-publish");
  // 		}
  // 		setLoading(false);
  // 		resetAlert(3000);
  // 	});
  // };

  useEffect(() => {
    // console.log("Use effect");
    if (!categories && !topics && !provinces && !orgTypes) {
      setLoading(true);
      loadCategories().then((res) => {
        if (res.status === 200) {
          setCategories(
            res.data.categories
              .filter(
                (cat) =>
                  cat.name !== "Attraction" &&
                  cat.name !== "Daily Activities" &&
                  cat.name !== "Tour Travel (recurring)"
              )
              .map((data) => ({
                label: data.name,
                value: data.name,
              }))
          );
          setRawCategories(res.data.categories);
        } else {
          setErrorState(true);
        }
      });
      loadTopics({
        activity:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? false
            : true,
      }).then((res) => {
        if (res.status === 200) {
          setTopics(
            forEvtAct === "Onsite Event" ||
              forEvtAct === "Online Event" ||
              forEvtAct === "Hybrid Event"
              ? res.data.topics.map((data) => ({
                  label: data.name,
                  value: data.name,
                }))
              : res.data.topics[forEvtAct].map((data) => ({
                  label: data.name,
                  value: data.name,
                }))
          );
        } else {
          setErrorState(true);
        }
      });
      loadOrgTypes().then((res) => {
        if (res.status === 200) {
          setOrgTypes(res.data.org_types);
        } else {
          setErrorState(true);
        }
      });
      setProvinces(
        config.cities.map((prov) => ({
          label: prov.provinsi,
          value: prov.provinsi,
        }))
      );
    }
    if (eventId !== null && eventData === null) {
      loadDetail({
        eventId: eventId,
        orgId: orgId,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 200) {
          setEventData(res.data);
        } else if (res.status === 401) {
          fnSetLogin(false);
        } else {
          setErrorState(true);
        }
      });
    }
  });

  useEffect(() => {
    if (categories && topics && provinces && orgTypes) {
      setLoading(false);
    }
  }, [categories, topics, provinces, orgTypes]);

  useEffect(() => {
    if (eventData && failedSetEdit) {
      try {
        setEditState(false);
        // execute to set data;
        title.current.value = eventData.event.name;
        setDefImgCover(
          process.env.REACT_APP_BACKEND_URL + eventData.event.logo
        );
        setDefTopic(
          eventData.event.topics
            .split("~!^!~")
            .filter((topic) => topic !== "")
            .map((topic) => ({ label: topic, value: topic }))
        );
        setDefVisbility({
          label: eventData.event.visibility === 0 ? "Privat" : "Publik",
          value: eventData.event.visibility,
        });
        setDefCity({
          label: eventData.event.city,
          value: eventData.event.city,
        });
        setDefProvince({
          label: eventData.event.province,
          value: eventData.event.province,
        });
        setAddress(eventData.event.location);
        setSnk(eventData.event.snk);
        setDesc(eventData.event.desc);
        // console.log(eventData.event);
        if (
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
        ) {
          // only event fields
          startDate.current.value =
            eventData.event.start_date + "T" + eventData.event.start_time;
          endDate.current.value =
            eventData.event.end_date + "T" + eventData.event.end_time;
          setDefCategory({
            label: eventData.event.category,
            value: eventData.event.category,
          });
        } else {
          // only activity fields

          Object.entries(availableDayTime).forEach((ref, index) => {
            eventData.available_days.forEach((avldt) => {
              if (config.dayEnToInd[avldt.day] === ref[0]) {
                ref[1].day.current.checked = true;
                ref[1].startTime.current.value = avldt.start_time;
                ref[1].endTime.current.value = avldt.max_limit_time;
              }
            });
          });
        }
        setTicketSettingsData({
          limitPchs: null,
          singleTrxs: eventData.event.single_trx,
          maxLimitRsc: eventData.available_reschedule
            ? eventData.available_reschedule.limit_time
            : null,
          globalSeatMap: null,
          enableRefundReq: eventData.event.allow_refund,
        });
        setOrderForm(eventData.event.custom_fields);
      } catch (error) {
        // console.log(error);
        setEditState(true);
      }
    }
  }, [eventData, failedSetEdit]);

  useEffect(() => {
    if (isLogin && pausedProcess) {
      if (pausedProcess === "create-event-1") {
        handleSave(interuptProcess ? interuptProcess : null, savedEventId);
      } else if (pausedProcess === "create-event-2") {
        handlePublish(interuptProcess ? interuptProcess : null, savedEventId);
      } else if (pausedProcess === "ticket-1") {
        handleSave("ticket", savedEventId);
      } else if (pausedProcess === "ticket-2") {
        handlePublish("ticket", savedEventId);
      } else if (pausedProcess === "update-event") {
        handleUpdate();
      }
      // else if (pausedProcess === "set-publish") {
      // 	handleSetPublish(savedEventId);
      // }
      setPausedProcess(null);
    }
  }, [isLogin, pausedProcess, savedEventId]);

  useEffect(() => {
    if (province) {
      setCities(
        config.cities
          .filter((data) => data.provinsi === province.value)[0]
          .kota.map((city) => ({ label: city, value: city }))
      );
      if (city) {
        setDefCity(
          config.cities
            .filter((data) => data.provinsi === province.value)[0]
            .kota.indexOf(city.value) === -1
            ? null
            : city
        );
      }
    }
  }, [province]);

  useEffect(() => {
    if (!firtsLoad) {
      window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
      setFirstLoad(true);
    }
  }, [firtsLoad]);

  useEffect(() => {
    if (openOrganizerWindow && typeEditor != "inner") {
      window.scrollTo(0, 0);
    }
  }, [openOrganizerWindow]);

  return (
    <>
      {openOrganizerWindow && typeEditor != "inner" ? (
        <div>
          <AddSelectOrgFront
            isLogin={isLogin}
            fnSetLogin={fnSetLogin}
            eventData={finalDataFrontType}
            fnCreateEvent={addData}
            fnUpdateEvent={updateData}
            fnCreateTickets={createTickets}
            categories={rawCategories}
            orgTypes={orgTypes}
          />
        </div>
      ) : (
        <div></div>
      )}
      {/* <div
        className={`${
          openOrganizerWindow && typeEditor != "inner" ? "" : "d-none"
        }`}
      >
        <AddSelectOrgFront
          isLogin={isLogin}
          fnSetLogin={fnSetLogin}
          eventData={finalDataFrontType}
          fnCreateEvent={addData}
          fnUpdateEvent={updateData}
          fnCreateTickets={createTickets}
        />
      </div> */}
      <div
        className={`${
          openOrganizerWindow && typeEditor != "inner" ? "d-none" : ""
        }`}
      >
        <PopUpTicket
          isPopActive={isPopActive}
          titlePopUp={titlePopUp}
          setPopUpActive={setPopUpActive}
          tickets={tickets}
          ticketSetup={ticketSettings}
          orderForm={orderForm}
          fnSetOrderForm={setOrderForm}
          forEvtAct={forEvtAct}
          evtCategory={category}
          endEvent={endDate.current ? endDate.current.value : null}
        />
        <PopUp2
          isActive={isPopActive && titlePopUp !== "Tickets"}
          setActiveFn={setPopUpActive}
          titleHeader={
            <h5
              style={{
                marginLeft: "unset",
                marginRight: "auto",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              {titlePopUp}
            </h5>
          }
          closeBtnTitle={"Simpan"}
          content={
            <div className={styles.PopUpContent}>
              <div
                className={`${
                  titlePopUp === "Kategori dan Topik" ? "" : "d-none"
                }`}
                style={{ gap: 10 }}
              >
                <div>
                  <label
                    className={styles.BasicLabel}
                    style={{ color: blankCat ? "red" : "#000" }}
                  >
                    Kategori *
                  </label>
                  {forEvtAct === "Onsite Event" ||
                  forEvtAct === "Online Event" ||
                  forEvtAct === "Hybrid Event" ? (
                    <Select
                      options={categories ? categories : []}
                      className={`basic-multi-select ${
                        blankCat ? styles.DangerInput : ""
                      }`}
                      placeholder="Pilih Kaegori Eventmu"
                      onMenuOpen={() => {
                        setBlankCat(false);
                      }}
                      styles={{
                        option: (basicStyle, state) => ({
                          ...basicStyle,
                          backgroundColor: state.isFocused
                            ? "#fecadf"
                            : "white",
                        }),
                        control: (basicStyle, state) => ({
                          ...basicStyle,
                          // width: "100%",
                          // textAlign: "left",
                          // margin: "unset",
                          display: "flex",
                          flexDirection: "row",
                        }),
                        container: (basicStyle, state) => ({
                          ...basicStyle,
                          width: "100%",
                          margin: "unset",
                          borderRadius: "8px",
                        }),
                      }}
                      // ref={category}
                      onChange={(e) => {
                        setDefCategory(e);
                      }}
                      value={category}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <label
                    className={styles.BasicLabel}
                    style={{ color: blankTopic ? "red" : "#000" }}
                  >
                    Topik *
                  </label>
                  <Select
                    isMulti={true}
                    options={topics ? topics : []}
                    isOptionDisabled={() => topic.length >= 3}
                    className={`basic-multi-select ${
                      blankTopic ? styles.DangerInput : ""
                    }`}
                    onMenuOpen={() => {
                      setBlankTopic(false);
                    }}
                    placeholder="Pilih Topik / Sub Kategori"
                    styles={{
                      option: (basicStyle, state) => ({
                        ...basicStyle,
                        backgroundColor: state.isFocused ? "#fecadf" : "white",
                      }),
                      control: (basicStyle, state) => ({
                        ...basicStyle,
                        // width: "100%",
                        // textAlign: "left",
                        // margin: "unset",
                        display: "flex",
                        flexDirection: "row",
                      }),
                      container: (basicStyle, state) => ({
                        ...basicStyle,
                        width: "100%",
                        margin: "unset",
                        borderRadius: "8px",
                      }),
                    }}
                    onChange={(e) => {
                      setDefTopic(e);
                    }}
                    value={topic}
                  />
                </div>
              </div>

              <div
                className={`${
                  titlePopUp === "Syarat dan Ketentuan" ? "" : "d-none"
                }`}
              >
                <div className={blankSnk ? styles.DangerInput : ""}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={snk}
                    onChange={(event, editor) => {
                      setSnk(editor.getData());
                      setBlankSnk(false);
                    }}
                    config={{
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "blockQuote",
                      ],
                      heading: {
                        options: [
                          {
                            model: "paragraph",
                            title: "Paragraph",
                            class: "ck-heading_paragraph",
                          },
                          {
                            model: "heading1",
                            view: "h1",
                            title: "Heading 1",
                            class: "ck-heading_heading1",
                          },
                          {
                            model: "heading2",
                            view: "h2",
                            title: "Heading 2",
                            class: "ck-heading_heading2",
                          },
                        ],
                      },
                    }}
                  />
                </div>
              </div>

              <div
                className={`${titlePopUp === "Lokasi Event" ? "" : "d-none"}`}
                style={{ gap: 10 }}
              >
                <div>
                  <label
                    className={styles.BasicLabel}
                    htmlFor="province"
                    style={{ color: blankProv ? "red" : "#000" }}
                  >
                    Provinsi *
                  </label>
                  <Select
                    options={provinces ? provinces : []}
                    className={`basic-multi-select ${
                      blankProv ? styles.DangerInput : ""
                    }`}
                    placeholder={"Provinsi"}
                    styles={{
                      option: (basicStyle, state) => ({
                        ...basicStyle,
                        backgroundColor: state.isFocused ? "#fecadf" : "white",
                      }),
                      control: (basicStyle, state) => ({
                        ...basicStyle,
                        // width: "100%",
                        // textAlign: "left",
                        // margin: "unset",
                        display: "flex",
                        flexDirection: "row",
                      }),
                      container: (basicStyle, state) => ({
                        ...basicStyle,
                        width: "100%",
                        margin: "unset",
                        borderRadius: "8px",
                      }),
                    }}
                    onChange={(e) => {
                      setDefProvince(e);
                    }}
                    onMenuOpen={() => {
                      setBlankProv(false);
                    }}
                    value={province}
                  />
                </div>
                <div>
                  <label
                    className={styles.BasicLabel}
                    htmlFor="city"
                    style={{ color: blankCitu ? "red" : "#000" }}
                  >
                    Kota *
                  </label>
                  <Select
                    options={cities ? cities : []}
                    className={`basic-multi-select ${
                      blankCitu ? styles.DangerInput : ""
                    }`}
                    placeholder={"Kota pelaksanaan"}
                    styles={{
                      option: (basicStyle, state) => ({
                        ...basicStyle,
                        backgroundColor: state.isFocused ? "#fecadf" : "white",
                      }),
                      control: (basicStyle, state) => ({
                        ...basicStyle,
                        // width: "100%",
                        // textAlign: "left",
                        // margin: "unset",
                        display: "flex",
                        flexDirection: "row",
                      }),
                      container: (basicStyle, state) => ({
                        ...basicStyle,
                        width: "100%",
                        margin: "unset",
                        borderRadius: "8px",
                      }),
                    }}
                    onChange={(e) => {
                      setDefCity(e);
                    }}
                    onMenuOpen={() => {
                      setBlankCity(false);
                    }}
                    value={city}
                  />
                </div>
                <div>
                  <label
                    className={styles.BasicLabel}
                    htmlFor="address"
                    style={{ color: blankAddres ? "red" : "#000" }}
                  >
                    Alamat Lengkap *
                  </label>
                  <div className={blankAddres ? styles.DangerInput : ""}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={address}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "blockQuote",
                        ],
                        heading: {
                          options: [
                            {
                              model: "paragraph",
                              title: "Paragraph",
                              class: "ck-heading_paragraph",
                            },
                            {
                              model: "heading1",
                              view: "h1",
                              title: "Heading 1",
                              class: "ck-heading_heading1",
                            },
                            {
                              model: "heading2",
                              view: "h2",
                              title: "Heading 2",
                              class: "ck-heading_heading2",
                            },
                          ],
                        },
                      }}
                      onChange={(e, editor) => {
                        setAddress(editor.getData());
                        setBlankAddress(false);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${
                  titlePopUp === "Waktu Operasional" ? "" : "d-none"
                }`}
                style={{ gap: 10 }}
              >
                <div
                  className={styles.Info}
                  style={{ margin: 0, color: "red" }}
                >
                  <div className={styles2.CmdField}>
                    <BiInfoCircle />
                  </div>

                  <p>Gunakan standar zona Waktu Indonesia Barat (WIB)</p>
                </div>
                <div className={styles.AvailableDays}>
                  {Object.entries(availableDayTime).map((refData) => (
                    <div className={styles.AvailableDaysCol}>
                      <InputCheckRadio
                        refData={refData[1].day}
                        type={"checkbox"}
                        label={refData[0]}
                        onChange={() => {
                          setBlankStart(false);
                        }}
                      />
                      <InputForm
                        style={{ marginLeft: "auto" }}
                        type={"time"}
                        refData={refData[1].startTime}
                        value={"07:00"}
                      />{" "}
                      -{" "}
                      <InputForm
                        type={"time"}
                        refData={refData[1].endTime}
                        value={"23:59"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        />
        {/* <PopUp
				isActive={interuptProcess === "set-publish"}
				title=""
				width="40%"
				content={
					<div className={styles.ErrorPopUp}>
						<BiError />
						Data berhasil disimpan sebagai draft. Namun terjadi masalah saat
						mempublish event / activity mu. Klik "Ulangi" untuk melanjutkan
						<div className={styles.ErrorPopUpFooter}>
							<Button
								title={"Ulangi"}
								center
								fnOnClick={() => {
									handleSetPublish(savedEventId);
								}}
							/>
							<Button
								title={"Batal"}
								center
								bgColor={"white"}
								textColor={"black"}
								borderColor={"black"}
								fnOnClick={() => {
									window.location.href =
										forEvtAct === "Onsite Event" ||
										forEvtAct === "Online Event" ||
										forEvtAct === "Hybrid Event"
											? "/organizer/events"
											: "/organizer/activities";
								}}
							/>
						</div>
					</div>
				}
			/> */}
        <PopUp
          isActive={alert.state || alertConfirm.state}
          title=""
          content={
            alertConfirm.state ? (
              <ConfirmContent
                fnHandleOk={alertConfirm.fnHandleOk}
                fnHandleCancel={alertConfirm.fnHandleCancel}
                content={alertConfirm.content}
              />
            ) : (
              <div className={styles.AlertBox}>
                <BiError
                  style={{
                    color:
                      alert.type === "danger"
                        ? "#ca0c64"
                        : alert.type === "warning"
                        ? "yellow"
                        : "green",
                  }}
                />
                <div>{alert.content}</div>
                <Button
                  title={"Ok"}
                  fnOnClick={() => {
                    setAlert({
                      state: false,
                      type: "danger",
                      content: "",
                    });
                  }}
                />
              </div>
            )
          }
        />
        <div
          className={`${loading ? "" : "d-none"}`}
          style={{ marginTop: "100px" }}
        >
          <Loading />
        </div>
        <div className={`${errorLoad ? "" : "d-none"}`}>
          <ErrorPage />
        </div>
        <form className={`${loading || errorLoad ? "d-none" : ""}`}>
          <div className={styles.DFlexRow}>
            <BiArrowBack
              onClick={() => {
                setForEvtAct(null);
              }}
              style={{ cursor: "pointer" }}
            />
            <h3
              style={{ marginLeft: "20px", cursor: "pointer" }}
              onClick={() => {
                setForEvtAct(null);
              }}
            >
              {forEvtAct === "Onsite Event" ||
              forEvtAct === "Online Event" ||
              forEvtAct === "Hybrid Event"
                ? eventId
                  ? "Edit Event"
                  : "Buat Event"
                : eventId
                ? "Edit Aktivitas"
                : "Buat Aktivitas"}
            </h3>
            <div className={styles.BtnBox}>
              {eventId ? (
                <Button
                  bgColor={"#fff"}
                  borderColor={"#eaeaea"}
                  textColor={"#000"}
                  style={{ width: "unset" }}
                  title={
                    <div className={styles.BtnTitle}>
                      <div className={styles.Bold}>Simpan</div>
                    </div>
                  }
                  fnOnClick={handleUpdate}
                />
              ) : (
                <>
                  <Button
                    bgColor={"#fff"}
                    borderColor={"#eaeaea"}
                    textColor={"#000"}
                    style={{ width: "unset" }}
                    title={
                      <div className={styles.BtnTitle}>
                        <div className={styles.Bold}>Simpan</div>&nbsp;(Draft)
                      </div>
                    }
                    fnOnClick={() => {
                      if (typeEditor == "inner") {
                        handleSave(interuptProcess, savedEventId);
                      } else {
                        handleSavePubFrontType("save");
                      }
                    }}
                  />
                  <Button
                    title={"Publish"}
                    fnOnClick={() => {
                      if (typeEditor == "inner") {
                        handlePublish(interuptProcess, savedEventId);
                      } else {
                        handleSavePubFrontType("publish");
                      }
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div
            className={styles.Info}
            style={{ marginTop: "25px", marginLeft: "0px", marginRight: "0px" }}
          >
            <div className={styles2.CmdField}>
              <BiInfoCircle />
            </div>

            <p>(*) Semua yang bertanda bintang wajib diisi ya... !!!</p>
          </div>
          <div className={styles.Split} style={{ marginTop: "10px" }}>
            <div className={styles.ColSplit2}>
              <InputImage4
                style={{
                  aspectRatio: "5/3",
                  height: "unset",
                  backgroundColor: "#fff",
                }}
                textMsg={
                  <div>
                    <div className={styles.TitleInputImage}>
                      Add Cover Picture *
                    </div>
                    <div className={styles.SubTitleInputImage}>
                      5:3 or Max. 1500 x 900 px PNG, JPG Max File 2 MB
                    </div>
                  </div>
                }
                refData={inputCover}
                refDelBtn={delBtnImg}
                defaultFile={defImgCover}
                fnSetAlert={setAlert}
              />
              {windowWidth <= 772 ? (
                <div
                  className={`${styles.TitleInputBox} ${
                    blankTitle ? styles.DangerInput : ""
                  }`}
                  style={{ marginTop: "20px", border: "1px solid red" }}
                >
                  <InputForm
                    type="text"
                    placeholder={
                      forEvtAct === "Onsite Event" ||
                      forEvtAct === "Online Event" ||
                      forEvtAct === "Hybrid Event"
                        ? "Judul Event *"
                        : "Judul Aktivitas *"
                    }
                    className={`${styles.FormTitle} ${
                      blankTitle ? "placeholder-red" : ""
                    }`}
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      backgroundColor: "#fff0",
                    }}
                    refData={title}
                    onInput={() => {
                      setBlankTitle(false);
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
              <FieldBox
                className={[blankCat || blankTopic ? styles.DangerInput : ""]}
                iconSvg={<BiFilter />}
                label={
                  forEvtAct === "Onsite Event" ||
                  forEvtAct === "Online Event" ||
                  forEvtAct === "Hybrid Event"
                    ? "Kategori dan Topik *"
                    : "Topic/ Sub Kategori *"
                }
                style={{ marginTop: "10px", backgroundColor: "#fff" }}
              >
                {forEvtAct === "Onsite Event" ||
                forEvtAct === "Online Event" ||
                forEvtAct === "Hybrid Event" ? (
                  <div
                    className={styles.CmdField2}
                    onClick={() => {
                      setPopUpActive(true);
                      setPopUpTitle("Kategori dan Topik");
                    }}
                  >
                    {category && topic ? "Lihat & Edit" : "Tambahkan"}
                  </div>
                ) : (
                  <Select
                    options={topics ? topics : []}
                    className="basic-multi-select"
                    isMulti
                    isOptionDisabled={() => topic.length >= 3}
                    styles={{
                      option: (basicStyle, state) => ({
                        ...basicStyle,
                        backgroundColor: state.isFocused ? "#fecadf" : "white",
                      }),
                      control: (basicStyle, state) => ({
                        ...basicStyle,
                        // width: "100%",
                        // textAlign: "left",
                        // margin: "unset",
                        display: "flex",
                        flexDirection: "row",
                        borderStyle: "none!important",
                        boxShadow: "none!important",
                        textAlign: "end",
                      }),
                      container: (basicStyle, state) => ({
                        ...basicStyle,
                        width: "100%",
                        margin: "unset",
                        borderRadius: "8px",
                      }),
                    }}
                    onMenuOpen={() => setBlankTopic(false)}
                    onChange={(e) => {
                      setDefTopic(e);
                    }}
                    value={topic}
                  />
                )}
              </FieldBox>
              <FieldBox
                iconSvg={<BiBookOpen />}
                label={"Syarat & Ketentuan *"}
                style={{ backgroundColor: "#fff" }}
                className={blankSnk ? styles.DangerInput : ""}
              >
                <div
                  className={styles.CmdField2}
                  onClick={() => {
                    setPopUpActive(true);
                    setPopUpTitle("Syarat dan Ketentuan");
                  }}
                >
                  {snk === "" ? "Tambahkan" : "Lihat & Edit"}
                </div>
              </FieldBox>
            </div>
            <div className={styles.ColSplit2}>
              {windowWidth > 772 ? (
                <div
                  className={`${styles.TitleInputBox} ${
                    blankTitle ? styles.DangerInput : ""
                  }`}
                >
                  <InputForm
                    type="text"
                    placeholder={
                      forEvtAct === "Onsite Event" ||
                      forEvtAct === "Online Event" ||
                      forEvtAct === "Hybrid Event"
                        ? "Judul Event *"
                        : "Judul Aktivitas *"
                    }
                    className={`${styles.FormTitle} ${
                      blankTitle ? "placeholder-red" : ""
                    }`}
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      backgroundColor: "#fff0",
                    }}
                    refData={title}
                    onInput={() => {
                      setBlankTitle(false);
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
              {forEvtAct === "Onsite Event" ||
              forEvtAct === "Online Event" ||
              forEvtAct === "Hybrid Event" ? (
                <div
                  className={`${styles.DateGroup} ${
                    blankStart || blankEnd ? styles.DangerInput : ""
                  }`}
                >
                  <div
                    className={styles.Info}
                    style={{
                      marginTop: "10px",
                      marginBottom: "0",
                      color: "red",
                    }}
                  >
                    <div className={styles2.CmdField}>
                      <BiInfoCircle />
                    </div>

                    <p>Gunakan standar zona Waktu Indonesia Barat (WIB)</p>
                  </div>
                  <InputLabeled
                    type={"datetime-local"}
                    id={"start_date"}
                    placeholder={"Pilih tanggal & waktu"}
                    iconSvg={<BiCalendar />}
                    label={
                      <p
                        className={styles.TextSecondary}
                        style={blankStart || blankEnd ? { color: "red" } : {}}
                      >
                        Mulai Event *
                      </p>
                    }
                    style={{ boxShadow: "none", outline: "none" }}
                    refData={startDate}
                    fnOnChange={selectedSTartEvent}
                    fnOnInput={() => {
                      setBlankStart(false);
                    }}
                    min={
                      new Date(
                        new Date(new Date().setSeconds(0, 0)) -
                          new Date(
                            new Date().setSeconds(0, 0)
                          ).getTimezoneOffset() *
                            1000 *
                            60
                      )
                        .toISOString()
                        .split(":00.")[0]
                    }
                  />
                  <InputLabeled
                    type={"datetime-local"}
                    id={"end_date"}
                    placeholder={"Pilih tanggal & waktu"}
                    iconSvg={<BiCalendar />}
                    label={
                      <p
                        className={styles.TextSecondary}
                        style={blankEnd || blankStart ? { color: "red" } : {}}
                      >
                        Akhir Event *
                      </p>
                    }
                    style={{ boxShadow: "none", outline: "none" }}
                    refData={endDate}
                    min={
                      startEvent
                        ? new Date(
                            new Date(
                              new Date(startEvent).setHours(
                                new Date(startEvent).getHours() + 1,
                                0,
                                0,
                                0
                              )
                            ) -
                              new Date(
                                new Date(startEvent).setHours(
                                  new Date(startEvent).getHours() + 1,
                                  0,
                                  0,
                                  0
                                )
                              ).getTimezoneOffset() *
                                1000 *
                                60
                          )
                            .toISOString()
                            .split(":00.")[0]
                        : new Date(
                            new Date(
                              new Date().setHours(
                                new Date().getHours() + 1,
                                0,
                                0,
                                0
                              )
                            ) -
                              new Date(
                                new Date().setHours(
                                  new Date().getHours() + 1,
                                  0,
                                  0,
                                  0
                                )
                              ).getTimezoneOffset() *
                                1000 *
                                60
                          )
                            .toISOString()
                            .split(":00.")[0]
                    }
                    fnOnInput={() => {
                      setBlankEnd(false);
                    }}
                  />
                </div>
              ) : (
                <div
                  className={`${styles.AvailableDays} ${
                    blankStart || blankEnd ? styles.DangerInput : ""
                  }`}
                >
                  <div className={styles.DateGroup}>
                    <FieldBox
                      iconSvg={<BiCalendar />}
                      label={
                        <p className={styles.TextSecondary}>
                          Hari dan Jam Operasional *
                        </p>
                      }
                      style={{
                        boxShadow: "none",
                        outline: "none",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        className={styles.CmdField2}
                        onClick={() => {
                          setPopUpActive(true);
                          setPopUpTitle("Waktu Operasional");
                        }}
                      >
                        Atur Waktu
                      </div>
                    </FieldBox>
                    <div className={styles.Info}>
                      <div className={styles2.CmdField}>
                        <BiInfoCircle />
                      </div>

                      <p>
                        Pilih hari operasional untuk layanan / paketan /
                        produkmu dapat dipesan. Serta atur juga maksimal sampai
                        pukul berapa layanan / paketan / produkmu dapat dbeli
                        jika dipesan pada hari H (Bukan Pre-Order)
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <FieldBox
                iconSvg={<BiMapPin />}
                className={[
                  blankAddres || blankCitu || blankProv
                    ? styles.DangerInput
                    : "",
                ]}
                label={
                  <p
                    className={styles.TextSecondary}
                    style={
                      blankAddres || blankCitu || blankProv
                        ? { color: "red" }
                        : {}
                    }
                  >
                    {address === ""
                      ? "Lokasi Event *"
                      : address.split("<p>").length <= 1
                      ? address.slice(0, 18)
                      : address.split("<p>")[1].split("</p>")[0].split("")
                          .length > 22
                      ? address
                          .split("<p>")[1]
                          .split("</p>")[0]
                          .split("")
                          .slice(0, 18)
                          .join("") + "..."
                      : address.split("<p>")[1].split("</p>")[0]}
                  </p>
                }
                style={{ backgroundColor: "#fff" }}
              >
                <div
                  className={styles.CmdField2}
                  onClick={() => {
                    setPopUpActive(true);
                    setPopUpTitle("Lokasi Event");
                  }}
                >
                  {address === "" ? "Tambahkan" : "Lihat & Edit"}
                </div>
              </FieldBox>
              <FieldBox
                iconSvg={<BiLockOpen />}
                label={"Visibilitas *"}
                style={{ backgroundColor: "#fff" }}
                className={[blankVisibility ? styles.DangerInput : ""]}
              >
                <Select
                  options={[
                    { label: "Publik", value: 1 },
                    { label: "Privat", value: "0" },
                  ]}
                  className="basic-multi-select"
                  onMenuOpen={() => {
                    setBlankVs(false);
                  }}
                  styles={{
                    option: (basicStyle, state) => ({
                      ...basicStyle,
                      backgroundColor: state.isFocused ? "#fecadf" : "white",
                    }),
                    control: (basicStyle, state) => ({
                      ...basicStyle,
                      // width: "100%",
                      // textAlign: "left",
                      // margin: "unset",
                      display: "flex",
                      flexDirection: "row",
                      borderStyle: "none!important",
                      boxShadow: "none!important",
                      textAlign: "end",
                    }),
                    container: (basicStyle, state) => ({
                      ...basicStyle,
                      width: "100%",
                      margin: "unset",
                      borderRadius: "8px",
                    }),
                  }}
                  onChange={(e) => {
                    setDefVisbility(e);
                  }}
                  value={visbibilty}
                />
              </FieldBox>

              {!eventId &&
              (forEvtAct === "Onsite Event" ||
                forEvtAct === "Online Event" ||
                forEvtAct === "Hybrid Event") ? (
                <FieldBox
                  iconSvg={<BiCard />}
                  style={{ backgroundColor: "#fff" }}
                  label={<p>Ticket</p>}
                >
                  <div
                    className={styles.CmdField2}
                    onClick={() => {
                      if (
                        startDate.current &&
                        endDate.current &&
                        startDate.current.value !== "" &&
                        endDate.current.value !== "" &&
                        category
                      ) {
                        setPopUpActive(true);
                        setPopUpTitle("Tickets");
                      } else {
                        if (
                          !startDate.current ||
                          startDate.current.value === ""
                        ) {
                          setBlankStart(true);
                        }
                        if (!endDate.current || endDate.current.value === "") {
                          setBlankEnd(true);
                        }
                        if (!category) {
                          setBlankCat(true);
                        }
                        setAlert({
                          state: true,
                          type: "danger",
                          content:
                            "Field tanggal dan waktu serta kategori event wajib diisi terlebih dahulu",
                        });
                      }
                    }}
                  >
                    {tickets.length === 0 ? "Tambahkan" : "Lihat & Edit"}
                  </div>
                </FieldBox>
              ) : !eventId ? (
                <FieldBox
                  iconSvg={<BiCard />}
                  style={{ backgroundColor: "#fff" }}
                  label={<p>Produk/Layanan</p>}
                >
                  <div
                    className={styles.CmdField2}
                    onClick={() => {
                      setPopUpActive(true);
                      setPopUpTitle("Tickets");
                    }}
                  >
                    {tickets.length === 0 ? "Tambahkan" : "Lihat & Edit"}
                  </div>
                </FieldBox>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div style={{ marginTop: "35px" }}>
            <div
              className={`${styles.CmdField1}`}
              style={
                blankDesc
                  ? { marginBottom: "10px", color: "red" }
                  : { marginBottom: "10px" }
              }
            >
              Deskripsi Event *
            </div>
            <div className={blankDesc ? styles.DangerInput : ""}>
              <CKEditor
                editor={ClassicEditor}
                data={desc}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "mediaEmbed",
                  ],
                  heading: {
                    options: [
                      {
                        model: "paragraph",
                        title: "Paragraph",
                        class: "ck-heading_paragraph",
                      },
                      {
                        model: "heading1",
                        view: "h1",
                        title: "Heading 1",
                        class: "ck-heading_heading1",
                      },
                      {
                        model: "heading2",
                        view: "h2",
                        title: "Heading 2",
                        class: "ck-heading_heading2",
                      },
                    ],
                  },
                }}
                onChange={(e, editor) => {
                  setDesc(editor.getData());
                  setBlankDesc(false);
                }}
              />
            </div>
          </div>

          <div className={styles.BtnBoxWrap} style={{ marginTop: "40px" }}>
            {eventId ? (
              <Button
                bgColor={"#fff"}
                borderColor={"#eaeaea"}
                textColor={"#000"}
                style={{ width: "unset" }}
                title={
                  <div className={styles.BtnTitle}>
                    <div className={styles.Bold}>Simpan</div>
                  </div>
                }
                fnOnClick={handleUpdate}
              />
            ) : (
              <>
                <Button
                  bgColor={"#fff"}
                  borderColor={"#eaeaea"}
                  textColor={"#000"}
                  style={{ width: "unset" }}
                  title={
                    <div className={styles.BtnTitle}>
                      <div className={styles.Bold}>Simpan</div>&nbsp;(Draft)
                    </div>
                  }
                  fnOnClick={() => {
                    if (typeEditor == "inner") {
                      handleSave(interuptProcess, savedEventId);
                    } else {
                      handleSavePubFrontType("save");
                    }
                  }}
                />
                <Button
                  title={"Publish"}
                  fnOnClick={() => {
                    if (typeEditor == "inner") {
                      handlePublish(interuptProcess, savedEventId);
                    } else {
                      handleSavePubFrontType("publish");
                    }
                  }}
                />
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditorAddEvtAct;
