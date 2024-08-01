import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/PopUpVoucher.module.css";
import styles2 from "./styles/PopUpTicket.module.css";
import PopUp2 from "./PopUp2";
import {
  BiArrowBack,
  BiCalendar,
  BiCard,
  BiCopy,
  BiFilter,
  BiGrid,
  BiInfoCircle,
  BiPlusCircle,
  BiSolidDiscount,
  BiTrash,
} from "react-icons/bi";
import Select from "react-select";
import InputForm from "../components/InputForm";
import InputLabeled from "../components/InputLabeled";
import FieldBox from "../components/FieldBox";
import axios from "axios";
import Loading from "../components/Loading";
import moment from "moment";
import Alert from "../components/Alert";
import InputToogle from "../components/InputToogle";

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

const addVoucher = async ({
  name,
  code,
  discount,
  quantity,
  start,
  end,
  ticket_ids = null,
  orgId,
  eventId,
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        `/api/org/${orgId}/event/${eventId}/manage/voucher/create`,
      {
        name,
        code,
        discount,
        quantity,
        start,
        end,
        ticket_ids,
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

const updateVoucher = async ({
  voucher_id,
  name,
  discount,
  quantity,
  start,
  end,
  orgId,
  eventId,
  ticket_ids = null,
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        `/api/org/${orgId}/event/${eventId}/manage/voucher/update`,
      {
        voucher_id,
        name,
        discount,
        quantity,
        start,
        end,
        ticket_ids,
        _method: "PUT",
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

const deleteVouccher = async ({ voucher_id, token, orgId, eventId }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        `/api/org/${orgId}/event/${eventId}/manage/voucher/delete`,
      {
        voucher_id,
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

const PopUpVoucher = ({
  isPopActive,
  setPopUpActive = () => {},
  titlePopUp,
  tickets = [],
  vouchers = [],
  orgId,
  eventId,
  endEvent,
  isLogin,
  token,
  fnSetLogin,
}) => {
  // ===== State control =====
  const [mode, setMode] = useState("view");
  const [blankTitle, setBlankTitle] = useState(false);
  const [blankStart, setBlankStart] = useState(false);
  const [blankEnd, setBlankEnd] = useState(false);
  const [blankQty, setBlankQty] = useState(false);
  const [blankCode, setBlankCOde] = useState(false);
  const [blankDiscount, setBlankDiscount] = useState(false);
  const [startSell, setStartSell] = useState(null);
  const [alert, setAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [pausedProcess, setPausedProcess] = useState({
    state: false,
    name: "",
    data: null,
  });

  // ===== Form data ======
  const title = useRef();
  const start = useRef();
  const end = useRef();
  const qty = useRef();
  const qty2 = useRef();
  const code = useRef();
  const discount = useRef();
  const [forTickets, setForTickets] = useState([]);
  const [selectedDataEdit, setSelectedDataEdit] = useState({
    id: null,
    index: null,
  });
  const [discountType, setDiscountType] = useState("percentage");
  const discountTyoeToogle = useRef();

  const selectStartDate = (e) => {
    setStartSell(e.target.value);
    if (
      end.current.value &&
      new Date(end.current.value) < new Date(e.target.value)
    ) {
      end.current.value = "";
    }
  };

  const copyHandle = (url) => {
    // process to copy
    navigator.clipboard.writeText(url);
    setAlert({
      state: true,
      type: "success",
      content: "Kode voucher berhasil dicopy !",
    });
  };

  const basicValidator = (create = false) => {
    let error = null;
    if (
      !title.current ||
      title.current.value === "" ||
      title.current.value === " " ||
      title.current.value.length > 100
    ) {
      setBlankTitle(true);
      error =
        !title.current ||
        title.current.value === "" ||
        title.current.value === " "
          ? "Nama voucher wajib diisi !"
          : "Nama voucher maksimal 100 karakter !";
    } else if (!start.current || start.current.value === "") {
      setBlankStart(true);
      error = "Tanggal mulai aktif voucher wajib diisi !";
    } else if (!end.current || end.current.value === "") {
      setBlankEnd(true);
      error = "Tanggal voucher berakhir wajib diisi !";
    } else if (
      new Date(start.current.value).setHours(0, 0, 0) >
      new Date(end.current.value).setHours(0, 0, 0)
    ) {
      setBlankEnd(true);
      error = "Tanggal mulai dan berakhir voucher terbalik !";
    } else if (
      !qty.current ||
      qty.current.value === "" ||
      qty.current.value === " " ||
      qty.current.value == 0
    ) {
      setBlankQty(true);
      error = "Jumlah voucher wajib diisi dan tidak boleh 0 !";
    } else if (
      create &&
      (!code.current ||
        code.current.value === "" ||
        code.current.value === " " ||
        code.current.value.length > 20)
    ) {
      setBlankCOde(true);
      error =
        !code.current || code.current.value === "" || code.current.value === " "
          ? "Kode voucher wajib diisi !"
          : "Kode voucher maksimal 20 karakter !";
    } else if (
      !discount.current ||
      discount.current.value === "" ||
      discount.current.value === " " ||
      discount.current.value == 0 ||
      (!discountTyoeToogle.current.checked &&
        (discount.current.value > 100 || discount.current.value < 1)) ||
      (discountTyoeToogle.current.checked && discount.current.value < 2)
    ) {
      setBlankDiscount(true);
      error =
        !discount.current ||
        discount.current.value === "" ||
        discount.current.value === " " ||
        discount.current.value == 0
          ? "Nilai diskon wajib diisi !"
          : !discountTyoeToogle.current.checked &&
            (discount.current.value > 100 || discount.current.value < 1)
          ? "Nilai diskon maksimal adalah 100% dan minimal 1%"
          : "Nilai diskon minimal Rp 2,-";
    }

    if (error) {
      setAlert({
        state: true,
        type: "danger",
        content: error,
      });
    }
    return error;
  };

  const handleAddVoucher = () => {
    if (!basicValidator(true)) {
      setLoading(true);
      addVoucher({
        orgId,
        eventId,
        name: title.current.value,
        code: code.current.value,
        discount: discountTyoeToogle.current.checked
          ? parseFloat(
              discount.current.value.split("Rp.")[1].replaceAll(".", "")
            )
          : parseFloat(discount.current.value) / 100,
        quantity: qty.current.value,
        start: start.current.value,
        end: end.current.value,
        ticket_ids:
          forTickets.length === 0 ||
          (forTickets.length === 1 && forTickets[0].value === "all")
            ? null
            : forTickets.map((ticket) => ticket.value),
        token: token,
      }).then((res) => {
        if (res.status === 201) {
          vouchers.push(res.data.voucher);
          setMode("view");
        } else if (res.status === 401) {
          setPausedProcess({
            state: true,
            name: "add",
            data: null,
          });
          fnSetLogin(false);
        } else {
          setAlert({
            state: true,
            type: "danger",
            content:
              res.status === 500
                ? "Data gagal di simpan. Silahlan ulangi lagi"
                : Object.values(res.data.data).reduce((current, acc) => {
                    return (
                      (current === "" ? current : current + ", ") +
                      (Array.isArray(acc) ? acc.join(", ") : acc)
                    );
                  }, ""),
          });
        }
        setLoading(false);
      });
    }
  };

  const handleUpdateVoucher = (id, index) => {
    if (!basicValidator(true)) {
      setLoading(true);
      updateVoucher({
        orgId,
        eventId,
        voucher_id: id,
        name: title.current.value,
        discount: discountTyoeToogle.current.checked
          ? parseFloat(
              discount.current.value.split("Rp.").length === 1
                ? discount.current.value.split("Rp.")[0].replaceAll(".", "")
                : discount.current.value.split("Rp.")[1].replaceAll(".", "")
            )
          : parseFloat(discount.current.value) / 100,
        quantity: qty.current.value,
        start: start.current.value,
        end: end.current.value,
        ticket_ids:
          forTickets.length === 0 ||
          (forTickets.length === 1 && forTickets[0].value === "all")
            ? null
            : forTickets.map((ticket) => ticket.value),
        token: token,
      }).then((res) => {
        if (res.status === 200) {
          vouchers[index] = res.data.voucher;
          setMode("view");
        } else if (res.status === 401) {
          setPausedProcess({
            state: true,
            name: "update",
            data: {
              id,
              index,
            },
          });
          fnSetLogin(false);
        } else {
          setAlert({
            state: true,
            type: "danger",
            content:
              res.status === 500
                ? "Data gagal di simpan. Silahlan ulangi lagi"
                : Object.values(res.data.data).reduce((current, acc) => {
                    return (
                      (current === "" ? current : current + ", ") +
                      (Array.isArray(acc) ? acc.join(", ") : acc)
                    );
                  }, ""),
          });
        }
        setLoading(false);
      });
    }
  };

  const handleDeleteVoucher = (id, index) => {
    setLoading(true);
    deleteVouccher({
      orgId,
      eventId,
      voucher_id: id,
      token: token,
    }).then((res) => {
      if (res.status === 202) {
        vouchers.splice(index, 1);
      } else if (res.status === 401) {
        setPausedProcess({
          state: true,
          name: "delete",
          data: {
            id,
            index,
          },
        });
        fnSetLogin(false);
      } else {
        setAlert({
          state: true,
          type: "danger",
          content:
            res.status === 500
              ? "Data gagal di simpan. Silahlan ulangi lagi"
              : Object.values(res.data.data).reduce((current, acc) => {
                  return (
                    (current === "" ? current : current + ", ") +
                    (Array.isArray(acc) ? acc.join(", ") : acc)
                  );
                }, ""),
        });
      }
      setLoading(false);
    });
  };

  const handleSaveBtn = (id, index, mode) => {
    if (mode === "add") {
      handleAddVoucher();
    } else if (mode === "edit") {
      handleUpdateVoucher(id, index);
    } else {
      setPopUpActive(false);
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      title.current.value = vouchers[selectedDataEdit.index].name;
      start.current.value =
        vouchers[selectedDataEdit.index].start.split(" ")[0];
      end.current.value = vouchers[selectedDataEdit.index].end.split(" ")[0];
      qty.current.value = vouchers[selectedDataEdit.index].quantity;
      qty2.current.value =
        vouchers[selectedDataEdit.index].avl_qty + " Voucher";
      code.current.value = vouchers[selectedDataEdit.index].code;
      let forTickets = vouchers[selectedDataEdit.index].for_tickets;
      // let forTickets = [];
      // tickets.forEach((ticket) => {
      //   let ticketIn = vouchers[selectedDataEdit.index].for_tickets;
      //   let find = false;
      //   let index = 0;
      //   if (ticketIn.length > 0) {
      //     do {
      //       if (ticket.id === ticketIn[index].ticket_id) {
      //         find = true;
      //         forTickets.push(ticket);
      //       }
      //       index++;
      //     } while (!find && index < ticketIn.length);
      //   }
      // });
      if (parseFloat(vouchers[selectedDataEdit.index].discount) > 1) {
        discountTyoeToogle.current.checked = true;
        setDiscountType("fixed");
      }
      discount.current.value =
        parseFloat(vouchers[selectedDataEdit.index].discount) > 1
          ? vouchers[selectedDataEdit.index].discount
          : parseFloat(vouchers[selectedDataEdit.index].discount) * 100;
      setForTickets(
        forTickets.length === 0
          ? [
              {
                label: "Semua Tiket",
                value: "all",
              },
            ]
          : forTickets.map((fTicket) => {
              return {
                label: fTicket.ticket.name,
                value: fTicket.ticket_id,
              };
            })
      );
    } else if (mode === "view") {
      title.current.value = null;
      start.current.value = null;
      end.current.value = null;
      qty.current.value = null;
      code.current.value = null;
      discount.current.value = null;
      discountTyoeToogle.current.checked = false;
      setDiscountType("percentage");
      setForTickets([]);
    }
  }, [mode]);

  useEffect(() => {
    if (pausedProcess.state && isLogin) {
      if (pausedProcess.name === "add") {
        handleAddVoucher();
      } else if (pausedProcess.name === "update") {
        handleUpdateVoucher(pausedProcess.data.id, pausedProcess.data.index);
      } else if (pausedProcess.name === "delete") {
        handleDeleteVoucher(pausedProcess.data.id, pausedProcess.data.index);
      }
    }
  }, [pausedProcess, isLogin]);

  return (
    <PopUp2
      width="928px"
      isActive={isPopActive && titlePopUp === "Vouchers"}
      setActiveFn={() => {
        handleSaveBtn(selectedDataEdit.id, selectedDataEdit.index, mode);
      }}
      closeBtnAbs={{
        title: "Tutup",
        fn: () => {
          setPopUpActive(false);
        },
      }}
      classNames={{
        wrapper: [styles2.PopUpWrapper2],
        modalDialog: [styles2.ModalDialog],
        popUpBox: [styles2.PopUpBox],
        header: [],
        content: [styles2.PopUpContent],
      }}
      closeBtnTitle={"Simpan"}
      titleHeader={
        <div className={styles2.PopUpHeader}>
          {mode === "view" ? (
            <div>
              <h4>Vouchers</h4>
            </div>
          ) : (
            <></>
          )}
          {mode !== "view" ? (
            <div className={styles2.GroupTitle}>
              <BiArrowBack
                onClick={() => {
                  setMode("view");
                }}
              />
              <h4
                className={styles2.TitleNav}
                onClick={() => {
                  setMode("view");
                }}
              >
                Voucher /
                <span style={{ color: "black" }}>
                  {mode === "edit" ? " Edit" : " Tambah"}
                </span>
              </h4>
            </div>
          ) : (
            <></>
          )}
        </div>
      }
      content={
        <>
          <Alert
            type={alert.type}
            isShow={alert.state}
            setShowFn={() => {
              setAlert({
                state: false,
                type: "",
                content: "",
              });
            }}
            message={alert.content}
            closeBtn={true}
            className={[styles.Alert]}
          />
          {loading ? (
            <div style={{ padding: "50px", width: "100%" }}>
              <Loading />
            </div>
          ) : (
            <></>
          )}
          <div
            className={styles.PopUpContent}
            style={mode === "view" && !loading ? {} : { display: "none" }}
          >
            <div className={styles.PopUpContentMain}>
              <div className={styles.PopUpContentMainInner}>
                {vouchers.length === 0 ? (
                  <div className={styles2.BlankTicket}>
                    <img src="/images/blank_ticket.png" alt="" />
                    <h4 style={{ color: "#888" }}>Belum ada voucher</h4>
                  </div>
                ) : (
                  vouchers.map((voucher, index) => {
                    return (
                      <div className={styles.VoucherCard}>
                        <div
                          className={styles.Icon}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedDataEdit({
                              id: voucher.id,
                              index: index,
                            });
                            setMode("edit");
                          }}
                        >
                          <img src="/images/voucher.png" alt="" srcset="" />
                        </div>
                        <div className={styles.Info}>
                          <BiTrash
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleDeleteVoucher(voucher.id, index);
                            }}
                          />
                          <h6
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSelectedDataEdit({
                                id: voucher.id,
                                index: index,
                              });
                              setMode("edit");
                            }}
                          >
                            {voucher.name}
                          </h6>
                          <p>{voucher.code}</p>
                          <p>
                            {moment(voucher.start)
                              .locale("id")
                              .format("DD/MMM/Y")}{" "}
                            -{" "}
                            {moment(voucher.end)
                              .locale("id")
                              .format("DD/MMM/Y")}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className={styles.PopUpContentNav}>
              <div
                className={styles.NavButton}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setMode("add");
                }}
              >
                <BiPlusCircle />
                <div>Tambah</div>
              </div>
            </div>
          </div>
          <div
            className={styles.PopUpContent}
            style={mode === "view" || loading ? { display: "none" } : {}}
          >
            <div
              className={styles2.Info2}
              style={{
                marginLeft: "0px",
                marginRight: "0px",
              }}
            >
              <div className={styles2.CmdField}>
                <BiInfoCircle />
              </div>

              <p>(*) Semua yang bertanda bintang wajib diisi ya... !!!</p>
            </div>
            <div className={`${styles2.TicketEditorContainer}`}>
              <img
                style={{
                  aspectRatio: 1,
                  width: "260px",
                  height: "260px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={"/images/voucher.png"}
              />
              <div className={styles2.EditorRight}>
                <div
                  className={`${styles2.TitleInputBox} ${
                    blankTitle ? styles2.DangerInput : ""
                  }`}
                >
                  <InputForm
                    type={"text"}
                    placeholder={"Nama Voucher"}
                    className={styles2.InputTitle}
                    refData={title}
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    onInput={() => {
                      setBlankTitle(false);
                    }}
                  />
                </div>
                <div
                  className={`${styles2.DateGroup} ${
                    blankStart || blankEnd ? styles2.DangerInput : ""
                  }`}
                >
                  <InputLabeled
                    type={"date"}
                    id={"start_date"}
                    placeholder={"Pilih tanggal & waktu"}
                    iconSvg={<BiCalendar />}
                    label={
                      <p
                        className={styles2.TextSecondary}
                        style={blankStart || blankEnd ? { color: "red" } : {}}
                      >
                        Mulai *
                      </p>
                    }
                    style={{ boxShadow: "none", outline: "none" }}
                    refData={start}
                    min={
                      new Date(
                        new Date().setHours(0, 0, 0) -
                          new Date(
                            new Date().setHours(0, 0, 0)
                          ).getTimezoneOffset() *
                            1000 *
                            60
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                    max={endEvent ? endEvent.split("T")[0] : undefined}
                    fnOnChange={selectStartDate}
                    fnOnInput={() => {
                      setBlankStart(false);
                    }}
                  />
                  <InputLabeled
                    type={"date"}
                    id={"end_date"}
                    placeholder={"Pilih tanggal & waktu"}
                    iconSvg={<BiCalendar />}
                    label={
                      <p
                        className={styles2.TextSecondary}
                        style={blankStart || blankEnd ? { color: "red" } : {}}
                      >
                        Berakhir *
                      </p>
                    }
                    style={{ boxShadow: "none", outline: "none" }}
                    refData={end}
                    min={
                      startSell
                        ? startSell
                        : new Date(
                            new Date().setHours(0, 0, 0) -
                              new Date(
                                new Date().setHours(0, 0, 0)
                              ).getTimezoneOffset() *
                                1000 *
                                60
                          )
                            .toISOString()
                            .split("T")[0]
                    }
                    max={endEvent ? endEvent.split("T")[0] : undefined}
                    fnOnInput={() => {
                      setBlankEnd(false);
                    }}
                  />
                </div>
                <InputLabeled
                  type={"number"}
                  id={"qty"}
                  placeholder={"0 Tiket"}
                  className={[blankQty ? styles2.DangerInput : ""]}
                  iconSvg={<BiGrid />}
                  label={
                    <p
                      className={styles2.TextSecondary}
                      style={blankQty ? { color: "red" } : {}}
                    >
                      Total Kuantitas *
                    </p>
                  }
                  refData={qty}
                  fnOnInput={() => {
                    setBlankQty(false);
                  }}
                />
                <InputLabeled
                  type={"text"}
                  id={"qty"}
                  placeholder={"0 Tiket"}
                  iconSvg={<BiGrid />}
                  style={mode === "edit" ? {} : { display: "none" }}
                  label={
                    <p className={styles2.TextSecondary}>
                      Tersedia (read-only)
                    </p>
                  }
                  refData={qty2}
                  readOnly
                />
                <FieldBox iconSvg={<BiFilter />} label={"Untuk Tiket *"}>
                  <Select
                    options={[
                      { label: "Semua Tiket", value: "all" },
                      ...tickets.map((ticket) => ({
                        label: ticket.name,
                        value: ticket.id,
                      })),
                    ]}
                    className="basic-multi-select"
                    styles={{
                      option: (basicStyle, state) => ({
                        ...basicStyle,
                        backgroundColor: state.isFocused ? "#fecadf" : "white",
                      }),
                      control: (basicStyle, state) => ({
                        ...basicStyle,
                        display: "flex",
                        flexDirection: "row",
                        borderStyle: "none!important",
                        boxShadow: "none!important",
                        textAlign: "end",
                      }),
                      container: (basicStyle, state) => ({
                        ...basicStyle,
                        width: "100%",
                        margin: "unset",
                        borderRadius: "8px",
                      }),
                    }}
                    onChange={(e) => {
                      setForTickets(e);
                    }}
                    value={
                      forTickets.reduce((current, acc) => {
                        if (acc.value === "all") {
                          return current || true;
                        }
                        return current;
                      }, false)
                        ? { label: "Semua Tiket", value: "all" }
                        : forTickets.map((fTicket) => fTicket)
                    }
                    isMulti
                  />
                </FieldBox>
              </div>
            </div>
            <div
              className={styles2.BottomContainer}
              style={{ paddingBottom: "10px" }}
            >
              <div className={`${styles2.TicketSettingContainer}`}>
                <div
                  className={styles2.SettingLabel}
                  style={{ width: "calc(100% - 30px)" }}
                >
                  <label htmlFor="enable-rsc">Diskon Tetap (Fixed)</label>
                  <p>
                    Diskon dengan nilai potongan yang sudah ditetapkan dalam
                    bentuk ribuan rupiah. Bukan dalam bentuk persentase
                  </p>
                </div>
                <div className={styles2.SettingField}>
                  <InputToogle
                    id={"enable-rsc"}
                    style={{ marginLeft: "auto" }}
                    onChange={(e) => {
                      setDiscountType(
                        e.target.checked ? "fixed" : "percentage"
                      );
                    }}
                    refData={discountTyoeToogle}
                    checked={discountType === "fixed" ? true : false}
                  />
                </div>
              </div>
              <InputLabeled
                type={discountType === "percentage" ? "number" : "currency"}
                id={"discount"}
                placeholder={
                  discountType === "percentage" ? "1% " : "Rp. 1000,- "
                }
                className={[blankDiscount ? styles2.DangerInput : ""]}
                iconSvg={<BiSolidDiscount />}
                label={
                  <p
                    className={styles2.TextSecondary}
                    style={blankDiscount ? { color: "red" } : {}}
                  >
                    {discountType === "percentage"
                      ? "Diskon (%) *"
                      : "Diskon (Rupiah) *"}
                  </p>
                }
                refData={discount}
                fnOnInput={() => {
                  setBlankDiscount(false);
                }}
              />
              <div
                className={styles2.Info2}
                style={{
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginBottom: "0px",
                }}
              >
                <div className={styles2.CmdField}>
                  <BiInfoCircle />
                </div>
                <p></p>
                <ol>
                  <b style={{ marginLeft: "-15px", marginBottom: "10px" }}>
                    Apa itu kode voucher ?
                  </b>
                  <li>
                    Kode Voucher merupakan kode unik dari setiap voucher.
                    Berbeda dengan nama voucher, yang merupkan penamaan atau
                    labeling dari suatu voucher
                  </li>
                  <li>
                    Setiap voucher tidak boleh dan tidak akan bisa memiliki kode
                    voucher yang sama
                  </li>
                  <li>
                    Kode voucher ini, tidak digenerate otomatis. Namun
                    didefinikan atau ditentukan oleh organizer event sendiri
                  </li>
                  <li>
                    Setelah voucher disimpan, kode voucher sudah tidak dapat
                    diubah lagi. (DIkunci)
                  </li>
                  <li>
                    Kode voucher inilah yang akan digunakan sebagai inputan
                    untuk memilih voucher saat user akan membeli tiket anda
                  </li>
                </ol>
              </div>
              <InputLabeled
                type={"text"}
                id={"code"}
                placeholder={"XXXX"}
                style={mode === "add" ? {} : { display: "none" }}
                className={[blankCode ? styles2.DangerInput : ""]}
                iconSvg={<BiCard />}
                label={
                  <p
                    className={styles2.TextSecondary}
                    style={blankCode ? { color: "red" } : {}}
                  >
                    Kode Voucher *
                  </p>
                }
                refData={code}
                fnOnInput={() => {
                  setBlankCOde(false);
                }}
                readOnly={mode === "add" ? false : true}
              />
              {mode === "edit" ? (
                <FieldBox label={"Kode Voucher"} iconSvg={<BiCard />}>
                  <div className={`${styles.CopyBox}`}>
                    <p>{code.current ? code.current.value : ""}</p>
                    <div
                      className={styles.Badge}
                      onClick={() => {
                        copyHandle(code.current ? code.current.value : "");
                      }}
                    >
                      <BiCopy />
                      Copy
                    </div>
                  </div>
                </FieldBox>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      }
    />
  );
};

export default PopUpVoucher;
