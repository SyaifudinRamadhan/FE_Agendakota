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

const DownloadTicket = ({ isLogin, fnSetLogin = () => {} }) => {
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

  const handleDownloadTicket = (pchId) => {
    setLoading(true);
    downloadTicket({ pchId, token: appData.accessToken }).then((res) => {
      if (res.status === 200) {
        let url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "agendakota_ticket.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        setLoading(false);
        navigate("/my-tickets");
      } else if (res.status === 401) {
        fnSetLogin(false);
        setPausedProcess("download~!@!~" + pchId);
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

  useEffect(() => {
    if (isLogin && pausedProcess && appData.accessToken) {
      handleDownloadTicket(pausedProcess.split("~!@!~")[1]);
      console.log("Run paused process");
      setPausedProcess(null);
    }
  }, [pausedProcess, appData]);

  useEffect(() => {
    if (!firstLoad && appData.accessToken) {
      handleDownloadTicket(id);
      console.log("First load");
      setFirstLoad(true);
    }
  }, [firstLoad, appData]);

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
                  <div>Download Tiket</div>
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

export default DownloadTicket;
