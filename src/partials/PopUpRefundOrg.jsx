import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/PopUpRefundOrg.module.css";
import PopUp from "./PopUp";
import axios from "axios";
import Loading from "../components/Loading";
import InputForm from "../components/InputForm";
import InputLabeled from "../components/InputLabeled";
import Button from "../components/Button";
import {
  BiCheckCircle,
  BiError,
  BiInfoCircle,
  BiQuestionMark,
} from "react-icons/bi";
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

const refundChange = async ({
  orgId,
  eventId,
  refundId,
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
        id: refundId,
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

const PopUpRefundOrg = ({
  isActive,
  fnSetActive,
  orgId,
  eventId,
  refundData,
  refundDatas,
  isLogin,
  fnSetLogin,
  fnSetGlobalLoading,
}) => {
  const [pausedProcess, setPausedProcess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const appData = useSelector((state) => state.appDataReducer);

  const resetAlert = () => {
    setTimeout(() => {
      setAlert({
        state: false,
        type: "",
        content: "",
      });
    }, 3000);
  };

  const close = () => {
    fnSetActive(false);
    fnSetGlobalLoading(true);
    setTimeout(() => {
      fnSetGlobalLoading(false);
    }, 200);
  };

  const handleChangeRefund = (refundId, approved) => {
    setLoading(true);
    refundChange({
      orgId: orgId,
      eventId: eventId,
      refundId: refundId,
      approved: approved,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status == 202) {
        setAlert({
          state: true,
          type: "success",
          content: "Status refund berhasil diubah",
        });
        resetAlert();
        refundDatas.forEach((refund, index) => {
          if (refundId == refund.id) {
            refund.approve_org = approved ? 1 : 0;
          }
        });
        setTimeout(() => {
          close();
        }, 3000);
      } else if (res.status === 401) {
        fnSetLogin(false);
        setPausedProcess(
          `refundconsideration~!@!~${JSON.stringify({
            refundId,
            approved,
          })}`
        );
      } else {
        setAlert({
          state: true,
          type: "danger",
          content:
            res.status == 404
              ? "Transaksi tidak dapat ditemukan"
              : res.status == 403
              ? "Refund gagal karena tanggal event sudah terlewat / terlaksana. Atau refund sudah disetujui admin"
              : "Error internal server. Silahkan coba lagi",
        });
        resetAlert();
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isLogin && pausedProcess) {
      let dataParam = JSON.parse(pausedProcess.split("~!@!~")[1]);
      handleChangeRefund(dataParam.refundId, dataParam.approved);
      setPausedProcess(null);
    }
  }, [pausedProcess, isLogin]);

  return (
    <PopUp
      title={loading || alert.state === true ? "" : "Approval Refund"}
      isActive={isActive}
      setActiveFn={close}
      width="35%"
      content={
        <>
          <div className={`${styles.AlertBox} ${alert.state ? "" : "d-none"}`}>
            {alert.type === "danger" ? (
              <BiError />
            ) : (
              <BiCheckCircle color="green" />
            )}
            <p>{alert.content}</p>
            <div className={styles.Split}>
              {alert.type === "success" ? (
                <></>
              ) : (
                <Button
                  style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                  title={"Ok"}
                  fnOnClick={() => {
                    setAlert({
                      state: false,
                      type: "",
                      content: "",
                    });
                  }}
                />
              )}
            </div>
          </div>
          <div className={`${alert.state ? "d-none" : ""}`}>
            {loading ? (
              <Loading />
            ) : refundData &&
              refundData.approve_org &&
              !refundData.approve_admin ? (
              <div className={styles.AlertBox}>
                <BiQuestionMark />
                <p>Apakah anda yakin ingin menolaknya ?</p>
                <div className={styles.Split}>
                  <Button
                    style={{
                      marginLeft: "auto",
                    }}
                    title={"Batal"}
                    bgColor={"white"}
                    borderColor={"black"}
                    textColor={"black"}
                    fnOnClick={close}
                  />
                  <Button
                    style={{
                      marginRight: "auto",
                      width: "unset",
                    }}
                    title={"UnApprove"}
                    fnOnClick={() => {
                      if (refundData) {
                        handleChangeRefund(refundData.id, 0);
                      }
                    }}
                  />
                </div>
              </div>
            ) : refundData &&
              !refundData.approve_org &&
              !refundData.approve_admin ? (
              <div className={styles.AlertBox}>
                <BiQuestionMark />
                <p>Approve pengajuan Refund ini ?</p>
                <div className={styles.Split}>
                  <Button
                    style={{
                      marginLeft: "auto",
                    }}
                    title={"Batal"}
                    bgColor={"white"}
                    borderColor={"black"}
                    textColor={"black"}
                    fnOnClick={close}
                  />
                  <Button
                    style={{
                      marginRight: "auto",
                    }}
                    title={"Approve"}
                    fnOnClick={() => {
                      if (refundData) {
                        handleChangeRefund(refundData.id, 1);
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.AlertBox}>
                <BiInfoCircle />
                <p>
                  Data Refund ini sudah diapprove oleh admin. Anda tidak dapat
                  mengubahnya kembali !
                </p>
                <div className={styles.Split}>
                  <Button
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    title={"Ok"}
                    bgColor={"white"}
                    borderColor={"black"}
                    textColor={"black"}
                    fnOnClick={close}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      }
    />
  );
};

export default PopUpRefundOrg;
