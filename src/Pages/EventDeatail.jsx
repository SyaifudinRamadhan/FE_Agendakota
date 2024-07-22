import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorPage from "../partials/ErrorPage";
import styles from "./styles/EventDetail.module.css";
import {
  BiCalendar,
  BiCalendarWeek,
  BiCalendarX,
  BiCart,
  BiCheckCircle,
  BiChevronDown,
  BiChevronRight,
  BiChevronUp,
  BiError,
  BiInfoCircle,
  BiMap,
  BiMinus,
  BiMoney,
  BiPlus,
  BiPlusCircle,
  BiRightArrow,
  BiTime,
  BiX,
} from "react-icons/bi";
import Chip from "../components/Chip";
import Button from "../components/Button";
import config from "../config";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FieldBox from "../components/FieldBox";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import PopUp from "../partials/PopUp";
import PopUpSeatNumbers from "../partials/PopUpSeatNumbers";
import InputLabeled from "../components/InputLabeled";
import InputForm from "../components/InputForm";
import PopUpTrxFront from "../partials/PopUpTrxFront";
import { useNavigate } from "react-router-dom";
import stylesPopUpDate from "../partials/styles/PopUpTrx.module.css";
import Footer from "../partials/Footer";

const dummyData = [
  {
    count: 1,
    visitDate: 1710367901947,
    seatNumbers: [],
    customPrice: null,
    data: {
      id: "9b5cacee-c281-43e8-81f5-81911cb975da",
      event_id: "9b5cacee-4bfb-42ed-8140-96d2b90b2bb2",
      name: "Bayar Yach !!!",
      desc: "<p>gfvrfvyrf bfber erbfberf</p>",
      type_price: 2,
      price: 1000000,
      quantity: 100,
      start_date: "2024-02-18",
      end_date: "2025-02-18",
      seat_number: 0,
      max_purchase: 1,
      cover: "/storage/ticket_covers/tour_icon_1708310024png",
      seat_map: null,
      deleted: 0,
      created_at: "2024-02-18T02:30:06.000000Z",
      updated_at: "2024-03-12T16:06:03.000000Z",
    },
  },
  {
    count: 1,
    visitDate: 1711059101947,
    seatNumbers: [],
    customPrice: null,
    data: {
      id: "9b5cacee-c281-43e8-81f5-81911cb975da",
      event_id: "9b5cacee-4bfb-42ed-8140-96d2b90b2bb2",
      name: "Bayar Yach !!!",
      desc: "<p>gfvrfvyrf bfber erbfberf</p>",
      type_price: 2,
      price: 1000000,
      quantity: 100,
      start_date: "2024-02-18",
      end_date: "2025-02-18",
      seat_number: 0,
      max_purchase: 1,
      cover: "/storage/ticket_covers/tour_icon_1708310024png",
      seat_map: null,
      deleted: 0,
      created_at: "2024-02-18T02:30:06.000000Z",
      updated_at: "2024-03-12T16:06:03.000000Z",
    },
  },
  {
    count: 1,
    visitDate: 1711059114922,
    seatNumbers: [28],
    customPrice: null,
    data: {
      id: "9b8149bf-a1ec-4ab4-a1b6-4c63d23e057f",
      event_id: "9b5cacee-4bfb-42ed-8140-96d2b90b2bb2",
      name: "Wajib Bayar !!!",
      desc: "<p>lorem ipsum <strong>dolor sit</strong> amet</p>",
      type_price: 2,
      price: 1500000,
      quantity: 50,
      start_date: "2024-02-18",
      end_date: "2025-02-18",
      seat_number: 1,
      max_purchase: 1,
      cover:
        "/storage/ticket_covers/Screenshot 2024-02-23 at 19.40.02_1709795903png",
      seat_map:
        "/storage/seat_map_details/Screenshot 2024-02-23 at 21.23.15_1709795903png",
      deleted: 0,
      created_at: "2024-03-07T07:18:23.000000Z",
      updated_at: "2024-03-12T16:06:03.000000Z",
      available_seat_numbers: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      ],
    },
  },
  {
    count: 1,
    visitDate: 1710972714922,
    seatNumbers: [19],
    customPrice: null,
    data: {
      id: "9b8149bf-a1ec-4ab4-a1b6-4c63d23e057f",
      event_id: "9b5cacee-4bfb-42ed-8140-96d2b90b2bb2",
      name: "Wajib Bayar !!!",
      desc: "<p>lorem ipsum <strong>dolor sit</strong> amet</p>",
      type_price: 2,
      price: 1500000,
      quantity: 50,
      start_date: "2024-02-18",
      end_date: "2025-02-18",
      seat_number: 1,
      max_purchase: 1,
      cover:
        "/storage/ticket_covers/Screenshot 2024-02-23 at 19.40.02_1709795903png",
      seat_map:
        "/storage/seat_map_details/Screenshot 2024-02-23 at 21.23.15_1709795903png",
      deleted: 0,
      created_at: "2024-03-07T07:18:23.000000Z",
      updated_at: "2024-03-12T16:06:03.000000Z",
      available_seat_numbers: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      ],
    },
  },
  {
    count: 1,
    visitDate: 1710454325537,
    seatNumbers: [20],
    customPrice: "15000",
    data: {
      id: "9b8b8fd7-d498-47c9-94c6-a6927c60d9c1",
      event_id: "9b5cacee-4bfb-42ed-8140-96d2b90b2bb2",
      name: "Donasi Gan",
      desc: "<p>gefyub bfbru efirehfdtygf</p>",
      type_price: 3,
      price: 0,
      quantity: 25,
      start_date: "2024-02-18",
      end_date: "2025-02-18",
      seat_number: 1,
      max_purchase: 1,
      cover:
        "/storage/ticket_covers/Screenshot 2024-02-23 at 15.20.19_1710237160png",
      seat_map:
        "/storage/seat_map_details/Screenshot 2024-02-23 at 19.40.02_1710259549png",
      deleted: 0,
      created_at: "2024-03-12T09:52:40.000000Z",
      updated_at: "2024-03-12T16:06:03.000000Z",
      available_seat_numbers: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25,
      ],
    },
  },
  {
    count: 1,
    visitDate: 1710367925537,
    seatNumbers: [10],
    customPrice: "17000",
    data: {
      id: "9b8b8fd7-d498-47c9-94c6-a6927c60d9c1",
      event_id: "9b5cacee-4bfb-42ed-8140-96d2b90b2bb2",
      name: "Donasi Gan",
      desc: "<p>gefyub bfbru efirehfdtygf</p>",
      type_price: 3,
      price: 0,
      quantity: 25,
      start_date: "2024-02-18",
      end_date: "2025-02-18",
      seat_number: 1,
      max_purchase: 1,
      cover:
        "/storage/ticket_covers/Screenshot 2024-02-23 at 15.20.19_1710237160png",
      seat_map:
        "/storage/seat_map_details/Screenshot 2024-02-23 at 19.40.02_1710259549png",
      deleted: 0,
      created_at: "2024-03-12T09:52:40.000000Z",
      updated_at: "2024-03-12T16:06:03.000000Z",
      available_seat_numbers: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25,
      ],
    },
  },
];

const getViedeoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

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

