import React, { useEffect, useState } from "react";
import styles from "./styles/PopUpSeatNumber.module.css";
import PopUp from "./PopUp";
import Button from "../components/Button";
import FieldBox from "../components/FieldBox";
import axios from "axios";
import { BiError } from "react-icons/bi";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

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

const loadSeatNummberQty = async ({ ticketId, visitDate }) => {
  try {
    let params = "?ticket_id=" + ticketId;
    if (visitDate) {
      params += "&visit_date=" + visitDate;
    }
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/ticket-reschedule" + params,
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

const HeaderPopUp = ({ ticketName, desc, fnSave }) => {
  return (
    <div className={styles.HeaderBox}>
      <div className={styles.HeaderLeft}>
        <div className={styles.Title}>{ticketName}</div>
        <div
          className={styles.Desc}
          dangerouslySetInnerHTML={{ __html: desc }}
        ></div>
      </div>
      <div className={styles.HeaderRight}>
        <Button title={"Simpan"} fnOnClick={fnSave} />
      </div>
    </div>
  );
};

const createSeatNumber = (
  length,
  avlSeatNumbers,
  activeSeatNumber,
  fnClickSeatNum
) => {
  let arrButtons = [];
  // console.log(avlSeatNumbers, activeSeatNumber);
  for (let i = 0; i < length; i++) {
    if (
      !avlSeatNumbers.find((seatNum) => seatNum == i + 1) &&
      activeSeatNumber.find((active) => active == i + 1)
    ) {
      fnClickSeatNum(i + 1);
    }
    arrButtons.push(
      <div
        className={`${styles.BtnSeatNum} ${
          !avlSeatNumbers.find((seatNum) => seatNum == i + 1)
            ? styles.BtnSeatNumDisabled
            : activeSeatNumber.find((active) => active == i + 1)
            ? styles.BtnSeatNumActive
            : ""
        } ${
          !avlSeatNumbers.find((seatNum) => seatNum == i + 1)
            ? ""
            : styles.Pointer
        }`}
        onClick={() => {
          fnClickSeatNum(i + 1);
        }}
      >
        {i + 1}
      </div>
    );
  }
  return arrButtons;
};

const ContentPopUp = ({
  loading,
  avlSeatNumbers,
  activeSeatNumber,
  ticketData,
  fnClickSeatNum,
  alert,
  customPriceValue,
  mode,
}) => {
  const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));

  return loading ? (
    <div style={{ marginBottom: "30px" }}>
      <Loading />
    </div>
  ) : (
    <div>
      {alert.state ? (
        <Alert
          isShow
          setShowFn={() => {}}
          type="danger"
          message={alert.content}
          closeBtn={false}
        />
      ) : (
        <></>
      )}
      <div className={styles.MainContent}>
        <div className={styles.Left}>
          <img
            src={process.env.REACT_APP_BACKEND_URL + ticketData.seat_map}
            alt=""
          />
        </div>
        <div className={styles.Right}>
          <div className={styles.Selector}>
            <div className={styles.SelectorInner}>
              {createSeatNumber(
                ticketData.quantity,
                avlSeatNumbers,
                activeSeatNumber,
                fnClickSeatNum
              ).map((seat) => seat)}
            </div>
          </div>
          <div className={styles.Info}>
            {mode === "create" ? (
              <FieldBox label={"Total"} style={{ width: "100%" }}>
                <p
                  className={styles.TextPrimary}
                  style={{ marginLeft: "auto" }}
                >
                  Rp.{" "}
                  {numberFormat.format(
                    parseInt(
                      ticketData.type_price == 3
                        ? customPriceValue
                        : ticketData.price
                    ) * activeSeatNumber.length
                  )}
                  ,-
                </p>
              </FieldBox>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 
MODE CREATE
	fnSetActive => function to set active state popup
	fnRenewSeatNum => function to set new data selected
	fnRenewTicketData => function renew data ticket ex : daily quantity
	selectedSeatNumbers => list (array) selected seat number by user
	ticket => ticket data from DB,
	visitDate => selected data from DatePicker object
	customPriceValue => data custom price if available
	mode => "create",

MODE EDIT
	fnSetActive => function to set active state popup
	fnRenewSeatNum => function to set new data selected
	fnRenewTicketData => can be void function () => {}
	selectedSeatNumbers => list (array) selected seat number by user
	ticket => ticket data from DB,
	visitDate => always format selected date data to Y/m/d string (2024/03/20)
	customPriceValue => can be null (remove viewing abaut price in popup)
	mode => "edit",
*/

const PopUpSeatNumbers = ({
  fnSetActive,
  fnRenewSeatNum, //
  fnRenewTicketData, //
  selectedSeatNumbers, //
  ticket,
  visitDate, //datepicker or date object
  customPriceValue, //
  mode = "create",
}) => {
  const [activeSeatNumber, setActiveSeatNum] = useState(selectedSeatNumbers);
  const [avlSeatNumbers, setAvlSeatNumbers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState({
    state: false,
    content: <></>,
  });
  const [alert, setAlert] = useState({
    state: false,
    type: "",
    content: "",
  });

  const resetAlert = () => {
    setTimeout(() => {
      setAlert({
        state: false,
        type: "",
        content: "",
      });
    }, 3000);
  };

  const saveData = () => {
    fnRenewSeatNum(activeSeatNumber);
    fnSetActive(false);
  };

  const handleClickSeatNum = (number) => {
    let index = activeSeatNumber.indexOf(number);
    if (index !== -1) {
      activeSeatNumber.splice(index, 1);
      setActiveSeatNum(activeSeatNumber.map((active) => active));
    } else if (ticket.max_purchase > activeSeatNumber.length) {
      setActiveSeatNum(activeSeatNumber.concat([number]));
    } else {
      setAlert({
        state: true,
        type: "danger",
        content: "Anda hanya bisa membeli " + ticket.max_purchase + " tiket",
      });
      resetAlert();
    }
  };

  useEffect(() => {
    if (!avlSeatNumbers) {
      setLoading(true);
      let dateObj = null;
      if (mode === "edit") {
        dateObj = new Date(visitDate);
      }
      loadSeatNummberQty({
        ticketId: ticket.id,
        visitDate: visitDate
          ? mode === "create"
            ? visitDate.format()
            : `${dateObj.getFullYear()}/${
                dateObj.getMonth() + 1
              }/${dateObj.getDate()}`
          : null,
      }).then((res) => {
        if (res.status === 200) {
          ticket = res.data.ticket;
          fnRenewTicketData(ticket);
          setAvlSeatNumbers(
            res.data.ticket.available_seat_numbers
              ? res.data.ticket.available_seat_numbers
              : []
          );
        } else if (res.status === 404) {
          setErrorState({
            state: true,
            content: (
              <div className={styles.PopUpAlert}>
                <BiError />
                <div className={styles.PopUpContent}>
                  Mohon maaf, data tiket yang anda maksud tidak dapat ditemukan.
                </div>
                <Button
                  title={"Ok"}
                  fnOnClick={() => {
                    fnSetActive(false);
                  }}
                />
              </div>
            ),
          });
          setAvlSeatNumbers([]);
        } else if (res.status === 403) {
          setErrorState({
            state: true,
            content: (
              <div className={styles.PopUpAlert}>
                <BiError />
                <div className={styles.PopUpContent}>
                  Mohon maaf, tanggal kunjungan yang anda inputkan tidak sesuai.
                  Silahkan coba lagi
                </div>
                <Button
                  title={"Ok"}
                  fnOnClick={() => {
                    fnSetActive(false);
                  }}
                />
              </div>
            ),
          });
          setAvlSeatNumbers([]);
        } else {
          setErrorState({
            state: true,
            content: (
              <div className={styles.PopUpAlert}>
                <BiError />
                <div className={styles.PopUpContent}>
                  Terjadi kesalahan saat memuat data tempat duduk. Silhakan klik
                  Ulangi.
                </div>
                <Button
                  title={"Ulangi"}
                  fnOnClick={() => {
                    setAvlSeatNumbers(null);
                    setErrorState({
                      state: false,
                      content: <></>,
                    });
                  }}
                />
              </div>
            ),
          });
          setAvlSeatNumbers([]);
        }
        setLoading(false);
      });
    }
  });

  return (
    <PopUp
      isActive
      setActiveFn={fnSetActive}
      title=""
      customTitle={
        errorState.state || loading ? (
          <></>
        ) : (
          <HeaderPopUp
            ticketName={ticket.name}
            desc={ticket.desc}
            fnSave={saveData}
          />
        )
      }
      content={
        errorState.state ? (
          errorState.content
        ) : (
          <ContentPopUp
            loading={loading}
            activeSeatNumber={activeSeatNumber}
            avlSeatNumbers={avlSeatNumbers}
            ticketData={ticket}
            fnClickSeatNum={handleClickSeatNum}
            alert={alert}
            customPriceValue={customPriceValue}
            mode={mode}
          />
        )
      }
      customStyleWrapper={{ height: "calc(100% - 71px)" }}
    />
  );
};

export default PopUpSeatNumbers;
