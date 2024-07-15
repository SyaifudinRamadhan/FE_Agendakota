import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/EventDashboard.module.css";
import FieldBox from "../../../components/FieldBox";
import {
  BiArrowFromTop,
  BiArrowToBottom,
  BiBook,
  BiBox,
  BiCalendar,
  BiCalendarX,
  BiCameraMovie,
  BiCard,
  BiCheckCircle,
  BiConversation,
  BiCopy,
  BiEdit,
  BiError,
  BiFullscreen,
  BiGroup,
  BiInfoCircle,
  BiMap,
  BiPaperPlane,
  BiQuestionMark,
  BiScreenshot,
  BiSearch,
  BiTime,
  BiUserCircle,
  BiZoomIn,
  BiZoomOut,
} from "react-icons/bi";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../partials/ErrorPage";
import config from "../../../config";
import axios from "axios";
import PopUp from "../../../partials/PopUp";
import Chip from "../../../components/Chip";
import PopUpTicket from "../../../partials/PopUpTicket";
import EditorAddEvtAct from "../../../partials/EditorAddEvtAct";
import InputToogle from "../../../components/InputToogle";
import Alert from "../../../components/Alert";
import InputForm from "../../../components/InputForm";
import InputLabeled from "../../../components/InputLabeled";
import Select from "react-select";
import Button from "../../../components/Button";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { ChartArea, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import xlsx from "json-as-xlsx";
import PopUpCheckin from "../../../partials/PopUpCheckin";
import QRCode from "qrcode.react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QREventPdf from "./QREventPdf";
import PopUpRefundOrg from "../../../partials/PopUpRefundOrg";
import InputCheckRadio from "../../../components/InputCheckRadio";
import { useDispatch, useSelector } from "react-redux";
import { getAppData } from "../../../actions/appdata";
import { useNavigate } from "react-router-dom";
//   import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const waitForElm = (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
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

const loadTickets = async ({ eventId, orgId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/tickets",
      {
        headers: {
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
          Authorization: "Bearer " + token,
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const loadRefunds = async ({ orgId, eventId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/refunds",
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

const refundChange = async ({
  orgId,
  eventId,
  ticketId,
  refundIds,
  refundPencetage,
  approved = true,
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/refund/change-state",
      {
        refund_ids: refundIds,
        refund_percentage: refundPencetage,
        ticket_id: ticketId,
        approved: approved ? 1 : null,
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

const checkin = async ({ orgId, eventId, qrStr, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/checkin",
      {
        qr_str: qrStr,
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

const checkinRollback = async ({ orgId, eventId, checkinId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/checkin/delete",
      {
        _method: "DELETE",
        checkin_id: checkinId,
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

const deleteEvent = async ({ orgId, event_id, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/org/" + orgId + "/event/delete",
      {
        _method: "DELETE",
        event_id,
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

const loadSurveyData = async ({ orgId, eventId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/" +
        eventId +
        "/manage/user-surveys",
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

const loadQREvent = async ({ orgId, eventId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/event/download-qr-event?event_id=" +
        eventId,
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
        responseType: "blob",
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const EventDashboard = ({ organization, isLogin, fnSetLogin }) => {
  const [title, setTile] = useState(null);
  const [banner, setBanner] = useState(null);
  const [url, setUrl] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [availableDays, setAvlDays] = useState([]);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [address, setAddress] = useState(null);
  const [exeType, setExeType] = useState(null);
  const [category, setCategory] = useState(null);
  const [firstLoad, setFirstLoadState] = useState(null);
  const [isPublish, setPubState] = useState(false);
  const [eventId, setEvtId] = useState(null);
  const [curentOrg, setCurrentOrg] = useState(null);
  const [qrStringEvtId, setQREvtId] = useState(null);
  const [purchases, setPchsData] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [selledDataGraph, setDataGraph] = useState({
    total: 0,
    graph: {
      label: [],
      data: [],
    },
  });
  const [goupedSelledTable, setGroupSelledTable] = useState([]);
  const [refundDatas, setRefundDatas] = useState([]);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [customFields, setCustomFields] = useState(null);
  const [surveyRes, setSurveyRes] = useState([]);
  const [lockedIndexSurvey, setLockedIndexSurvey] = useState([]);
  const [customIndexSurvey, setCsIndexSurvey] = useState([]);
  // const [selledTicketTable, setSelledTicketTable] = useState([]);
  // const [organization, setOrganization] = useState(organizer);
  const [isLoading, setLoading] = useState(true);
  const [error, setErrorState] = useState(false);
  const [pausedProcess, setPausedProcess] = useState(null);
  const [popUpActive, setPopUpActive] = useState(false);
  const [succeededBuyerIds, setSuccededBuyerId] = useState([]);

  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpContent, setPopUpContent] = useState(<></>);
  const [contentBody, setContentBody] = useState("General");
  const [tickets, setTickets] = useState([]);
  const [ticketSettings, setTicketSettingsData] = useState({
    limitPchs: null,
    singleTrxs: null,
    maxLimitRsc: null,
    globalSeatMap: null,
    enableRefundReq: false,
  });
  const [orderForm, setOrderForm] = useState([]);
  const [openEditor, setOpenEditor] = useState(null);
  const [basicEndEvt, setBasicEndEvent] = useState(null);
  const [basicStartEvt, setBasicStartEvt] = useState(null);
  const [alert, setAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
  const [graphNav, setGraphNav] = useState("All time");
  const [sellTableNav, setSellTable] = useState("All time");
  const [filterSearch, setFilterSearch] = useState("");
  const [filterSearchCheckin, setFilterSearchCheckin] = useState("");
  const [filterSearchRefund, setFilterSearchRefund] = useState("");

  const appData = useSelector((state) => state.appDataReducer);

  const publishToogle = useRef();
  const pdfQR = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetAlert = () => {
    setTimeout(() => {
      setAlert({
        state: false,
        content: "",
        type: "",
      });
    }, 2000);
  };

  const openTicket = () => {
    setPopUpActive(true);
    setPopUpTitle("Tickets");
  };

  const cardFeature = [
    {
      title: "Edit",
      icon: <BiEdit className={`${styles.CardIcon}`} />,
      desc: "Update and review your event / activities basic info",
      fnOnClick: () => {
        setOpenEditor(
          category === "Attraction" ||
            category === "Daily Activities" ||
            category === "Tour Travel (recurring)"
            ? category
            : exeType === "online"
            ? "Online Event"
            : exeType === "offline"
            ? "Onsite Event"
            : "Hybrid Event"
        );
      },
      disabled: false,
      isAddOn: false,
    },
    {
      title: "Ticket",
      icon: <BiCard className={`${styles.CardIcon}`} />,
      desc: "Manage your event sessions with different agendas",
      fnOnClick: openTicket,
      disabled: false,
      isAddOn: false,
    },
    {
      title: "Handbook",
      icon: <BiBook className={`${styles.CardIcon}`} />,
      desc: "Manage your event sessions with different agendas",
      fnOnClick: () => {},
      disabled: true,
      isAddOn: false,
    },
    {
      title: "Sessions",
      icon: <BiCalendar className={`${styles.CardIcon}`} />,
      desc: "Manage your event sessions with different agendas",
      fnOnClick: () => {},
      disabled: true,
      isAddOn: false,
    },
    {
      title: "Stage",
      icon: <BiScreenshot className={`${styles.CardIcon}`} />,
      desc: "Manage your event sessions with different agendas",
      fnOnClick: () => {},
      disabled: true,
      isAddOn: false,
    },
    {
      title: "Speakers",
      icon: <BiGroup className={`${styles.CardIcon}`} />,
      desc: "Manage your event sessions with different agendas",
      fnOnClick: () => {},
      disabled: true,
      isAddOn: false,
    },
    // {
    // 	title: "Landing Page",
    // 	icon: <BiPaperPlane className={`${styles.CardIcon}`} />,
    // 	desc: "Manage your event sessions with different agendas",
    // 	fnOnClick: () => {},
    // 	disabled: false,
    // 	isAddOn: true,
    // },
    // {
    // 	title: "Press Release",
    // 	icon: <BiConversation className={`${styles.CardIcon}`} />,
    // 	desc: "Manage your event sessions with different agendas",
    // 	fnOnClick: () => {},
    // 	disabled: false,
    // 	isAddOn: true,
    // },
    // {
    // 	title: "Broadcasting",
    // 	icon: <BiCameraMovie className={`${styles.CardIcon}`} />,
    // 	desc: "Manage your event sessions with different agendas",
    // 	fnOnClick: () => {},
    // 	disabled: false,
    // 	isAddOn: true,
    // },
  ];

  const copyHandle = (url) => {
    // process to copy
    navigator.clipboard.writeText(url);
    setPopUpTitle("Salin Link Event / Activites");
    setPopUpActive(true);
    setPopUpContent(
      <div className={styles.PopupNotify}>
        <div>Link berhasil di salin ke clipboard</div>
        <div className={styles.IconPopUp}>
          <BiCheckCircle color={"green"} fontWeight={"600"} />
        </div>
      </div>
    );
    setTimeout(() => {
      setPopUpActive(false);
    }, 1000);
  };

  const openAutoCheckin = () => {
    setPopUpTitle("Checkin");
    setPopUpActive(true);
  };

  const openRefundPopUp = (refundData) => {
    setPopUpTitle("refund");
    setPopUpActive(true);
    setSelectedRefund(refundData);
  };

  const openDeleteEvent = (eventStatus) => {
    setPopUpTitle("");
    setPopUpActive(true);
    setPopUpContent(
      eventStatus ? (
        <div className={styles.PopupNotify}>
          <div className={styles.IconPopUp} style={{ marginTop: "0px" }}>
            <BiQuestionMark color={"#ca0c64"} fontWeight={"600"} />
          </div>
          <div>Apakah anda ingin menghapus event / acitvity ini ?</div>
          <div className={styles.Split} style={{ marginTop: "30px" }}>
            <Button
              style={{
                marginLeft: "auto",
              }}
              title={"Batal"}
              bgColor={"white"}
              borderColor={"black"}
              textColor={"black"}
              fnOnClick={() => {
                setPopUpActive(false);
              }}
            />
            <Button
              style={{
                marginRight: "auto",
              }}
              title={"Hapus"}
              fnOnClick={() => {
                handleDeleteEvent(eventId);
              }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.PopupNotify} style={{ marginTop: "-30px" }}>
          <div className={styles.IconPopUp} style={{ marginTop: "0px" }}>
            <BiInfoCircle color={"#ca0c64"} fontWeight={"600"} />
          </div>
          <div>
            Mohon maaf. Untuk menghapus event yang sedang berjalan atau sudah
            memiliki data penjualan, hanya boleh dilakukan oleh admin
            Agendakota.id. Oleh karena itu, jika anda ingin menghapus event ini
            dikarenakan kebutuhan medesak, Mohon kirimkan email ke admin
            Agendakota.id (halo@agendakota.id). Dengan data yang dikirimkan
            sebagai berikut :
          </div>
          <div style={{ textAlign: "left", marginTop: "20px" }}>
            <ol>
              <li>Email subjek "Pembatalan Event"</li>
              <li>Nama Event</li>
              <li>
                URL preview detail Event (https://agendakota.id/event/{eventId})
              </li>
              <li>
                PDF surat pembatalan Event berisikan detail event dan alasan
                pembatalannya. Dan bertanda tangan penyelenggara / penanngung
                jawab Event.
              </li>
            </ol>
          </div>
          <div className={styles.Split} style={{ marginTop: "30px" }}>
            <Button
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              title={"Ok"}
              bgColor={"white"}
              borderColor={"black"}
              textColor={"black"}
              fnOnClick={() => {
                setPopUpActive(false);
              }}
            />
          </div>
        </div>
      )
    );
  };

  const handleDownloadReport = () => {
    setLoading(true);
    let content = [];
    buyers.forEach((buyer) => {
      let date = new Date(buyer.purchaseData.created_at);
      content.push({
        purchase_id: buyer.purchaseData.id,
        date:
          date.getDate() +
          " " +
          config.months[date.getMonth()] +
          " " +
          date.getFullYear(),
        user_name: buyer.user.name,
        user_email: buyer.user.email,
        amount: buyer.purchaseData.amount,
        pay_state: buyer.purchaseData.payment.pay_state,
        ticket: tickets.find((ticket) => ticket.id == buyer.ticketId).name,
        ticket_id: buyer.ticketId,
        checkin: buyer.checkin ? buyer.checkin.status : "-",
        visit_date: buyer.visitDate ? buyer.visitDate.visit_date : "-",
        seat_number: buyer.seatNumber ? buyer.seatNumber.seat_number : "-",
      });
    });
    let data = [
      {
        sheet: "Transactions Report",
        columns: [
          { label: "ID Pembelian", value: "purchase_id" },
          { label: "Tanggal Beli", value: "date" },
          { label: "Username", value: "user_name" },
          { label: "User Email", value: "user_email" },
          { label: "Nominal", value: "amount" },
          { label: "Status Pembayaran", value: "pay_state" },
          { label: "Tiket", value: "ticket" },
          { label: "ID Tiket", value: "ticket_id" },
          { label: "Checkin Status", value: "checkin" },
          { label: "Tanggal Kunjungan", value: "visit_date" },
          { label: "Nomor Tempat Duduk", value: "seat_number" },
        ],
        content: content,
      },
    ];
    let settings = {
      fileName: "Laporan_Penjualan", // Name of the resulting spreadsheet
      extraLength: 10, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    };
    xlsx(data, settings);
    setLoading(false);
  };

  const handlePublish = (publishState) => {
    setLoading(true);
    setPublish({
      orgId: curentOrg,
      event_id: eventId,
      code_pub_state: publishState == true ? 2 : 1,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 202) {
        setAlert({
          state: true,
          type: "success",
          content: "Status publikasi berhasil diubah",
        });
        resetAlert();
        setPubState(publishState);
      } else if (res.status === 401) {
        fnSetLogin(false);
        setPausedProcess(`publish~!@!~${publishState == true ? 1 : 0}`);
      } else {
        setAlert({
          state: true,
          type: "danger",
          content: "Status publikasi gagal diubah",
        });
        resetAlert();
        setPubState(!publishState);
      }
      setLoading(false);
    });
  };

  const handleDeleteEvent = (eventId) => {
    setPopUpActive(false);
    setLoading(true);
    deleteEvent({
      event_id: eventId,
      orgId: curentOrg,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 202) {
        dispatch(
          getAppData({
            accessToken: appData.accessToken,
            activeOrg: localStorage.getItem("active-org"),
            activeEvent: localStorage.getItem("active-event"),
          })
        );
        navigate("/organizer/events");
      } else if (res.status === 401) {
        fnSetLogin(false);
        setPausedProcess(`delete-event~!@!~${eventId}`);
        setLoading(false);
      } else {
        setAlert({
          state: true,
          type: "danger",
          content:
            res.status == 402
              ? "Penghapusan tidak diizinkan. Karena event masih belum berakhir / terlaksana"
              : "Server Error. Event / Activity gagal dihapus",
        });
        setLoading(false);
        resetAlert();
      }
    });
  };

  const handleCheckinMain = (qrStr) => {
    setLoading(true);
    checkin({
      orgId: curentOrg,
      eventId: eventId,
      qrStr: qrStr,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 201) {
        let qrKey = qrStr.split("*~^|-|^~*");
        buyers.forEach((buyer) => {
          if (buyer.purchaseData.id == qrKey[0]) {
            buyer.checkin = res.data.checkin;
          }
        });
        setAlert({
          state: true,
          type: "success",
          content: "Checkin berhasil",
        });
        resetAlert();
      } else if (res.status === 401) {
        fnSetLogin(false);
        setPausedProcess(`checkin~!@!~${qrStr}`);
      } else {
        setAlert({
          state: true,
          type: "danger",
          content:
            res.status == 404
              ? "Transaksi tidak dapat ditemukan"
              : res.status == 403
              ? "Tiket sudah tidak berlaku / sudah digunakan"
              : "Error internal server. Silahkan coba lagi",
        });
        resetAlert();
      }
      setLoading(false);
    });
  };

  const handleRollbackCheckin = (checkinId) => {
    setLoading(true);
    checkinRollback({
      orgId: curentOrg,
      eventId: eventId,
      checkinId: checkinId,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 202) {
        buyers.forEach((buyer) => {
          if (buyer.checkin && buyer.checkin.id == checkinId) {
            buyer.checkin = null;
          }
        });
        setAlert({
          state: true,
          type: "success",
          content: "Checkin telah dibatalkan",
        });
        resetAlert();
      } else if (res.status === 401) {
        fnSetLogin(false);
        setPausedProcess(`checkinrollback~!@!~${checkinId}`);
      } else {
        setAlert({
          state: true,
          type: "danger",
          content:
            res.status == 404
              ? "Transaksi tidak dapat ditemukan"
              : "Error internal server. Silahkan coba lagi",
        });
        resetAlert();
      }
      setLoading(false);
    });
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById("qr-event");
    const pngUrl = canvas.toDataURL("image/png");
    setQREvtId(pngUrl);
    setTimeout(() => {
      document.getElementById("download-qr").click();
      // console.log("download clicked");
      setTimeout(() => {
        document.getElementById("download-qr").click();
        // console.log("download clicked");
      }, 100);
    }, 100);
  };

  const handleDownloadQR2 = (orgId, eventId) => {
    setLoading(true);
    loadQREvent({
      orgId: orgId,
      eventId: eventId,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 200) {
        let url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );
        // console.log(url, new Blob([res.data], { type: "application/pdf" }));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "qr_event_scan.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        setLoading(false);
      } else if (res.status === 401) {
        fnSetLogin(false);
        setPausedProcess(`downloadQREvent~!@!~${orgId}~!@!~${eventId}`);
      } else {
        setAlert({
          state: true,
          type: "danger",
          content:
            "Download data gagal diproses. Terjadi kesalahan server. Silahkan coba lagi !",
        });
        setLoading(false);
        resetAlert();
      }
    });
  };

  const openDetailSurvey = (surveyData) => {
    setPopUpTitle("Detail Result");
    setPopUpContent(
      <div>
        <div className={styles.InputGroup}>
          <label> Username</label>
          <InputForm value={surveyData.user.name} readOnly />
        </div>
        {surveyData.question_str.map((qStr, index) => {
          return qStr.split("~!!!~")[1] === "file" ? (
            surveyData.survey_datas[index] !== "" &&
            surveyData.survey_datas[index] !== "-" &&
            surveyData.survey_datas[index] !== " " ? (
              <div className={styles.InputGroup}>
                <label> ID Card / KTP</label>
                <img
                  src={
                    process.env.REACT_APP_BACKEND_URL +
                    surveyData.survey_datas[index]
                  }
                  alt=""
                />
              </div>
            ) : (
              <></>
            )
          ) : qStr.split("~!!!~")[1] === "boolean" ? (
            <div className={styles.InputGroup}>
              <label>{qStr.split("~!!!~")[0]}</label>
              <InputCheckRadio
                type={"radio"}
                readOnly
                checked={surveyData.survey_datas[index] == "1"}
                label={"Ya"}
                radioName={"ans_q_radio_" + index}
                disabled
              />
              <InputCheckRadio
                type={"radio"}
                readOnly
                checked={surveyData.survey_datas[index] == "0"}
                label={"Tidak"}
                radioName={"ans_q_radio_" + index}
                disabled
              />
            </div>
          ) : (
            <div className={styles.InputGroup}>
              <label> {qStr.split("~!!!~")[0]}</label>
              <InputForm value={surveyData.survey_datas[index]} readOnly />
            </div>
          );
        })}
      </div>
    );
    setPopUpActive(true);
  };

  const handleDownlodCsForm = () => {
    setLoading(true);
    let content = [];
    surveyRes
      .filter((survey) => succeededBuyerIds.includes(survey.user_id))
      .forEach((surveyData) => {
        let tmpCol = {};
        surveyData.question_str.forEach((qStr, index) => {
          qStr.split("~!!!~")[1] === "file"
            ? surveyData.survey_datas[index] !== "" &&
              surveyData.survey_datas[index] !== "-" &&
              surveyData.survey_datas[index] !== " "
              ? (tmpCol["ID_Card__KTP"] =
                  process.env.REACT_APP_BACKEND_URL +
                  surveyData.survey_datas[index])
              : (tmpCol["ID_Card__KTP"] = "-")
            : qStr.split("~!!!~")[1] === "boolean"
            ? (tmpCol[
                qStr
                  .split("~!!!~")[0]
                  .replaceAll(" ", "_")
                  .replaceAll(".", "_")
                  .replaceAll("/", "_")
              ] = surveyData.survey_datas[index] == "1" ? "Ya" : "Tidak")
            : (tmpCol[
                qStr
                  .split("~!!!~")[0]
                  .replaceAll(" ", "_")
                  .replaceAll(".", "_")
                  .replaceAll("/", "_")
              ] = surveyData.survey_datas[index]);
        });
        content.push(tmpCol);
      });

    let data = [
      {
        sheet: "Custom Forms Report",
        columns: customFields
          ? customFields.map((field) => {
              return {
                label: field.split("~!!!~")[0],
                value: field
                  .split("~!!!~")[0]
                  .replaceAll(" ", "_")
                  .replaceAll(".", "_")
                  .replaceAll("/", "_"),
              };
            })
          : [],
        content: content,
      },
    ];
    let settings = {
      fileName: "Laporan_Custom_Form", // Name of the resulting spreadsheet
      extraLength: 10, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    };
    xlsx(data, settings);
    setLoading(false);
  };

  useEffect(() => {
    if (firstLoad && curentOrg !== appData.activeOrg) {
      navigate("/organizer/events");
    }
    // console.log("RELOAD APP DATA", appData);
  }, [appData]);

  useEffect(() => {
    if (appData.activeOrg && appData.activeEvent && !firstLoad) {
      setLoading(true);
      setCurrentOrg(appData.activeOrg);
      loadDetail({
        orgId: appData.activeOrg,
        eventId: appData.activeEvent,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 200) {
          setFirstLoadState(true);
          // console.log(res.data.available_reschedule);
          let start = new Date(
            res.data.event.start_date + " " + res.data.event.start_time
          );
          let end = new Date(
            res.data.event.end_date + " " + res.data.event.end_time
          );
          setTile(res.data.event.name);
          setBanner(res.data.event.logo);
          setUrl(window.location.host + "/event/" + res.data.event.id);
          setBasicStartEvt(
            res.data.event.start_date + " " + res.data.event.start_time
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
          setBasicEndEvent(
            res.data.event.end_date + " " + res.data.event.end_time
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
          // let availableDays = [];

          // res.data.available_days.forEach((avldt) => {
          //   availableDays.push(
          //     `${config.dayEnToInd[avldt.day]} | ${avldt.start_time
          //       .slice(0, 5)
          //       .toString()} WIB - ${avldt.max_limit_time.slice(0, 5)} WIB`
          //   );
          // });
          setAvlDays(res.data.available_days);
          setCity(res.data.event.city);
          setProvince(res.data.event.province);
          setAddress(res.data.event.location);
          setCategory(res.data.event.category);
          setExeType(res.data.event.exe_type);
          setLoading(false);
          setOrderForm(res.data.event.custom_fields);
          setPubState(res.data.event.is_publish == 1 ? false : true);
          setEvtId(res.data.event.id);
          ticketSettings.singleTrxs = res.data.event.single_trx;
          ticketSettings.maxLimitRsc = res.data.available_reschedule
            ? res.data.available_reschedule.limit_time
            : null;
          ticketSettings.globalSeatMap = res.data.event.seat_map;
          ticketSettings.enableRefundReq = res.data.event.allow_refund;
          setCustomFields(res.data.event.custom_fields);
          let mainIndexMap = [];
          let secIndexMap = [];
          res.data.event.custom_fields.forEach((field, index) => {
            if (
              field.includes("Nama") ||
              field.includes("Email") ||
              field.includes("No. Handphone") ||
              field.includes("ID Card")
            ) {
              mainIndexMap.push(index);
            } else {
              secIndexMap.push(index);
            }
          });
          setLockedIndexSurvey(mainIndexMap);
          setCsIndexSurvey(secIndexMap);
          // setTickets(res.data.event.tickets);
        } else if (res.status === 401) {
          fnSetLogin(false);
          setFirstLoadState(null);
        } else {
          setErrorState(true);
        }
      });
      loadTickets({
        eventId: appData.activeEvent,
        orgId: appData.activeOrg,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 200) {
          setFirstLoadState(true);
          let tickets = [];
          res.data.tickets.forEach((ticket) => {
            tickets.push({
              id: ticket.id,
              name: ticket.name,
              cover: ticket.cover,
              desc: ticket.desc,
              type_price: ticket.type_price,
              price: ticket.price,
              quantity: ticket.quantity,
              start_date: ticket.start_date,
              end_date: ticket.end_date,
              seat_number: ticket.seat_number,
              max_purchase: ticket.max_purchase,
              seat_map: ticket.seat_map,
              limit_daily: ticket.limit_daily
                ? ticket.limit_daily.limit_quantity
                : null,
              deleted: ticket.deleted,
              meet_link: ticket.secretInfo ? ticket.secretInfo.meet_link : "",
            });
          });
          // console.log(tickets, "FROM MASTER DATA");
          setTickets(tickets);
          setPchsData(res.data.tickets);
        } else if (res.status === 401) {
          fnSetLogin(false);
          setFirstLoadState(null);
        } else if (res.status === 404) {
          setTickets([]);
        } else if (res.status !== 404) {
          setErrorState(true);
        }
      });
      loadRefunds({
        eventId: appData.activeEvent,
        orgId: appData.activeOrg,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 200) {
          setRefundDatas(res.data.refund_datas);
        } else if (res.status === 401) {
          fnSetLogin(false);
          setFirstLoadState(null);
        } else if (res.status === 404) {
          setRefundDatas([]);
        } else if (res.status !== 404) {
          setErrorState(true);
        }
      });
      loadSurveyData({
        eventId: appData.activeEvent,
        orgId: appData.activeOrg,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 200) {
          setSurveyRes(res.data.data);
          // console.log(res.data.data);
        } else if (res.status === 401) {
          fnSetLogin(false);
          setFirstLoadState(null);
        } else if (res.status === 404) {
          setSurveyRes([]);
        } else if (res.status != 404) {
          setErrorState(true);
        }
      });
    }
  }, [appData, firstLoad]);

  useEffect(() => {
    if (tickets.length > 0 && title) {
      setTicketSettingsData({
        limitPchs: tickets[0].max_purchase,
        singleTrxs: ticketSettings.singleTrxs,
        maxLimitRsc: ticketSettings.maxLimitRsc,
        globalSeatMap: ticketSettings.globalSeatMap,
        enableRefundReq: ticketSettings.enableRefundReq,
      });
    } else if (tickets.length === 0) {
      setTicketSettingsData({
        limitPchs: 5,
        singleTrxs: ticketSettings.singleTrxs,
        maxLimitRsc: ticketSettings.maxLimitRsc,
        globalSeatMap: ticketSettings.globalSeatMap,
        enableRefundReq: ticketSettings.enableRefundReq,
      });
    }
    // console.log(tickets);
  }, [tickets, title]);

  useEffect(() => {
    if (isLogin && pausedProcess) {
      if (pausedProcess.split("~!@!~")[0] === "publish") {
        handlePublish(pausedProcess.split("~!@!~")[1] == 1 ? true : false);
      } else if (pausedProcess.split("~!@!~")[0] == "checkin") {
        handleCheckinMain(pausedProcess.split("~!@!~")[1]);
      } else if (pausedProcess.split("~!@!~")[0] == "checkinrollback") {
        handleRollbackCheckin(pausedProcess.split("~!@!~")[1]);
      } else if (pausedProcess.split("~!@!~")[0] == "delete-event") {
        handleDeleteEvent(pausedProcess.split("~!@!~")[1]);
      } else if (pausedProcess.split("~!@!~")[0] == "downloadQREvent") {
        let dataStr = pausedProcess.split("~!@!~");
        handleDownloadQR2(dataStr[1], dataStr[2]);
      }
      // else if (pausedProcess.split("~!@!~")[0] == "refundconsideration") {
      // 	handleChangeRefund(JSON.parse(pausedProcess.split("~!@!~")[1]));
      // }
      setPausedProcess(null);
    }
    // console.log(isLogin, pausedProcess);
  }, [isLogin, pausedProcess]);

  useEffect(() => {
    if (purchases) {
      let buyers = [];
      let attendees = [];
      purchases.forEach((ticket) => {
        ticket.purchases.forEach((pch) => {
          buyers.push({
            user: pch.user,
            ticketId: ticket.id,
            checkin: pch.checkin,
            visitDate: pch.visitDate,
            seatNumber: pch.seatNumber,
            purchaseData: pch,
          });
          if (pch.checkin) {
            attendees.push({
              user: pch.user,
              ticketId: ticket.id,
              checkin: pch.checkin,
              visitDate: pch.visitDate,
              seatNumber: pch.seatNumber,
              purchaseData: pch,
            });
          }
        });
      });
      setBuyers(buyers);
      setSuccededBuyerId(
        buyers
          .filter(
            (buyer) => buyer.purchaseData.payment.pay_state === "SUCCEEDED"
          )
          .map((buyer) => buyer.purchaseData.user_id)
      );
      // console.log(buyers);
      setAttendees(attendees);
      buyers = null;
      attendees = null;
    }
  }, [purchases]);

  useEffect(() => {
    if (graphNav == "All time" && buyers.length > 0) {
      let labels = [];
      let datas = [];
      let distanceMonth = Math.ceil(
        new Date(basicEndEvt) - new Date(buyers[0].purchaseData.created_at) > 0
          ? ((new Date() <= new Date(basicEndEvt)
              ? new Date()
              : new Date(basicEndEvt)) -
              new Date(buyers[0].purchaseData.created_at)) /
              2592000000
          : 0
      );
      for (
        let i = new Date(buyers[0].purchaseData.created_at).getMonth();
        i <=
        distanceMonth + new Date(buyers[0].purchaseData.created_at).getMonth();
        i++
      ) {
        // console.log(i % 12, "MONTH", i);
        labels.push(config.months[i % 12]);
        datas.push(
          buyers.filter(
            (buyer) =>
              new Date(buyer.purchaseData.created_at).getMonth() == i &&
              buyer.purchaseData.payment.pay_state === "SUCCEEDED"
          ).length
        );
      }
      setDataGraph({
        total: buyers
          .filter(
            (buyer) => buyer.purchaseData.payment.pay_state === "SUCCEEDED"
          )
          .reduce(
            (currentVal, accumulator) =>
              currentVal + accumulator.purchaseData.amount,
            0
          ),
        graph: {
          label: labels,
          data: datas,
        },
      });
    } else if (graphNav == "Today" && buyers.length > 0) {
      let labels = [];
      let datas = [];
      labels.push(config.months[new Date().getMonth()]);
      datas.push(
        buyers.filter(
          (buyer) =>
            new Date(buyer.purchaseData.created_at).setHours(0, 0, 0, 0) ==
              new Date().setHours(0, 0, 0, 0) &&
            buyer.purchaseData.payment.pay_state === "SUCCEEDED"
        ).length
      );
      setDataGraph({
        total: buyers
          .filter(
            (buyer) =>
              new Date(buyer.purchaseData.created_at).setHours(0, 0, 0, 0) ===
                new Date().setHours(0, 0, 0, 0) &&
              buyer.purchaseData.payment.pay_state === "SUCCEEDED"
          )
          .reduce(
            (currentVal, accumulator) =>
              currentVal + accumulator.purchaseData.amount,
            0
          ),
        graph: {
          label: labels,
          data: datas,
        },
      });
    } else if (graphNav == "This Week" && buyers.length > 0) {
      let now = new Date();
      let startWeek = new Date(
        new Date().setDate(now.getDate() - now.getDay())
      );
      let endWeek = new Date(
        new Date().setDate(now.getDate() + (6 - now.getDay()))
      );

      let labels = [];
      let datas = [];
      for (let i = 0; i < 7; i++) {
        labels.push(config.days[i]);
        datas.push(
          buyers.filter(
            (buyer) =>
              new Date(buyer.purchaseData.created_at).setHours(0, 0, 0, 0) ===
                new Date(new Date().setDate(startWeek.getDate() + i)).setHours(
                  0,
                  0,
                  0,
                  0
                ) && buyer.purchaseData.payment.pay_state === "SUCCEEDED"
          ).length
        );
      }

      setDataGraph({
        total: buyers
          .filter(
            (buyer) =>
              new Date(buyer.purchaseData.created_at).setHours(0, 0, 0, 0) >=
                startWeek.setHours(0, 0, 0, 0) &&
              new Date(buyer.purchaseData.created_at).setHours(0, 0, 0, 0) <=
                endWeek.setHours(23, 59, 0, 0) &&
              buyer.purchaseData.payment.pay_state === "SUCCEEDED"
          )
          .reduce(
            (currentVal, accumulator) =>
              currentVal + accumulator.purchaseData.amount,
            0
          ),
        graph: {
          label: labels,
          data: datas,
        },
      });
    }
  }, [graphNav, buyers]);

  useEffect(() => {
    if (sellTableNav == "All time") {
      // let grouped = Object.groupBy(buyers, (buyer) => buyer.ticketId);
      let grouped = buyers
        .filter((buyer) => buyer.purchaseData.payment.pay_state === "SUCCEEDED")
        .reduce((current, acc) => {
          if (current[acc.ticketId]) {
            current[acc.ticketId].push(acc);
          } else {
            current[acc.ticketId] = [acc];
          }
          return current;
        }, {});
      setGroupSelledTable(
        Object.entries(grouped).map((group) => {
          let ticket = tickets.find((ticket) => ticket.id == group[0]);
          return {
            type: ticket.name,
            totalSale: `${group[1].length} dari ${
              ticket.quantity == -1
                ? ticket.limit_daily
                : group[1].length + ticket.quantity
            }`,
            total: group[1].reduce(
              (currentVal, accumulator) =>
                accumulator.purchaseData.amount + currentVal,
              0
            ),
          };
        })
      );
    } else if (sellTableNav == "Today") {
      let date = new Date();
      let grouped = buyers
        .filter(
          (buyer) =>
            new Date(buyer.purchaseData.created_at).setHours(0, 0, 0, 0) ===
              date.setHours(0, 0, 0, 0) &&
            buyer.purchaseData.payment.pay_state === "SUCCEEDED"
        )
        .reduce((current, acc) => {
          if (current[acc.ticketId]) {
            current[acc.ticketId].push(acc);
          } else {
            current[acc.ticketId] = [acc];
          }
          return current;
        }, {});
      setGroupSelledTable(
        Object.entries(grouped).map((group) => {
          let ticket = tickets.find((ticket) => ticket.id == group[0]);
          return {
            type: ticket.name,
            totalSale: `${group[1].length} dari ${
              ticket.quantity == -1
                ? ticket.limit_daily
                : ticket.quantity + group[1].length
            }`,
            total: group[1].reduce(
              (currentVal, accumulator) =>
                accumulator.purchaseData.amount + currentVal,
              0
            ),
          };
        })
      );
    } else if (sellTableNav == "This Week") {
      let now = new Date().getDay();
      let grouped = buyers
        .filter(
          (buyer) =>
            new Date(buyer.purchaseData.created_at).setHours(0, 0, 0, 0) >=
              new Date(new Date().setDate(new Date().getDate() - now)).setHours(
                0,
                0,
                0,
                0
              ) &&
            new Date(buyer.purchaseData.created_at).setHours(0, 0, 0, 0) <=
              new Date(
                new Date().setDate(new Date().getDate() + (6 - now))
              ).setHours(0, 0, 0, 0) &&
            buyer.purchaseData.payment.pay_state === "SUCCEEDED"
        )
        .reduce((current, acc) => {
          if (current[acc.ticketId]) {
            current[acc.ticketId].push(acc);
          } else {
            current[acc.ticketId] = [acc];
          }
          return current;
        }, {});

      setGroupSelledTable(
        Object.entries(grouped).map((group) => {
          let ticket = tickets.find((ticket) => ticket.id == group[0]);
          return {
            type: ticket.name,
            totalSale: `${group[1].length} dari ${
              ticket.quantity == -1
                ? ticket.limit_daily
                : ticket.quantity + group[1].length
            }`,
            total: group[1].reduce(
              (currentVal, accumulator) =>
                accumulator.purchaseData.amount + currentVal,
              0
            ),
          };
        })
      );
    }
  }, [sellTableNav, buyers]);

  useEffect(() => {
    if (!popUpActive && popUpTitle === "Tickets") {
      setFirstLoadState(null);
    }
  }, [popUpActive, popUpTitle]);

  return openEditor ? (
    <div className={`content organizer ${styles.EditorContent}`}>
      <EditorAddEvtAct
        selectedOrgId={curentOrg}
        forEvtAct={openEditor}
        setForEvtAct={setOpenEditor}
        eventId={eventId}
        isLogin={isLogin}
        fnSetLogin={fnSetLogin}
      />
    </div>
  ) : (
    <>
      <div className={styles.DecorationBox}>
        <div className={styles.Decoration}></div>
      </div>
      <div
        className="content organizer"
        style={{ maxWidth: "1050px", marginLeft: "auto", marginRight: "auto" }}
      >
        <PopUp
          width="45%"
          isActive={
            popUpActive &&
            popUpTitle !== "Tickets" &&
            popUpTitle !== "Checkin" &&
            popUpTitle !== "refund"
          }
          setActiveFn={setPopUpActive}
          title={popUpTitle}
          content={
            <div className={styles.PopupNotify}>
              {isLoading ? <Loading /> : popUpContent}
            </div>
          }
        />
        <PopUpTicket
          isLogin={isLogin}
          fnSetLogin={fnSetLogin}
          isPopActive={popUpActive && popUpTitle === "Tickets"}
          titlePopUp={popUpTitle}
          setPopUpActive={setPopUpActive}
          tickets={tickets.filter((ticket) => ticket.deleted === 0)}
          ticketSetup={ticketSettings}
          orderForm={orderForm}
          fnSetOrderForm={setOrderForm}
          evtActId={eventId}
          endEvent={basicEndEvt ? basicEndEvt.replaceAll(" ", "T") : null}
          forEvtAct={
            category === "Attraction" ||
            category === "Daily Activities" ||
            category === "Tour Travel (recurring)"
              ? category
              : exeType === "online"
              ? "Online Event"
              : exeType === "offline"
              ? "Onsite Event"
              : "Hybrid Event"
          }
          evtCategory={category ? { label: category, value: category } : null}
          orgId={curentOrg}
          fnSetGlobalLoading={setLoading}
        />
        <PopUp
          width="45%"
          isActive={popUpActive && popUpTitle === "Checkin"}
          setActiveFn={() => {}}
          title={""}
          content={
            <PopUpCheckin
              fnClose={setPopUpActive}
              buyers={buyers}
              orgId={curentOrg}
              eventId={eventId}
              isLogin={isLogin}
              fnSetLogin={fnSetLogin}
              fnSetGlobalLoding={setLoading}
            />
          }
        />
        <PopUpRefundOrg
          isActive={popUpActive && popUpTitle === "refund"}
          fnSetActive={setPopUpActive}
          orgId={curentOrg}
          eventId={eventId}
          refundData={selectedRefund}
          refundDatas={refundDatas}
          isLogin={isLogin}
          fnSetLogin={fnSetLogin}
          fnSetGlobalLoading={setLoading}
        />

        <div className={styles.Header}>
          <div className={styles.Navigator}>
            <p
              className={styles.Subtitle}
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(
                  getAppData({
                    accessToken: appData.accessToken,
                    activeOrg: localStorage.getItem("active-org"),
                    activeEvent: localStorage.getItem("active-event"),
                  })
                );
                navigate("/organizer/events");
              }}
            >
              Personal Event
            </p>
            <p>&gt;</p>
            <p>{title}</p>
          </div>
          <div className={styles.ChipBox}>
            <Chip
              options={["General", "Analityc", "More"]}
              value={contentBody}
              setValue={setContentBody}
              multiple={false}
              showLimit={3}
              itemStyle={{ fontSize: "13.5px", padding: "5px" }}
            />
          </div>
        </div>
        <Alert
          isShow={alert.state}
          setShowFn={() => {}}
          type={alert.type}
          message={alert.content}
          closeBtn={false}
        />
        {error ? (
          <ErrorPage />
        ) : isLoading ? (
          <div className={styles.Loading}>
            <Loading />
          </div>
        ) : (
          <div className={styles.Content}>
            <div
              id="General"
              className={`${styles.ContentBody} ${
                contentBody === "General" ? "" : "d-none"
              }`}
            >
              <div className={styles.TopInfo}>
                <div className={styles.LeftInfo}>
                  <div className={styles.Banner}>
                    <img
                      src={process.env.REACT_APP_BACKEND_URL + banner}
                      alt=""
                    />
                  </div>
                  <div className={styles.Link}>
                    <FieldBox>
                      <div className={`${styles.CopyBox}`}>
                        <p>{url}</p>
                        <BiCopy
                          onClick={() => {
                            copyHandle(url);
                          }}
                        />
                      </div>
                    </FieldBox>
                  </div>
                </div>
                <div className={styles.RightInfo}>
                  <h5 className={styles.InfoTitle}>{title}</h5>
                  <div className={styles.BoxAddress}>
                    <BiMap />
                    {/* <p className={styles.Address}>
                      {address.split("<p>").length === 1
                        ? address + ` ${city}, ${province}`
                        : address.split("<p>")[1].split("</p>")[0] +
                          ` ${city}, ${province}`}
                    </p> */}
                    <p
                      className={styles.Address}
                      dangerouslySetInnerHTML={{
                        __html: address + `, ${city}, ${province}`,
                      }}
                    ></p>
                  </div>
                  <div className={styles.BoxTime}>
                    {category !== "Attraction" &&
                    category !== "Daily Activities" &&
                    category !== "Tour Travel (recurring)" ? (
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
                      availableDays.map((avldt, index) => {
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
                      className={styles.Subtitle}
                      style={{ fontSize: "13px" }}
                    >
                      Organized By
                    </div>
                    {organization.length === 0 ? (
                      <></>
                    ) : (
                      <div
                        className={styles.InfoOrg}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            "/organization-profile/" + organization[0].id
                          );
                        }}
                      >
                        <img
                          src={
                            process.env.REACT_APP_BACKEND_URL +
                            organization[0].photo
                          }
                          alt=""
                        />
                        <p>{organization[0].name}</p>
                        {organization[0].legality &&
                        organization[0].legality.status == 1 ? (
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
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.LinkWrap}>
                <FieldBox>
                  <div className={`${styles.CopyBox}`}>
                    <p>{url}</p>
                    <BiCopy
                      onClick={() => {
                        copyHandle(url);
                      }}
                    />
                  </div>
                </FieldBox>
              </div>
              <div className={styles.PartialTitle}>Pamper your event</div>
              <div className={styles.PublishBanner}>
                <FieldBox
                  style={{ backgroundColor: "#fff" }}
                  label={
                    <div className={styles.PartialTitle}>Publish State</div>
                  }
                >
                  <InputToogle
                    style={{ marginLeft: "auto" }}
                    checked={isPublish}
                    onChange={() => {
                      handlePublish(isPublish == true ? false : true);
                    }}
                    refData={publishToogle}
                  />
                </FieldBox>
              </div>
              <div className={styles.FeatureBox}>
                {cardFeature.map((feature, index) => {
                  return (
                    <div
                      id={index}
                      className={`${styles.CardFeature} ${
                        feature.disabled ? styles.Disabled : ""
                      }`}
                      onClick={feature.fnOnClick}
                    >
                      {feature.isAddOn ? (
                        <div className={styles.Badge}>Add On</div>
                      ) : (
                        <></>
                      )}
                      <div className={styles.CardFeatureTop}>
                        {feature.icon}
                        <BiFullscreen
                          className={`${styles.CardIcon} ${styles.CardOpenIcon}`}
                        />
                      </div>
                      <div className={styles.CardFeatureBottom}>
                        <div className={styles.CardFeatureTitle}>
                          {feature.title}
                        </div>
                        <div className={styles.CardFeatureDesc}>
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.Rundown}></div>
            </div>
            <div
              id="Analityc"
              className={`${styles.ContentBody} ${
                contentBody === "Analityc" ? "" : "d-none"
              }`}
            >
              <div className={styles.Split} style={{ marginBottom: "25px" }}>
                <div
                  className={styles.BasicCardInfo}
                  style={{ width: "calc(50% - 10px)" }}
                >
                  <div className={styles.CardInfoTitle1}>ATTENDEES</div>
                  <div>
                    <div className={styles.CardInfoContent}>
                      {attendees.length}
                    </div>
                    <div className={styles.CardInfoSubtitle1}>
                      {new Date() > new Date(basicEndEvt)
                        ? "Evennt telah selesai"
                        : new Date() <= new Date(basicEndEvt) &&
                          new Date() >= new Date(basicStartEvt)
                        ? "Event sedang dilaksanakan"
                        : "Event telah selesai"}
                    </div>
                  </div>
                </div>
                <div
                  className={styles.BasicCardInfo}
                  style={{ width: "calc(50% - 10px)", marginLeft: "auto" }}
                >
                  <div className={styles.CardInfoTitle1}>PENDAFTAR</div>
                  <div>
                    <div className={styles.CardInfoContent}>
                      {
                        buyers.filter(
                          (buyer) =>
                            buyer.purchaseData.payment.pay_state === "SUCCEEDED"
                        ).length
                      }
                    </div>
                    <div className={styles.CardInfoSubtitle1}>Pendaftar</div>
                  </div>
                </div>
              </div>
              <div
                className={styles.BasicCardInfo}
                style={{ marginBottom: "10px" }}
              >
                <div className={styles.Split}>
                  <div className={styles.CardInfoTitle2}>
                    Tickets Revenue Selling
                  </div>
                  <div className={styles.GraphNav}>
                    <Chip
                      options={["All time", "Today", "This Week"]}
                      setValue={setGraphNav}
                      value={graphNav}
                      multiple={false}
                      showLimit={3}
                      itemStyle={{ fontSize: "14px", padding: "5px" }}
                    />
                  </div>
                </div>
                <div className={styles.CardInfoContent}>
                  <div className={styles.Price}>
                    <div className={styles.Currency1}>IDR</div>
                    {numberFormat.format(selledDataGraph.total)}
                    ,-
                  </div>
                  <div className={styles.CardInfoSubtitle1}>
                    {selledDataGraph.graph.data.reduce(
                      (current, acc) => current + acc,
                      0
                    )}{" "}
                    Terjual{" "}
                    {tickets.length > 0
                      ? tickets[0].quantity == -1
                        ? ""
                        : `Dari ${
                            selledDataGraph.graph.data.reduce(
                              (current, acc) => current + acc,
                              0
                            ) +
                            tickets.reduce(
                              (current, acc) => current + acc.quantity,
                              0
                            )
                          } Tiket`
                      : ""}
                  </div>
                </div>

                <div className={styles.GraphBox}>
                  <Line
                    datasetIdKey="id"
                    options={options}
                    data={{
                      labels: selledDataGraph.graph.label,
                      datasets: [
                        {
                          fill: true,
                          id: 1,
                          label: "Penjualan Tiket",
                          data: selledDataGraph.graph.data,
                          borderColor: "#CA0C64",
                          backgroundColor: "#CA0C6433",
                        },
                      ],
                    }}
                  />
                </div>
              </div>
              <div
                className={styles.BasicCardInfo}
                style={{ marginBottom: "26px" }}
              >
                <div className={styles.Split}>
                  <div className={styles.CardInfoTitle2}>By Ticket</div>
                  <div className={styles.GraphNav}>
                    <Chip
                      options={["All time", "Today", "This Week"]}
                      setValue={setSellTable}
                      value={sellTableNav}
                      multiple={false}
                      showLimit={3}
                      itemStyle={{ fontSize: "14px", padding: "5px" }}
                    />
                  </div>
                </div>
                <div
                  className={styles.BasicTable}
                  style={{ maxHeight: "450px" }}
                >
                  <table>
                    {goupedSelledTable.map((data, index) => {
                      return (
                        <tr id={index}>
                          <td width={"60%"}>{data.type}</td>
                          <td>
                            <b>{data.totalSale.split(" dari ")[0]}</b> dari{" "}
                            {data.totalSale.split(" dari ")[1]} Terjual
                          </td>
                          <td>
                            <div
                              className={styles.Split}
                              style={{ gap: "5px" }}
                            >
                              <div className={styles.Currency2}>Rp</div>
                              <b>{numberFormat.format(data.total)}</b>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                  {goupedSelledTable.length === 0 ? (
                    <div
                      className={styles.Subtitle1}
                      style={{ textAlign: "center", marginTop: "20px" }}
                    >
                      Data belum tersedia
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div
                className={styles.BasicCardInfo}
                style={{ marginTop: "26px" }}
              >
                <div className={styles.CardInfoTitle2}>Transactions</div>
                <div className={styles.Split} style={{ marginBottom: "16px" }}>
                  <div className={styles.SearchBox}>
                    <FieldBox
                      label={<BiSearch style={{ marginTop: "5px" }} />}
                      style={{ width: "100%" }}
                    >
                      <InputForm
                        placeholder={"Cari Transaksi"}
                        type={"text"}
                        style={{ textAlign: "left", width: "100%" }}
                        onInput={(e) => {
                          setFilterSearch(e.target.value);
                          // console.log(e.target.value);
                        }}
                      />
                    </FieldBox>
                  </div>
                  <div
                    className={styles.DownloadBox}
                    onClick={handleDownloadReport}
                  >
                    <FieldBox label={<BiArrowToBottom />}>
                      <Button
                        title={"Download XLS"}
                        style={{
                          width: "unset",
                          boxShadow: "none",
                          padding: 0,
                        }}
                        bgColor={"#fff"}
                        borderColor={"#fff"}
                        textColor={"#000"}
                      />
                    </FieldBox>
                  </div>
                </div>
                <div
                  className={styles.BasicTable}
                  style={{ maxHeight: "450px" }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Ticket</th>
                        <th>Buyer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.length > 0 && buyers.length > 0 ? (
                        buyers
                          .filter((buyer) => {
                            let date = new Date(buyer.purchaseData.created_at);
                            return (
                              tickets
                                .find((ticket) => ticket.id == buyer.ticketId)
                                .name.toLowerCase()
                                .includes(filterSearch.toLowerCase()) ||
                              buyer.user.email.includes(filterSearch) ||
                              buyer.purchaseData.amount ==
                                parseInt(filterSearch) ||
                              `${date.getDate()} ${
                                config.months[date.getMonth()]
                              } ${date.getFullYear()}`.includes(filterSearch)
                            );
                          })
                          .map((buyer, index) => {
                            let date = new Date(buyer.purchaseData.created_at);
                            return (
                              <tr id={index} className={styles.PTable}>
                                <td>{index + 1}</td>
                                <td>
                                  {
                                    tickets.find(
                                      (ticket) => ticket.id == buyer.ticketId
                                    ).name
                                  }
                                </td>
                                <td>{buyer.user.email}</td>
                                <td>
                                  {numberFormat.format(
                                    buyer.purchaseData.amount
                                  )}
                                </td>
                                <td>
                                  {buyer.purchaseData.payment.pay_state ===
                                  "SUCCEEDED" ? (
                                    <Button
                                      center
                                      title={"SUCCEEDED"}
                                      bgColor={"green"}
                                      textColor={"white"}
                                      borderColor={"white"}
                                      style={{ width: "unset", padding: "5px" }}
                                    />
                                  ) : buyer.purchaseData.payment.pay_state ===
                                    "PENDING" ? (
                                    <Button
                                      center
                                      title={"PENDING"}
                                      bgColor={"yellow"}
                                      textColor={"black"}
                                      borderColor={"white"}
                                      style={{ width: "unset", padding: "5px" }}
                                    />
                                  ) : (
                                    <Button
                                      center
                                      title={"EXPIRED"}
                                      bgColor={"red"}
                                      textColor={"white"}
                                      borderColor={"white"}
                                      style={{ width: "unset", padding: "5px" }}
                                    />
                                  )}
                                </td>
                                <td>{`${date.getDate()} ${
                                  config.months[date.getMonth()]
                                } ${date.getFullYear()}`}</td>
                              </tr>
                            );
                          })
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {tickets.length > 0 && buyers.length > 0 ? (
                    <></>
                  ) : (
                    <div
                      className={styles.Subtitle1}
                      style={{ textAlign: "center", marginTop: "20px" }}
                    >
                      Data belum tersedia
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              id="More"
              className={`${styles.ContentBody} ${
                contentBody === "More" ? "" : "d-none"
              }`}
            >
              <div className={styles.BasicCardInfo}>
                <div className={styles.CardInfoTitle2}>Checkin User</div>

                <div className={styles.Split}>
                  <div className={styles.SearchBox}>
                    <FieldBox
                      label={<BiSearch style={{ marginTop: "5px" }} />}
                      style={{ width: "100%" }}
                    >
                      <InputForm
                        placeholder={"Cari Data"}
                        type={"text"}
                        style={{ textAlign: "left", width: "100%" }}
                        onInput={(e) => {
                          setFilterSearchCheckin(e.target.value);
                          // console.log(e.target.value);
                        }}
                      />
                    </FieldBox>
                  </div>

                  <div className={styles.DownloadBox} onClick={openAutoCheckin}>
                    <FieldBox label={<BiCheckCircle />}>
                      <Button
                        title={"Auto Checkin"}
                        style={{
                          width: "unset",
                          boxShadow: "none",
                          padding: 0,
                        }}
                        bgColor={"#fff"}
                        borderColor={"#fff"}
                        textColor={"#000"}
                      />
                    </FieldBox>
                  </div>
                </div>
                <div
                  className={styles.Subtitle}
                  style={{
                    backgroundColor: "#eaeaea",
                    borderRadius: "12px",
                    padding: "10px",
                    color: "#666666",
                  }}
                >
                  Informasi : Jika tiket berstatus berstatus "Waiting Accepted",
                  maka tiket tidak bisa digunakan untuk checkin kecuali telah
                  melakukan "Get Back" atau menarik kembali undanganya
                </div>
                <div
                  className={styles.BasicTable}
                  style={{ maxHeight: "450px" }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Tiket</th>
                        <th>Checkin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyers.length > 0 && tickets.length > 0 ? (
                        buyers
                          .filter(
                            (buyer) =>
                              (tickets
                                .find((ticket) => ticket.id == buyer.ticketId)
                                .name.toLowerCase()
                                .includes(filterSearchCheckin.toLowerCase()) ||
                                buyer.user.name
                                  .toLowerCase()
                                  .includes(
                                    filterSearchCheckin.toLowerCase()
                                  ) ||
                                buyer.user.email
                                  .toLowerCase()
                                  .includes(
                                    filterSearchCheckin.toLowerCase()
                                  )) &&
                              buyer.purchaseData.payment.pay_state ===
                                "SUCCEEDED"
                          )
                          .map((buyer, index) => {
                            return (
                              <tr id={index}>
                                <td>{index + 1}</td>
                                <td>{buyer.user.name}</td>
                                <td>{buyer.user.email}</td>
                                <td>
                                  {
                                    tickets.find(
                                      (ticket) => ticket.id == buyer.ticketId
                                    ).name
                                  }
                                </td>
                                <td>
                                  <InputToogle
                                    checked={
                                      buyer.checkin ? buyer.checkin : false
                                    }
                                    onChange={() => {
                                      buyer.checkin
                                        ? handleRollbackCheckin(
                                            buyer.checkin.id
                                          )
                                        : handleCheckinMain(
                                            `${
                                              buyer.purchaseData.id
                                            }${"*~^|-|^~*"}${buyer.user.id}`
                                          );
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {buyers.length > 0 && tickets.length > 0 ? (
                    <></>
                  ) : (
                    <div
                      className={styles.Subtitle1}
                      style={{ textAlign: "center", marginTop: "20px" }}
                    >
                      Data belum tersedia
                    </div>
                  )}
                </div>
              </div>
              <div
                className={styles.BasicCardInfo}
                style={{
                  marginTop: "20px",
                  // maxHeight: "600px",
                  // overflowY: "auto",
                }}
              >
                <div className={styles.Split}>
                  <div className={styles.CardInfoTitle2}>
                    QR Event for Self Checkin
                  </div>

                  <div
                    className={styles.DownloadBox}
                    style={{ marginLeft: "auto" }}
                    onClick={() => {
                      handleDownloadQR2(curentOrg, eventId);
                    }}
                  >
                    <FieldBox label={<BiArrowToBottom />}>
                      <Button
                        title={"Download PDF"}
                        style={{
                          width: "unset",
                          boxShadow: "none",
                          padding: 0,
                        }}
                        bgColor={"#fff"}
                        borderColor={"#fff"}
                        textColor={"#000"}
                      />
                    </FieldBox>
                  </div>
                </div>
                <QRCode
                  id="qr-event"
                  ref={pdfQR}
                  size={256}
                  value={window.location.origin + "/self-checkin/" + eventId}
                  level="H"
                  includeMargin={true}
                  className={styles.QRBox}
                />
              </div>
              <div
                className={styles.BasicCardInfo}
                style={{ marginTop: "50px" }}
              >
                <div className={styles.CardInfoTitle2}>Refunds</div>
                <div className={styles.SearchBox} style={{ width: "100%" }}>
                  <FieldBox
                    label={<BiSearch style={{ marginTop: "5px" }} />}
                    style={{ width: "100%" }}
                  >
                    <InputForm
                      placeholder={"Cari Data"}
                      type={"text"}
                      style={{ textAlign: "left", width: "100%" }}
                      onInput={(e) => {
                        setFilterSearchRefund(e.target.value);
                        // console.log(e.target.value);
                      }}
                    />
                  </FieldBox>
                </div>
                <div
                  className={styles.BasicTable}
                  style={{ maxHeight: "450px" }}
                >
                  <table>
                    <thead>
                      <tr>
                        {/* user data */}
                        <th>Username</th>
                        <th>Email</th>
                        <th>Telepon</th>
                        <th>TRX ID</th>
                        {/* purchase data */}
                        <th>Tiket</th>
                        <th>Harga</th>
                        <th>Persentase</th>
                        <th>Nominal</th>
                        {/* refund data */}
                        <th>Pembelian / Refund</th>
                        <th>Permasalahan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.length > 0 && refundDatas.length > 0 ? (
                        refundDatas.map((data) => {
                          // console.log(data);
                          return (
                            <tr>
                              <td style={{ whiteSpace: "normal" }}>
                                {data.user.name}
                              </td>
                              <td>{data.user.email}</td>
                              <td>{data.phone_number}</td>
                              <td style={{ whiteSpace: "normal" }}>
                                {data.purchase
                                  ? data.purchase.pay_id
                                  : "Transfered"}
                              </td>
                              <td style={{ whiteSpace: "normal" }}>
                                {
                                  tickets.find(
                                    (ticket) => ticket.id == data.ticket_id
                                  ).name
                                }
                              </td>
                              <td>
                                Rp. {numberFormat.format(data.basic_nominal)},-
                              </td>
                              <td>{data.percentage * 100}%</td>
                              <td>Rp. {numberFormat.format(data.nominal)},-</td>
                              <td>
                                {data.purchase.created_at.split("T")[0]} /{" "}
                                {data.created_at.split("T")[0]}
                              </td>
                              <td style={{ whiteSpace: "normal" }}>
                                {data.message}
                              </td>
                              <td>
                                <Button
                                  style={{
                                    padding: "5px",
                                    width: "unset",
                                  }}
                                  center
                                  bgColor={data.approve_org ? "green" : "red"}
                                  title={
                                    data.approve_org ? "approved" : "unapproved"
                                  }
                                  textColor={"white"}
                                  borderColor={"white"}
                                />
                              </td>
                              <td>
                                <Button
                                  style={{
                                    width: "unset",
                                  }}
                                  center
                                  bgColor={!data.approve_org ? "green" : "red"}
                                  title={
                                    !data.approve_org ? "Approve" : "un-Approve"
                                  }
                                  textColor={"white"}
                                  borderColor={"white"}
                                  fnOnClick={() => {
                                    openRefundPopUp(data);
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {tickets.length == 0 && refundDatas.length == 0 ? (
                    <div
                      className={styles.Subtitle1}
                      style={{ textAlign: "center", marginTop: "20px" }}
                    >
                      Data belum tersedia
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {customFields ? (
                <div
                  className={styles.BasicCardInfo}
                  style={{ marginTop: "40px" }}
                >
                  <div style={{ flexDirection: "row", gap: "10px" }}>
                    <div className={styles.CardInfoTitle2}>
                      Result of Custom Form
                    </div>
                    <div
                      className={styles.DownloadBox}
                      onClick={handleDownlodCsForm}
                      style={{ marginLeft: "auto" }}
                    >
                      <FieldBox label={<BiArrowToBottom />}>
                        <Button
                          title={"Download XLS"}
                          style={{
                            width: "unset",
                            boxShadow: "none",
                            padding: 0,
                          }}
                          bgColor={"#fff"}
                          borderColor={"#fff"}
                          textColor={"#000"}
                        />
                      </FieldBox>
                    </div>
                  </div>

                  <div
                    className={styles.BasicTable}
                    style={{ maxHeight: "450px" }}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {surveyRes && surveyRes.length > 0 ? (
                          surveyRes
                            .filter((survey) =>
                              succeededBuyerIds.includes(survey.user_id)
                            )
                            .map((res, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{res.user.name}</td>
                                  <td>{res.user.email}</td>
                                  <td>
                                    <Button
                                      title={"Lihat Detail"}
                                      center
                                      style={{ width: "unset" }}
                                      fnOnClick={() => {
                                        openDetailSurvey(res);
                                      }}
                                    />
                                  </td>
                                </tr>
                              );
                            })
                        ) : (
                          <></>
                        )}
                      </tbody>
                    </table>
                    {surveyRes && surveyRes.length > 0 ? (
                      <></>
                    ) : (
                      <div
                        className={styles.Subtitle1}
                        style={{ textAlign: "center", marginTop: "20px" }}
                      >
                        Data belum tersedia
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div
                className={styles.BasicCardInfo}
                style={{ marginTop: "50px" }}
              >
                <div className={styles.CardInfoTitle2}>Danger Area</div>
                <div className={styles.DangerZone}>
                  <div className={styles.DangerZoneTitle}>
                    Hapus Event / Activity ?
                  </div>
                  <Button
                    title={"Hapus"}
                    bgColor={"red"}
                    textColor={"white"}
                    borderColor={"red"}
                    fnOnClick={() => {
                      openDeleteEvent(buyers.length > 0 ? false : true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDashboard;
