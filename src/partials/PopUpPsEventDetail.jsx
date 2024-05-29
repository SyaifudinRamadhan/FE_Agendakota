import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/PopUpTicketIn.module.css";
import {
  BiCalendarEvent,
  BiCheckCircle,
  BiChevronLeft,
  BiEnvelope,
  BiError,
  BiFilter,
  BiInfoCircle,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoYoutube,
  BiMapPin,
  BiPhone,
  BiX,
} from "react-icons/bi";
import config from "../config";
import Button from "../components/Button";
import InputForm from "../components/InputForm";
import DatePicker from "react-multi-date-picker";
import QRCode from "qrcode.react";
import TextArea from "../components/TextArea";
import Select from "react-select";
import axios from "axios";
import Loading from "../components/Loading";
import PopUpSeatNumbers from "./PopUpSeatNumbers";
import PopUp from "./PopUp";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import moment from "moment";
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

const filterDateSelectorCart = (date, avlDays = []) => {
  let properties = {};
  if (
    !avlDays.includes(date.format("ddd")) ||
    new Date().setHours(0, 0, 0, 0) >
      new Date(date.format()).setHours(0, 0, 0, 0)
  ) {
    properties.disabled = true;
  }
  return properties;
};

const loadBanks = async ({ token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/get-banks-code",
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

const loadAvlSeatNumber = async ({
  ticketId,
  visitDate, //format Y-m-d ex : (2024-03-21)
}) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/ticket-reschedule?ticket_id=" +
        ticketId +
        "&visit_date=" +
        visitDate,
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

const reschedule = async ({ visitDate, seatNumber, pchId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/purchase-reschedule",
      {
        purchase_id: pchId,
        visit_date: visitDate, // Y-m-d
        seat_number: seatNumber, // number
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

const invite = async ({ targetEmail, pchId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/invite-user",
      {
        target_email: targetEmail,
        purchase_id: pchId,
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

const getBackInvite = async ({ pchId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/get-back-invite",
      {
        purchase_id: pchId,
        _method: "DELETE",
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

const refund = async ({
  purchaseIds,
  message,
  phoneNumber,
  accountNumber,
  bankCode,
  accountName,
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/request-refund",
      {
        purchase_ids: purchaseIds, //Array
        message: message,
        phone_number: phoneNumber,
        account_number: accountNumber,
        bank_code: bankCode,
        account_name: accountName,
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

const downloadTicket = async ({ pchId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/download-ticket?purchase_id=" +
        pchId,
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

const PopUpPsEventDetail = ({
  // trx,
  // trxs,
  // fnSetTrxs = () => {},
  fnClose = () => {},
  fnSetLogin = () => {},
  // isLogin,

  groupPchEvent,
}) => {
  const [page, setPage] = useState(0);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  // const [pchsGroup, setPchsGroup] = useState([]);
  const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
  const [ticketData, setTicketData] = useState(null);
  const [banks, setBankData] = useState({});
  const [loading, setLoading] = useState(true);
  const [avlDays, setAvlDays] = useState([]);
  const [enableRsc, setRscState] = useState(false);
  const [avlRsc, setAvlRsc] = useState(null);
  const [popUpSeatNumber, setPopUpSeatNumberState] = useState(false);
  const [alert, setAlert] = useState({ state: false, type: "", content: "" });
  const [poUpDownloadTicket, setPopUpDownTcState] = useState({
    state: false,
    content: <></>,
  });
  const appData = useSelector((state) => state.appDataReducer);

  const downloadContentRef = useRef();
  // const [pausedProcess, setPausedProcess] = useState(null);
  // const [avlSeatNumbers, setAvlSeatNumbers] = useState([]);
  // -------------------- DATA FORM -----------------------
  // 1. Invite
  const emailDest = useRef();
  // 2. Re-Schedule
  const [visitDate, setVisitDate] = useState(null);
  const [seatNumber, setSeatNumber] = useState([]);
  // 3. Refund
  const message = useRef();
  const phone = useRef();
  const accName = useRef();
  const accNum = useRef();
  const bankCode = useRef();
  // ------------------------------------------------------

  const handleReschedule = (pchData, visitDate, seatNumber) => {
    setLoading(true);
    let dateObj = new Date(visitDate);
    reschedule({
      pchId: pchData.id,
      visitDate: `${dateObj.getFullYear()}-${
        dateObj.getMonth() + 1
      }-${dateObj.getDate()}`,
      seatNumber: seatNumber.length === 0 ? null : seatNumber[0],
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 200) {
        // purchase in groupEvent data
        groupPchEvent.forEach((pch) => {
          if (pch.id === pchData.id) {
            pch.visit_date = res.data.visit_date;
            pch.seat_number = res.data.seat_number;
          }
        });
        setAlert({
          state: true,
          type: "success",
          content: "Re-Schedule berhasil diproses.",
        });
      } else if (res.status === 401) {
        fnSetLogin(false);
      } else {
        setAlert({
          state: true,
          type: "danger",
          content:
            res.status === 404
              ? "Tanggal kunjungan atau tempat duduk yang anda pilih, tidak tersedia"
              : res.status === 403
              ? "Batas jumlah atau waktu buka pada waktu kunjungan yang anda pilih sudh tercapai. Silahkan memilih tanggal kunjungan lain"
              : "Mohon maaf. Terjadi kesalah saat mengirim. Silahkan coba lagi",
        });
        setVisitDate(
          ticketData.visit_date
            ? new Date(ticketData.visit_date.visit_date)
            : null
        );
        setSeatNumber(
          ticketData.seat_number ? [ticketData.seat_number.seat_number] : []
        );
      }
      setLoading(false);
    });
  };

  const handleInvitation = (pchId) => {
    setLoading(true);
    if (
      emailDest.current.value === "" ||
      emailDest.current.value === " " ||
      emailDest.current.value.split("@").length < 2
    ) {
      setAlert({
        state: false,
        type: "danger",
        content: "Email tujuan wajib diisi",
      });
    } else {
      invite({
        targetEmail: emailDest.current.value,
        pchId,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 201) {
          groupPchEvent.forEach((pch) => {
            if (pch.id === pchId) {
              pch.is_mine = 0;
            }
          });
          setAlert({
            state: true,
            type: "success",
            content: "Invite berhasil diproses.",
          });
          setPage(0);
          setTicketData(null);
        } else if (res.status === 401) {
          fnSetLogin(false);
          //setPausedProcess("invite");
        } else {
          setAlert({
            state: true,
            type: "danger",
            content:
              res.status === 404
                ? "Tiket tidak ditemukan atau sudah tidak berlaku"
                : res.status === 403
                ? "Tidak diizinkan untuk mengundang diri anda sendiri"
                : "Mohon maaf. Terjadi kesalahan. Silahkan coba kembali",
          });
        }
        setLoading(false);
      });
    }
  };

  const handleGetBack = (pchId) => {
    setLoading(true);
    getBackInvite({ pchId, token: appData.accessToken }).then((res) => {
      if (res.status === 202) {
        groupPchEvent.forEach((pch) => {
          if (pch.id === pchId) {
            pch.is_mine = 1;
          }
        });
        setAlert({
          state: true,
          type: "success",
          content: "Get Back Invite berhasil diproses.",
        });
        setPage(0);
        setTicketData(null);
      } else if (res.status === 401) {
        fnSetLogin(false);
        //setPausedProcess("invite");
      } else {
        setAlert({
          state: true,
          type: "danger",
          content:
            res.status === 404
              ? "Tiket tidak ditemukan atau sudah tidak berlaku"
              : res.status === 403
              ? "Tidak diizinkan untuk mengundang diri anda sendiri"
              : "Mohon maaf. Terjadi kesalahan. Silahkan coba kembali",
        });
      }
      setLoading(false);
    });
  };

  const handleRefund = (pchId) => {
    if (
      message.current.value === "" ||
      phone.current.value === "" ||
      accName.current.value === "" ||
      accNum.current.value === "" ||
      message.current.value === " " ||
      phone.current.value === " " ||
      accName.current.value === " " ||
      accNum.current.value === " " ||
      bankCode.current.getValue().length === 0
    ) {
      setAlert({
        state: true,
        type: "danger",
        content: "Semua field refund wajib diisi",
      });
    } else {
      setLoading(true);
      refund({
        purchaseIds: [pchId],
        message: message.current.value,
        phoneNumber: phone.current.value,
        accountNumber: accNum.current.value,
        bankCode: bankCode.current.getValue()[0].value,
        accountName: accName.current.value,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 201) {
          setAlert({
            state: true,
            type: "success",
            content: "Refund berhasil diajukan.",
          });
        } else if (res.status === 401) {
          fnSetLogin(false);
          //setPausedProcess("refund");
        } else {
          setAlert({
            state: true,
            type: "danger",
            content:
              res.status === 403
                ? "Semua field wajib diisi atau permintaan refund, sudah pernah dibuat. Mohon ditunggu"
                : res.status === 404
                ? "Mohon maaf. Bank pilihan tidak tersedia"
                : "Mohon maaf, terjadi kesalahan saat mengirim data. Silahkan dicoba lagi",
          });
        }
        setLoading(false);
      });
    }
  };

  const handleDownloadTicket = (pchId) => {
    setLoading(true);
    downloadTicket({ pchId, token: appData.accessToken }).then((res) => {
      if (res.status === 200) {
        // console.log(res.data);
        // let url = window.URL.createObjectURL(
        // 	new Blob([res.data], { type: "application/pdf" })
        // );
        let url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );
        // console.log(url, new Blob([res.data], { type: "application/pdf" }));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "agendakota_ticket.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        setLoading(false);
      } else if (res.status === 401) {
        fnSetLogin(false);
      } else {
        setAlert({
          state: true,
          type: "danger",
          content:
            res.status === 404
              ? "Mohon maaf. Data purchase tiket tidak ditemukan"
              : "Mohon maaf, terjadi kesalahan saat mengirim data. Silahkan dicoba lagi",
        });
      }
      setLoading(false);
    });
  };

  const handleDownloadTicket2 = (pchData, paymentData) => {
    // console.log(paymentData, "PAY DATA");
    let strDate = "";
    if (pchData.visit_date) {
      let visitDate = new Date(pchData.visit_date.visit_date);
      strDate = `${config.days[visitDate.getDay()]}, ${visitDate.getDate()} ${
        config.months[visitDate.getMonth()]
      } ${visitDate.getFullYear()}`;
    } else {
      let start = new Date(
        pchData.ticket.event.start_date + " " + pchData.ticket.event.start_time
      );
      let end = new Date(
        pchData.ticket.event.end_date + " " + pchData.ticket.event.end_time
      );
      strDate = `${start.getDate()} ${
        config.months[start.getMonth()]
      } ${start.getFullYear()} - ${end.getDate()} ${
        config.months[end.getMonth()]
      } ${end.getFullYear()} | ${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()} WIB`;
    }
    let content = (
      <div className="MainPaper" ref={downloadContentRef}>
        <div className="BoxInner">
          <span style={{ fontWeight: 500, fontSize: "14px" }}>
            TICKET TYPE :{" "}
            <span className="TextPrimaryBasic">
              {pchData.ticket.name}, {pchData.ticket.event.city}{" "}
            </span>{" "}
            (Rp. {numberFormat.format(pchData.amount)},00)
          </span>
        </div>
        <div className="PaperSplit GroupInner">
          <div className="GroupInner LeftPanel">
            <div className="BoxInner">
              <img
                src={
                  process.env.REACT_APP_BACKEND_URL + pchData.ticket.event.logo
                }
                alt=""
                srcset=""
                className="ImgBanner"
              />
            </div>
            <div className="BoxInner" style={{ height: "100%" }}>
              <div className="BoxInnerTitle">{}</div>
              {pchData.ticket.event.name}
              <div
                className="PaperSplit InfoGroup "
                style={{ margin: "unset" }}
              >
                <BiCalendarEvent color="red" /> <div>{strDate}</div>
              </div>
              <div
                className="PaperSplit InfoGroup "
                style={{ margin: "unset" }}
              >
                <BiFilter color="blue" />{" "}
                <div>{pchData.ticket.event.exe_type}</div>
              </div>
              <div
                className="PaperSplit InfoGroup "
                style={{ margin: "unset" }}
              >
                <BiMapPin />{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: pchData.ticket.event.location,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div
            className="GroupInner RightPanel "
            style={{ width: "266.003002px" }}
          >
            <div className="BoxInner">
              <img
                src={
                  process.env.REACT_APP_BACKEND_URL +
                  pchData.ticket.event.org.photo
                }
                alt=""
                srcset=""
                className="OrgAvatar"
                style={{
                  aspectRatio: "1/1",
                  margin: "auto",
                  height: "100px",
                }}
              />
            </div>
            <div className="BoxInner">
              <QRCode
                style={{
                  aspectRatio: "1/1",
                  margin: "auto",
                  height: "128px",
                }}
                value={pchData.qr_str}
              />
            </div>
            <div
              className="BoxInner"
              style={{ gap: "7px", textAlign: "center", height: "100%" }}
            >
              <div>{paymentData.order_id}</div>
              <div>{paymentData.user.name}</div>
              <div>
                Dipesan pada{" "}
                {`${new Date(paymentData.created_at).getDate()} ${
                  config.months[new Date(paymentData.created_at).getMonth()]
                } ${new Date(paymentData.created_at).getFullYear()}`}
              </div>
              <div>Ref: Online</div>
            </div>
          </div>
        </div>
        <div className="BoxInner">
          <div className="BoxInnerTitle" style={{ margin: "auto" }}>
            Contact Organizer
          </div>
        </div>
        <div className="PaperSplit GroupInner ">
          <div className="BoxInner" style={{ width: "33.33%" }}>
            <div className="PaperSplit InfoGroup ">
              <BiPhone color="green" />
              <div>{pchData.ticket.event.org.phone}</div>
            </div>
          </div>
          <div className="BoxInner" style={{ width: "33.33%" }}>
            <div className="PaperSplit InfoGroup ">
              <BiLogoInstagram />
              <div>{pchData.ticket.event.org.instagram}</div>
            </div>
          </div>
          <div className="BoxInner" style={{ width: "33.33%" }}>
            <div className="PaperSplit InfoGroup ">
              <BiEnvelope color="blue" />{" "}
              <div>{pchData.ticket.event.org.email}</div>
            </div>
          </div>
        </div>
        <div className="BoxInner">
          <div>
            <div
              className="PaperSplit GroupInner GroupSocmed "
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <BiLogoFacebook color="blue" />
              <BiLogoYoutube color="red" />
              <BiX color="#00a0ff" />
              <BiLogoInstagram />
            </div>
          </div>
          <div>
            <div
              className="PaperSplit GroupInner "
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                alignItems: "center",
              }}
            >
              <div className="BoxInnerTitle">Powered by</div>
              <img
                src="/images/logo.png"
                alt=""
                style={{ height: "25px", aspectRatio: "2061 / 421" }}
              />
            </div>
          </div>
        </div>
      </div>
    );

    setPopUpDownTcState({
      state: true,
      content: (
        <div>
          <div className={styles.DownloadHeader}>
            <div className={styles.Title}>Downloading</div>
            <Button
              bgColor={"rgb(212 132 169)"}
              borderColor={"rgb(212 132 169)"}
              title={"Loading ..."}
              icon={
                <div
                  className="spinner-border"
                  style={{ width: "20px", height: "20px" }}
                  animation="border"
                />
              }
              center={true}
              style={{ width: "100%", textAlign: "center" }}
            />
          </div>
          <div
            className={styles.DownloadMainContent}
            style={{ width: "100%", overflow: "auto" }}
          >
            <div style={{ margin: "auto" }}>{content}</div>
          </div>
        </div>
      ),
    });
  };

  useEffect(() => {
    if (poUpDownloadTicket.state) {
      let doc = window.open("", "", "height=500, width=500");
      let style =
        ".MainPaper {" +
        "	display: flex;" +
        "	flex-direction: column;" +
        "	gap: 18.897637795px;" +
        "	padding: 18.897637795px;" +
        "	margin: 37.795275591px;" +
        "	width: 756.7007874px;" +
        "	height: 1085.519685px;" +
        "	background-color: #ddd;" +
        "}" +
        ".MainPaper .GroupInner {" +
        "	gap: 18.897637795px;" +
        "	display: flex;" +
        "	flex-direction: column;" +
        "}" +
        ".PaperSplit {" +
        "	display: flex;" +
        "	flex-direction: row !important;" +
        "}" +
        ".BoxInner {" +
        "	background-color: #fff;" +
        "	padding: 18.897637795px;" +
        "	gap: 15px;" +
        "	font-size: 12px;" +
        "}" +
        ".BoxInner div {" +
        "	overflow: hidden;" +
        "	overflow-wrap: anywhere;" +
        "}" +
        ".LeftPanel {" +
        "	width: 434.004898px;" +
        "}" +
        ".ImgBanner {" +
        "	width: 100%;" +
        "}" +
        ".BoxInnerTitle {" +
        "	font-weight: bold;" +
        "	font-size: 16px;" +
        "}" +
        ".InfoGroup {" +
        "	gap: 10px;" +
        "	align-content: center;" +
        "	margin-top: auto;" +
        "	margin-bottom: auto;" +
        "}" +
        ".InfoGroup svg {" +
        "	margin-top: auto;" +
        "	margin-bottom: auto;" +
        "	width: 23px;" +
        "	height: 23px;" +
        "}" +
        ".InfoGroup div {" +
        "	margin-top: auto;" +
        "	margin-bottom: auto;" +
        "	width: calc(100% - 40px);" +
        "}" +
        ".GroupSocmed svg {" +
        "	width: 30px;" +
        "	height: 30px;" +
        "}";
      doc.document.write(
        `<html><head><style>${style}</style></head><body><div className="MainPaper" />`
      );
      doc.document.write(downloadContentRef.current.innerHTML);
      doc.document.write("</div></body></html>");
      doc.document.close();
      doc.print();
      setPopUpDownTcState({
        state: false,
        content: <></>,
      });

      // htmlToImage.toCanvas(downloadContentRef.current).then((png) => {
      // 	// let imgData = canvas.toDataURL("image/png");
      // 	// // console.log(imgData, downloadContentRef.current);
      // 	// let pdf = new jsPDF();
      // 	// pdf.addImage(imgData, "PNG", 0, 0);
      // 	// pdf.save();
      // 	// console.log(png);
      // 	setPopUpDownTcState({
      // 		state: false,
      // 		content: <></>,
      // 	});
      // });
    }
  }, [poUpDownloadTicket]);

  useEffect(() => {
    if (ticketData) {
      setVisitDate(
        ticketData.visit_date
          ? new Date(ticketData.visit_date.visit_date)
          : null
      );
      setSeatNumber(
        ticketData.seat_number ? [ticketData.seat_number.seat_number] : []
      );
      setAvlDays(
        ticketData.ticket.event.available_days.map((avlDay) => {
          return avlDay.day;
        })
      );
      setRscState(ticketData.ticket.event.available_reschedule ? true : false);
      setAvlRsc(ticketData.ticket.event.available_reschedule);
    }
  }, [ticketData]);

  useEffect(() => {
    if (seatNumber.length === 0 && ticketData && ticketData.seat_number) {
      setSeatNumber([ticketData.seat_number.seat_number]);
    }
  }, [ticketData, seatNumber]);

  useEffect(() => {
    if (
      visitDate &&
      ticketData &&
      ticketData.visit_date &&
      ticketData.seat_number &&
      new Date(visitDate).setHours(0, 0, 0, 0) !==
        new Date(ticketData.visit_date.visit_date).setHours(0, 0, 0, 0)
    ) {
      setLoading(true);
      let dateObj = new Date(visitDate);
      loadAvlSeatNumber({
        ticketId: ticketData.ticket.id,
        visitDate: `${dateObj.getFullYear()}-${
          dateObj.getMonth() + 1
        }-${dateObj.getDate()}`,
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.ticket.available_seat_numbers) {
            // // console.log(
            // 	res.data.ticket.available_seat_numbers,
            // 	seatNumber,
            // 	"TEST FN CHECK AVL SEAT NUMBER"
            // );
            if (
              res.data.ticket.available_seat_numbers.indexOf(
                seatNumber.length === 0
                  ? ticketData.seat_number.seat_number
                  : seatNumber[0]
              ) === -1
            ) {
              setAlert({
                state: true,
                type: "danger",
                content:
                  "Mohon maaf, nomor tempat duduk saat ini, telah dipesan pengguna lain pada waktu kunjungan yang anda pilih. Silahkan memilih tempat duduk lain atau tanggal kunjungan lain",
              });
            }
          }
        }
        setLoading(false);
      });
    }
  }, [visitDate, ticketData]);

  useEffect(() => {
    if (groupPchEvent) {
      loadBanks({ token: appData.accessToken }).then((res) => {
        if (res.status === 200) {
          setBankData(res.data.banks);
        }
        setLoading(false);
      });

      let start = new Date(
        groupPchEvent[0].ticket.event.start_date +
          " " +
          groupPchEvent[0].ticket.event.start_time
      );
      let end = new Date(
        groupPchEvent[0].ticket.event.end_date +
          " " +
          groupPchEvent[0].ticket.event.end_time
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
      // let pchsGroup = [];
      // groupPchEvent.forEach((pch, index) => {
      // 	if (
      // 		!pchsGroup[
      // 			`${pch.ticket.id}-${
      // 				pch.visit_date ? pch.visit_date.visit_date : ""
      // 			}`
      // 		]
      // 	) {
      // 		pchsGroup[
      // 			`${pch.ticket.id}-${
      // 				pch.visit_date ? pch.visit_date.visit_date : ""
      // 			}`
      // 		] = [pch];
      // 	} else {
      // 		pchsGroup[
      // 			`${pch.ticket.id}-${
      // 				pch.visit_date ? pch.visit_date.visit_date : ""
      // 			}`
      // 		].push(pch);
      // 	}
      // });
      // setPchsGroup(pchsGroup);
    }
  }, [groupPchEvent]);

  // useEffect(() => {
  // 	try {
  // 		document.getElementsByTagName("add-to-calendar-button").style.width =
  // 			"100%";
  // 		document.getElementsByClassName("atcb-initialized")[0].style.width =
  // 			"100%";
  // 		let btn = document.getElementsByClassName("atcb-button")[0];
  // 		btn.style.width = "100%";
  // 		btn.style.backgroundColor = "white";
  // 		btn.style.borderColor = "black";
  // 	} catch (error) {}
  // });

  return (
    <>
      <PopUp
        title=""
        isActive={poUpDownloadTicket.state}
        content={poUpDownloadTicket.content}
      />
      {alert.state ? (
        <PopUp
          isActive
          title="Notifikasi"
          content={
            <div className={styles.PopUpAlert}>
              {alert.type === "danger" ? (
                <BiError style={{ color: "#ca0c64" }} />
              ) : alert.type === "warning" ? (
                <BiInfoCircle style={{ color: "yellow" }} />
              ) : (
                <BiCheckCircle style={{ color: "green" }} />
              )}
              <div className={styles.AlertContent}>{alert.content}</div>
              <Button
                fnOnClick={() => {
                  setAlert({
                    state: false,
                    type: "",
                    content: "",
                  });
                }}
                title={"Ok"}
              />
            </div>
          }
          setActiveFn={() => {
            setAlert({
              state: false,
              type: "",
              content: "",
            });
          }}
        />
      ) : (
        <></>
      )}
      {popUpSeatNumber ? (
        <PopUpSeatNumbers
          fnSetActive={setPopUpSeatNumberState}
          fnRenewSeatNum={setSeatNumber}
          fnRenewTicketData={() => {}}
          selectedSeatNumbers={seatNumber}
          ticket={ticketData.ticket}
          visitDate={visitDate}
          mode="edit"
        />
      ) : (
        <></>
      )}
      <div className={styles.MainBox}>
        <div className={styles.Header}>
          <div style={{ width: "calc(100% - 52px)" }}>
            <div className={styles.HeaderTitle}>
              {page === 0 ? (
                "Ticket Transactions Details"
              ) : (
                <>
                  <span
                    onClick={() => {
                      setPage(0);
                      setTicketData(null);
                    }}
                    className={styles.TextSecondary}
                    style={{ cursor: "pointer" }}
                  >
                    Ticket Transactions Details /{" "}
                  </span>
                  <span className={styles.TextPrimaryBasic}>
                    Ticket Details
                  </span>
                </>
              )}
            </div>
            <div className={styles.SubTitle}>
              Manage information abaout your ticket
            </div>
          </div>
          <BiX
            onClick={() => {
              fnClose();
              setPage(0);
              setTicketData(null);
            }}
          />
        </div>

        {loading ? (
          <div style={{ marginTop: "100px", marginBottom: "100px" }}>
            <Loading />
          </div>
        ) : (
          <div className={styles.SplitWrap}>
            <div className={styles.SplitLeft}>
              {page === 0 ? (
                <>
                  <div className={styles.Banner}>
                    <img
                      src={
                        process.env.REACT_APP_BACKEND_URL +
                        groupPchEvent[0].ticket.event.logo
                      }
                      alt=""
                    />
                  </div>
                  <div className={styles.Info}>
                    <h5 className={styles.InfoTitle}>
                      {groupPchEvent[0].ticket.event.name}
                    </h5>
                    <div
                      className={styles.InfoLocation}
                      dangerouslySetInnerHTML={{
                        __html: groupPchEvent[0].ticket.event.location,
                      }}
                    ></div>
                    <div className={styles.InfoTime}>
                      {groupPchEvent[0].ticket.event.category !==
                        "Attraction" &&
                      groupPchEvent[0].ticket.event.category !==
                        "Daily Activities" &&
                      groupPchEvent[0].ticket.event.category !==
                        "Tour Travel (recurring)" ? (
                        start && end ? (
                          <>
                            <div className={styles.Time}>
                              <p className={styles.Date}>
                                {start.split("|")[0]}
                              </p>
                              <p className={styles.Clock}>
                                {" "}
                                |&nbsp; {start.split("|")[1]}
                              </p>
                            </div>
                            <div className={styles.Time}>
                              <p className={styles.Date}>{end.split("|")[0]}</p>
                              <p className={styles.Clock}>
                                {" "}
                                |&nbsp; {end.split("|")[1]}
                              </p>
                            </div>
                          </>
                        ) : (
                          <></>
                        )
                      ) : (
                        groupPchEvent[0].ticket.event.available_days.map(
                          (avld) => {
                            return (
                              <div className={styles.Time}>
                                <p className={styles.Date}>
                                  {config.dayEnToInd[avld.day]}
                                </p>
                                <p className={styles.Clock}>
                                  {" "}
                                  | Buka sampai{" "}
                                  {moment(
                                    groupPchEvent[0].ticket.event.start_date +
                                      " " +
                                      avld.max_limit_time
                                  )
                                    .locale("id")
                                    .format("HH:mm")}{" "}
                                  WIB
                                </p>
                              </div>
                            );
                          }
                        )
                      )}
                    </div>
                    <div
                      className={styles.InfoLocation}
                      style={{ marginTop: "20px" }}
                      dangerouslySetInnerHTML={{
                        __html: groupPchEvent[0].ticket.event.desc,
                      }}
                    ></div>
                    <div className={styles.InfoOrganizer}>
                      <b>Event Organizer</b>
                      <div className={styles.OrgBox}>
                        <img
                          src={
                            process.env.REACT_APP_BACKEND_URL +
                            groupPchEvent[0].ticket.event.org.photo
                          }
                          alt=""
                        />
                        <div>{groupPchEvent[0].ticket.event.org.name}</div>
                        {groupPchEvent[0].ticket.event.org.legality &&
                        groupPchEvent[0].ticket.event.org.legality.status ==
                          1 ? (
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
                </>
              ) : (
                <>
                  <div className={styles.GroupForm}>
                    <div className={styles.GroupTitle}>Invitation </div>
                    <div className={styles.SubTitle}>
                      Transfer ownerships or invite friends to use this ticket
                    </div>
                    {ticketData.is_mine === 1 ? (
                      <>
                        <label htmlFor="inv">Email of Invitee</label>
                        <div className={styles.Split}>
                          <InputForm
                            id={"inv"}
                            placeholder={"email aktif"}
                            style={{ width: "calc(100% - 71px)" }}
                            refData={emailDest}
                          />
                          <Button
                            style={{ width: "unset" }}
                            center
                            title={"Invite"}
                            fnOnClick={() => {
                              handleInvitation(ticketData.id);
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div>
                        <Button
                          style={{ width: "unset", marginTop: "20px" }}
                          center
                          bgColor={"yellow"}
                          textColor={"black"}
                          borderColor={"yellow"}
                          title={"Get Back"}
                          fnOnClick={() => {
                            handleGetBack(ticketData.id);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {enableRsc ? (
                    <div className={styles.GroupForm}>
                      <div className={styles.GroupTitle}>Reschedule</div>
                      <div className={styles.SubTitle}>
                        Change the date of your arrival{" "}
                        {`(Can be done if the difference between the previously selected days is ${
                          avlRsc.limit_time == 0
                            ? "24 hours"
                            : avlRsc.limit_time + " days"
                        } or more from today)`}
                      </div>
                      <label htmlFor="dt-pick">Select date</label>
                      <DatePicker
                        id="dt-pick"
                        placeholder="Pilih tanggal"
                        style={{
                          height: "35px",
                          width: "98%",
                        }}
                        mapDays={({ date }) =>
                          filterDateSelectorCart(date, avlDays)
                        }
                        value={visitDate}
                        onChange={(e) => {
                          setVisitDate(e.format());
                        }}
                        disabled={
                          new Date(visitDate).setHours(0, 0, 0, 0) <
                          new Date().setHours(0, 0, 0, 0)
                        }
                      />
                      {seatNumber.length > 0 ? (
                        <>
                          <label htmlFor="seat-num">Change Seats</label>
                          <div
                            className={styles.DummyForm}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setPopUpSeatNumberState(true);
                            }}
                          >
                            <div>{seatNumber[0]}</div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      <Button
                        style={{ width: "unset", marginTop: "20px" }}
                        center
                        title={"Reschedule"}
                        fnOnClick={() => {
                          handleReschedule(ticketData, visitDate, seatNumber);
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {ticketData.ticket.event.allow_refund == 1 ? (
                    <div className={styles.GroupForm}>
                      <div className={styles.GroupTitle}>Refund Request </div>
                      <div className={styles.SubTitle}>
                        Write your problem and fill this forms to apply for a
                        refund
                      </div>
                      <label htmlFor="phone">Phone Number</label>
                      <InputForm
                        id={"phone"}
                        type={"number"}
                        placeholder={"Nomor ponsel / WA aktif"}
                        refData={phone}
                      />
                      <label htmlFor="bank">Bank</label>
                      <Select
                        placeholder={"Pilih Bank"}
                        options={Object.entries(banks).map((bank) => {
                          return {
                            label: bank[1],
                            value: bank[0],
                          };
                        })}
                        styles={{
                          option: (basicStyle, state) => ({
                            ...basicStyle,
                            backgroundColor: state.isFocused
                              ? "#fecadf"
                              : "white",
                          }),
                        }}
                        ref={bankCode}
                      />
                      <label htmlFor="bank_acc">Bank Account Number</label>
                      <InputForm
                        id={"bank_acc"}
                        type={"text"}
                        placeholder={"Nomor rekening aktif"}
                        refData={accNum}
                      />
                      <label htmlFor="bank_acc_name">Bank Account Name</label>
                      <InputForm
                        id={"bank_acc_name"}
                        type={"text"}
                        placeholder={"Pemilik rekening aktif"}
                        refData={accName}
                      />
                      <label htmlFor="msg">Message / Problem</label>
                      <TextArea
                        id={"msg"}
                        placehorder="Tuliskan pesan atau masalah mu"
                        refData={message}
                      />
                      <Button
                        style={{ width: "unset", marginTop: "20px" }}
                        center
                        title={"Refund"}
                        fnOnClick={() => {
                          handleRefund(ticketData.id);
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            <div className={styles.SplitRight}>
              {page === 0 ? (
                <>
                  <div className={styles.HeaderTitle}>Tickets</div>
                  <div style={{ marginTop: "30px" }}>
                    {groupPchEvent.map((pch) => (
                      // Disabled has show if ticket has invalid / expired
                      <div
                        className={`${styles.TicketBox} ${
                          !(
                            new Date(
                              pch.ticket.event.end_date +
                                " " +
                                pch.ticket.event.end_time
                            ) < new Date() ||
                            (pch.visit_date &&
                              new Date().setHours(0, 0, 0, 0) >
                                new Date(pch.visit_date.visit_date).setHours(
                                  0,
                                  0,
                                  0,
                                  0
                                ))
                          )
                            ? ""
                            : styles.Disabled
                        }`}
                      >
                        <div className={styles.TicketItem}>
                          {pch.is_mine === 0 ? (
                            <div className={styles.Bagde}>Waiting Accepted</div>
                          ) : (
                            <></>
                          )}
                          <img
                            src={
                              process.env.REACT_APP_BACKEND_URL +
                              pch.ticket.cover
                            }
                            alt=""
                            srcset=""
                          />
                          <div style={{ width: "calc(100% - 68px)" }}>
                            <div className={styles.TicketTitle}>
                              {pch.ticket.name}
                            </div>
                            <div className={styles.TextSecondary}>x1</div>
                          </div>
                        </div>
                        <Button
                          center
                          title={"See Ticket"}
                          style={{
                            width: "unset",
                            padding: "8px 12px 8px 12px",
                            marginLeft: "auto",
                          }}
                          bgColor={"#CA0C6414"}
                          borderColor={"#CA0C6414"}
                          textColor={"#ca0c64"}
                          fnOnClick={() => {
                            // check valid status ticket
                            if (
                              !(
                                new Date(
                                  pch.ticket.event.end_date +
                                    " " +
                                    pch.ticket.event.end_time
                                ) < new Date() ||
                                (pch.visit_date &&
                                  new Date().setHours(0, 0, 0, 0) >
                                    new Date(
                                      pch.visit_date.visit_date
                                    ).setHours(0, 0, 0, 0))
                              )
                            ) {
                              setTicketData(pch);
                              setPage(1);
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.InfoTicket}>
                    <div className={styles.TicketBox}>
                      <div
                        className={styles.TicketItem}
                        style={{ width: "100%" }}
                      >
                        <img
                          src={
                            process.env.REACT_APP_BACKEND_URL +
                            ticketData.ticket.cover
                          }
                          alt=""
                          srcset=""
                        />
                        <div style={{ width: "calc(100% - 70px)" }}>
                          <div className={styles.TicketTitle}>
                            {ticketData.ticket.name}
                          </div>
                          <div className={styles.TextSecondary}>x1</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {visitDate ? (
                        <span style={{ marginBottom: "20px" }}>
                          <b>Tanggal Kunjungan : </b>
                          {moment(visitDate)
                            .locale("id-ID")
                            .format("DD MMMM Y")}
                        </span>
                      ) : (
                        <></>
                      )}
                      {seatNumber && seatNumber != "" ? (
                        <span style={{ marginBottom: "20px" }}>
                          <b>Nomor Tempat Duduk : </b>
                          {seatNumber}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={styles.QRBox}>
                      <div className={styles.SubTitle}>
                        Scan QR Code to Check In
                      </div>
                      <QRCode
                        width={256}
                        height={256}
                        value={ticketData.qr_str}
                      />
                    </div>
                    <add-to-calendar-button
                      id="btn-add-calendar"
                      style={{ margin: "auto", marginTop: "24px" }}
                      buttonStyle="round"
                      name={
                        ticketData.ticket.event.name +
                        " - " +
                        ticketData.ticket.name
                      }
                      options="'Apple','Google'"
                      location={
                        ticketData.ticket.event.location.split("<p>").length > 1
                          ? ticketData.ticket.event.location
                              .split("<p>")[1]
                              .split("</p>")[0]
                          : ticketData.ticket.event.location
                      }
                      startDate={
                        ticketData.visit_date
                          ? ticketData.visit_date.visit_date
                          : ticketData.ticket.event.start_date
                      }
                      endDate={
                        ticketData.visit_date
                          ? ticketData.visit_date.visit_date
                          : ticketData.ticket.event.end_date
                      }
                      startTime={
                        ticketData.visit_date
                          ? "07:00"
                          : ticketData.ticket.event.start_time
                      }
                      endTime={
                        ticketData.visit_date
                          ? "23:59"
                          : ticketData.ticket.event.end_time
                      }
                      timeZone="Asia/Jakarta"
                    ></add-to-calendar-button>
                    <Button
                      style={{ width: "unset" }}
                      center
                      title={"Download E-Ticket"}
                      fnOnClick={() => {
                        handleDownloadTicket(ticketData.id);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PopUpPsEventDetail;