const loadDetail = async ({ eventId }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/event/" + eventId,
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

const loadAvlDayQty = async ({ ticket_id, date }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/check-avl-ticket-daily-event",
      {
        ticket_id,
        date,
      },
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

const loadAvlDayQtys = async ({ ticketIds = [], dates = [] }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/check-avl-ticket-daily-events",
      {
        ticket_ids: ticketIds,
        dates: dates,
      },
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

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const EventDetail = ({ isLogin }) => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [errorState, setErrorState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [openWrapper, setWrapperState] = useState(false);
  const [windowsSize, setWindowSize] = useState(getWindowSize());
  const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
  const [ticketsViewData, setTicketsViewData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [lengthAddCart, setLengthAddCart] = useState(0);
  const [popUpAlert, setPopUpAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const [popUpSelectDate, setPopUpSelectDate] = useState({
    state: false,
    ticketId: null,
    data: null,
  });
  const [popUpSeatNumber, setPopUpSeatNumber] = useState({
    state: false,
    cartIndex: 0,
  });
  const [popUpTrx, setPopUpTrx] = useState(false);
  const [pageState, setPageState] = useState(0);
  const [openDetailDesc, setOpenDesc] = useState("");
  const [firstLoad, setFirstLoadState] = useState(false);
  const navigate = useNavigate();

  const handleOpenCart = (openWrapper) => {
    document.getElementsByTagName("body")[0].style.overflow = !openWrapper
      ? "hidden"
      : "unset";
    setWrapperState(!openWrapper);
  };

  const DOMReload = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 50);
    setCartData(cartData.map((data) => data));
    window.location.href = "#cartbox";
  };

  const handleAddCountView = (type, qty, id) => {
    if (
      type == 1 &&
      ticketsViewData[id].count < parseInt(qty) &&
      ticketsViewData[id].count <
        parseInt(ticketsViewData[id].data.max_purchase)
    ) {
      ticketsViewData[id].count += 1;
    } else if (type == 2 && ticketsViewData[id].count > 0) {
      ticketsViewData[id].count -= 1;
    }
    setTicketsViewData({ ...ticketsViewData });
  };

  const handleSelectDateView = (id, e) => {
    // console.log(e);
    let temp = ticketsViewData[id].visitDates;
    ticketsViewData[id].visitDates = {};
    e.forEach((dateObj) => {
      if (
        event.available_days.find(
          (avldt) => avldt.day === dateObj.format("ddd")
        )
      ) {
        ticketsViewData[id].visitDates[dateObj.format()] = {
          seatNumbers: temp[dateObj.format()]
            ? temp[dateObj.format()].seatNumbers
            : [],
          date: dateObj,
        };
      }
    });
    temp = null;
    setTicketsViewData({ ...ticketsViewData });
  };

  const handleDeleteDateViewXSeatNumber = (id, index) => {
    delete ticketsViewData[id].visitDates[index];
    setTicketsViewData({ ...ticketsViewData });
  };

  const handleAddToChart = (id, data) => {
    if (ticketsViewData[id]) {
      if (
        event.event.category === "Attraction" ||
        event.event.category === "Daily Activities" ||
        event.event.category === "Tour Travel (recurring)"
      ) {
        let tmp = [];
        let visitDates = Object.values(ticketsViewData[id].visitDates);
        if (visitDates.length === 0) {
          // setPopUpAlert({
          //   state: true,
          //   type: "danger",
          //   content: "Mohon pilih tanggal kunjungan anda dahulu",
          // });
          setPopUpSelectDate({
            state: true,
            ticketId: id,
            data: data,
          });
        } else {
          visitDates.forEach((dataTicket) => {
            if (cartData.length === 0) {
              tmp.push({
                count:
                  data.seat_number == 1 ? dataTicket.seatNumbers.length : 1,
                visitDate: dataTicket.date,
                seatNumbers: dataTicket.seatNumbers
                  ? dataTicket.seatNumbers
                  : [],
                customPrice: data.type_price == 3 ? 10000 : null,
                data,
              });
            } else if (
              cartData.filter(
                (cart) =>
                  cart.visitDate.format() === dataTicket.date.format() &&
                  cart.data.id === id
              ).length === 0
            ) {
              tmp.push({
                count:
                  data.seat_number == 1 ? dataTicket.seatNumbers.length : 1,
                visitDate: dataTicket.date,
                seatNumbers: dataTicket.seatNumbers
                  ? dataTicket.seatNumbers
                  : [],
                customPrice: data.type_price == 3 ? 10000 : null,
                data,
              });
            }
          });
          setLengthAddCart(tmp.length);
          setCartData(cartData.concat(tmp));
          // window.scrollTo(0, 0);
        }
      } else {
        if (cartData.length === 0) {
          setLengthAddCart(1);
          setCartData([
            {
              count:
                data.seat_number == 1
                  ? ticketsViewData[id].seatNumbers.length
                  : 1,
              visitDate: null,
              seatNumbers: ticketsViewData[id].seatNumbers,
              customPrice: data.type_price == 3 ? 10000 : null,
              data,
            },
          ]);
        } else if (
          cartData.filter((cart) => cart.data.id === id).length === 0
        ) {
          setLengthAddCart(1);
          setCartData(
            cartData.concat([
              {
                count:
                  data.seat_number == 1
                    ? ticketsViewData[id].seatNumbers.length
                    : 1,
                visitDate: null,
                seatNumbers: ticketsViewData[id].seatNumbers,
                customPrice: data.type_price == 3 ? 10000 : null,
                data,
              },
            ])
          );
        }
        // window.scrollTo(0, 0);
      }

      // if (!cartData) {
      // 	let tmp = {};
      // 	// tmp[id] = { count: (event.event.category === "Attraction" || event.event.category === "Daily Activities" || event.event.category === "Tour Travel (recurring)") && data.seat_number == 1 ? ticketsViewData[id], data };
      // 	setCartData(tmp);
      // } else if (!cartData[id]) {
      // 	cartData[id] = { count:  ticketsViewData[id].count, data };
      // 	setCartData({ ...cartData });
      // }
      ticketsViewData[id] = {
        count: 1,
        visitDates: {},
        seatNumbers: [],
        data: data,
      };
      setWrapperState(true);
      window.location.href = "#cartbox";
    }
  };

  const handleSelectDateCart = (id, e) => {
    if (
      cartData[id].visitDate.format() !== e.format() &&
      !cartData.find(
        (cart) =>
          cart.data.id === cartData[id].data.id &&
          cart.visitDate.format() === e.format()
      )
    ) {
      let tmp = {
        count: cartData[id].data.seat_number == 0 ? cartData[id].count : 0,
        visitDate: e,
        seatNumbers: [],
        customPrice: cartData[id].customPrice,
        data: cartData[id].data,
      };
      cartData[id] = tmp;
      tmp = null;
      DOMReload();
    }
  };

  const handleAddCountCart = (id, type) => {
    // console.log(
    //   cartData[id],
    //   cartData[id].data.max_purchase,
    //   cartData[id].data.quantity,
    //   cartData[id].count
    // );
    if (
      type == 1 &&
      cartData[id].count < parseInt(cartData[id].data.quantity) &&
      cartData[id].count < parseInt(cartData[id].data.max_purchase)
    ) {
      cartData[id].count += 1;
      DOMReload();
      // setCartData(cartData.map((data) => data));
    } else if (type == 2 && cartData[id].count > 1) {
      cartData[id].count -= 1;
      DOMReload();
      // setCartData(cartData.map((data) => data));
    } else if (type == 2 && cartData[id].count == 1) {
      cartData.splice(id, 1);
      DOMReload();
      // setCartData(cartData.map((data) => data));
    }
  };

  const handleChangeSeatNum = (newListSeatNum, id) => {
    cartData[id].seatNumbers = newListSeatNum;
    cartData[id].count = newListSeatNum.length;
    DOMReload();
  };

  const handleChangeCustomPrice = (newPrice, id) => {
    if (parseInt(newPrice) >= 10000) {
      cartData[id].customPrice = newPrice;
    }
  };

  const filterDateSelector = ({ date }) => {
    let props = {};
    let dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let index = 0;
    let indexDay = 0;
    // search index day of today from available days event, for get time limitation
    do {
      indexDay = event.available_days[index]
        ? dayMap.indexOf(event.available_days[index].day)
        : -1;
      index++;
    } while (indexDay < new Date().getDay() && index < dayMap.length);

    let limitTimeToday = null;
    let now = new Date();
    if (event.available_days[index - 1]) {
      limitTimeToday =
        event.available_days[index - 1].max_limit_time.split(":");
      limitTimeToday = new Date(
        new Date().setHours(
          limitTimeToday[0],
          limitTimeToday[1],
          limitTimeToday[2],
          0
        )
      );
    }

    if (
      !event.available_days
        .map((avldt) => avldt.day)
        .includes(date.format("ddd")) ||
      new Date(date.format()).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0) ||
      (limitTimeToday &&
        now.getDate() === parseInt(date.format("D")) &&
        now.getMonth() === parseInt(date.format("M")) - 1 &&
        now.getFullYear() === parseInt(date.format("YYYY")) &&
        now > limitTimeToday)
    ) {
      props.disabled = true;
    }
    return props;
  };

  const filterDateSelectorCart = (date, thisIndex, cartData) => {
    let props = {};
    let dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let index = 0;
    let indexDay = 0;
    // search index day of today from available days event, for get time limitation
    do {
      indexDay = dayMap.indexOf(event.available_days[index].day);
      index++;
    } while (indexDay < new Date().getDay());
    let limitTimeToday =
      event.available_days[index - 1].max_limit_time.split(":");
    let now = new Date();
    limitTimeToday = new Date(
      new Date().setHours(
        limitTimeToday[0],
        limitTimeToday[1],
        limitTimeToday[2],
        0
      )
    );
    if (
      !event.available_days
        .map((avldt) => avldt.day)
        .includes(date.format("ddd")) ||
      cartData.filter(
        (cart, index) =>
          index !== thisIndex &&
          cart.data.id === cartData[thisIndex].data.id &&
          cart.visitDate.format() === date.format()
      ).length > 0 ||
      new Date(date.format()).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0) ||
      (now.getDate() === parseInt(date.format("D")) &&
        now.getMonth() === parseInt(date.format("M")) - 1 &&
        now.getFullYear() === parseInt(date.format("YYYY")) &&
        now > limitTimeToday)
    ) {
      props.disabled = true;
    }
    return props;
  };

  const removeCart = (id) => {
    cartData.splice(id, 1);
    setCartData(cartData.map((data) => data));
  };

  const openTrxPopUp = () => {
    if (
      cartData.length > 0 &&
      cartData.reduce((current, acc) => {
        if (acc.count == 0) {
          return current && false;
        } else {
          return current && true;
        }
      }, true)
    ) {
      setPopUpTrx(true);
    } else {
      setPopUpAlert({
        state: true,
        type: "danger",
        content: (
          <span>
            Jumlah / kuantitas per tiket minimal 1, atau minimal memesan 1
            tempat duduk bagi tiket yang memiliki sistem tempat duduk.{" "}
            <b>Atau jika ingin membatalkan</b>, silahkan tekan tombol{" "}
            <b>silang (X) </b>
            di samping tombol <b>pilih tempat duduk</b>
          </span>
        ),
      });
    }
  };

  const resetAlert = (timeout) => {
    setTimeout(() => {
      setPopUpAlert({
        state: false,
        type: "",
        content: "",
      });
    }, timeout);
  };

  useEffect(() => {
    if (
      cartData.length > 0 &&
      (event.event.category === "Attraction" ||
        event.event.category === "Daily Activities" ||
        event.event.category === "Tour Travel (recurring)")
    ) {
      loadAvlDayQtys({
        ticketIds: cartData.map((cart) => cart.data.id),
        dates: cartData.map((cart) => cart.visitDate.format()),
      }).then((res) => {
        if (res.status === 200) {
          let nullDate = "";
          let zeroQtyIndexs = [];
          for (let i = 0; i < cartData.length; i++) {
            if (
              cartData[i].data.quantity > res.data.tickets[i].quantity &&
              cartData[i].count > res.data.tickets[i].quantity
            ) {
              cartData[i].count = res.data.tickets[i].quantity;
            }
            if (res.data.tickets[i].quantity === 0) {
              if (nullDate === "") {
                nullDate = `"${cartData[i].data.name}" tanggal (${cartData[
                  i
                ].visitDate.format("dd-MM-YYYY")}`;
              } else {
                nullDate += `${
                  cartData[i - 1].data.name != cartData[i].data.name
                    ? `), "${cartData[i].data.name}" tanggal (`
                    : ", "
                }${cartData[i].visitDate.format("dd-MM-YYYY")}${
                  i === cartData.length - 1 ? ")" : ""
                }`;
              }
              zeroQtyIndexs.push(i);
              cartData[i].seatNumbers = [];
            }
            cartData[i].data.quantity = res.data.tickets[i].quantity;
          }

          if (nullDate !== "") {
            zeroQtyIndexs.forEach((zIndex) => {
              cartData.splice(zIndex, 1);
            });
            setCartData([...cartData]);
            setPopUpAlert({
              state: true,
              type: "danger",
              content: `Mohon maaf. Ketersediaan tiket ${nullDate} sudah habis !`,
            });
          }
          // This re-set lengthAddCart state for refresh view data
          let lnAddChart = lengthAddCart;
          setLengthAddCart(0);
          setTimeout(() => {
            setLengthAddCart(lnAddChart);
          }, 50);
        } else {
          cartData.splice(cartData.length - lengthAddCart, lengthAddCart);
          console.log(cartData, cartData.length - lengthAddCart, lengthAddCart);
          setPopUpAlert({
            state: true,
            type: "danger",
            content:
              res.status === 404
                ? "Mohon maaf, tiket ini sudah tidak aktif atau sudah dihapus oleh penyelenggara !"
                : "Mohon maaf. Terjadi kesalahan server saat menambahkan keranjang. Mohon coba lagi !",
          });
        }
      });
    }
    window.location.href = "#cartbox";
  }, [cartData]);

  useEffect(() => {
    if (!event && !errorState) {
      loadDetail({ eventId: id }).then((res) => {
        if (res.status === 200) {
          let start = new Date(
            res.data.event.start_date + " " + res.data.event.start_time
          );
          let end = new Date(
            res.data.event.end_date + " " + res.data.event.end_time
          );
          setStart(
            `${config.days[start.getDay()]}, ${start.getDate()} ${
              config.months[start.getMonth()]
            } ${start.getFullYear()} | ${start
              .getHours()
              .toString()
              .padStart(2, "0")}:${start
              .getMinutes()
              .toString()
              .padStart(2, "0")} WIB`
          );
          setEnd(
            `${config.days[end.getDay()]}, ${end.getDate()} ${
              config.months[end.getMonth()]
            } ${end.getFullYear()} | ${end
              .getHours()
              .toString()
              .padStart(2, "0")}:${end
              .getMinutes()
              .toString()
              .padStart(2, "0")} WIB`
          );
          setEvent(res.data);
          setLoading(false);
        } else {
          setErrorState(true);
          setLoading(false);
        }
      });
    }
  }, [event, errorState]);

  useEffect(() => {
    if (event) {
      let oms = document.getElementsByTagName("oembed");
      let medias = document.getElementsByClassName("media");
      for (let index = 0; index < oms.length; index++) {
        let url =
          "https://www.youtube.com/embed/" +
          getViedeoId(oms[index].getAttribute("url"));
        setTimeout(() => {
          medias[
            index
          ].innerHTML = `<iframe style="width: 100%; aspect-ratio: 5 / 3;" src="${url}" />`;
        }, 50);
        console.log(url);
      }
    }
    if (event && event.event.tickets) {
      let ticketsCount = {};
      event.event.tickets.forEach((ticket) => {
        ticketsCount[ticket.id] = {
          count: 1,
          visitDates: {},
          seatNumbers: [],
          data: ticket,
        };
      });
      setTicketsViewData(ticketsCount);

      document.title = "Agendakota | " + event.event.name;
      // change favicon
      // document.getElementsByTagName("link")[0].href =
      //   process.env.REACT_APP_BACKEND_URL + event.event.logo;
      // document.getElementsByTagName("link")[2].href =
      //   process.env.REACT_APP_BACKEND_URL + event.event.logo;
      // // change meta description content
      // document.getElementsByTagName("meta")[2].content = event.event.desc;
    }
  }, [event]);

  useEffect(() => {
    if (windowsSize.innerWidth > 992 && openWrapper) {
      document.getElementsByTagName("body")[0].style.overflow = "unset";
    } else if (windowsSize.innerWidth <= 992 && openWrapper) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
  }, [windowsSize]);

  useEffect(() => {
    const handleChangeWindowSize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleChangeWindowSize);

    return () => {
      window.removeEventListener("resize", handleChangeWindowSize);
    };
  });

  return (
    <div className="content">
      {popUpTrx ? (
        <PopUpTrxFront
          fnSetActive={setPopUpTrx}
          cartData={cartData}
          eventData={{ ...event.event, available_days: event.available_days }}
          isLogin={isLogin}
        />
      ) : (
        <></>
      )}
      {popUpSeatNumber.state ? (
        <PopUpSeatNumbers
          fnSetActive={() => {
            setPopUpSeatNumber({
              state: false,
              cartIndex: 0,
            });
          }}
          selectedSeatNumbers={cartData[popUpSeatNumber.cartIndex].seatNumbers}
          ticket={cartData[popUpSeatNumber.cartIndex].data}
          visitDate={cartData[popUpSeatNumber.cartIndex].visitDate}
          fnRenewSeatNum={(newList) => {
            handleChangeSeatNum(newList, popUpSeatNumber.cartIndex);
          }}
          fnRenewTicketData={(newTicketData) => {
            cartData[popUpSeatNumber.cartIndex].data = newTicketData;
          }}
          customPriceValue={cartData[popUpSeatNumber.cartIndex].customPrice}
        />
      ) : (
        <></>
      )}
      {popUpSelectDate.state ? (
        <PopUp
          isActive
          setActiveFn={() => {
            setPopUpSelectDate({
              state: false,
              ticketId: null,
              data: null,
            });
          }}
          classNames={{
            wrapper: [stylesPopUpDate.PopUpWrapper],
            modalDialog: [stylesPopUpDate.ModalDialog],
            popUpBox: [stylesPopUpDate.PopUpBox],
            header: [],
            content: [stylesPopUpDate.PopUpContent],
          }}
          customTitle={
            <div className={stylesPopUpDate.HeaderBox}>
              <div className={stylesPopUpDate.HeaderTitle}>
                <div className={stylesPopUpDate.Title}>Tanggal Kunjungan</div>
                <div className={stylesPopUpDate.Desc}>
                  Pilih tanggal kunjungan event anda !!!
                </div>
              </div>
            </div>
          }
          title=""
          customStyleWrapper={{ height: "calc(100% - 71px)" }}
          width="35%"
          content={
            <div className={styles.PopUpDate} style={{ height: "100%" }}>
              {/* <div className={styles.AlertContent}>
                Pilih tanggal kunjungan dulu yuk !!!
              </div> */}
              <Calendar
                mapDays={filterDateSelector}
                multiple
                value={
                  ticketsViewData
                    ? Object.values(
                        ticketsViewData[popUpSelectDate.ticketId].visitDates
                      ).map((dateobj) => dateobj.date)
                    : null
                }
                onChange={(e) => {
                  handleSelectDateView(popUpSelectDate.ticketId, e);
                }}
                placeholder="Pilih tanggal kunjungan"
                style={{
                  border: "none",
                  margin: "auto",
                }}
                id={`cal-picker-${popUpSelectDate.ticketId}`}
              />
              <div
                className={styles.PopUpGroupButton}
                style={{ marginTop: "auto" }}
              >
                <Button
                  title={"Batal"}
                  bgColor={"#fff"}
                  textColor={"#ca0c64"}
                  borderColor={"#ca0c64"}
                  fnOnClick={() => {
                    setPopUpSelectDate({
                      state: false,
                      ticketId: null,
                      data: null,
                    });
                  }}
                />
                <Button
                  title={"Lanjutkam"}
                  fnOnClick={() => {
                    handleAddToChart(
                      popUpSelectDate.ticketId,
                      popUpSelectDate.data
                    );
                    setPopUpSelectDate({
                      state: false,
                      ticketId: null,
                      data: null,
                    });
                  }}
                />
              </div>
            </div>
          }
        />
      ) : (
        <></>
      )}
      {popUpAlert.state ? (
        <PopUp
          isActive
          setActiveFn={() => {
            setPopUpAlert({ state: false, type: "", content: "" });
          }}
          title="Notifikasi Transaksi"
          customStyleWrapper={{ height: "calc(100% - 71px)" }}
          content={
            <div className={styles.PopUpAlert}>
              {popUpAlert.type === "danger" ? (
                <BiError color="#ca0c64" />
              ) : popUpAlert.type === "warning" ? (
                <BiInfoCircle color="yellow" />
              ) : (
                <BiCheckCircle color="green" />
              )}
              <div className={styles.AlertContent}>{popUpAlert.content}</div>
              <Button
                title={"Ok"}
                fnOnClick={() => {
                  setPopUpAlert({ state: false, type: "", content: "" });
                }}
              />
            </div>
          }
          width="45%"
        />
      ) : (
        <></>
      )}
      {(!event && !errorState) || loading ? (
        <div style={{ marginTop: "100px", marginBottom: "100px" }}>
          <Loading />
        </div>
      ) : errorState ? (
        <ErrorPage
          customTitle={"Gagal Memuat, atau Event Tidak Tersedia"}
          customMessage={
            "Terjadi masalah saat menghubungi server atau data yang dimuat tidak tersedia. Pastikan url sudah benar dan coba muat ulang halaman ini"
          }
        />
      ) : (
        <div className={styles.MainContainer}>
          {!openWrapper ? (
            cartData.length === 0 ? (
              <a href="#tickets">
                <div
                  className={styles.FloatCartIcon}
                  onClick={() => {
                    setPageState(1);
                  }}
                >
                  <BiCart />
                  <div>Beli Tiket</div>
                </div>
              </a>
            ) : (
              <div
                className={styles.FloatCartIcon}
                onClick={() => {
                  handleOpenCart(openWrapper);
                }}
              >
                <BiCart />
                <div>Beli Tiket</div>
              </div>
            )
          ) : (
            <></>
          )}
          {openWrapper ? (
            <div className={styles.CollapseWrapper}>
              <div className={styles.CollapseSidebar}>
                <div className={styles.CollapseSidebarLeft}>
                  <div
                    className={styles.CloseSidebar}
                    onClick={() => {
                      handleOpenCart(openWrapper);
                    }}
                  >
                    <BiChevronRight />
                  </div>
                </div>
                <div className={styles.CollapseSidebarRight}>
                  <div className={styles.CartBox}>
                    <div className={styles.CartBoxTitle}>Keranjang Tiket</div>
                    {cartData.length > 0 ? (
                      <>
                        {cartData.map((cart, index) => {
                          return (
                            <div className={styles.TicketCard}>
                              <div className={styles.TicketTop}>
                                <div className={styles.TicketTitle}>
                                  <div>{cart.data.name}</div>
                                </div>
                                <div className={styles.TicketPrice}>
                                  <div className={styles.TextPrimary}>
                                    {cart.data.type_price == 1
                                      ? "Gratis"
                                      : cart.data.type_price == 2
                                      ? `Rp. ${numberFormat.format(
                                          cart.data.price
                                        )},-`
                                      : `Mulai dari Rp.${numberFormat.format(
                                          10000
                                        )},-`}
                                  </div>
                                  <div className={styles.TextBasic}>x</div>
                                  <div className={styles.TextBasic}>
                                    {cart.count}
                                  </div>
                                </div>
                                <div
                                  className={`${styles.TicketPrice} ${styles.TextSecondary}`}
                                >
                                  Max. Beli{" "}
                                  {cart.data.max_purchase < cart.data.quantity
                                    ? cart.data.max_purchase
                                    : cart.data.quantity}
                                </div>
                                {cart.data.type_price == 3 ? (
                                  <InputLabeled
                                    iconSvg={<BiMoney />}
                                    placeholder={"Harga suka-suka"}
                                    min={10000}
                                    type={"number"}
                                    label={"Harga"}
                                    required
                                    id={"custom-price0-" + index}
                                    value={cart.customPrice}
                                    fnOnInput={(e) => {
                                      handleChangeCustomPrice(
                                        e.target.value,
                                        index
                                      );
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                                {cart.seatNumbers.length > 0 ? (
                                  <div
                                    className={`${styles.TicketDesc} ${styles.TextSecondary}`}
                                  >
                                    Tempat Duduk :{" "}
                                    {cart.seatNumbers.map((num) => {
                                      return num + ", ";
                                    })}
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {event.event.category === "Attraction" ||
                                event.event.category === "Daily Activities" ||
                                event.event.category ===
                                  "Tour Travel (recurring)" ? (
                                  <div className={styles.DateSelectorGroup}>
                                    <div className={styles.DateSelector}>
                                      {/* selector date  */}
                                      <label
                                        htmlFor={`dt-picker-cart-1-${
                                          cart.data.id
                                        }-${cart.visitDate.format()}`}
                                      >
                                        <BiCalendar />
                                      </label>
                                      <DatePicker
                                        mapDays={({ date }) =>
                                          filterDateSelectorCart(
                                            date,
                                            index,
                                            cartData
                                          )
                                        }
                                        value={cart.visitDate}
                                        onChange={(e) => {
                                          handleSelectDateCart(index, e);
                                        }}
                                        placeholder="Pilih tanggal kunjungan"
                                        style={{
                                          border: "none",
                                          width: "100%",
                                        }}
                                        id={`dt-picker-cart-1-${
                                          cart.data.id
                                        }-${cart.visitDate.format()}`}
                                      />
                                    </div>
                                    <Button
                                      title={"Ganti Tanggal Kunjungan"}
                                      bgColor={"white"}
                                      borderColor={"#ca0c64"}
                                      textColor={"#ca0c64"}
                                      style={{
                                        padding: "5px",
                                        width: "unset",
                                        // whiteSpace: "nowrap",
                                      }}
                                      fnOnClick={() => {
                                        document
                                          .getElementById(
                                            `dt-picker-cart-1-${
                                              cart.data.id
                                            }-${cart.visitDate.format()}`
                                          )
                                          .focus();
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className={styles.TicketDivider}>
                                <div className={styles.Dashed}></div>
                                <div className={styles.HalfCircleLeft}></div>
                                <div className={styles.HalfCircleRight}></div>
                              </div>
                              <div className={styles.TicketBottom}>
                                {cart.data.seat_number == 0 ? (
                                  <>
                                    <div className={styles.TicketTime}>
                                      Jumlah
                                    </div>
                                    <div
                                      className={styles.ActionTicket}
                                      style={{ marginLeft: "auto" }}
                                      onClick={() => {
                                        handleAddCountCart(index, 2);
                                      }}
                                    >
                                      <BiMinus />
                                    </div>
                                    <div className={styles.TicketCount}>
                                      {cart.count}
                                    </div>
                                    <div
                                      className={styles.ActionTicket}
                                      onClick={() => {
                                        handleAddCountCart(index, 1);
                                      }}
                                    >
                                      <BiPlus />
                                    </div>
                                  </>
                                ) : (event.event.category === "Attraction" ||
                                    event.event.category ===
                                      "Daily Activities" ||
                                    event.event.category ===
                                      "Tour Travel (recurring)") &&
                                  cart.data.seat_number == 1 ? (
                                  <div className={styles.RenderDates}>
                                    <div className={styles.DateSeatMap}>
                                      <div className={styles.Date}>
                                        {new Date(
                                          cart.visitDate.format()
                                        ).getDate()}
                                        -
                                        {new Date(
                                          cart.visitDate.format()
                                        ).getMonth() + 1}
                                        -
                                        {new Date(
                                          cart.visitDate.format()
                                        ).getFullYear()}
                                      </div>
                                      <Button
                                        title={
                                          cart.seatNumbers.length > 0
                                            ? "Ubah Tempat Duduk"
                                            : "Pilih Tempat Duduk"
                                        }
                                        bgColor={"white"}
                                        borderColor={"#ca0c64"}
                                        textColor={"#ca0c64"}
                                        style={{
                                          padding: "5px",
                                          width: "unset",
                                          marginLeft: "auto",
                                        }}
                                        fnOnClick={() => {
                                          setPopUpSeatNumber({
                                            state: true,
                                            cartIndex: index,
                                          });
                                        }}
                                      />
                                      <Button
                                        title={<BiX />}
                                        bgColor={"red"}
                                        borderColor={"red"}
                                        textColor={"#fff"}
                                        style={{
                                          padding: "5px",
                                          width: "unset",
                                          marginLeft: "5px",
                                        }}
                                        fnOnClick={() => {
                                          // handleDeleteDateViewXSeatNumber(
                                          // 	ticket.id,
                                          // 	dateObj.date.format()
                                          // );
                                          removeCart(index);
                                        }}
                                      />
                                    </div>
                                  </div>
                                ) : cart.data.seat_number == 1 ? (
                                  <div className={styles.RenderDates}>
                                    {/* selector seat map */}
                                    <div className={styles.DateSeatMap}>
                                      <div></div>
                                      <Button
                                        title={
                                          cart.seatNumbers.length > 0
                                            ? "Ubah Tempat Duduk"
                                            : "Pilih Tempat Duduk"
                                        }
                                        bgColor={"white"}
                                        borderColor={"#ca0c64"}
                                        textColor={"#ca0c64"}
                                        style={{
                                          padding: "5px",
                                          width: "unset",
                                          marginLeft: "auto",
                                        }}
                                        fnOnClick={() => {
                                          setPopUpSeatNumber({
                                            state: true,
                                            cartIndex: index,
                                          });
                                        }}
                                      />
                                      <Button
                                        title={<BiX />}
                                        bgColor={"red"}
                                        borderColor={"red"}
                                        textColor={"#fff"}
                                        style={{
                                          padding: "5px",
                                          width: "unset",
                                          marginLeft: "5px",
                                        }}
                                        fnOnClick={() => {
                                          // handleDeleteDateViewXSeatNumber(
                                          // 	ticket.id,
                                          // 	dateObj.date.format()
                                          // );
                                          removeCart(index);
                                        }}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        <a
                          href="#tickets"
                          style={{
                            textDecoration: "none",
                            marginTop: "20px",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                          onClick={() => {
                            handleOpenCart(openWrapper);
                          }}
                        >
                          <Button
                            icon={<BiPlusCircle />}
                            title={"Tambah Tiket"}
                            style={{
                              width: "150px",
                            }}
                          />
                        </a>
                      </>
                    ) : (
                      <>
                        <div
                          className={styles.CartBlank}
                          style={{ marginBottom: "10px" }}
                        >
                          <img src="/images/blank_events.png" alt="" />
                          <div>Yuk pilih tiket dulu !</div>
                        </div>
                        <a
                          href="#tickets"
                          style={{
                            textDecoration: "none",
                            marginBottom: "auto",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                          onClick={() => {
                            handleOpenCart(openWrapper);
                            setPageState(1);
                          }}
                        >
                          <Button
                            title={"Pilih Tiket"}
                            style={{
                              width: "90px",
                            }}
                          />
                        </a>
                      </>
                    )}
                    {/* Blank tickets */}
                    {/* <div className={styles.CartBlank}>
                  <img src="/images/blank_events.png" alt="" />
                  <div>Yuk pilih tiket dulu !</div>
                </div> */}
                    <div className={styles.CartSubTotal}>
                      <hr />
                      <div>
                        <b>Subtotal</b>
                        <p className={styles.SubTotalNum}>
                          Rp.
                          {numberFormat.format(
                            cartData.reduce((currentVal, prevVal) => {
                              if (prevVal.customPrice) {
                                return (
                                  currentVal +
                                  parseInt(prevVal.customPrice) *
                                    parseInt(prevVal.count)
                                );
                              } else {
                                return (
                                  currentVal +
                                  parseInt(prevVal.data.price) *
                                    parseInt(prevVal.count)
                                );
                              }
                            }, 0)
                          )}
                          ,-
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------- */}
                  <Button
                    title={"Lanjutkan Pembayaran"}
                    center
                    style={{ width: "100%", marginTop: "20px" }}
                    fnOnClick={openTrxPopUp}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className={styles.NavPane}>
            <p
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </p>
            <BiChevronRight />
            <p
              onClick={() => {
                navigate("/explore");
              }}
            >
              Explore
            </p>
            <BiChevronRight />
            <p
              className={styles.MainNavPane}
              onClick={() => {
                setLoading(true);
                setEvent(null);
              }}
            >
              <b>{event.event.name}</b>
            </p>
          </div>
          <div className={styles.SplitPanel}>
            <div className={styles.LeftPanel}>
              <div className={styles.MainBanner}>
                <img
                  src={process.env.REACT_APP_BACKEND_URL + event.event.logo}
                  alt=""
                />
              </div>
              <div className={`${styles.RightInfo} ${styles.CollapseInfo}`}>
                <h5 className={styles.InfoTitle}>{event.event.name}</h5>
                {/* <p className={styles.Address}>
                  {event.event.location.split("<p>").length === 1
                    ? event.event.location +
                      ` ${event.event.city}, ${event.event.province}`
                    : event.event.location.split("<p>")[1].split("</p>")[0] +
                      ` ${event.event.city}, ${event.event.province}`}
                </p> */}
                <div className={styles.BoxAddress}>
                  <BiMap />
                  {/* <p className={styles.Address}>
                    {event.event.location.split("<p>").length === 1
                      ? event.event.location +
                        ` ${event.event.city}, ${event.event.province}`
                      : event.event.location.split("<p>")[1].split("</p>")[0] +
                        ` ${event.event.city}, ${event.event.province}`}
                  </p> */}
                  <p
                    className={styles.Address}
                    dangerouslySetInnerHTML={{
                      __html:
                        event.event.location +
                        `, ${event.event.city}, ${event.event.province}`,
                    }}
                  ></p>
                </div>
                <div className={styles.BoxTime}>
                  {event.event.category !== "Attraction" &&
                  event.event.category !== "Daily Activities" &&
                  event.event.category !== "Tour Travel (recurring)" ? (
                    start.split("|")[0] === end.split("|")[0] ? (
                      <>
                        <div className={styles.Time}>
                          <div className={styles.Date}>
                            <BiCalendar />
                            <div>{start.split("|")[0]}</div>
                          </div>
                        </div>
                        <div className={styles.Time}>
                          <div className={styles.Date}>
                            <BiTime />
                            <div>
                              {start.split("|")[1]} - {end.split("|")[1]}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.Time}>
                          <div className={styles.Date}>
                            <BiCalendar />
                            <div>{start.split("|")[0]}</div>
                          </div>
                          <div className={styles.Clock}>
                            {/* <BiTime /> */}
                            <div>&nbsp;|&nbsp;</div>
                            <div>{start.split("|")[1]}</div>
                          </div>
                        </div>
                        <div className={styles.Time}>
                          <div className={styles.Date}>
                            <BiCalendar />
                            <div>{end.split("|")[0]}</div>
                          </div>
                          <div className={styles.Clock}>
                            {/* <BiTime /> */}
                            <div>&nbsp;|&nbsp;</div>
                            <div>{end.split("|")[1]}</div>
                          </div>
                        </div>
                      </>
                    )
                  ) : (
                    event.available_days.map((avldt, index) => {
                      // return <p className={styles.Time}>{avldt}</p>;
                      return (
                        <div id={index} className={styles.Time}>
                          <BiCalendarX
                            style={{
                              fontSize: "16px",
                              marginRight: "10px",
                              marginTop: "auto",
                              marginBottom: "auto",
                            }}
                          />
                          <p className={styles.Date}>
                            {config.dayEnToInd[avldt.day]}
                          </p>
                          <p className={styles.Clock}>
                            {avldt.start_time.slice(0, 5).toString()}
                            {" - "}
                            {avldt.max_limit_time.slice(0, 5)} WIB
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className={styles.FooterInfo}>
                  <div
                    className={styles.InfoOrg}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(
                        "/organization-profile/" + event.organization.id
                      );
                    }}
                  >
                    <img
                      src={
                        process.env.REACT_APP_BACKEND_URL +
                        event.organization.photo
                      }
                      alt=""
                    />
                    <p>{event.organization.name}</p>
                    {event.organization.legality &&
                    event.organization.legality.status == 1 ? (
                      <img
                        src="/images/verify.png"
                        style={{
                          color: "green",
                          width: "23px",
                          height: "23px",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.Navigation}>
                <a href="#Desc">
                  <div
                    className={`${styles.NavBtn} ${
                      pageState === 0 ? styles.NavBtnActive : ""
                    }`}
                    onClick={() => {
                      setPageState(0);
                    }}
                  >
                    Deskripsi
                  </div>
                </a>
                <a href="#tickets">
                  <div
                    className={`${styles.NavBtn} ${
                      pageState === 1 ? styles.NavBtnActive : ""
                    }`}
                    onClick={() => {
                      setPageState(1);
                    }}
                  >
                    Tiket &nbsp;
                    <span style={{ color: "#8B8B8B" }}>
                      {event.event.tickets ? event.event.tickets.length : 0}
                    </span>
                  </div>
                </a>
                {/* <a href="#rundowns">
									<div className={`${styles.NavBtn}`}>Rundown</div>
								</a> */}
                <a href="#snk">
                  <div
                    className={`${styles.NavBtn} ${
                      pageState === 2 ? styles.NavBtnActive : ""
                    }`}
                    onClick={() => {
                      setPageState(2);
                    }}
                  >
                    Syarat & Ketentuan
                  </div>
                </a>
              </div>
              <div
                id="Desc"
                className={styles.GroupContent}
                style={pageState === 0 ? {} : { display: "none" }}
              >
                <div className={styles.GroupTitle}>Deskripsi</div>
                <div className={styles.GroupContentData}>
                  <div
                    dangerouslySetInnerHTML={{ __html: event.event.desc }}
                  ></div>
                  {event.event.seat_map ? (
                    <img
                      src={
                        process.env.REACT_APP_BACKEND_URL + event.event.seat_map
                      }
                      className={styles.GlobalSeatMap}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* <div id="rundowns" className={styles.GroupContent}>
								<div className={styles.GroupTitle}>Rundown</div>
							</div> */}
              <div
                id="snk"
                className={styles.GroupContent}
                style={pageState === 2 ? {} : { display: "none" }}
              >
                <div className={styles.GroupTitle}>Syarat & Ketentuan</div>
                <div
                  className={styles.GroupContentData}
                  dangerouslySetInnerHTML={{ __html: event.event.snk }}
                ></div>
              </div>
              <div
                id="tickets"
                className={styles.GroupContent}
                style={pageState === 1 ? {} : { display: "none" }}
              >
                <div className={styles.GroupTitle}>Tiket</div>
                {/* Ticket */}
                {event.event.tickets && event.event.tickets.length > 0 ? (
                  event.event.tickets.map((ticket) => {
                    return (
                      <div className={styles.TicketBox}>
                        <div
                          className={styles.TicketCard}
                          style={
                            event.event.category !== "Attraction" &&
                            event.event.category !== "Daily Activities" &&
                            event.event.category !==
                              "Tour Travel (recurring)" &&
                            ticket.quantity === 0
                              ? { opacity: "0.5" }
                              : {}
                          }
                        >
                          <div className={styles.TicketSplit}>
                            {event.event.category === "Attraction" ||
                            event.event.category === "Daily Activities" ||
                            event.event.category ===
                              "Tour Travel (recurring)" ? (
                              <div className={styles.CoverBox}>
                                <img
                                  src={
                                    process.env.REACT_APP_BACKEND_URL +
                                    ticket.cover
                                  }
                                  alt=""
                                  srcset=""
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                            <div
                              className={styles.TicketTop}
                              // style={
                              //   event.event.category === "Attraction" ||
                              //   event.event.category === "Daily Activities" ||
                              //   event.event.category ===
                              //     "Tour Travel (recurring)"
                              //     ? { width: "calc(100% - 85px)" }
                              //     : {}
                              // }
                            >
                              <div className={styles.TicketTitle}>
                                <div
                                // style={{ maxWidth: "calc(100% - 90px)" }}
                                >
                                  {ticket.name}
                                </div>
                                {ticket.seat_number == 0 &&
                                event.event.category !== "Attraction" &&
                                event.event.category !== "Daily Activities" &&
                                event.event.category !==
                                  "Tour Travel (recurring)" ? (
                                  <>
                                    {/* <div
																			className={styles.ActionTicket}
																			style={{ marginLeft: "auto" }}
																			onClick={() => {
																				handleAddCountView(
																					2,
																					ticket.quantity,
																					ticket.id
																				);
																			}}
																		>
																			<BiMinus />
																		</div>
																		<div className={styles.TicketCount}>
																			{ticketsViewData
																				? ticketsViewData[ticket.id].count
																				: 1}
																		</div>
																		<div
																			className={styles.ActionTicket}
																			onClick={() => {
																				handleAddCountView(
																					1,
																					ticket.quantity,
																					ticket.id
																				);
																			}}
																		>
																			<BiPlus />
																		</div> */}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className={styles.TicketPrice}>
                                <div className={styles.TextPrimary}>
                                  {ticket.type_price == 1
                                    ? "Gratis"
                                    : ticket.type_price == 2
                                    ? `Rp. ${numberFormat.format(
                                        ticket.price
                                      )},-`
                                    : `Mulai dari Rp.${numberFormat.format(
                                        10000
                                      )},-`}
                                </div>
                                <div className={styles.TextSecondary}>|</div>
                                <div className={styles.TextSecondary}>
                                  {(event.event.category === "Attraction" ||
                                    event.event.category ===
                                      "Daily Activities" ||
                                    event.event.category ===
                                      "Tour Travel (recurring)") &&
                                  ticket.quantity === 0
                                    ? "Hari Ini Tersedia"
                                    : event.event.category !== "Attraction" &&
                                      event.event.category !==
                                        "Daily Activities" &&
                                      event.event.category !==
                                        "Tour Travel (recurring)" &&
                                      ticket.quantity === 0
                                    ? ""
                                    : "Tiket Tersedia"}{" "}
                                  {/* <span style={{ color: "#000" }}>
																		{ticket.quantity}
																	</span> */}
                                </div>
                                <div className={styles.TextBasic}>
                                  {event.event.category !== "Attraction" &&
                                  event.event.category !== "Daily Activities" &&
                                  event.event.category !==
                                    "Tour Travel (recurring)" &&
                                  ticket.quantity === 0
                                    ? "Sold Out"
                                    : ticket.quantity}
                                </div>
                              </div>
                              <div
                                className={styles.TicketDesc}
                                dangerouslySetInnerHTML={{
                                  __html: ticket.desc,
                                }}
                                style={
                                  openDetailDesc !== ticket.id
                                    ? {}
                                    : { maxHeight: "unset" }
                                }
                              ></div>
                              <div
                                className={`${styles.TextPrimary} ${styles.OpenDesc}`}
                                onClick={() => {
                                  setOpenDesc(
                                    openDetailDesc === ticket.id
                                      ? ""
                                      : ticket.id
                                  );
                                }}
                              >
                                {openDetailDesc !== ticket.id ? (
                                  <>
                                    Lebih Banyak <BiChevronDown />
                                  </>
                                ) : (
                                  <>
                                    Lebih Sedikit <BiChevronUp />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            {/* {event.event.category === "Attraction" ||
                            event.event.category === "Daily Activities" ||
                            event.event.category ===
                              "Tour Travel (recurring)" ? (
                              <div className={styles.DateSelector}>
                                <label htmlFor={`dt-picker-${ticket.id}`}>
                                  <BiCalendar />
                                </label>
                                <DatePicker
                                  mapDays={filterDateSelector}
                                  multiple
                                  plugins={[
                                    <DatePanel header="Tanggal Kunjungan" />,
                                  ]}
                                  value={
                                    ticketsViewData
                                      ? Object.values(
                                          ticketsViewData[ticket.id].visitDates
                                        ).map((dateobj) => dateobj.date)
                                      : null
                                  }
                                  onChange={(e) => {
                                    handleSelectDateView(ticket.id, e);
                                  }}
                                  placeholder="Pilih tanggal kunjungan"
                                  style={{
                                    border: "none",
                                    width: "100%",
                                  }}
                                  id={`dt-picker-${ticket.id}`}
                                  children={
                                    <div>
                                      <Button title={"OK"} />
                                    </div>
                                  }
                                  title="Pilih Tanggal Kunjugan"
                                />
                              </div>
                            ) : (
                              <></>
                            )} */}
                          </div>
                          <div className={styles.TicketDivider}>
                            <div className={styles.Dashed}></div>
                            <div className={styles.HalfCircleLeft}></div>
                            <div className={styles.HalfCircleRight}></div>
                          </div>
                          <div className={styles.TicketBottom}>
                            <div className={styles.TicketTime}>
                              {new Date(ticket.start_date).getDate() +
                                " " +
                                config.months[
                                  new Date(ticket.start_date).getMonth()
                                ]}{" "}
                              -{" "}
                              {new Date(ticket.end_date).getDate() +
                                " " +
                                config.months[
                                  new Date(ticket.end_date).getMonth()
                                ]}
                            </div>
                            {event.event.category !== "Attraction" &&
                            event.event.category !== "Daily Activities" &&
                            event.event.category !==
                              "Tour Travel (recurring)" &&
                            ticket.quantity === 0 ? (
                              <Button
                                title={"Sold Out"}
                                style={{
                                  width: "unset",
                                  minWidth: "75px",
                                  marginLeft: "auto",
                                }}
                                center
                              />
                            ) : (
                              <Button
                                title={"Beli"}
                                style={{
                                  width: "unset",
                                  minWidth: "75px",
                                  marginLeft: "auto",
                                }}
                                center
                                fnOnClick={() => {
                                  if (
                                    event.event.category === "Attraction" ||
                                    event.event.category ===
                                      "Daily Activities" ||
                                    event.event.category ===
                                      "Tour Travel (recurring)"
                                  ) {
                                    setPopUpSelectDate({
                                      state: true,
                                      ticketId: ticket.id,
                                      data: ticket,
                                    });
                                  } else {
                                    handleAddToChart(ticket.id, ticket);
                                  }
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : new Date(
                    event.event.end_date + " " + event.event.end_time
                  ) < new Date() ? (
                  <div className={styles.CartBlank}>
                    <img src="/images/blank_events.png" alt="" />
                    <div>Event Sudah Berakhir</div>
                  </div>
                ) : (
                  <div className={styles.CartBlank}>
                    <img src="/images/blank_events.png" alt="" />
                    <div>Tiket Tidak / Belum Tersedia</div>
                  </div>
                )}
                {/*  */}
              </div>
            </div>
            <div className={styles.RightPanel}>
              {/* ------ INFO ------- */}
              <div className={styles.RightInfo}>
                <h5 className={styles.InfoTitle}>{event.event.name}</h5>
                {/* <p className={styles.Address}>
                  {event.event.location.split("<p>").length === 1
                    ? event.event.location +
                      ` ${event.event.city}, ${event.event.province}`
                    : event.event.location.split("<p>")[1].split("</p>")[0] +
                      ` ${event.event.city}, ${event.event.province}`}
                </p> */}
                <div className={styles.BoxAddress}>
                  <BiMap />
                  {/* <p className={styles.Address}>
                    {event.event.location.split("<p>").length === 1
                      ? event.event.location +
                        ` ${event.event.city}, ${event.event.province}`
                      : event.event.location.split("<p>")[1].split("</p>")[0] +
                        ` ${event.event.city}, ${event.event.province}`}
                  </p> */}
                  <p
                    className={styles.Address}
                    dangerouslySetInnerHTML={{
                      __html:
                        event.event.location +
                        `, ${event.event.city}, ${event.event.province}`,
                    }}
                  ></p>
                </div>
                <div className={styles.BoxTime}>
                  {event.event.category !== "Attraction" &&
                  event.event.category !== "Daily Activities" &&
                  event.event.category !== "Tour Travel (recurring)" ? (
                    start.split("|")[0] === end.split("|")[0] ? (
                      <>
                        <div className={styles.Time}>
                          <div className={styles.Date}>
                            <BiCalendar />
                            <div>{start.split("|")[0]}</div>
                          </div>
                        </div>
                        <div className={styles.Time}>
                          <div className={styles.Date}>
                            <BiTime />
                            <div>
                              {start.split("|")[1]} - {end.split("|")[1]}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.Time}>
                          <div className={styles.Date}>
                            <BiCalendar />
                            <div>{start.split("|")[0]}</div>
                          </div>
                          <div className={styles.Clock}>
                            {/* <BiTime /> */}
                            <div>&nbsp;|&nbsp;</div>
                            <div>{start.split("|")[1]}</div>
                          </div>
                        </div>
                        <div className={styles.Time}>
                          <div className={styles.Date}>
                            <BiCalendar />
                            <div>{end.split("|")[0]}</div>
                          </div>
                          <div className={styles.Clock}>
                            {/* <BiTime /> */}
                            <div>&nbsp;|&nbsp;</div>
                            <div>{end.split("|")[1]}</div>
                          </div>
                        </div>
                      </>
                    )
                  ) : (
                    event.available_days.map((avldt, index) => {
                      // return <p className={styles.Time}>{avldt}</p>;
                      return (
                        <div id={index} className={styles.Time}>
                          <BiCalendarX
                            style={{
                              fontSize: "16px",
                              marginRight: "10px",
                              marginTop: "auto",
                              marginBottom: "auto",
                            }}
                          />
                          <p className={styles.Date}>
                            {config.dayEnToInd[avldt.day]}
                          </p>
                          <p className={styles.Clock}>
                            {avldt.start_time.slice(0, 5).toString()}
                            {" - "}
                            {avldt.max_limit_time.slice(0, 5)} WIB
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className={styles.FooterInfo}>
                  <div
                    className={styles.InfoOrg}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(
                        "/organization-profile/" + event.organization.id
                      );
                    }}
                  >
                    <img
                      src={
                        process.env.REACT_APP_BACKEND_URL +
                        event.organization.photo
                      }
                      alt=""
                    />
                    <p>{event.organization.name}</p>
                    {event.organization.legality &&
                    event.organization.legality.status == 1 ? (
                      <img
                        src="/images/verify.png"
                        style={{
                          color: "green",
                          width: "23px",
                          height: "23px",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              {/* --------------- */}
              {/* ------- CHART BOX -------- */}
              <div
                id="cartbox"
                className={`${styles.CartBox} ${styles.CartBoxFull}`}
                style={cartData.length === 0 ? { display: "none" } : {}}
              >
                <div className={styles.CartBoxTitle}>
                  <div className={styles.CartBoxInner}>Keranjang Tiket </div>
                </div>
                <div className={styles.TicketBox}>
                  {cartData.length > 0 ? (
                    <>
                      {cartData.map((cart, index) => {
                        return (
                          <div className={styles.TicketCard}>
                            <div className={styles.TicketTop}>
                              <div className={styles.TicketTitle}>
                                <div>{cart.data.name}</div>
                              </div>
                              <div className={styles.TicketPrice}>
                                <div className={styles.TextPrimary}>
                                  {cart.data.type_price == 1
                                    ? "Gratis"
                                    : cart.data.type_price == 2
                                    ? `Rp. ${numberFormat.format(
                                        cart.data.price
                                      )},-`
                                    : `Mulai dari Rp.${numberFormat.format(
                                        10000
                                      )},-`}
                                </div>
                                <div className={styles.TextBasic}>x</div>
                                <div className={styles.TextBasic}>
                                  {cart.count}
                                </div>
                              </div>

                              <div
                                className={`${styles.TicketPrice} ${styles.TextSecondary}`}
                              >
                                Max. Beli{" "}
                                {cart.data.max_purchase < cart.data.quantity
                                  ? cart.data.max_purchase
                                  : cart.data.quantity}
                              </div>
                              {cart.data.type_price == 3 ? (
                                <InputLabeled
                                  iconSvg={<BiMoney />}
                                  placeholder={"Harga suka-suka"}
                                  min={10000}
                                  type={"number"}
                                  label={"Harga"}
                                  required
                                  id={"custom-price0-" + index}
                                  value={cart.customPrice}
                                  fnOnInput={(e) => {
                                    handleChangeCustomPrice(
                                      e.target.value,
                                      index
                                    );
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                              {cart.seatNumbers.length > 0 ? (
                                <div
                                  className={`${styles.TicketDesc} ${styles.TextSecondary}`}
                                >
                                  Tempat Duduk :{" "}
                                  {cart.seatNumbers.map((num) => {
                                    return num + ", ";
                                  })}
                                </div>
                              ) : (
                                <></>
                              )}

                              {event.event.category === "Attraction" ||
                              event.event.category === "Daily Activities" ||
                              event.event.category ===
                                "Tour Travel (recurring)" ? (
                                <div className={styles.DateSelectorGroup}>
                                  <div className={styles.DateSelector}>
                                    {/* selector date  */}
                                    <label
                                      htmlFor={`dt-picker-cart-2-${
                                        cart.data.id
                                      }-${cart.visitDate.format()}`}
                                    >
                                      <BiCalendar />
                                    </label>
                                    <DatePicker
                                      mapDays={({ date }) =>
                                        filterDateSelectorCart(
                                          date,
                                          index,
                                          cartData
                                        )
                                      }
                                      value={cart.visitDate}
                                      onChange={(e) => {
                                        handleSelectDateCart(index, e);
                                      }}
                                      placeholder="Pilih tanggal kunjungan"
                                      style={{
                                        border: "none",
                                        width: "100%",
                                      }}
                                      id={`dt-picker-cart-2-${
                                        cart.data.id
                                      }-${cart.visitDate.format()}`}
                                    />
                                  </div>
                                  <Button
                                    title={"Ganti Tanggal Kunjungan"}
                                    bgColor={"white"}
                                    borderColor={"#ca0c64"}
                                    textColor={"#ca0c64"}
                                    style={{
                                      padding: "5px",
                                      width: "unset",
                                      // whiteSpace: "nowrap",
                                    }}
                                    fnOnClick={() => {
                                      document
                                        .getElementById(
                                          `dt-picker-cart-2-${
                                            cart.data.id
                                          }-${cart.visitDate.format()}`
                                        )
                                        .focus();
                                    }}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className={styles.TicketDivider}>
                              <div className={styles.Dashed}></div>
                              <div className={styles.HalfCircleLeft}></div>
                              <div className={styles.HalfCircleRight}></div>
                            </div>
                            <div className={styles.TicketBottom}>
                              {cart.data.seat_number == 0 ? (
                                <>
                                  <div className={styles.TicketTime}>
                                    Jumlah
                                  </div>
                                  <div
                                    className={styles.ActionTicket}
                                    style={{ marginLeft: "auto" }}
                                    onClick={() => {
                                      handleAddCountCart(index, 2);
                                    }}
                                  >
                                    <BiMinus />
                                  </div>
                                  <div className={styles.TicketCount}>
                                    {cart.count}
                                  </div>
                                  <div
                                    className={styles.ActionTicket}
                                    onClick={() => {
                                      handleAddCountCart(index, 1);
                                    }}
                                  >
                                    <BiPlus />
                                  </div>
                                </>
                              ) : (event.event.category === "Attraction" ||
                                  event.event.category === "Daily Activities" ||
                                  event.event.category ===
                                    "Tour Travel (recurring)") &&
                                cart.data.seat_number == 1 ? (
                                <div className={styles.RenderDates}>
                                  <div className={styles.DateSeatMap}>
                                    <div className={styles.Date}>
                                      {new Date(
                                        cart.visitDate.format()
                                      ).getDate()}
                                      -
                                      {new Date(
                                        cart.visitDate.format()
                                      ).getMonth() + 1}
                                      -
                                      {new Date(
                                        cart.visitDate.format()
                                      ).getFullYear()}
                                    </div>
                                    <Button
                                      title={
                                        cart.seatNumbers.length > 0
                                          ? "Ubah Tempat Duduk"
                                          : "Pilih Tempat Duduk"
                                      }
                                      bgColor={"white"}
                                      borderColor={"#ca0c64"}
                                      textColor={"#ca0c64"}
                                      style={{
                                        padding: "5px",
                                        width: "unset",
                                        marginLeft: "auto",
                                      }}
                                      fnOnClick={() => {
                                        setPopUpSeatNumber({
                                          state: true,
                                          cartIndex: index,
                                        });
                                      }}
                                    />
                                    <Button
                                      title={<BiX />}
                                      bgColor={"red"}
                                      borderColor={"red"}
                                      textColor={"#fff"}
                                      style={{
                                        padding: "5px",
                                        width: "unset",
                                        marginLeft: "5px",
                                      }}
                                      fnOnClick={() => {
                                        // handleDeleteDateViewXSeatNumber(
                                        // 	ticket.id,
                                        // 	dateObj.date.format()
                                        // );
                                        removeCart(index);
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : cart.data.seat_number == 1 ? (
                                <div className={styles.RenderDates}>
                                  {/* selector seat map */}
                                  <div className={styles.DateSeatMap}>
                                    <div></div>
                                    <Button
                                      title={
                                        cart.seatNumbers.length > 0
                                          ? "Ubah Tempat Duduk"
                                          : "Pilih Tempat Duduk"
                                      }
                                      bgColor={"white"}
                                      borderColor={"#ca0c64"}
                                      textColor={"#ca0c64"}
                                      style={{
                                        padding: "5px",
                                        width: "unset",
                                        marginLeft: "auto",
                                      }}
                                      fnOnClick={() => {
                                        setPopUpSeatNumber({
                                          state: true,
                                          cartIndex: index,
                                        });
                                      }}
                                    />
                                    <Button
                                      title={<BiX />}
                                      bgColor={"red"}
                                      borderColor={"red"}
                                      textColor={"#fff"}
                                      style={{
                                        padding: "5px",
                                        width: "unset",
                                        marginLeft: "5px",
                                      }}
                                      fnOnClick={() => {
                                        // handleDeleteDateViewXSeatNumber(
                                        // 	ticket.id,
                                        // 	dateObj.date.format()
                                        // );
                                        removeCart(index);
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div
                        className={`${styles.CartBlank} ${styles.CartBlankFull}`}
                      >
                        <img src="/images/blank_events.png" alt="" />
                        <div>Yuk pilih tiket dulu !</div>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.CartSubTotal}>
                  <hr />
                  <div>
                    <b>Subtotal</b>
                    <p className={styles.SubTotalNum}>
                      Rp.
                      {numberFormat.format(
                        cartData.reduce((currentVal, prevVal) => {
                          if (prevVal.customPrice) {
                            return (
                              currentVal +
                              parseInt(prevVal.customPrice) *
                                parseInt(prevVal.count)
                            );
                          } else {
                            return (
                              currentVal +
                              parseInt(prevVal.data.price) *
                                parseInt(prevVal.count)
                            );
                          }
                        }, 0)
                      )}
                      ,-
                    </p>
                  </div>
                </div>
                {/* Blank tickets */}
                {/* <div className={styles.CartBlank}>
                  <img src="/images/blank_events.png" alt="" />
                  <div>Yuk pilih tiket dulu !</div>
                </div> */}
              </div>
              {/* -------------------------- */}
              <div className={styles.CoverBuyButton}>
                {cartData.length === 0 ? (
                  <a href="#tickets">
                    <Button
                      title={"Beli Tiket"}
                      center
                      style={{
                        width: "100%",
                      }}
                      fnOnClick={() => {
                        setPageState(1);
                      }}
                    />
                  </a>
                ) : (
                  <Button
                    title={"Lanjutkan Pembayaran"}
                    center
                    style={{
                      width: "100%",
                    }}
                    fnOnClick={openTrxPopUp}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EventDetail;
