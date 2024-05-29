import React, { useEffect, useState } from "react";
import styles from "./styles/Invitation.module.css";
import axios from "axios";
import ErrorPage from "../../partials/ErrorPage";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import PopUp from "../../partials/PopUp";
import moment from "moment";
import { BiCheckCircle, BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
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

const loadInvitationsRcv = async ({ token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/invitations-received",
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

const loadInvitationsSdr = async ({ token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/invitations-sent",
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

const acceptInvitation = async ({ invitationId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/invitation-accept",
      {
        invitation_id: invitationId,
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

const rejectInvitation = async ({ invitationId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/invitation-delete",
      {
        invitation_id: invitationId,
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

const InvitationDetail = ({
  data,
  forOutbox = false,
  setActiveFn = () => {},
  fnReceive = () => {},
  fnReject = () => {},
}) => {
  const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
  const navigate = useNavigate();
  return (
    <PopUp
      isActive
      setActiveFn={setActiveFn}
      customTitle={<div></div>}
      title="Invitation Detail"
      content={
        <div>
          <img
            className={styles.DetailCover}
            src={process.env.REACT_APP_BACKEND_URL + data.event.logo}
            alt=""
          />
          <div className={styles.Title}>{data.event.name}</div>
          {!data.purchase.visit_date ? (
            <div className={styles.EventTime}>{`${moment(
              new Date(data.event.start_date + " " + data.event.start_time)
            )
              .locale("id")
              .format("DD MMM Y")} - ${moment(
              new Date(data.event.end_date + " " + data.event.end_time)
            )
              .locale("id")
              .format("DD MMM Y")} | ${moment(
              new Date(data.event.start_date + " " + data.event.start_time)
            )
              .locale("id")
              .format("H:m")} - ${moment(
              new Date(data.event.end_date + " " + data.event.end_time)
            )
              .locale("id")
              .format("H:m")}`}</div>
          ) : (
            <></>
          )}
          <div className={styles.DetailOrigin}>
            <b>Pengirim</b>
            <p>
              {data.user_sender.email} | {data.user_sender.name}
            </p>
            <b>Penerima</b>
            <p>
              {data.user_receiver.email} | {data.user_receiver.name}
            </p>
          </div>
          <div
            className={styles.TicketItem}
            onClick={() => {
              navigate("/my-tickets");
            }}
          >
            {data.response !== "WAITING" ? (
              <div
                className={styles.Badge}
                style={{
                  color: "white",
                  backgroundColor:
                    data.response === "ACCEPTED" ? "green" : "red",
                }}
              >
                {data.response === "ACCEPTED" ? "Accepted" : "Rejected"}
              </div>
            ) : (
              <></>
            )}
            <img
              src={process.env.REACT_APP_BACKEND_URL + data.ticket.cover}
              alt=""
            />
            <div className={styles.TicketDesc}>
              <div className={styles.TicketName}>{data.ticket.name}</div>
              <div className={styles.TicketPrice}>
                Rp.{numberFormat.format(data.purchase.amount)},00
              </div>
              {data.purchase.visit_date ? (
                <div className={styles.TicketVisitDate}>
                  <span>
                    <b>Visit Date </b>{" "}
                    {moment(new Date(data.purchase.visit_date.visit_date))
                      .locale("id")
                      .format("DD MMM Y")}
                  </span>
                </div>
              ) : (
                <></>
              )}
              {data.purchase.seat_number ? (
                <div className={styles.TicketVisitDate}>
                  <span>
                    <b>Seat Number </b> {data.purchase.seat_number.seat_number}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {data.response === "WAITING" ? (
            <div
              className={styles.BtnGroup}
              style={{ width: "100%", marginTop: "30px" }}
            >
              {forOutbox ? (
                <></>
              ) : (
                <Button
                  title={"Terima"}
                  style={{ marginLeft: "auto" }}
                  fnOnClick={() => {
                    fnReceive(data.id);
                  }}
                />
              )}
              <Button
                title={forOutbox ? "Batalkan" : "Tolak"}
                bgColor={"white"}
                borderColor={"black"}
                textColor={"black"}
                style={{ marginLeft: forOutbox ? "auto" : "unset" }}
                fnOnClick={() => {
                  fnReject(data.id);
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      }
      width="45%"
    />
  );
};

const InvitationCard = ({
  data,
  forOutbox = false,
  setOpenDetail = () => {},
  fnReceive = () => {},
  fnReject = () => {},
}) => {
  return (
    <div className={styles.InvitationCard}>
      {data.response !== "WAITING" ? (
        <div
          className={styles.Badge}
          style={{
            color: "white",
            backgroundColor: data.response === "ACCEPTED" ? "green" : "red",
          }}
        >
          {data.response === "ACCEPTED" ? "Accepted" : "Rejected"}
        </div>
      ) : (
        <></>
      )}
      <img
        className={styles.Cover}
        src={process.env.REACT_APP_BACKEND_URL + data.event.logo}
        alt=""
      />
      <div className={styles.Title}>{data.event.name}</div>
      <div className={styles.Desc}>
        {/* conditional description for sender or receiver */}
        {!forOutbox ? (
          <span>
            Anda diundang oleh <b>{data.user_sender.email}</b> untuk mengikuti
            event / activity <b>{data.event.name}</b>. Dengan detail detail
            tiket sebagai berikut ...
          </span>
        ) : (
          <span>
            Anda telah mengundang <b>{data.user_receiver.email}</b> untuk
            mengikuti event / activity <b>{data.event.name}</b>. Dengan detail
            detail tiket sebagai berikut ...
          </span>
        )}
      </div>
      <div
        className={styles.MoreBtn}
        onClick={() => {
          setOpenDetail(data);
        }}
      >
        Lihat Detail
      </div>
      {data.response === "WAITING" ? (
        <div className={styles.BtnGroup}>
          {/* <div
					style={{
						marginRight: "auto",
						fontWeight: 600,
						marginTop: "auto",
						marginBottom: "auto",
					}}
				>
					Action
				</div> */}
          {forOutbox ? (
            <></>
          ) : (
            <Button
              title={"Terima"}
              style={{ width: "50%" }}
              center
              bgColor={"white"}
              textColor={"black"}
              borderColor={"#ddd"}
              fnOnClick={() => {
                fnReceive(data.id);
              }}
            />
          )}
          <Button
            title={forOutbox ? "Batalkan" : "Tolak"}
            style={{ width: forOutbox ? "100%" : "50%" }}
            center
            bgColor={"white"}
            textColor={"black"}
            borderColor={"#ddd"}
            fnOnClick={() => {
              fnReject(data.id);
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const Invitation = ({ isLogin, fnSetLogin = () => {} }) => {
  const [invitationsRcv, setInvitationRcv] = useState(null);
  const [invitationsSdr, setInvitationSdr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [openInvitationDetail, setOpenInvDetail] = useState(false);
  const [detailData, setDetailData] = useState({ data: null, type: "" });
  const [pausedProcess, setPausedProcess] = useState(null);
  const [alert, setAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const appData = useSelector((state) => state.appDataReducer);

  const handleResponsePorcess = (res, invId, receipt = true) => {
    if (res.status === 202) {
      if (receipt) {
        invitationsRcv.forEach((inv) => {
          if (inv.id === invId) {
            inv.response = "ACCEPTED";
          }
        });
      } else {
        let delIndex = null;
        invitationsSdr.forEach((inv, index) => {
          if (inv.id === invId) {
            delIndex = index;
          }
        });
        if (delIndex === null) {
          invitationsRcv.forEach((inv, index) => {
            if (inv.id === invId) {
              delIndex = index;
            }
          });
          invitationsRcv.splice(delIndex, 1);
        } else {
          invitationsSdr.splice(delIndex, 1);
        }
        setOpenInvDetail(false);
      }
      setAlert({
        state: true,
        type: "success",
        content: "",
      });
      setLoading(false);
    } else if (res.status === 401) {
      fnSetLogin(false);
      setPausedProcess(`${receipt ? "rcv" : "rjc"}~!!!@!!!~${invId}`);
    } else {
      setAlert({
        state: true,
        type: "danger",
        content: "",
      });
      setLoading(false);
    }
  };

  const handleReceiveInv = (invId) => {
    setLoading(true);
    acceptInvitation({ invitationId: invId, token: appData.accessToken }).then(
      (res) => handleResponsePorcess(res, invId, true)
    );
  };

  const handleCancelInv = (invId) => {
    setLoading(true);
    rejectInvitation({ invitationId: invId, token: appData.accessToken }).then(
      (res) => handleResponsePorcess(res, invId, false)
    );
  };

  useEffect(() => {
    if (isLogin && pausedProcess) {
      let type = pausedProcess.split("~!!!@!!!~")[0];
      let id = pausedProcess.split("~!!!@!!!~")[1];
      if (type === "rcv") {
        handleReceiveInv(id);
      } else {
        handleCancelInv(id);
      }
      setPausedProcess(null);
    }
  }, [pausedProcess, isLogin]);

  useEffect(() => {
    if (!invitationsRcv && !invitationsSdr) {
      setLoading(true);
      loadInvitationsRcv({ token: appData.accessToken }).then((res) => {
        if (res.status === 200 || res.status === 404) {
          if (res.status === 200) {
            setInvitationRcv(res.data.invitations);
          } else {
            setInvitationRcv([]);
          }
          loadInvitationsSdr({ token: appData.accessToken }).then((res) => {
            if (res.status === 200) {
              setInvitationSdr(res.data.invitations);
            } else if (res.status === 401) {
              fnSetLogin(false);
            } else if (res.status === 404) {
              setInvitationSdr([]);
            } else {
              setErrorState(true);
            }
          });
        } else if (res.status === 401) {
          fnSetLogin(false);
        } else {
          setErrorState(true);
        }
      });
    } else if (invitationsRcv !== null && invitationsSdr !== null) {
      setLoading(false);
    }
  }, [invitationsRcv, invitationsSdr, isLogin]);

  useEffect(() => {
    document.title = "Inv - Agendakota";
  });

  return (
    <>
      {alert.state ? (
        <PopUp
          customStyleWrapper={{ zIndex: 889 }}
          isActive
          setActiveFn={() => {
            setAlert({
              state: false,
              type: "",
            });
          }}
          content={
            <div className={styles.AlertMessage}>
              {alert.type === "danger" ? (
                <>
                  <BiError style={{ color: "#ca0c64" }} />
                  <p>
                    Mohon maaf. Terjadi kesalahan atau data tidak ditemukan.
                  </p>
                  <Button
                    title={"Ok"}
                    fnOnClick={() => {
                      setAlert({
                        state: false,
                        type: "",
                      });
                    }}
                  />
                </>
              ) : (
                <>
                  <BiCheckCircle style={{ color: "green" }} />
                  <p>Proses berhasil dilaksanakan</p>
                  <Button
                    title={"Ok"}
                    fnOnClick={() => {
                      setAlert({
                        state: false,
                        type: "",
                      });
                    }}
                  />
                </>
              )}
            </div>
          }
          width="45%"
        />
      ) : (
        <></>
      )}
      {openInvitationDetail ? (
        <InvitationDetail
          data={detailData.data}
          setActiveFn={setOpenInvDetail}
          forOutbox={detailData.type === "outbox" ? true : false}
          fnReceive={handleReceiveInv}
          fnReject={handleCancelInv}
        />
      ) : (
        <></>
      )}
      <div className="content user">
        <div className={styles.DecorationBox}>
          <div className={styles.Decoration}></div>
        </div>

        {errorState ? (
          <ErrorPage />
        ) : loading ? (
          <div style={{ marginTop: "140px", marginBottom: "100px" }}>
            <Loading />
          </div>
        ) : (
          <>
            <h1>Invitations</h1>

            {invitationsRcv &&
            invitationsRcv.length === 0 &&
            invitationsSdr &&
            invitationsSdr.length === 0 ? (
              <div className={styles.Blank}>
                <img src="/images/letter.png" alt="" srcset="" />
                <div className={styles.BlankDesc}>
                  Belum ada undangan untuk saat ini.
                </div>
              </div>
            ) : (
              <>
                {invitationsRcv && invitationsRcv.length > 0 ? (
                  <>
                    <div className={styles.Subtitle}>Inbox</div>
                    {invitationsRcv.map((invData) => {
                      return (
                        <InvitationCard
                          data={invData}
                          setOpenDetail={(data) => {
                            setDetailData({ data, type: "inbox" });
                            setOpenInvDetail(true);
                          }}
                          fnReceive={handleReceiveInv}
                          fnReject={handleCancelInv}
                        />
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
                {invitationsSdr && invitationsSdr.length > 0 ? (
                  <>
                    <div className={styles.Subtitle}>Outbox</div>
                    {invitationsSdr.map((invData) => {
                      return (
                        <InvitationCard
                          data={invData}
                          setOpenDetail={(data) => {
                            setDetailData({ data, type: "outbox" });
                            setOpenInvDetail(true);
                          }}
                          forOutbox={true}
                          fnReceive={handleReceiveInv}
                          fnReject={handleCancelInv}
                        />
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Invitation;
