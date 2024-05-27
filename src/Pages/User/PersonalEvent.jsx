import React, { useState, useEffect } from "react";
import SidebarUser from "../../partials/SidebarUser";
import HeaderUser from "../../partials/HeaderUser";
import styles from "./styles/PersonalEvent.module.css";
import Toggler from "../../components/Toggler";
import Event from "../../components/Event";
import InfoCard from "../../partials/InfoCard";
import axios from "axios";
import ErrorPage from "../../partials/ErrorPage";
import Loading from "../../components/Loading";
import PopUpPsEventDetail from "../../partials/PopUpPsEventDetail";
import PopUp from "../../partials/PopUp";
import { useSelector } from "react-redux";
// import PopUpCheckinUser from "../../partials/PopUpCheckinUserr";

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

const PersonalEvent = ({
  isLogin,
  fnSetLogin = () => {
    {
    }
  },
}) => {
  const [viewing, setViewing] = useState("Upcoming");
  const [upcoming, setUpcoming] = useState(null);
  const [happening, setHappening] = useState(null);
  const [finished, setFinished] = useState(null);
  const [popUpActive, setPopUpState] = useState(false);
  const [popUpContent, setPopUpContent] = useState(<></>);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [transactions, setTransactions] = useState(null);
  const appData = useSelector((state) => state.appDataReducer);
  // const [openCheckin, setOpenCheckin] = useState(false);

  // useEffect(() => {
  // 	if (
  // 		transactions !== null &&
  // 		!waitingPayment &&
  // 		!finishedPaymentUp &&
  // 		!finishedPaymentDown
  // 	) {
  // 		let pendings = [];
  // 		let upcomings = [];
  // 		let endeds = [];
  // 		transactions.transactions.forEach((trx) => {
  // 			if (
  // 				trx.payment.pay_state === "PENDING"
  // 				// &&
  // 				// new Date() < new Date(trx.payment.expired)
  // 			) {
  // 				pendings.push(trx);
  // 			} else if (
  // 				trx.payment.pay_state === "SUCCEEDED" &&
  // 				trx.purchases.reduce((current, acc) => {
  // 					// check total checkin in list purchases
  // 					if (acc.checkin) {
  // 						return current + 1;
  // 					} else {
  // 						return current;
  // 					}
  // 				}, 0) < trx.purchases.length &&
  // 				trx.purchases.reduce((current, acc) => {
  // 					if (
  // 						acc.visit_date &&
  // 						new Date() >
  // 							new Date(acc.visit_date.visit_date).setHours(23, 59, 0)
  // 					) {
  // 						return current + 1;
  // 					} else {
  // 						return current;
  // 					}
  // 				}, 0) < trx.purchases.length &&
  // 				new Date(
  // 					`${trx.purchases[0].ticket.event.end_date} ${trx.purchases[0].ticket.event.end_time}`
  // 				) >= new Date()
  // 			) {
  // 				upcomings.push(trx);
  // 			} else if (
  // 				(trx.payment.pay_state === "SUCCEEDED" &&
  // 					(trx.purchases.reduce((current, acc) => {
  // 						// check total checkin in list purchases
  // 						if (acc.checkin) {
  // 							return current + 1;
  // 						} else {
  // 							return current;
  // 						}
  // 					}, 0) >= trx.purchases.length ||
  // 						trx.purchases.reduce((current, acc) => {
  // 							if (
  // 								acc.visit_date &&
  // 								new Date() >
  // 									new Date(acc.visit_date.visit_date).setHours(23, 59, 0)
  // 							) {
  // 								return current + 1;
  // 							} else {
  // 								return current;
  // 							}
  // 						}, 0) >= trx.purchases.length ||
  // 						new Date(
  // 							`${trx.purchases[0].ticket.event.end_date} ${trx.purchases[0].ticket.event.end_time}`
  // 						) < new Date())) ||
  // 				trx.payment.pay_state === "EXPIRED" ||
  // 				new Date() >= new Date(trx.payment.expired)
  // 			) {
  // 				endeds.push(trx);
  // 			}
  // 		});
  // 		setWaitingList(pendings);
  // 		setFinishedListUp(upcomings);
  // 		setFinishedListDown(endeds);
  // 		setLoading(false);
  // 	}
  // }, [transactions]);

  useEffect(() => {
    if (transactions !== null && !upcoming && !happening && !finished) {
      let up = [];
      let hap = [];
      let fin = [];
      transactions.transactions.forEach((trx, index) => {
        if (trx.payment.pay_state === "SUCCEEDED") {
          trx.purchases.forEach((pch) => {
            let start = new Date(
              pch.visit_date
                ? pch.visit_date.visit_date
                : pch.ticket.event.start_date
            ).setHours(0, 0, 0, 0);
            let end = new Date(
              pch.visit_date
                ? pch.visit_date.visit_date
                : pch.ticket.event.end_date
            ).setHours(0, 0, 0, 0);
            let now = new Date().setHours(0, 0, 0, 0);
            if (now < start) {
              if (up[pch.ticket.event.id]) {
                up[pch.ticket.event.id].push(pch);
              } else {
                up[pch.ticket.event.id] = [pch];
              }
            } else if (now >= start && now <= end) {
              if (hap[pch.ticket.event.id]) {
                hap[pch.ticket.event.id].push(pch);
              } else {
                hap[pch.ticket.event.id] = [pch];
              }
            } else if (now > end) {
              if (fin[pch.ticket.event.id]) {
                fin[pch.ticket.event.id].push(pch);
              } else {
                fin[pch.ticket.event.id] = [pch];
              }
            }
          });
        }
      });
      setUpcoming(up);
      setHappening(hap);
      setFinished(fin);
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
      {popUpActive ? (
        <PopUp
          title=""
          isActive
          setActiveFn={() => {
            setPopUpState(false);
          }}
          content={
            <PopUpPsEventDetail
              fnClose={() => {
                setPopUpState(false);
              }}
              fnSetLogin={fnSetLogin}
              groupPchEvent={popUpContent}
            />
          }
        />
      ) : (
        <></>
      )}
      <div className="content user">
        <div className={styles.DecorationBox}>
          <div className={styles.Decoration}></div>
        </div>
        <div className={styles.TitleArea}>
          <h1 className={styles.Title}>Personal Events</h1>
          <Toggler
            value={viewing}
            setValue={setViewing}
            options={["Upcoming", "Happening", "Finished"]}
          />
        </div>

        {errorState ? (
          <ErrorPage />
        ) : loading ? (
          <div
            style={{
              margin: "auto",
              marginTop: "150px",
              marginBottom: "150px",
            }}
          >
            <Loading />
          </div>
        ) : (
          <div className={styles.Inline} style={{ marginTop: 20 }}>
            {viewing === "Upcoming"
              ? upcoming &&
                Object.values(upcoming).map((evtGroup, e) => {
                  console.log(evtGroup, e, "LOG VIEWING");
                  return (
                    <Event
                      data={evtGroup[0].ticket.event}
                      key={e}
                      config={{
                        coverStyle: {
                          height: 160,
                        },
                      }}
                      noPrice={true}
                      customOnClickFn={() => {
                        setPopUpContent(evtGroup);
                        setPopUpState(true);
                      }}
                    />
                  );
                })
              : viewing === "Happening"
              ? happening &&
                Object.values(happening).map((evtGroup, e) => (
                  <Event
                    data={evtGroup[0].ticket.event}
                    key={e}
                    config={{
                      coverStyle: {
                        height: 160,
                      },
                    }}
                    noPrice={true}
                    customOnClickFn={() => {
                      setPopUpContent(evtGroup);
                      setPopUpState(true);
                    }}
                  />
                ))
              : finished &&
                Object.values(finished).map((evtGroup, e) => {
                  console.log(evtGroup, e, "LOG VIEWING");
                  return (
                    <Event
                      data={evtGroup[0].ticket.event}
                      key={e}
                      config={{
                        coverStyle: {
                          height: 160,
                        },
                      }}
                      noPrice={true}
                      customOnClickFn={() => {
                        setPopUpContent(evtGroup);
                        setPopUpState(true);
                      }}
                    />
                  );
                })}
            {((!upcoming || Object.values(upcoming).length <= 0) &&
              viewing === "Upcoming") ||
            ((!happening || Object.values(happening).length <= 0) &&
              viewing === "Happening") ||
            ((!finished || Object.values(finished).length <= 0) &&
              viewing === "Finished") ? (
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  width: "100%",
                }}
              >
                <img
                  src="/images/Sparkler.png"
                  alt="sparkler"
                  width={"160px"}
                  height={"160px"}
                  style={{
                    marginBottom: "34px",
                    marginTop: "58px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    fontFamily: "Inter",
                    marginBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Temukan dan Hadiri Event
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    fontFamily: "Inter",
                    marginBottom: "72px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Tap pada tombol Explore events untuk menemukan event yang
                  menarik
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}

        <h3 className={styles.Title} style={{ marginTop: 40 }}>
          Get the most out of Agendakota
        </h3>

        <div
          className={styles.Inline}
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <InfoCard
            title={"Buy your friends tickets and watch event together!"}
            description={
              "With Agendakota you can invite or give your friend a surprise by buying ticket for them."
            }
            action={{
              text: "Explore",
              link: "/explore",
              target: "_blank",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalEvent;
