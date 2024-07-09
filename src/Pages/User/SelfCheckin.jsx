import React, { useEffect, useState } from "react";
import styles from "../../partials/styles/PopUpCheckin.module.css";
import {
  BiArrowBack,
  BiBarcodeReader,
  BiCheckCircle,
  BiError,
  BiQrScan,
  BiX,
} from "react-icons/bi";
import Button from "../../components/Button";
import axios from "axios";
import Loading from "../../components/Loading";
import moment, { locale } from "moment";
import PopUp from "../../partials/PopUp";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// let codes = "";
// let load = 0;

// let handleKeydown = null;

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

const checkin = async ({ eventId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/checkin",
      {
        event_id: eventId,
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

const SelfCheckin = ({ isLogin, fnSetLogin = () => {} }) => {
  // ================== State control ============================
  const [firstLoad, setFirstLoad] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const [pausedProcess, setPausedProcess] = useState(null);
  const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));

  // ================= Data =====================================
  const appData = useSelector((state) => state.appDataReducer);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleCheckin = (qrStr) => {
    setLoading(true);
    checkin({
      eventId: qrStr,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 201) {
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
                  src={process.env.REACT_APP_BACKEND_URL + res.data.user.photo}
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
                <div>
                  <b>
                    {" "}
                    Checkin On{" "}
                    {moment(res.data.checkin_on)
                      .locale("id")
                      .format("DD MMM Y")}
                  </b>
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
              ? "Transaksi tidak dapat ditemukan / kadaluwarsa"
              : res.status == 403
              ? "Tiket sudah tidak berlaku / sudah digunakan"
              : "Error internal server. Silahkan coba lagi",
        });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isLogin && pausedProcess) {
      handleCheckin(pausedProcess.split("~!@!~")[1]);
      console.log("Run paused process");
      setPausedProcess(null);
    }
  }, [pausedProcess, isLogin]);

  useEffect(() => {
    if (!firstLoad) {
      handleCheckin(id);
      console.log("First load");
      setFirstLoad(true);
    }
  }, [firstLoad]);

  return (
    <>
      <PopUp
        isActive
        title=""
        width="45%"
        content={
          <div className={styles.MainContainer}>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div className={styles.Header}>
                  <div>User Checkin</div>
                </div>

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
                      navigate("/my-tickets");
                    }}
                  />
                </div>
              </>
            )}
          </div>
        }
      />
      <div className="content user"></div>
    </>
  );
};

export default SelfCheckin;
