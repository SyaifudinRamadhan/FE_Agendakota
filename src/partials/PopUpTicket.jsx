import React, { useEffect, useRef, useState } from "react";
import styles2 from "./styles/PopUpTicket.module.css";
import {
  BiArrowBack,
  BiBookOpen,
  BiCalendar,
  BiCard,
  BiCurrentLocation,
  BiFilter,
  BiGrid,
  BiInfinite,
  BiInfoCircle,
  BiLeftArrow,
  BiLink,
  BiLocationPlus,
  BiLockOpen,
  BiMap,
  BiMapPin,
  BiMoney,
  BiNews,
  BiPlusCircle,
  BiSitemap,
  BiSolidCity,
  BiTrash,
} from "react-icons/bi";
import InputForm from "../components/InputForm";
import PopUp2 from "./PopUp2";

import Chip from "../components/Chip";
import FlatButton from "../components/FlatButton";
import InputImage4 from "../components/InputImage4";
import InputLabeled from "../components/InputLabeled";
import FieldBox from "../components/FieldBox";
import InputCheckRadio from "../components/InputCheckRadio";
import Select from "react-select";
import Alert from "../components/Alert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loading from "../components/Loading";
import InputToogle from "../components/InputToogle";
import InputImage5 from "../components/InputImage5";
import axios from "axios";
import { useSelector } from "react-redux";

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

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

