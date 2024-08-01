import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/PopUpCheckin.module.css";
import {
  BiArrowBack,
  BiBarcodeReader,
  BiCheckCircle,
  BiError,
  BiQrScan,
  BiX,
} from "react-icons/bi";
import { QrScanner } from "@yudiel/react-qr-scanner";
import Button from "../components/Button";
import InputForm from "../components/InputForm";
import axios from "axios";
import Loading from "../components/Loading";
import moment, { locale } from "moment";
import { useSelector } from "react-redux";

let codes = "";
let load = 0;

let handleKeydown = null;

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

const PopUpCheckin = ({
  fnClose = () => {},
  buyers,
  orgId,
  eventId,
  isLogin,
  fnSetLogin = () => {},
  fnSetGlobalLoding = () => {},
}) => {
  const [menu, setMenu] = useState("main-menu");
  // const [menu, setMenu] = useState("Alert");
  const [lastMenu, setLastMenu] = useState("");
  const [strCode, setStrCode] = useState(null);
  const inputCode = useRef();
  // const [enterCLick, setEnterClick] = useState(false);
  const [firstLoad, setFirstLoadState] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const [pausedProcess, setPausedProcess] = useState(null);
  const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
  const appData = useSelector((state) => state.appDataReducer);

  const handleCheckin = (qrStr) => {
    setLoading(true);
    checkin({ orgId, eventId, qrStr: qrStr, token: appData.accessToken }).then(
      (res) => {
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
            content: (
              <div className={styles.NotifBox}>
                <div className={styles.IslandGroup}>
                  Checkin
                  <div className={styles.DynaminIsland}>
                    <BiCheckCircle />
                    <p>Success</p>
                  </div>
                </div>
                <div className={styles.ProfileBox}>
                  <img
                    src={
                      process.env.REACT_APP_BACKEND_URL + res.data.user.photo
                    }
                    className={styles.ProfileIcon}
                  />
                  <div>
                    <b>{res.data.user.name}</b>
                  </div>
                  <div>{res.data.user.email}</div>
                  <div style={{ marginTop: "20px" }}>
                    <b>
                      {res.data.ticket.name} - {res.data.event.name}
                    </b>
                  </div>
                  <div>
                    {moment(res.data.purchase.created_at)
                      .locale("id")
                      .format("DD MMM Y")}
                  </div>
                  <div>
                    <b>Rp. {numberFormat.format(res.data.purchase.amount)},-</b>
                  </div>
                </div>
              </div>
            ),
          });
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
        }
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (isLogin && pausedProcess) {
      // console.log(isLogin, pausedProcess);
      handleCheckin(pausedProcess.split("~!@!~")[1]);
      setPausedProcess(null);
    }
  }, [pausedProcess, isLogin]);

  useEffect(() => {
    if (
      firstLoad &&
      appData.accessToken !== null &&
      appData.accessToken !== "" &&
      orgId &&
      eventId
    ) {
      handleKeydown = (e) => {
        if (e.keyCode === 13) {
          if (inputCode.current) {
            handleCheckin(inputCode.current.value);
          }
          setLastMenu("Laser USB");
          setMenu("Alert");
          setStrCode(null);
          codes = "";
        } else if (e.keyCode === 8) {
          codes = codes.slice(0, codes.length - 1);
          setStrCode(codes);
        } else if (e.keyCode !== 16) {
          // console.log(e, codes);
          codes += e.key;
          setStrCode(codes);
        }
      };
      setFirstLoadState(false);
    }
    if (menu === "Laser USB" && load == 0) {
      document.addEventListener("keydown", handleKeydown);
      load++;
    } else if (menu !== "Laser USB") {
      // console.log("Remove listener");
      try {
        document.removeEventListener("keydown", handleKeydown);
        load = 0;
      } catch (error) {
        // console.log(error);
      }
    }
  }, [menu]);

  return (
    <div className={styles.MainContainer}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.Header}>
            {menu === "main-menu" ? (
              <></>
            ) : (
              <BiArrowBack
                onClick={() => {
                  setMenu("main-menu");
                  setStrCode(null);
                  codes = "";
                }}
                className={styles.Left}
              />
            )}
            <div>
              {menu === "main-menu" || menu === "alert" ? "Auto Checkin" : menu}
            </div>
            <BiX
              className={styles.Right}
              onClick={() => {
                fnClose(false);
                setMenu("main-menu");
                setStrCode(null);
                codes = "";
                document.removeEventListener("keydown", handleKeydown);
                fnSetGlobalLoding(true);
                setTimeout(() => {
                  fnSetGlobalLoding(false);
                }, 100);
              }}
            />
          </div>
          {menu === "main-menu" ? (
            <div id="main-menu" className={styles.Center}>
              <div
                className={styles.CardMenu}
                onClick={() => {
                  setMenu("QR Scan");
                }}
              >
                <BiQrScan />
                <div>QR Scan</div>
              </div>
              <div
                className={styles.CardMenu}
                onClick={() => {
                  setMenu("Laser USB");
                }}
              >
                <BiBarcodeReader />
                <div>Laser USB</div>
              </div>
            </div>
          ) : menu === "QR Scan" ? (
            <div id="qr-scan" className={styles.Center}>
              <QrScanner
                onDecode={(result) => {
                  // console.log(result);
                  handleCheckin(result);
                  setLastMenu(menu);
                  setMenu("Alert");
                }}
                onError={(error) => {
                  // console.log(error?.message);
                  setLastMenu(menu);
                  setMenu("Alert");
                }}
              />
            </div>
          ) : menu === "Laser USB" ? (
            <div
              id="laser-scan"
              className={`${styles.Center} ${styles.BarcodeReader}`}
            >
              <BiBarcodeReader />
              <div>
                Scan kode QR / Barcode atau ketik langsung kode uniknya dan
                tekan enter
              </div>
              <InputForm
                readOnly
                value={strCode}
                style={{ textAlign: "center" }}
                placeholder={"Atau ketik kode uniknya disini !!!"}
                refData={inputCode}
              />
            </div>
          ) : (
            <div id="alert" className={`${styles.Center} ${styles.Alert}`}>
              {alert.type == "danger" ? <BiError /> : <></>}
              <div>
                {alert.content
                  ? alert.content
                  : "Error !!! Silahkan Coba lagi !!!"}
              </div>
              <Button
                title={"Ok"}
                fnOnClick={() => {
                  setMenu(lastMenu);
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PopUpCheckin;
