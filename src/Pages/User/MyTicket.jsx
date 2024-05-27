import React, { useEffect, useState } from "react";
import styles from "./styles/MyTickets.module.css";
import Button from "../../components/Button";
import PopUp from "../../partials/PopUp";
import PopUpTrxInDetail from "../../partials/PopUpTrxInDetail";
import PopUpTicketIn from "../../partials/PopUpTicketIn";
import axios from "axios";
import ErrorPage from "../../partials/ErrorPage";
import Loading from "../../components/Loading";
import PopUpCheckinUser from "../../partials/PopUpCheckinUserr";
import { useSelector } from "react-redux";

const handleSuccess = (res) => {
  return {
    data: res.data,
    status: res.status,
  };
};

const handleError = (error) => {
  console.log(error);
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

const loadPchs = async ({ token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/get-purchases",
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

const CardGroup = ({
  trxData,
  trxDatas,
  fnSetTrxDatas = () => {},
  fnSetPopUpContent = () => {},
  fnSetPopUpActive = () => {},
  openCheckIn = () => {},
  isLogin,
  fnSetLogin = () => {},
}) => {
  const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
  const [interval, setIntervalData] = useState("0j 0m 0d");
  const [firstLoad, setFirstLoaad] = useState(true);

  const openPopUpTrx = (trx) => {
    if (trx.payment.pay_links && trx.payment.pay_links !== "") {
      let payLinks = trx.payment.pay_links.split("|");
      for (let i = 0; i < payLinks.length; i++) {
        if (payLinks[i] !== "") {
          window.location.href = payLinks[i];
          i = payLinks.length;
        }
        if (payLinks[i] === "" && i === payLinks.length - 1) {
          window.location.reload();
        }
      }
    } else {
      fnSetPopUpContent(<PopUpTrxInDetail trxData={trx} />);
      fnSetPopUpActive(true);
    }
  };

  const openDetail = (trx) => {
    if (trx.payment.pay_state === "SUCCEEDED") {
      console.log(trxDatas, "TRXDATAS");
      fnSetPopUpContent(
        <PopUpTicketIn
          trx={trx}
          fnClose={() => {
            fnSetPopUpActive(false);
          }}
          isLogin={isLogin}
          fnSetLogin={fnSetLogin}
          trxs={trxDatas}
          fnSetTrxs={fnSetTrxDatas}
        />
      );
      fnSetPopUpActive(true);
    }
  };

  useEffect(() => {
    if (firstLoad) {
      let intervalIn = new Date(trxData.payment.expired) - new Date();
      if (intervalIn > 0) {
        setInterval(() => {
          if (intervalIn > 0) {
            intervalIn -= 1000;
            let objDateTime = new Date(intervalIn);
            setIntervalData(
              `${Math.floor((objDateTime % 86400000) / 3600000)}j ${Math.floor(
                ((objDateTime % 8640000) % 3600000) / 60000
              )}m ${Math.floor(
                (((objDateTime % 86400000) % 3600000) % 60000) / 1000
              )}d`
            );
          }
        }, 1000);
      }
      setFirstLoaad(false);
    }
  }, [firstLoad]);

  return (
    <div
      className={styles.TicketBox}
      // onClick={() => {
      // 	console.log(trxData, "TRX DATA");
      // 	openDetail(trxData);
      // }}
    >
      <div className={styles.TicketCard}>
        <div className={styles.CoverBox}>
          <img
            src={
              process.env.REACT_APP_BACKEND_URL +
              trxData.purchases[0].ticket.event.logo
            }
            alt=""
            srcset=""
          />
        </div>
        <div className={styles.TicketTop}>
          <div className={styles.TicketTitle}>
            <div>{trxData.purchases[0].ticket.event.name}</div>
          </div>
          <div className={styles.TicketPrice}>
            <span>
              <span className={styles.TextBasic}>
                {trxData.purchases.length} Tiket |{" "}
              </span>
              <span className={styles.TextPrimary}>
                Rp.{numberFormat.format(trxData.payment.price)}
              </span>
            </span>
          </div>
        </div>

        <div className={styles.TicketDivider}>
          <div className={styles.Dashed}></div>
          <div className={styles.HalfCircleLeft}></div>
          <div className={styles.HalfCircleRight}></div>
        </div>
        <div className={styles.TicketBottom}>
          {trxData.payment.pay_state === "PENDING" ? (
            // &&
            // new Date() < new Date(trxData.payment.expired)
            <>
              <div>
                <div className={styles.TextSecondary}>
                  Sisa Waktu Pembayaran
                </div>
                <div className={styles.TicketTime}>
                  <b>{interval}</b>
                </div>
              </div>
              <Button
                title={"Bayar Sekarang"}
                style={{ width: "unset", marginLeft: "auto" }}
                center
                fnOnClick={() => {
                  openPopUpTrx(trxData);
                }}
              />
            </>
          ) : (
            <>
              <Button
                title={"E-Ticket"}
                style={{ width: "50%", marginRight: "auto" }}
                center
                fnOnClick={() => {
                  openDetail(trxData);
                }}
                bgColor={"white"}
                borderColor={"#eaeaea"}
                textColor={"black"}
              />
              <Button
                title={"Checkin"}
                style={{ width: "50%", marginLeft: "auto" }}
                center
                fnOnClick={openCheckIn}
                bgColor={"white"}
                borderColor={"#eaeaea"}
                textColor={"black"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MyTicket = ({ isLogin, fnSetLogin = () => {} }) => {
  const [waitingPayment, setWaitingList] = useState(null);
  const [finishedPaymentUp, setFinishedListUp] = useState(null); //upcoming event
  const [finishedPaymentDown, setFinishedListDown] = useState(null); // ended event
  const [popUpActive, setPopUpState] = useState(false);
  const [popUpContent, SetPopUpContent] = useState(<></>);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [transactions, setTransactions] = useState(null);
  const [openCheckin, setOpenCheckin] = useState(false);
  const appData = useSelector((state) => state.appDataReducer);

  useEffect(() => {
    if (
      transactions !== null &&
      !waitingPayment &&
      !finishedPaymentUp &&
      !finishedPaymentDown
    ) {
      let pendings = [];
      let upcomings = [];
      let endeds = [];
      transactions.transactions.forEach((trx) => {
        if (
          trx.payment.pay_state === "PENDING"
          // &&
          // new Date() < new Date(trx.payment.expired)
        ) {
          pendings.push(trx);
        } else if (
          trx.payment.pay_state === "SUCCEEDED" &&
          trx.purchases.reduce((current, acc) => {
            // check total checkin in list purchases
            if (acc.checkin) {
              return current + 1;
            } else {
              return current;
            }
          }, 0) < trx.purchases.length &&
          trx.purchases.reduce((current, acc) => {
            if (
              acc.visit_date &&
              new Date() >
                new Date(acc.visit_date.visit_date).setHours(23, 59, 0)
            ) {
              return current + 1;
            } else {
              return current;
            }
          }, 0) < trx.purchases.length &&
          new Date(
            `${trx.purchases[0].ticket.event.end_date} ${trx.purchases[0].ticket.event.end_time}`
          ) >= new Date()
        ) {
          upcomings.push(trx);
        } else if (
          (trx.payment.pay_state === "SUCCEEDED" &&
            (trx.purchases.reduce((current, acc) => {
              // check total checkin in list purchases
              if (acc.checkin) {
                return current + 1;
              } else {
                return current;
              }
            }, 0) >= trx.purchases.length ||
              trx.purchases.reduce((current, acc) => {
                if (
                  acc.visit_date &&
                  new Date() >
                    new Date(acc.visit_date.visit_date).setHours(23, 59, 0)
                ) {
                  return current + 1;
                } else {
                  return current;
                }
              }, 0) >= trx.purchases.length ||
              new Date(
                `${trx.purchases[0].ticket.event.end_date} ${trx.purchases[0].ticket.event.end_time}`
              ) < new Date())) ||
          trx.payment.pay_state === "EXPIRED" ||
          new Date() >= new Date(trx.payment.expired)
        ) {
          endeds.push(trx);
        }
      });
      setWaitingList(pendings);
      setFinishedListUp(upcomings);
      setFinishedListDown(endeds);
      setLoading(false);
    }
  }, [transactions]);

  useEffect(() => {
    if (!transactions && isLogin) {
      loadPchs({ token: appData.accessToken }).then((res) => {
        if (res.status === 200) {
          setTransactions(res.data);
        } else if (res.status === 401) {
          fnSetLogin(false);
        } else if (res.status !== 404) {
          setErrorState(true);
          setLoading(false);
        } else {
          setTransactions({
            transactions: [],
          });
          setLoading(false);
        }
      });
    }
  }, [transactions, isLogin]);

  return (
    <>
      {openCheckin ? (
        <PopUpCheckinUser
          isLogin={isLogin}
          fnSetLogin={fnSetLogin}
          fnClose={setOpenCheckin}
        />
      ) : (
        <></>
      )}

      <PopUp
        isActive={popUpActive}
        setActiveFn={setPopUpState}
        title=""
        content={popUpContent}
      />
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
            <h1>My Tickets</h1>

            {waitingPayment && waitingPayment.length > 0 ? (
              <>
                <div className={styles.Subtitle}>Waiting for Payment</div>
                <div className={styles.TicketGroup}>
                  {waitingPayment.map((trx) => {
                    if (trx.purchases.length > 0) {
                      return (
                        <CardGroup
                          trxData={trx}
                          trxDatas={transactions}
                          fnSetTrxDatas={setTransactions}
                          fnSetPopUpActive={setPopUpState}
                          fnSetPopUpContent={SetPopUpContent}
                          isLogin={isLogin}
                          fnSetLogin={fnSetLogin}
                          openCheckIn={setOpenCheckin}
                        />
                      );
                    }
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
            {finishedPaymentUp && finishedPaymentUp.length > 0 ? (
              <>
                <div className={styles.Subtitle}>Ticket for Upcoming Event</div>
                <div className={styles.TicketGroup}>
                  {finishedPaymentUp.map((trx) => {
                    if (trx.purchases.length > 0) {
                      return (
                        <CardGroup
                          trxData={trx}
                          trxDatas={transactions}
                          fnSetTrxDatas={setTransactions}
                          fnSetPopUpActive={setPopUpState}
                          fnSetPopUpContent={SetPopUpContent}
                          isLogin={isLogin}
                          fnSetLogin={fnSetLogin}
                          openCheckIn={setOpenCheckin}
                        />
                      );
                    }
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
            {finishedPaymentDown && finishedPaymentDown.length > 0 ? (
              <>
                <div className={styles.Subtitle}>Invalid / Ended Ticket</div>
                <div className={styles.TicketGroup}>
                  {finishedPaymentDown.map((trx) => {
                    if (trx.purchases.length > 0) {
                      return (
                        <CardGroup
                          trxData={trx}
                          trxDatas={transactions}
                          fnSetTrxDatas={setTransactions}
                          fnSetPopUpActive={setPopUpState}
                          fnSetPopUpContent={SetPopUpContent}
                          isLogin={isLogin}
                          fnSetLogin={fnSetLogin}
                          openCheckIn={setOpenCheckin}
                        />
                      );
                    }
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
            {transactions && transactions.transactions.length === 0 ? (
              <div className={styles.Blank}>
                <img src="/images/blank_ticket.png" alt="" srcset="" />
                <div className={styles.BlankDesc}>
                  Belum ada transaksi pembelian tiket untuk saat ini.
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyTicket;