const addTicketEnd = async ({
  orgId,
  eventId,
  name,
  desc,
  type_price,
  price,
  max_purchase,
  enable_seat_number,
  seat_map,
  cover,
  start_date,
  end_date,
  quantity,
  daily_limit_qty,
  meet_link,
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/ticket/create",
      {
        name,
        desc,
        type_price,
        price,
        max_purchase,
        enable_seat_number,
        seat_map,
        cover,
        start_date,
        end_date,
        quantity,
        daily_limit_qty,
        meet_link,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const updateTicketEnd = async ({
  orgId,
  eventId,
  ticket_id,
  name,
  desc,
  type_price,
  price,
  max_purchase,
  enable_seat_number,
  seat_map,
  cover,
  start_date,
  end_date,
  quantity,
  daily_limit_qty,
  meet_link,
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/ticket/update",
      {
        ticket_id,
        name,
        desc,
        type_price,
        price,
        max_purchase,
        enable_seat_number,
        seat_map,
        cover,
        start_date,
        end_date,
        quantity,
        daily_limit_qty,
        meet_link,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const deleteTicketEnd = async ({ orgId, eventId, ticket_id, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/ticket/delete",
      {
        _method: "DELETE",
        ticket_id,
      },
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

const updatePeripheralEnd = async ({
  orgId,
  eventId,
  limit_pchs,
  single_trx,
  seat_map,
  custom_fields,
  limit_reschedule,
  remove_seat_map,
  allow_refund,
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/update-peripheral",
      {
        _method: "PUT",
        event_id: eventId,
        limit_pchs,
        single_trx,
        seat_map,
        custom_fields,
        limit_reschedule,
        remove_seat_map,
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
    return handleError(error);
  }
};

const PopUpTicket = ({
  isPopActive,
  titlePopUp,
  setPopUpActive,
  // parameter login state
  isLogin,
  fnSetLogin,
  // parameter state activity / event process
  forEvtAct,
  evtCategory,
  evtActId = null,
  orgId,
  // references array data state (pointer array / object variabel)
  tickets,
  ticketSetup,
  orderForm,
  fnSetOrderForm,
  endEvent,
  // parmeter remote global state
  fnSetGlobalLoading,
}) => {
  const listFixFieldName = ["Nama", "Email", "No. Handphone", "ID Card/ KTP"];
  const typeDataForm = [
    { label: "Boolean", value: "boolean" },
    { label: "Angka", value: "number" },
    { label: "Teks", value: "text" },
  ];
  // Data tickets
  const [titleState, setTitleState] = useState("front");
  const [contentBody, setContentBody] = useState("Tickets");
  const [noteShow, setNoteShow] = useState(true);
  const [defaultCover, setDefCover] = useState(null);
  const [defaultMap, setDefMap] = useState(null);
  const [defaultGlobalMap, setDefGlobalMap] = useState(null);
  const [defaultTypePrice, setDefTypePrice] = useState(null);
  const [inputSeatMap, setSeatMapState] = useState(false);
  const [maxPurchase, setMaxPchs] = useState(
    tickets.length === 0 ? 5 : tickets[0].max_purchase
  );
  const [selectedTicketId, setTicketId] = useState(null);
  const [desc, setDesc] = useState("");
  const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
  const [selectedTicketIndex, setTicketIndex] = useState(null);
  const [enableRsc, setEnableRscState] = useState(false);
  const [enableRefund, setEnableRefundState] = useState(false);
  const [alert, setAlert] = useState({
    state: false,
    content: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [layoutCustomForm, setLayoutCustomForm] = useState([]);
  const [customFieldShow, setCustomFieldShow] = useState([]);
  const [pausedProcess, setPausedProcess] = useState(null);
  const [firstLoad, setFirstLoadState] = useState(true);
  const [removeSeatMap, setRemoveSeatMap] = useState(false);
  const [startSell, setStartSell] = useState(undefined);
  const appData = useSelector((state) => state.appDataReducer);

  // ============== State control =======================
  const [blankTitle, setBlankTitle] = useState(false);
  const [blankStart, setBlankStart] = useState(false);
  const [blankEnd, setBlankEnd] = useState(false);
  const [blankQty, setBlankQty] = useState(false);
  const [blankPrice, setBlankPrice] = useState(false);
  const [blankDesc, setBlankDesc] = useState(false);
  const [blankDailyLimit, setBlankDailyLimit] = useState(false);
  const [blankMeetLink, setBlankMeetLink] = useState(false);
  // ====================================================

  // Ref ticket form
  const coverImg = useRef();
  const title = useRef();
  const start = useRef();
  const end = useRef();
  const qty = useRef();
  const price = useRef();
  const refInpuSeatMap = useRef();
  const seatMapImg = useRef();
  const dailyLimitQty = useRef();
  const meetLink = useRef();

  // Ref ticket settings
  const maxPurchaseRef = useRef();
  const singleTrx = useRef();
  const maxLimitRsc = useRef();
  const seatMapGlobalImg = useRef();
  const enRscToogle = useRef();
  const enRefundToogle = useRef();

  // Ref custom forms
  const fixedField = useRef(new Array());
  const customFieldName = useRef(new Array());
  const customFieldType = useRef(new Array());
  const customFieldReq = useRef(new Array());

  const resetCover = useRef();
  const resetSeatMapImg = useRef();
  const resetSeatMapGlobalImg = useRef();

  const selectedStartSell = (e) => {
    setStartSell(e.target.value);
    if (
      new Date(e.target.value).setHours(0, 0, 0, 0) >
      new Date(end.current.value).setHours(0, 0, 0, 0)
    ) {
      end.current.value = "";
    }
  };

  const resetAlert = () => {
    setTimeout(() => {
      setAlert({
        state: false,
        content: "",
        type: "",
      });
    }, 2000);
  };

  const resetForm = () => {
    setDefCover(null);
    setDefMap(null);
    setDefTypePrice(null);
    // setSeatMapState(false);
    refInpuSeatMap.current.checked = false;
    setDesc("");
    if (resetCover.current) {
      resetCover.current.click();
    }
    title.current.value = "";
    if (start.current && end.current && qty.current) {
      start.current.value = "";
      end.current.value = "";
      qty.current.value = "";
    }
    if (dailyLimitQty.current) {
      dailyLimitQty.current.value = "";
    }
    price.current.value = "";
    resetSeatMapImg.current.click();
    if (meetLink.current) {
      meetLink.current.value = "";
    }
    setBlankTitle(false);
    setBlankStart(false);
    setBlankQty(false);
    setBlankPrice(false);
    setBlankMeetLink(false);
    setBlankEnd(false);
    setBlankDesc(false);
    setBlankDailyLimit(false);
  };

  const clearSavedGlobalMap = () => {
    if (ticketSetup.globalSeatMap) {
      ticketSetup.globalSeatMap = null;
      setRemoveSeatMap(true);
    }
  };

  const handleBack = () => {
    if (contentBody === "View Ticket") {
      resetForm();
    }
    setTitleState("front");
    setContentBody("Tickets");
  };

  const openTicket = (data, index) => {
    // console.log(data);
    setDefCover(
      evtActId ||
        forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event"
        ? process.env.REACT_APP_BACKEND_URL + data.cover
        : URL.createObjectURL(data.cover)
    );
    if (data.seat_map && data.seat_map !== "") {
      setDefMap(
        evtActId
          ? process.env.REACT_APP_BACKEND_URL + data.seat_map
          : URL.createObjectURL(data.seat_map)
      );
    }
    setDefTypePrice(data.type_price);
    // setSeatMapState(data.seat_number);
    refInpuSeatMap.current.checked = data.seat_number;
    setDesc(data.desc);
    title.current.value = data.name;
    if (
      data.start_date &&
      data.end_date &&
      data.quantity &&
      start.current &&
      end.current &&
      qty.current
    ) {
      start.current.value = data.start_date;
      end.current.value = data.end_date;
      qty.current.value = data.quantity;
    }
    if (data.limit_daily) {
      dailyLimitQty.current.value = data.limit_daily;
    }
    price.current.value = "Rp." + numberFormat.format(data.price);
    if (evtCategory && evtCategory.value === "Webinar" && meetLink.current) {
      meetLink.current.value = data.meet_link;
    }
    setTitleState("editor");
    setContentBody("View Ticket");
    setTicketIndex(index);
  };

  const deleteTicket = (index, id) => {
    if (evtActId) {
      // Execute delete from DB
      setLoading(true);
      deleteTicketEnd({
        orgId: orgId,
        eventId: evtActId,
        ticket_id: id,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 202) {
          tickets.splice(index, 1);
        } else if (res.status === 401) {
          fnSetLogin(false);
          setPausedProcess("delete-index-" + index);
        } else {
          setAlert({
            state: true,
            type: "danger",
            content: "Data gagal di simpan. Silahlan ulangi lagi",
          });
          resetAlert();
        }
        setLoading(false);
      });
    } else {
      setLoading(true);
      tickets.splice(index, 1);
      setTimeout(() => {
        setLoading(false);
      }, [50]);
    }
  };

  // Partial function of handle submit ticket
  const addTicket = () => {
    if (evtActId) {
      // Execute to create ticket
      setLoading(true);
      addTicketEnd({
        orgId: orgId,
        eventId: evtActId,
        name: title.current.value,
        desc: desc,
        type_price: defaultTypePrice,
        price:
          defaultTypePrice == "1" || defaultTypePrice == "3"
            ? 0
            : parseInt(
                price.current.value
                  .split("Rp.")[1]
                  .split("")
                  .filter(
                    (value) =>
                      value == 0 ||
                      value == 1 ||
                      value == 2 ||
                      value == 3 ||
                      value == 4 ||
                      value == 5 ||
                      value == 6 ||
                      value == 7 ||
                      value == 8 ||
                      value == 9
                  )
                  .join("")
              ),
        max_purchase: maxPurchaseRef.current.value,
        enable_seat_number: refInpuSeatMap.current.checked ? 1 : 0,
        seat_map:
          seatMapImg.current.files.length > 0 && refInpuSeatMap.current.checked
            ? seatMapImg.current.files[0]
            : null,
        cover: !coverImg.current ? null : coverImg.current.files[0],
        start_date:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? start.current.value
            : null,
        end_date:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? end.current.value
            : null,
        quantity:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? qty.current.value
            : -1,
        daily_limit_qty:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? null
            : dailyLimitQty.current.value,
        meet_link: meetLink.current ? meetLink.current.value : "",
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 201) {
          tickets.push({
            id: res.data.ticket.id,
            name: title.current.value,
            cover: res.data.ticket.cover,
            desc: desc,
            type_price: defaultTypePrice,
            price:
              defaultTypePrice == "1" || defaultTypePrice == "3"
                ? 0
                : parseInt(
                    price.current.value
                      .split("Rp.")[1]
                      .split("")
                      .filter(
                        (value) =>
                          value == 0 ||
                          value == 1 ||
                          value == 2 ||
                          value == 3 ||
                          value == 4 ||
                          value == 5 ||
                          value == 6 ||
                          value == 7 ||
                          value == 8 ||
                          value == 9
                      )
                      .join("")
                  ),
            quantity:
              forEvtAct === "Onsite Event" ||
              forEvtAct === "Online Event" ||
              forEvtAct === "Hybrid Event"
                ? qty.current.value
                : -1,
            start_date:
              forEvtAct === "Onsite Event" ||
              forEvtAct === "Online Event" ||
              forEvtAct === "Hybrid Event"
                ? start.current.value
                : null,
            end_date:
              forEvtAct === "Onsite Event" ||
              forEvtAct === "Online Event" ||
              forEvtAct === "Hybrid Event"
                ? end.current.value
                : null,
            seat_number: refInpuSeatMap.current.checked,
            max_purchase: maxPurchaseRef.current.value,
            seat_map: res.data.ticket.seat_map,
            // optional if (daily_activities)
            limit_daily:
              forEvtAct === "Onsite Event" ||
              forEvtAct === "Online Event" ||
              forEvtAct === "Hybrid Event"
                ? null
                : dailyLimitQty.current.value,
            meet_link: meetLink.current ? meetLink.current.value : "",
          });
          setContentBody("Tickets");
          setTitleState("front");
          resetForm();
          setAlert({
            state: true,
            type: "success",
            content: "Tiket berhasil diperbarui",
          });
          resetAlert();
        } else if (res.status === 401) {
          fnSetLogin(false);
          setPausedProcess("create");
        } else {
          setAlert({
            state: true,
            type: "danger",
            content: "Data gagal di simpan. Silahlan ulangi lagi",
          });
          resetAlert();
        }
        setLoading(false);
      });
    } else {
      // execute to push data in array
      tickets.push({
        name: title.current.value,
        cover: !coverImg.current ? null : coverImg.current.files[0],
        desc: desc,
        type_price: defaultTypePrice,
        price:
          defaultTypePrice == "1" || defaultTypePrice == "3"
            ? 0
            : parseInt(
                price.current.value
                  .split("Rp.")[1]
                  .split("")
                  .filter(
                    (value) =>
                      value == 0 ||
                      value == 1 ||
                      value == 2 ||
                      value == 3 ||
                      value == 4 ||
                      value == 5 ||
                      value == 6 ||
                      value == 7 ||
                      value == 8 ||
                      value == 9
                  )
                  .join("")
              ),
        quantity:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? qty.current.value
            : -1,
        start_date:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? start.current.value
            : null,
        end_date:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? end.current.value
            : null,
        seat_number: refInpuSeatMap.current.checked,
        max_purchase: maxPurchaseRef.current.value,
        seat_map:
          seatMapImg.current.files.length > 0 && refInpuSeatMap.current.checked
            ? seatMapImg.current.files[0]
            : null,
        // optional if (daily_activities)
        limit_daily:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? null
            : dailyLimitQty.current.value,
        meet_link: meetLink.current ? meetLink.current.value : "",
      });
      // console.log(tickets);
      setContentBody("Tickets");
      setTitleState("front");
      resetForm();
    }
  };
  // Partial function of handle submit ticket
  const updateTicket = () => {
    if (evtActId) {
      // Execute to update ticket
      setLoading(true);
      updateTicketEnd({
        orgId: orgId,
        eventId: evtActId,
        ticket_id: selectedTicketId,
        name: title.current.value,
        desc: desc,
        type_price: defaultTypePrice,
        price:
          defaultTypePrice == "1" || defaultTypePrice == "3"
            ? 0
            : parseInt(
                price.current.value
                  .split("Rp.")[1]
                  .split("")
                  .filter(
                    (value) =>
                      value == 0 ||
                      value == 1 ||
                      value == 2 ||
                      value == 3 ||
                      value == 4 ||
                      value == 5 ||
                      value == 6 ||
                      value == 7 ||
                      value == 8 ||
                      value == 9
                  )
                  .join("")
              ),
        max_purchase: maxPurchaseRef.current.value,
        enable_seat_number: refInpuSeatMap.current.checked ? 1 : 0,
        seat_map:
          seatMapImg.current.files.length > 0 && refInpuSeatMap.current.checked
            ? seatMapImg.current.files[0]
            : null,
        cover: !coverImg.current ? null : coverImg.current.files[0],
        start_date:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? start.current.value
            : null,
        end_date:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? end.current.value
            : null,
        quantity:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? qty.current.value
            : -1,
        daily_limit_qty:
          forEvtAct === "Onsite Event" ||
          forEvtAct === "Online Event" ||
          forEvtAct === "Hybrid Event"
            ? null
            : dailyLimitQty.current.value,
        meet_link: meetLink.current ? meetLink.current.value : "",
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 202) {
          // console.log(res.data);
          tickets[selectedTicketIndex].name = title.current.value;

          if (coverImg.current && coverImg.current.files.length > 0) {
            tickets[selectedTicketIndex].cover = res.data.ticket.cover;
          }

          tickets[selectedTicketIndex].desc = desc;
          tickets[selectedTicketIndex].type_price = defaultTypePrice;
          tickets[selectedTicketIndex].price =
            defaultTypePrice == "1"
              ? 0
              : parseInt(
                  price.current.value
                    .split("Rp.")[1]
                    .split("")
                    .filter(
                      (value) =>
                        value == 0 ||
                        value == 1 ||
                        value == 2 ||
                        value == 3 ||
                        value == 4 ||
                        value == 5 ||
                        value == 6 ||
                        value == 7 ||
                        value == 8 ||
                        value == 9
                    )
                    .join("")
                );
          tickets[selectedTicketIndex].quantity =
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Online Event" ||
            forEvtAct === "Hybrid Event"
              ? qty.current.value
              : -1;
          tickets[selectedTicketIndex].start_date =
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Online Event" ||
            forEvtAct === "Hybrid Event"
              ? start.current.value
              : null;
          tickets[selectedTicketIndex].end_date =
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Online Event" ||
            forEvtAct === "Hybrid Event"
              ? end.current.value
              : null;
          tickets[selectedTicketIndex].seat_number =
            refInpuSeatMap.current.checked;
          tickets[selectedTicketIndex].max_purchase =
            maxPurchaseRef.current.value;
          tickets[selectedTicketIndex].seat_map = res.data.ticket.seat_map;

          // optional if (daily_activities)
          tickets[selectedTicketIndex].limit_daily =
            forEvtAct === "Onsite Event" ||
            forEvtAct === "Online Event" ||
            forEvtAct === "Hybrid Event"
              ? null
              : dailyLimitQty.current.value;
          tickets[selectedTicketIndex].meet_link = meetLink.current
            ? meetLink.current.value
            : "";
          setContentBody("Tickets");
          setTitleState("front");
          resetForm();
          setAlert({
            state: true,
            type: "success",
            content: "Tiket berhasil diperbarui",
          });
          resetAlert();
        } else if (res.status === 401) {
          setPausedProcess("update");
          fnSetLogin(false);
        } else {
          setAlert({
            state: true,
            type: "danger",
            content: "Data gagal di simpan. Silahlan ulangi lagi",
          });
          resetAlert();
        }
        setLoading(false);
      });
    } else {
      // execute to edit data in array
      tickets[selectedTicketIndex].name = title.current.value;

      if (coverImg.current && coverImg.current.files.length > 0) {
        tickets[selectedTicketIndex].cover = coverImg.current.files[0];
      }

      tickets[selectedTicketIndex].desc = desc;
      tickets[selectedTicketIndex].type_price = defaultTypePrice;
      tickets[selectedTicketIndex].price =
        defaultTypePrice == "1"
          ? 0
          : parseInt(
              price.current.value
                .split("Rp.")[1]
                .split("")
                .filter(
                  (value) =>
                    value == 0 ||
                    value == 1 ||
                    value == 2 ||
                    value == 3 ||
                    value == 4 ||
                    value == 5 ||
                    value == 6 ||
                    value == 7 ||
                    value == 8 ||
                    value == 9
                )
                .join("")
            );
      tickets[selectedTicketIndex].quantity =
        forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event"
          ? qty.current.value
          : -1;
      tickets[selectedTicketIndex].start_date =
        forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event"
          ? start.current.value
          : null;
      tickets[selectedTicketIndex].end_date =
        forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event"
          ? end.current.value
          : null;
      tickets[selectedTicketIndex].seat_number = refInpuSeatMap.current.checked;
      tickets[selectedTicketIndex].max_purchase = maxPurchaseRef.current.value;

      if (!refInpuSeatMap.current.checked) {
        tickets[selectedTicketIndex].seat_map = null;
      } else if (seatMapImg.current.files.length > 0) {
        tickets[selectedTicketIndex].seat_map = seatMapImg.current.files[0];
      }

      // optional if (daily_activities)
      tickets[selectedTicketIndex].limit_daily =
        forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event"
          ? null
          : dailyLimitQty.current.value;
      tickets[selectedTicketIndex].meet_link = meetLink.current
        ? meetLink.current.value
        : "";

      setContentBody("Tickets");
      setTitleState("front");
      resetForm();
    }
  };

  // Main function for handle submit ticket
  const handleSubmitTicket = () => {
    if (
      title.current.value === "" ||
      title.current.value === " " ||
      title.current.value.length > 200 ||
      ((forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event") &&
        (start.current.value === "" ||
          start.current.value === " " ||
          end.current.value === "" ||
          end.current.value === " " ||
          qty.current.value === "")) ||
      (forEvtAct !== "Onsite Event" &&
        forEvtAct !== "Online Event" &&
        forEvtAct !== "Hybrid Event" &&
        (dailyLimitQty.current.value === "" ||
          dailyLimitQty.current.value === " ")) ||
      (forEvtAct !== "Onsite Event" &&
        forEvtAct !== "Online Event" &&
        forEvtAct !== "Hybrid Event" &&
        !evtActId &&
        contentBody !== "View Ticket" &&
        coverImg.current.files.length === 0) ||
      (defaultTypePrice == "2" &&
        (price.current.value === "" ||
          price.current.value === " " ||
          parseInt(
            price.current.value
              .split("Rp.")[1]
              .split("")
              .filter(
                (value) =>
                  value == 0 ||
                  value == 1 ||
                  value == 2 ||
                  value == 3 ||
                  value == 4 ||
                  value == 5 ||
                  value == 6 ||
                  value == 7 ||
                  value == 8 ||
                  value == 9
              )
              .join("")
          ) < 10000)) ||
      desc === "" ||
      (refInpuSeatMap.current.checked === true &&
        (contentBody !== "View Ticket" ||
          (contentBody === "View Ticket" &&
            !tickets[selectedTicketIndex].seat_map)) &&
        seatMapImg.current.files.length === 0) ||
      (evtCategory &&
        evtCategory.value === "Webinar" &&
        (!meetLink.current ||
          meetLink.current.value === "" ||
          isValidUrl(meetLink.current.value) === false))
    ) {
      let msg = "Semua form field wajib diisi";
      if (
        title.current.value === "" ||
        title.current.value === " " ||
        title.current.value.length > 200
      ) {
        setBlankTitle(true);
      }
      if (title.current.value.length > 200) {
        msg = "Nama tiket maksimal 200 karkkter termasuk spasi";
      }
      if (desc === "") {
        setBlankDesc(true);
      }
      if (
        forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event"
      ) {
        if (start.current.value === "" || start.current.value === " ") {
          setBlankStart(true);
        }
        if (end.current.value === "" || end.current.value === " ") {
          setBlankEnd(true);
        }
        if (qty.current.value === "") {
          setBlankQty(true);
        }
      }
      if (
        forEvtAct !== "Onsite Event" &&
        forEvtAct !== "Online Event" &&
        forEvtAct !== "Hybrid Event" &&
        (dailyLimitQty.current.value === "" ||
          dailyLimitQty.current.value === " ")
      ) {
        setBlankDailyLimit(true);
      }
      if (
        forEvtAct !== "Onsite Event" &&
        forEvtAct !== "Online Event" &&
        forEvtAct !== "Hybrid Event" &&
        !evtActId &&
        contentBody !== "View Ticket" &&
        coverImg.current.files.length === 0
      ) {
        msg = "Gambar Cover wjib diisi";
      }
      if (
        evtCategory &&
        evtCategory.value === "Webinar" &&
        (!meetLink.current ||
          meetLink.current.value === "" ||
          isValidUrl(meetLink.current.value) === false)
      ) {
        setBlankMeetLink(true);
        msg =
          !meetLink.current || meetLink.current.value === ""
            ? "Meet / Zoom URL wajib diisi untuk kategori event Webinar"
            : "Format URL Meet / Zoom tidak tepat (Contoh: https://us04web.zoom.us/...)";
      }
      if (
        defaultTypePrice != "1" &&
        (price.current.value === "" ||
          price.current.value === " " ||
          parseInt(
            price.current.value
              .split("Rp.")[1]
              .split("")
              .filter(
                (value) =>
                  value == 0 ||
                  value == 1 ||
                  value == 2 ||
                  value == 3 ||
                  value == 4 ||
                  value == 5 ||
                  value == 6 ||
                  value == 7 ||
                  value == 8 ||
                  value == 9
              )
              .join("")
          ) < 10000)
      ) {
        setBlankPrice(true);
      }
      if (
        refInpuSeatMap.current.checked === true &&
        (contentBody !== "View Ticket" ||
          (contentBody === "View Ticket" &&
            !tickets[selectedTicketIndex].seat_map)) &&
        seatMapImg.current.files.length === 0
      ) {
        msg = "Seat Map Image / Gambar Peta Tempat Duduk wajib diisi !";
      }

      setAlert({
        state: true,
        content:
          defaultTypePrice != "1" &&
          price.current.value !== "" &&
          price.current.value !== " " &&
          parseInt(
            price.current.value
              .split("Rp.")[1]
              .split("")
              .filter(
                (value) =>
                  value == 0 ||
                  value == 1 ||
                  value == 2 ||
                  value == 3 ||
                  value == 4 ||
                  value == 5 ||
                  value == 6 ||
                  value == 7 ||
                  value == 8 ||
                  value == 9
              )
              .join("")
          ) < 10000
            ? "Minimal harga tiket Rp. 10000,00"
            : msg,
        type: "danger",
      });
      resetAlert();
    } else if (
      (forEvtAct === "Onsite Event" ||
        forEvtAct === "Online Event" ||
        forEvtAct === "Hybrid Event") &&
      (new Date(start.current.value) > new Date(end.current.value) ||
        new Date(end.current.value) > new Date(endEvent) ||
        new Date(start.current.value) > new Date(endEvent))
    ) {
      setAlert({
        state: true,
        content:
          "Periksa kembali input tanggal. Jangan terbalik atau melebihhi batas akhir event",
        type: "danger",
      });
      resetAlert();
    } else {
      // +++++++++++++ Reference ++++++++++++++++++
      // event_id: "tgftygeufg8egf8grf",
      // name: "Phoenix",
      // cover: "/storage/ticket_covers/default.png",
      // desc: "-",
      // type_price: "3",
      // price: 100000,
      // quantity: 100,
      // start_date: "12-01-2024",
      // end_date: "21-01-2024",
      // seat_number: 1,
      // max_purchase: 5,
      // seat_map: "/storage/seat_maps/example.png",
      // deleted: 0,
      // // optional if (daily_activities)
      // limit_daily: {
      // 	ticket_id: "fretfdefdf7efd8634",
      // 	limit_quantity: 5,
      // },
      // ++++++++++++++++++++++++++++++++++++++++++

      if (contentBody === "View Ticket") {
        updateTicket();
      } else {
        addTicket();
      }
    }
  };

  const handleUpdateSetting = () => {
    let needGlobalSeatMap = false;
    tickets.forEach((ticket) => {
      if (ticket.seat_map) {
        needGlobalSeatMap = true;
      }
    });
    if (
      needGlobalSeatMap &&
      seatMapGlobalImg.current.files.length === 0 &&
      !ticketSetup.globalSeatMap
    ) {
      setContentBody("Ticket Settings");
      setAlert({
        state: true,
        type: "danger",
        content:
          "Jika kamu menginputkan seat map, mohon inputkan global seat map di menu 'ticket settings'",
      });
      return 0;
    }
    if (evtActId) {
      // Update data to API
      let customForms = handleUpdateCustomForm();
      setLoading(true);
      updatePeripheralEnd({
        orgId: orgId,
        eventId: evtActId,
        limit_pchs: parseInt(maxPurchaseRef.current.value),
        single_trx: singleTrx.current.checked ? 1 : 0,
        remove_seat_map:
          removeSeatMap && seatMapGlobalImg.current.files.length === 0 ? 1 : 0,
        seat_map:
          seatMapGlobalImg.current.files.length === 0
            ? null
            : seatMapGlobalImg.current.files[0],
        custom_fields: customForms,
        limit_reschedule: enableRsc ? maxLimitRsc.current.value : -1,
        allow_refund: enRefundToogle.current.checked ? 1 : 0,
        token: appData.accessToken,
      }).then((res) => {
        setLoading(false);
        if (res.status === 202) {
          // setAlert({
          //   state: true,
          //   type: "success",
          //   content: "Data berhasil diperbarui",
          // });
          // resetAlert();
          // setTimeout(() => {
          //   setPopUpActive(false);
          // }, 2000);
          setPopUpActive(false);
        } else if (res.status === 401) {
          fnSetLogin(false);
          setPausedProcess("submit");
        } else {
          setPopUpActive(true);
          setAlert({
            state: true,
            type: "danger",
            content: "Data gagal di simpan. Silahlan ulangi lagi",
          });
          resetAlert();
        }
      });
      return 1;
    } else {
      ticketSetup.limitPchs = parseInt(maxPurchaseRef.current.value);
      ticketSetup.singleTrxs = singleTrx.current.checked;
      ticketSetup.maxLimitRsc = enableRsc ? maxLimitRsc.current.value : -1;
      ticketSetup.globalSeatMap =
        seatMapGlobalImg.current.files.length === 0
          ? null
          : seatMapGlobalImg.current.files[0];
      ticketSetup.enableRefundReq = enRefundToogle.current.checked;
      return 1;
    }
  };

  const handleUpdateCustomForm = () => {
    let fields = [];
    // console.log(fields, customFieldName.current.length);
    fixedField.current.forEach((field, index) => {
      if (field.checked) {
        fields.push(
          `${listFixFieldName[index]}~!!!~${
            index === 3 ? "file" : "text"
          }~!!!~required`
        );
      }
    });

    customFieldName.current.forEach((field, index) => {
      try {
        if (
          fields.indexOf(
            `${field.value}~!!!~${
              customFieldType.current[index].getValue()[0].value
            }~!!!~${
              customFieldReq.current[index].checked ? "required" : "un-required"
            }`
          ) === -1
        ) {
          fields.push(
            `${field.value}~!!!~${
              customFieldType.current[index].getValue()[0].value
            }~!!!~${
              customFieldReq.current[index].checked ? "required" : "un-required"
            }`
          );
          // console.log(field, customFieldName.current.length);
        }
      } catch (error) {
        // console.log(error);
      }
    });
    // console.log(fields);
    fnSetOrderForm(fields);
    setLayoutCustomForm([]);
    customFieldName.current = [];
    customFieldReq.current = [];
    customFieldType.current = [];
    if (evtActId) {
      return fields;
    }
    // if (evtActId) {
    // 	// Update data to API
    // 	// has handled in one function handleUpdateSetting by updatePeripheral
    // } else {
    // 	let fields = [];
    // 	// console.log(fields, customFieldName.current.length);
    // 	fixedField.current.forEach((field, index) => {
    // 		if (field.checked) {
    // 			fields.push(`${listFixFieldName[index]}~!!!~text~!!!~required`);
    // 		}
    // 	});

    // 	customFieldName.current.forEach((field, index) => {
    // 		try {
    // 			if (
    // 				fields.indexOf(
    // 					`${field.value}~!!!~${
    // 						customFieldType.current[index].getValue()[0].value
    // 					}~!!!~${
    // 						customFieldReq.current[index].checked
    // 							? "required"
    // 							: "un-required"
    // 					}`
    // 				) === -1
    // 			) {
    // 				fields.push(
    // 					`${field.value}~!!!~${
    // 						customFieldType.current[index].getValue()[0].value
    // 					}~!!!~${
    // 						customFieldReq.current[index].checked
    // 							? "required"
    // 							: "un-required"
    // 					}`
    // 				);
    // 				// console.log(field, customFieldName.current.length);
    // 			}
    // 		} catch (error) {
    // 			// console.log(error);
    // 		}
    // 	});
    // 	// console.log(fields);
    // 	fnSetOrderForm(fields);
    // 	setLayoutCustomForm([]);
    // 	customFieldName.current = [];
    // 	customFieldReq.current = [];
    // 	customFieldType.current = [];
    // }
  };

  const templateCustomForm = (index, title, type, required) => {
    return (
      <div key={index} className={styles2.CustomForm}>
        <div className={styles2.SplitCustomForm}>
          <InputForm
            type={"text"}
            style={{ width: "100%" }}
            placeholder={"Judul Form"}
            refData={(e) => {
              customFieldName.current.push(e);
            }}
            value={title}
          />
        </div>
        <div className={styles2.SplitCustomForm}>
          <Select
            styles={{
              container: (basicStyle, state) => ({
                ...basicStyle,
                width: "100%",
                margin: "unset",
                marginBottom: "auto",
                marginTop: "auto",
                borderRadius: "8px",
                fontSize: "14px",
              }),
            }}
            options={typeDataForm}
            placeholder="Tipe Data"
            ref={(e) => {
              customFieldType.current.push(e);
            }}
            defaultValue={
              typeDataForm[
                typeDataForm.findIndex((data) => data.value === type)
              ]
            }
          />
        </div>
        <div className={styles2.SplitCustomForm}>
          <label htmlFor={`required-${layoutCustomForm.length}`}>
            Required
          </label>
          <InputToogle
            id={`required-${layoutCustomForm.length}`}
            refData={(e) => {
              customFieldReq.current.push(e);
            }}
            checked={required}
          />
        </div>
      </div>
    );
  };

  const handleAddFieldForm = () => {
    setLayoutCustomForm([
      ...layoutCustomForm,
      templateCustomForm(layoutCustomForm.length),
    ]);
  };

  const handleSaveBtn = () => {
    if (
      contentBody === "Tiket Gratis" ||
      contentBody === "Tiket Berbayar" ||
      contentBody === "Tiket Donasi" ||
      contentBody === "View Ticket"
    ) {
      handleSubmitTicket();
    } else {
      if (!evtActId) {
        handleUpdateCustomForm();
      }
      let acc = handleUpdateSetting();
      if (acc === 1) {
        resetAlert();
        // evtActId
        // 	? setTimeout(() => {
        // 			setPopUpActive(false);
        // 			fnSetGlobalLoading(true);
        // 			setTimeout(() => {
        // 				fnSetGlobalLoading(false);
        // 			}, 200);
        // 	  }, 2000)
        // 	: setPopUpActive(false);
        if (!evtActId) {
          setPopUpActive(false);
        }
      }
    }
  };

  useEffect(() => {
    if (maxLimitRsc.current && enRscToogle.current) {
      if (enableRsc) {
        maxLimitRsc.current.value =
          maxLimitRsc.current.value == -1 ? 0 : maxLimitRsc.current.value;
      } else {
        maxLimitRsc.current.value = -1;
      }
    }
  }, [enableRsc]);

  useEffect(() => {
    if (
      ticketSetup &&
      maxPurchaseRef.current &&
      singleTrx.current &&
      maxLimitRsc.current &&
      enRscToogle.current &&
      enRefundToogle.current
    ) {
      maxPurchaseRef.current.value = ticketSetup.limitPchs;
      singleTrx.current.checked = ticketSetup.singleTrxs;
      maxLimitRsc.current.value = ticketSetup.maxLimitRsc;
      if (ticketSetup.maxLimitRsc !== -1 && ticketSetup.maxLimitRsc !== null) {
        enRscToogle.current.click();
      }
      enRefundToogle.current.checked = ticketSetup.enableRefundReq;

      setDefGlobalMap(
        !ticketSetup.globalSeatMap
          ? null
          : evtActId
          ? process.env.REACT_APP_BACKEND_URL + ticketSetup.globalSeatMap
          : URL.createObjectURL(ticketSetup.globalSeatMap)
      );
      // console.log(ticketSetup, maxLimitRsc.current.value, "ini ticket setup");
    }
  }, [ticketSetup]);

  useEffect(() => {
    if (fixedField.current.length === 4) {
      // console.log("Reset field running");
      let customField = [];
      fixedField.current.forEach((field) => {
        field.checked = false;
      });
      orderForm.forEach((field, index) => {
        let fieldData = field.split("~!!!~");
        let indexFixField = listFixFieldName.indexOf(fieldData[0]);
        if (indexFixField !== -1) {
          fixedField.current[indexFixField].checked = true;
        } else {
          // customField.push({
          // 	name: fieldData[0],
          // 	typeData: fieldData[1],
          // 	required: fieldData[2],
          // });
          customField.push(
            templateCustomForm(
              index,
              fieldData[0],
              fieldData[1],
              fieldData[2] === "required" ? true : false
            )
          );
        }
        // setFirstLoadState(false);
      });
      setLayoutCustomForm(customField);
      // setCustomFieldShow(customField);
    }
  }, [orderForm]);

  useEffect(() => {
    if (isLogin && pausedProcess && orgId) {
      if (pausedProcess === "create") {
        addTicket();
      } else if (pausedProcess === "update") {
        updateTicket();
      } else if (pausedProcess.split("-index-")[0] === "delete") {
        deleteTicket(pausedProcess.split("-index-")[1], selectedTicketId);
      } else if (pausedProcess === "submit") {
        // handleSubmitTicket();
        setPopUpActive(true);
        handleSaveBtn();
      }
      setPausedProcess(null);
    }
  }, [pausedProcess, isLogin, orgId]);

  useEffect(() => {
    setBlankTitle(false);
    setBlankStart(false);
    setBlankEnd(false);
    setBlankQty(false);
    setBlankPrice(false);
    setBlankDesc(false);
    setBlankDailyLimit(false);
  }, [contentBody]);

  return (
    <PopUp2
      width="928px"
      isActive={isPopActive && titlePopUp === "Tickets"}
      setActiveFn={() => {
        handleSaveBtn();
      }}
      closeBtnAbs={{
        title: "Tutup",
        fn: () => {
          setPopUpActive(false);
        },
      }}
      classNames={{
        wrapper: [!orgId ? styles2.PopUpWrapper2 : styles2.PopUpWrapper],
        modalDialog: [styles2.ModalDialog],
        popUpBox: [styles2.PopUpBox],
        header: [],
        content: [styles2.PopUpContent],
      }}
      titleHeader={
        <div className={styles2.PopUpHeader}>
          <div className={`${titleState === "front" ? "" : "d-none"}`}>
            <h4>
              {forEvtAct === "Onsite Event" ||
              forEvtAct === "Online Event" ||
              forEvtAct === "Hybrid Event"
                ? "Tickets"
                : "Produk/Program/Paketan"}{" "}
            </h4>
          </div>
          <div
            className={`${titleState === "front" ? "d-none" : ""} ${
              styles2.GroupTitle
            }`}
          >
            <BiArrowBack
              onClick={() => {
                handleBack();
              }}
            />
            <h4
              className={styles2.TitleNav}
              onClick={() => {
                handleBack();
              }}
            >
              {forEvtAct === "Onsite Event" ||
              forEvtAct === "Online Event" ||
              forEvtAct === "Hybrid Event"
                ? "Ticket"
                : "Program"}
              &nbsp;/{" "}
              <span>
                {contentBody.split(" ")[contentBody.split(" ").length - 1] ===
                "Ticket"
                  ? "Edit"
                  : contentBody.split(" ")[contentBody.split(" ").length - 1]}
              </span>
            </h4>
            {/* <InputForm
              type={"text"}
              placeholder={
                forEvtAct === "Onsite Event" ||
                forEvtAct === "Online Event" ||
                forEvtAct === "Hybrid Event"
                  ? "Masukkan Nama Tiket *"
                  : "Nama Program *"
              }
              className={styles2.InputTitle}
              refData={title}
              style={{ border: "none", outline: "none", boxShadow: "none" }}
            /> */}
          </div>
        </div>
      }
      closeBtnTitle={"Simpan"}
      content={
        <div className={styles2.PopUpContent}>
          <div className={`${styles2.Loading} ${loading ? "" : "d-none"}`}>
            <Loading />
          </div>
          <div
            className={`${styles2.MainContainer} ${loading ? "d-none" : ""}`}
          >
            <div
              style={{ height: "100%" }}
              className={`${titleState === "front" ? "" : "d-none"}`}
            >
              <div className={styles2.ChipBox}>
                <Chip
                  options={["Tickets", "Ticket Settings", "Order Form"]}
                  labelItem={
                    forEvtAct === "Onsite Event" ||
                    forEvtAct === "Online Event" ||
                    forEvtAct === "Hybrid Event"
                      ? ["Tickets", "Ticket Settings", "Order Form"]
                      : ["Programs", "Program Settings", "Order Form"]
                  }
                  value={contentBody}
                  setValue={setContentBody}
                  multiple={false}
                  showLimit={3}
                  itemStyle={{
                    fontSize: "14px",
                    padding: "5px",
                    whiteSpace: "nowrap",
                  }}
                />
              </div>
              <Alert
                type={alert.type}
                isShow={alert.state}
                setShowFn={() => {}}
                message={alert.content}
                closeBtn={false}
              />
              <div
                className={`${contentBody === "Tickets" ? "" : "d-none"} ${
                  tickets.length > 0
                    ? styles2.ContentBody
                    : styles2.ContentBody2
                }`}
              >
                {tickets.length === 0 ? (
                  <div className={styles2.BlankTicket}>
                    <img src="/images/blank_ticket.png" alt="" srcset="" />
                    <h4>
                      {forEvtAct === "Onsite Event" ||
                      forEvtAct === "Online Event" ||
                      forEvtAct === "Hybrid Event"
                        ? "Belum ada tiket"
                        : "Belum ada program"}
                    </h4>
                  </div>
                ) : (
                  <div className={styles2.TicketsBox}>
                    {tickets.map((ticket, index) => {
                      return (
                        <div className={styles2.TicketCard}>
                          <div
                            className={styles2.DeleteTicket}
                            onClick={() => {
                              deleteTicket(index, ticket.id);
                              setTicketId(ticket.id);
                            }}
                          >
                            <BiTrash />
                          </div>
                          {evtActId ? (
                            <img
                              onClick={() => {
                                openTicket(ticket, index);
                                setTicketId(ticket.id);
                              }}
                              src={
                                process.env.REACT_APP_BACKEND_URL + ticket.cover
                              }
                              alt=""
                              srcset=""
                            />
                          ) : forEvtAct === "Onsite Event" ||
                            forEvtAct === "Online Event" ||
                            forEvtAct === "Hybrid Event" ? (
                            <img
                              onClick={() => {
                                openTicket(ticket, index);
                                setTicketId(ticket.id);
                              }}
                              src={
                                process.env.REACT_APP_BACKEND_URL +
                                "/storage/ticket_covers/default.png"
                              }
                              alt=""
                              srcset=""
                            />
                          ) : (
                            <img
                              onClick={() => {
                                openTicket(ticket, index);
                                setTicketId(ticket.id);
                              }}
                              src={URL.createObjectURL(ticket.cover)}
                              alt=""
                              srcset=""
                            />
                          )}
                          <div className={styles2.TicketDesc}>
                            <h5
                              onClick={() => {
                                openTicket(ticket, index);
                                setTicketId(ticket.id);
                              }}
                            >
                              {ticket.name}
                            </h5>
                            <p>
                              {ticket.price > 0
                                ? "Rp" +
                                  numberFormat.format(ticket.price) +
                                  ",00"
                                : ticket.type_price == 3
                                ? "DONASI"
                                : "FREE"}{" "}
                              |{" "}
                              {ticket.quantity == -1 ? (
                                <>
                                  &nbsp;
                                  <BiInfinite />
                                  &nbsp;
                                </>
                              ) : (
                                ticket.quantity
                              )}{" "}
                              Tiket
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className={styles2.FooterBox}>
                  <div
                    className={`${styles2.Note} ${noteShow ? "" : "d-none"}`}
                  >
                    <div className={styles2.CmdField}>
                      <BiInfoCircle />
                    </div>

                    <p>
                      Tambahkan berbagai jenis dan tipe tiket sesuai dengan
                      rencana penjualan tiket eventmu. Setiap tiket dapat
                      memiliki nama dan jumlah ketersediaan yang berbeda - beda.
                    </p>
                    <div
                      className={styles2.CmdField2}
                      onClick={() => {
                        setNoteShow(false);
                      }}
                    >
                      OK
                    </div>
                  </div>
                  <div className={styles2.FlatButtonBox}>
                    <FlatButton
                      title={
                        forEvtAct === "Onsite Event" ||
                        forEvtAct === "Online Event" ||
                        forEvtAct === "Hybrid Event"
                          ? "Tiket Gratis"
                          : "Program Gratis"
                      }
                      icon={<BiPlusCircle />}
                      bgColor={"rgba(221, 0, 100, 0.08)"}
                      borderColor={"rgba(221, 0, 100, 0.08)"}
                      textColor={"#CA0C64"}
                      style={{ width: "33.33%" }}
                      center
                      fnOnClick={() => {
                        setContentBody("Tiket Gratis");
                        setTitleState("editor");
                        setDefTypePrice("1");
                      }}
                    />
                    <FlatButton
                      title={
                        forEvtAct === "Onsite Event" ||
                        forEvtAct === "Online Event" ||
                        forEvtAct === "Hybrid Event"
                          ? "Tiket Berbayar"
                          : "Program Berbayar"
                      }
                      icon={<BiPlusCircle />}
                      bgColor={"rgba(221, 0, 100, 0.08)"}
                      borderColor={"rgba(221, 0, 100, 0.08)"}
                      textColor={"#CA0C64"}
                      style={{ width: "33.33%" }}
                      center
                      fnOnClick={() => {
                        setContentBody("Tiket Berbayar");
                        setTitleState("editor");
                        setDefTypePrice("2");
                      }}
                    />
                    <FlatButton
                      title={
                        forEvtAct === "Onsite Event" ||
                        forEvtAct === "Online Event" ||
                        forEvtAct === "Hybrid Event"
                          ? "Tiket Donasi"
                          : "Program Donasi"
                      }
                      icon={<BiPlusCircle />}
                      bgColor={"rgba(221, 0, 100, 0.08)"}
                      borderColor={"rgba(221, 0, 100, 0.08)"}
                      textColor={"#CA0C64"}
                      style={{ width: "33.33%" }}
                      center
                      fnOnClick={() => {
                        setContentBody("Tiket Donasi");
                        setTitleState("editor");
                        setDefTypePrice("3");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${
                  contentBody === "Ticket Settings" ? "" : "d-none"
                }`}
              >
                <div className={styles2.TicketSettingContainer}>
                  <div className={styles2.SettingLabel}>
                    <label htmlFor="max-pch">
                      Maximum Tickets Purchase/User
                    </label>
                  </div>
                  <div className={styles2.SettingField}>
                    <InputForm
                      id={"max-pch"}
                      type={"number"}
                      placeholder={0}
                      refData={maxPurchaseRef}
                    />
                  </div>
                </div>
                <div className={styles2.TicketSettingContainer}>
                  <div className={styles2.SettingLabel}>
                    <label htmlFor="single-trx">
                      1 Email or account - 1 Transaction
                    </label>
                  </div>
                  <div className={styles2.SettingField}>
                    <InputToogle id={"single-trx"} refData={singleTrx} />
                  </div>
                </div>
                <div
                  className={`${styles2.TicketSettingContainer} ${
                    forEvtAct === "Onsite Event" ||
                    forEvtAct === "Online Event" ||
                    forEvtAct === "Hybrid Event"
                      ? "d-none"
                      : ""
                  }`}
                >
                  <div className={styles2.SettingLabel}>
                    <label htmlFor="enable-rsc">
                      Allow users to reschedule
                    </label>
                    <p>
                      Reschedule may not work for some tickets due to
                      availability
                    </p>
                  </div>
                  <div className={styles2.SettingField}>
                    <InputToogle
                      id={"enable-rsc"}
                      onChange={(e) => {
                        setEnableRscState(e.target.checked);
                      }}
                      refData={enRscToogle}
                    />
                  </div>
                </div>
                <div
                  className={`${styles2.TicketSettingContainer} ${
                    !enableRsc ||
                    forEvtAct === "Onsite Event" ||
                    forEvtAct === "Online Event" ||
                    forEvtAct === "Hybrid Event"
                      ? "d-none"
                      : ""
                  }`}
                >
                  <div className={styles2.SettingLabel}>
                    <span>
                      Maximum Days Reschedule Allowed{" "}
                      <span style={{ color: "red" }}>
                        (required min. 1 hari)
                      </span>
                    </span>
                    <p>Batas waktu ganti jadwal</p>
                  </div>
                  <div className={styles2.SettingField}>
                    <InputForm
                      type={"number"}
                      placeholder={0}
                      refData={maxLimitRsc}
                    />
                  </div>
                </div>
                <div className={`${styles2.TicketSettingContainer}`}>
                  <div className={styles2.SettingLabel}>
                    <label htmlFor="enable-refund">
                      Allow users to request refund
                    </label>
                    <p>
                      The refund process is not automatic. Rather, it is through
                      an approval process between the organizer and the
                      Agendakota.id admin regarding the refund request submitted
                      by the user.
                    </p>
                  </div>
                  <div className={styles2.SettingField}>
                    <InputToogle
                      id={"enable-refund"}
                      onChange={(e) => {
                        setEnableRefundState(e.target.checked);
                      }}
                      refData={enRefundToogle}
                    />
                  </div>
                </div>
                <div>
                  <InputImage5
                    style={{
                      aspectRatio: 1440 / 1028,
                      width: "215px",
                    }}
                    refData={seatMapGlobalImg}
                    refDelBtn={resetSeatMapGlobalImg}
                    defaultFile={defaultGlobalMap}
                    delExtFunction={clearSavedGlobalMap}
                    textMsg={
                      <div>
                        <div className={styles2.TitleInputImage}>
                          Add Global Seat Map
                        </div>
                        <div className={styles2.SubTitleInputImage}>
                          1440 : 1028 PNG or JPG Max 2 MB
                        </div>
                      </div>
                    }
                    fnSetAlert={setAlert}
                  />
                </div>
              </div>
              <div
                className={`${contentBody === "Order Form" ? "" : "d-none"}`}
              >
                <div className={styles2.Info}>
                  Atur data apa saja yang diperlukan untuk pembelian tiket event
                </div>
                <div className={styles2.TicketSettingContainer}>
                  <div className={styles2.SettingLabel}>
                    <label htmlFor="name-field">Nama</label>
                  </div>
                  <div className={styles2.SettingField}>
                    <InputToogle
                      id={"name-field"}
                      refData={(e) => {
                        fixedField.current[0] = e;
                      }}
                    />
                  </div>
                </div>
                <div className={styles2.TicketSettingContainer}>
                  <div className={styles2.SettingLabel}>
                    <label htmlFor="email-field">Email</label>
                  </div>
                  <div className={styles2.SettingField}>
                    <InputToogle
                      id={"email-field"}
                      refData={(e) => {
                        fixedField.current[1] = e;
                      }}
                    />
                  </div>
                </div>
                <div className={styles2.TicketSettingContainer}>
                  <div className={styles2.SettingLabel}>
                    <label htmlFor="phone-field">No. Handphone</label>
                  </div>
                  <div className={styles2.SettingField}>
                    <InputToogle
                      id={"phone-field"}
                      refData={(e) => {
                        fixedField.current[2] = e;
                      }}
                    />
                  </div>
                </div>
                <div className={styles2.TicketSettingContainer}>
                  <div className={styles2.SettingLabel}>
                    <label htmlFor="idcard-field">ID Card/ KTP</label>
                  </div>
                  <div className={styles2.SettingField}>
                    <InputToogle
                      id={"idcard-field"}
                      refData={(e) => {
                        fixedField.current[3] = e;
                      }}
                    />
                  </div>
                </div>
                <div className={styles2.Info}>
                  Atau tambahkan custom field yang lain
                </div>

                {layoutCustomForm.map((layout) => layout)}

                <FlatButton
                  title={"Tambah Field"}
                  icon={<BiPlusCircle />}
                  bgColor={"rgba(221, 0, 100, 0.08)"}
                  borderColor={"rgba(221, 0, 100, 0.08)"}
                  textColor={"#CA0C64"}
                  style={{ width: "100%" }}
                  center
                  fnOnClick={handleAddFieldForm}
                />
              </div>
            </div>
            <div className={`${titleState === "front" ? "d-none" : ""}`}>
              <div>
                <div
                  className={styles2.Info2}
                  style={{
                    marginLeft: "0px",
                    marginRight: "0px",
                  }}
                >
                  <div className={styles2.CmdField}>
                    <BiInfoCircle />
                  </div>

                  <p>(*) Semua yang bertanda bintang wajib diisi ya... !!!</p>
                </div>
                <Alert
                  type={alert.type}
                  isShow={alert.state}
                  setShowFn={() => {}}
                  message={alert.content}
                  closeBtn={false}
                />
                <div
                  className={`${
                    contentBody === "Tiket Gratis" ||
                    contentBody === "Tiket Berbayar" ||
                    contentBody === "Tiket Donasi" ||
                    contentBody === "View Ticket"
                      ? ""
                      : "d-none"
                  } ${styles2.TicketEditorContainer}`}
                >
                  {forEvtAct === "Onsite Event" ||
                  forEvtAct === "Online Event" ||
                  forEvtAct === "Hybrid Event" ? (
                    <img
                      style={{
                        aspectRatio: 1,
                        width: "260px",
                        height: "260px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      src={
                        process.env.REACT_APP_BACKEND_URL +
                        "/storage/ticket_covers/default.png"
                      }
                    />
                  ) : (
                    <InputImage4
                      style={{
                        aspectRatio: 1,
                        width: "260px",
                        height: "260px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      refDelBtn={resetCover}
                      refData={coverImg}
                      defaultFile={defaultCover}
                      textMsg={
                        <div>
                          <div className={styles2.TitleInputImage}>
                            Add Cover Picture
                          </div>
                          <div className={styles2.SubTitleInputImage}>
                            1:1 PNG or JPG Max 2 MB
                          </div>
                        </div>
                      }
                      fnSetAlert={setAlert}
                    />
                  )}
                  <div className={styles2.EditorRight}>
                    <div
                      className={`${styles2.TitleInputBox} ${
                        blankTitle ? styles2.DangerInput : ""
                      }`}
                    >
                      <InputForm
                        type={"text"}
                        placeholder={
                          forEvtAct === "Onsite Event" ||
                          forEvtAct === "Online Event" ||
                          forEvtAct === "Hybrid Event"
                            ? "Nama Tiket *"
                            : "Nama Program *"
                        }
                        className={styles2.InputTitle}
                        refData={title}
                        style={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                        }}
                        onInput={() => {
                          setBlankTitle(false);
                        }}
                      />
                    </div>
                    {forEvtAct === "Onsite Event" ||
                    forEvtAct === "Online Event" ||
                    forEvtAct === "Hybrid Event" ? (
                      <>
                        <div
                          className={`${styles2.DateGroup} ${
                            blankStart || blankEnd ? styles2.DangerInput : ""
                          }`}
                        >
                          <InputLabeled
                            type={"date"}
                            id={"start_date"}
                            placeholder={"Pilih tanggal & waktu"}
                            iconSvg={<BiCalendar />}
                            label={
                              <p
                                className={styles2.TextSecondary}
                                style={
                                  blankStart || blankEnd ? { color: "red" } : {}
                                }
                              >
                                Mulai *
                              </p>
                            }
                            style={{ boxShadow: "none", outline: "none" }}
                            refData={start}
                            min={new Date().toISOString().split("T")[0]}
                            max={endEvent ? endEvent.split("T")[0] : undefined}
                            fnOnChange={selectedStartSell}
                            fnOnInput={() => {
                              setBlankStart(false);
                            }}
                          />
                          <InputLabeled
                            type={"date"}
                            id={"end_date"}
                            placeholder={"Pilih tanggal & waktu"}
                            iconSvg={<BiCalendar />}
                            label={
                              <p
                                className={styles2.TextSecondary}
                                style={
                                  blankStart || blankEnd ? { color: "red" } : {}
                                }
                              >
                                Berakhir *
                              </p>
                            }
                            style={{ boxShadow: "none", outline: "none" }}
                            refData={end}
                            min={
                              startSell
                                ? startSell
                                : new Date().toISOString().split("T")[0]
                            }
                            max={endEvent ? endEvent.split("T")[0] : undefined}
                            fnOnInput={() => {
                              setBlankEnd(false);
                            }}
                          />
                        </div>
                        <InputLabeled
                          type={"number"}
                          id={"qty"}
                          placeholder={"0 Tiket"}
                          className={[blankQty ? styles2.DangerInput : ""]}
                          iconSvg={<BiGrid />}
                          label={
                            <p
                              className={styles2.TextSecondary}
                              style={blankQty ? { color: "red" } : {}}
                            >
                              Ketersediaan *
                            </p>
                          }
                          refData={qty}
                          fnOnInput={() => {
                            setBlankQty(false);
                          }}
                        />
                      </>
                    ) : (
                      <InputLabeled
                        type={"number"}
                        id={"qty"}
                        placeholder={"0 Tiket"}
                        className={[blankDailyLimit ? styles2.DangerInput : ""]}
                        iconSvg={<BiGrid />}
                        label={
                          <p
                            className={styles2.TextSecondary}
                            style={blankDailyLimit ? { color: "red" } : {}}
                          >
                            Ketersediaan / Hari *
                          </p>
                        }
                        refData={dailyLimitQty}
                        fnOnInput={() => {
                          setBlankDailyLimit(false);
                        }}
                      />
                    )}
                    <div
                      className={`${
                        contentBody === "Tiket Berbayar" ||
                        // contentBody === "Tiket Donasi" ||
                        (contentBody === "View Ticket" &&
                          defaultTypePrice == "2")
                          ? ""
                          : "d-none"
                      }`}
                    >
                      <InputLabeled
                        type={"currency"}
                        id={"price_in"}
                        placeholder={"Rp. 0"}
                        iconSvg={<BiMoney />}
                        className={[blankPrice ? styles2.DangerInput : ""]}
                        label={
                          <p
                            className={styles2.TextSecondary}
                            style={blankPrice ? { color: "red" } : {}}
                          >
                            {defaultTypePrice == "2"
                              ? "Harga Tiket *"
                              : "Min. Harga"}
                          </p>
                        }
                        refData={price}
                        fnOnInput={() => {
                          setBlankPrice(false);
                        }}
                      />
                    </div>
                    {contentBody === "View Ticket" ? (
                      <FieldBox iconSvg={<BiFilter />} label={"Tipe Tiket *"}>
                        <Select
                          options={[
                            { label: "Tiket Gratis", value: "1" },
                            { label: "Tiket Berbayar", value: "2" },
                            { label: "Tiket Donasi", value: "3" },
                          ]}
                          className="basic-multi-select"
                          styles={{
                            option: (basicStyle, state) => ({
                              ...basicStyle,
                              backgroundColor: state.isFocused
                                ? "#fecadf"
                                : "white",
                            }),
                            control: (basicStyle, state) => ({
                              ...basicStyle,
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
                            setDefTypePrice(e.value);
                          }}
                          value={
                            defaultTypePrice == "1"
                              ? { label: "Tiket Gratis", value: "1" }
                              : defaultTypePrice == "2"
                              ? { label: "Tiket Berbayar", value: "2" }
                              : { label: "Tiket Donasi", value: "3" }
                          }
                        />
                      </FieldBox>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className={styles2.BottomContainer}>
                  {console.log(evtCategory)}
                  {evtCategory && evtCategory.value === "Webinar" ? (
                    <InputLabeled
                      type={"text"}
                      id={"meet_link"}
                      placeholder={"https://"}
                      iconSvg={<BiLink />}
                      className={[
                        blankMeetLink ? styles2.DangerInput : "",
                        styles2.MeetLink,
                      ]}
                      label={
                        <p
                          className={styles2.TextSecondary}
                          style={blankMeetLink ? { color: "red" } : {}}
                        >
                          URL Meet / Zoom
                        </p>
                      }
                      refData={meetLink}
                      fnOnInput={(e) => {
                        setBlankMeetLink(!isValidUrl(e.target.value));
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <InputCheckRadio
                    id={"check-set-map"}
                    type={"checkbox"}
                    label={
                      <div>
                        Aktifkan Seat numbering &nbsp;
                        <p
                          className={styles2.TextSecondary}
                          style={{ whiteSpace: "normal" }}
                        >
                          Apabila aktif, anda perlu mengupload denah kursi dan
                          Ketersediaan kursi akan berdasarkan jumlah tiket
                        </p>
                      </div>
                    }
                    style={{ boxShadow: "none", outline: "none" }}
                    onChange={() => {
                      setSeatMapState(!inputSeatMap);
                    }}
                    refData={refInpuSeatMap}
                    // checked={inputSeatMap ? true : null}
                  />
                  <div
                    className={`${
                      refInpuSeatMap.current && refInpuSeatMap.current.checked
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <InputImage4
                      style={{
                        aspectRatio: 1440 / 1028,
                        width: "215px",
                      }}
                      refData={seatMapImg}
                      refDelBtn={resetSeatMapImg}
                      defaultFile={defaultMap}
                      textMsg={
                        <div>
                          <div className={styles2.TitleInputImage}>
                            Add Seat Map
                          </div>
                          <div className={styles2.SubTitleInputImage}>
                            1440 : 1028 PNG or JPG Max 2 MB
                          </div>
                        </div>
                      }
                      fnSetAlert={setAlert}
                    />
                  </div>
                  <label
                    htmlFor="desc"
                    style={
                      blankDesc
                        ? { marginBottom: -19, color: "red" }
                        : { marginBottom: -19 }
                    }
                  >
                    <b>Deskripsi *</b>
                  </label>
                  <div className={blankDesc ? styles2.DangerInput : ""}>
                    <CKEditor
                      data={desc}
                      onChange={(evt, editor) => {
                        setDesc(editor.getData());
                        setBlankDesc(false);
                      }}
                      editor={ClassicEditor}
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
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default PopUpTicket;
