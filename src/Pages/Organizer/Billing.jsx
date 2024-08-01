import React, { useEffect, useRef, useState } from "react";
import styles from "../User/styles/PersonalEvent.module.css";
import styles2 from "./styles/Billing.module.css";
import styles3 from "../styles/TableBordered.module.css";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import Toggler from "../../components/Toggler";
import Select from "react-select";
import Button from "../../components/Button";
import {
  BiDownload,
  BiError,
  BiCheckCircle,
  BiPlusCircle,
  BiTrash,
  BiCheck,
  BiX,
  BiQuestionMark,
  BiTimer,
  BiLock,
} from "react-icons/bi";
import { Table } from "react-bootstrap";
import PopUp from "../../partials/PopUp";
import Loading from "../../components/Loading";
import xlsx from "json-as-xlsx";
import InputForm from "../../components/InputForm";
import moment from "moment";
import axios from "axios";
import InputLabeled from "../../components/InputLabeled";
import ErrorPage from "../../partials/ErrorPage";
import { useSelector } from "react-redux";
import appData from "../../reducers/appdata";

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

const loadEvents = async ({ orgId }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/event-orgs/" + orgId,
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

const loadAvlWd = async ({ orgId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/withdraw/available",
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

const loadAccs = async ({ orgId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/org/" + orgId + "/bank/list",
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

const addAcc = async ({ orgId, bankName, accNumber, accName, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/org/" + orgId + "/bank/add",
      {
        bank_name: bankName,
        acc_number: accNumber,
        acc_name: accName,
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

const deleteAcc = async ({ orgId, accId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/org/" + orgId + "/bank/delete",
      {
        bank_acc_id: accId,
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

const verifyAcc = async ({ orgId, bankAccId, otpCode, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/org/" + orgId + "/bank/verify",
      {
        bank_acc_id: bankAccId,
        otp: otpCode,
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

const loadBanks = async ({ orgId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/get-banks-code",
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

const loadWds = async ({ orgId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/withdraw/list",
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

const detailWd = async ({ orgId, wdId, token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/withdraw/detail?wd_id=" +
        wdId,
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

const addWd = async ({ orgId, eventId, bankAccId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/withdraw/create",
      {
        event_id: eventId,
        bank_acc_id: bankAccId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return detailWd({
      orgId: orgId,
      wdId: res.data.data.id,
      token: token,
    });
  } catch (error) {
    return handleError(error);
  }
};

const deleteWd = async ({ orgId, wdId, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/api/org/" +
        orgId +
        "/withdraw/delete",
      {
        wd_id: wdId,
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

const OrganizerBilling = ({ organization, fnSetLogin, isLogin }) => {
  const numberFormat = Intl.NumberFormat("id-ID");
  const [orgSelected, setOrgSelected] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewing, setViewing] = useState("Report");
  const [dataTable, setDataTable] = useState(null);
  const [selectedAccBank, setSelectedAccBank] = useState(null);
  const [isLoadingPopUp, setLoadingPopUp] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [contentNotify, setContentNotify] = useState(null);
  const [popupNotify, setpopupNotify] = useState(false);
  const [formAddBank, setFormAddBank] = useState(<></>);
  const [isLoading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [pausedProcess, setPausedProcess] = useState(null);

  const [events, setEvents] = useState(null);
  const [availableWds, setAvlWds] = useState(null);
  const [banks, setBanks] = useState(null);
  const [banksName, setBanksName] = useState(null);
  const [wds, setWds] = useState(null);
  const appData = useSelector((state) => state.appDataReducer);

  const fieldFormAddBank = {
    bank: useRef(null),
    accName: useRef(null),
    accNum: useRef(null),
  };
  const fieldOtp = {
    fieldOtp: useRef(null),
    idBank: useRef(null),
  };

  const dummyLoad = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  };

  const handleOpenFormOtp = (bankAccId) => {
    setPopUpTitle("Verifikasi Rekening");
    setContentNotify(
      <form onSubmit={handleVerifyOtpProcess}>
        <div className={styles2.InputForm}>
          <input
            type="hidden"
            name="id"
            value={bankAccId}
            ref={fieldOtp.idBank}
          />
          <InputLabeled
            type={"text"}
            placeholder={"Input Kode OTP"}
            refData={fieldOtp.fieldOtp}
            label={"Kode OTP"}
            iconSvg={<BiLock />}
          />
        </div>
        <div className={styles2.FormControl}>
          <Button title={"Verifikai"} typeBtn="submit" center={true} />
          <Button
            title={"Batal"}
            bgColor={"white"}
            textColor={"rgb(202, 12, 100"}
            center={true}
            fnOnClick={handleCancelProcess}
          />
        </div>
      </form>
    );
    setpopupNotify(true);
  };

  const handleVerifyOtpProcess = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    if (
      !fieldOtp.fieldOtp.current.value ||
      fieldOtp.fieldOtp.current.value === "" ||
      fieldOtp.fieldOtp.current.value === " " ||
      !fieldOtp.idBank.current.value ||
      fieldOtp.idBank.current.value === "" ||
      fieldOtp.idBank.current.value === " "
    ) {
      setContentNotify(
        <>
          <div>Kode OTP Wajib Diisi !!!</div>
          <div className={styles2.IconPopUp}>
            <BiError color={"#CA0C64"} fontWeight={"600"} />
          </div>
        </>
      );
      setTimeout(() => {
        let idBank = fieldOtp.idBank.current.value;
        handleOpenFormOtp(idBank);
      }, 2000);
    } else {
      let idBank = fieldOtp.idBank.current.value;
      setLoadingPopUp(true);
      // calling Backend
      verifyAcc({
        orgId: orgSelected,
        bankAccId: idBank,
        otpCode: fieldOtp.fieldOtp.current.value,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 202) {
          for (let i = 0; i < banks.length; i++) {
            if (banks[i].id === idBank) {
              banks[i].status = 1;
              i = banks.length;
            }
          }
          setContentNotify(
            <>
              <div>Verifikasi Berhasil</div>
              <div className={styles2.IconPopUp}>
                <BiCheckCircle fontWeight={"600"} style={{ color: "green" }} />
              </div>
            </>
          );
        } else if (res.status === 401) {
          fnSetLogin(false);
          setPausedProcess("verify-otp");
        } else {
          setContentNotify(
            <>
              <div>Verifikasi Gagal. Silahkan coba lagi !!!</div>
              <div className={styles2.IconPopUp}>
                <BiError color={"#CA0C64"} fontWeight={"600"} />
              </div>
            </>
          );
        }

        // reload function
        setLoadingPopUp(false);
        setTimeout(
          () => {
            if (res.status === 202) {
              setpopupNotify(false);
              setContentNotify(<></>);
            } else {
              handleOpenFormOtp(idBank);
            }
          },
          res.status === 401 ? 0 : 2000
        );
      });
    }
  };

  const handleOpenDelete = (idBank) => {
    setPopUpTitle("Hapus Rekening");
    setContentNotify(
      <>
        <div>Apakah kamu ingin menghapus rekening ini ?</div>
        <div className={styles2.IconPopUp}>
          <BiQuestionMark color={"#CA0C64"} fontWeight={"600"} />
        </div>
        <div className={styles2.FormControl}>
          <Button
            title={"Hapus"}
            center={true}
            fnOnClick={() => {
              handleDeleteProcess(idBank);
            }}
          />
          <Button
            title={"Batal"}
            bgColor={"white"}
            textColor={"rgb(202, 12, 100"}
            center={true}
            fnOnClick={handleCancelProcess}
          />
        </div>
      </>
    );
    setpopupNotify(true);
  };

  const handleDeleteProcess = (idBank) => {
    setLoadingPopUp(true);
    // calling backend
    deleteAcc({
      orgId: orgSelected,
      accId: idBank,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 202) {
        setBanks(banks.filter((bank) => bank.id !== idBank));
        setContentNotify(
          <>
            <div>Rekening telah dihapus</div>
            <div className={styles2.IconPopUp}>
              <BiCheckCircle style={{ color: "green" }} fontWeight={600} />
            </div>
          </>
        );
      } else if (res.status === 401) {
        fnSetLogin(false);
        setPausedProcess("delete-bank~!@!~" + idBank);
      } else {
        setContentNotify(
          <>
            <div>Rekening gagal dihapus</div>
            <div className={styles2.IconPopUp}>
              <BiError color={"#CA0C64"} fontWeight={"600"} />
            </div>
          </>
        );
      }

      setLoadingPopUp(false);
      setTimeout(
        () => {
          if (res.status === 202) {
            setpopupNotify(false);
            setContentNotify(<></>);
          } else {
            handleOpenDelete(idBank);
          }
        },
        res.status === 401 ? 0 : 2000
      );
    });
  };

  const handleCancelProcess = () => {
    setPopUpTitle("");
    setContentNotify(<></>);
    setpopupNotify(false);
  };

  const handleAddBankRq = () => {
    setFormAddBank(
      <tr>
        <td>
          <div style={{ marginBottom: "310px" }}>
            <Select
              placeholder={"Pilih Bank"}
              ref={fieldFormAddBank.bank}
              options={Object.keys(banksName).map((key) => {
                return {
                  label: (
                    <div
                      className={styles3.LabeledColumn}
                      // style={{ fontSize: "13px" }}
                    >
                      {/* <img
                        className={styles3.IconLabel}
                        src={"/images/008.png"}
                      /> */}
                      <div className={styles3.TitleLabel}>{banksName[key]}</div>
                    </div>
                  ),
                  value: key,
                };
              })}
              styles={{
                option: (basicStyle, state) => ({
                  ...basicStyle,
                  backgroundColor: state.isFocused ? "#fecadf" : "white",
                }),
                // control: (basicStyle, state) => ({
                //   ...basicStyle,
                //   display: "flex",
                //   flexDirection: "row",
                //   fontSize: "13px",
                // }),
              }}
              onChange={(value) => {
                fieldFormAddBank.bank.current.value = value;
              }}
            />
          </div>
        </td>
        <td>
          <div style={{ marginBottom: "310px", marginTop: "auto" }}>
            <InputForm
              type={"text"}
              placeholder={"Pemilik Rekening"}
              refData={fieldFormAddBank.accName}
              style={{ fontSize: "16px" }}
            />
          </div>
        </td>
        <td>
          <div style={{ marginBottom: "310px", marginTop: "auto" }}>
            <InputForm
              type={"text"}
              placeholder={"Nomor Rekening"}
              refData={fieldFormAddBank.accNum}
              style={{ fontSize: "16px" }}
            />
          </div>
        </td>
        <td>
          <Button
            style={{ marginBottom: "310px" }}
            title={"Simpan"}
            bgColor={"white"}
            textColor={"rgb(202, 12, 100"}
            center={true}
            fnOnClick={handleSubmitAddBank}
          />
        </td>
        <td>
          <Button
            icon={<BiX />}
            center={true}
            bgColor={"red"}
            textColor={"white"}
            style={{ width: "unset", marginBottom: "310px" }}
            fnOnClick={handleCancelAddBankRq}
          />
        </td>
      </tr>
    );
  };

  const handleCancelAddBankRq = () => {
    setFormAddBank(<></>);
  };

  const handleSubmitAddBank = () => {
    const fnSetNotify = (msg) => {
      setPopUpTitle("Tambah Rekening");
      setContentNotify(
        <>
          <div>{msg}</div>
          <div className={styles2.IconPopUp}>
            <BiError color={"#CA0C64"} fontWeight={"600"} />
          </div>
        </>
      );
      setpopupNotify(true);
      setTimeout(() => {
        setpopupNotify(false);
        setContentNotify(<></>);
      }, 3000);
    };
    if (
      !fieldFormAddBank.bank.current ||
      fieldFormAddBank.bank.current.getValue().length === 0 ||
      !fieldFormAddBank.accName.current ||
      fieldFormAddBank.accName.current.value === "" ||
      fieldFormAddBank.accName.current.value === " " ||
      !fieldFormAddBank.accNum.current ||
      fieldFormAddBank.accNum.current.value === "" ||
      fieldFormAddBank.accNum.current.value === " "
    ) {
      fnSetNotify("Semua field wajib diisi !!!");
    } else {
      setLoadingPopUp(true);
      setPopUpTitle("Tambah Rekening");
      setpopupNotify(true);
      // calling backend
      addAcc({
        orgId: orgSelected,
        bankName: fieldFormAddBank.bank.current.getValue()[0].value,
        accName: fieldFormAddBank.accName.current.value,
        accNumber: fieldFormAddBank.accNum.current.value,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 201) {
          banks.push(res.data.data);
          setContentNotify(
            <>
              <div>
                Nomor rekening berhasil ditambahkan.
                <br />
                Cek emailmu untuk verifikasi OTP
              </div>
              <div className={styles2.IconPopUp}>
                <BiCheckCircle style={{ color: "green" }} fontWeight={600} />
              </div>
            </>
          );
        } else if (res.status === 401) {
          fnSetLogin(false);
          setPausedProcess("add-bank");
        } else {
          setContentNotify(
            <>
              <div>
                {res.status === 406
                  ? "Tidak diizinkan mendaftarkan nomor rekening baru sebelum nomor rekening sebelumnya terverifikasi"
                  : "Nomor rekening gagal ditambahkan"}
              </div>
              <div className={styles2.IconPopUp}>
                <BiError color={"#CA0C64"} fontWeight={600} />
              </div>
            </>
          );
        }

        // fn calling reload data banks account
        setLoadingPopUp(false);
        setTimeout(
          () => {
            setpopupNotify(false);
            setContentNotify(<></>);
            if (res.status === 201) {
              handleCancelAddBankRq();
              handleOpenFormOtp(res.data.data.id);
            }
          },
          res.status === 401 ? 0 : 5000
        );
      });
    }
  };

  const handleDownloadReport = () => {
    let content = [];
    availableWds.data.forEach((avl) => {
      content.push({
        event_name: avl.event.name,
        event_id: avl.event.id,
        start_event: avl.event.start_date,
        end_event: avl.event.end_date,
        city: avl.event.city,
        category: avl.event.category,
        amount: avl.origin_amount,
        commission: avl.commision,
        admin_fee: avl.admin_fee,
        final_amount: avl.amount,
      });
    });
    let data = [
      {
        sheet: "Billing Report",
        columns: [
          { label: "Nama Event", value: "event_name" },
          { label: "Event ID", value: "event_id" },
          { label: "Tanggal Mulai", value: "start_event" },
          { label: "Tanggal Akhir", value: "end_event" },
          { label: "Kota", value: "city" },
          { label: "Kategori", value: "category" },
          { label: "Total Keuangan", value: "amount" },
          { label: "Potongan (Komisi Agendakota 2,5%)", value: "commission" },
          { label: "Biaya Admin", value: "admin_fee" },
          { label: "Total Penghasilan", value: "final_amount" },
        ],
        content: content,
      },
    ];
    let settings = {
      fileName: "Laporan_Keuangan", // Name of the resulting spreadsheet
      extraLength: 10, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    };
    xlsx(data, settings);
  };

  const handleSelect = (evt) => {
    let idEvent = evt.value;
    let event = events.find((event) => event.event.id === idEvent);
    setSelectedEvent({ value: event.event.id, label: event.event.name });
  };

  const handleSelectBank = (evt) => {
    setSelectedAccBank(evt.value);
  };

  const handleSubmitWd = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    setPopUpTitle("Pengajuan Withdraw");
    setpopupNotify(true);
    if (!dataTable) {
      setContentNotify(
        <>
          <div>Pengajuan Withdraw gagal dibuat</div>
          <div className={styles2.IconPopUp}>
            <BiError color={"#CA0C64"} fontWeight={"600"} />
          </div>
        </>
      );
      setTimeout(() => {
        setpopupNotify(false);
        setContentNotify(<></>);
      }, 2000);
    } else {
      setLoadingPopUp(true);
      addWd({
        orgId: orgSelected,
        eventId: dataTable.event.id,
        bankAccId: selectedAccBank,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 200) {
          // wds.push(res.data.withdraw);
          setWds([...wds, res.data.withdraw]);
          setContentNotify(
            <>
              <div>
                Pengajuan Withdraw brhasil dibuat. Silahkan tunggu informasi
                dari kami melalui email dan Whatsapp kamu.
              </div>
              <div className={styles2.IconPopUp}>
                <BiCheckCircle color={"green"} fontWeight={"600"} />
              </div>
            </>
          );
          setDataTable(null);
        } else if (res.status === 401) {
          fnSetLogin(false);
          setPausedProcess("add-wd");
        } else {
          setContentNotify(
            <>
              <div>
                Pengajuan Withdraw gagal dibuat. Mohon periksa data LEGALITY /
                LEGALITAS anda. Dan pastikan statusnya sudah disetujui.
              </div>
              <div className={styles2.IconPopUp}>
                <BiError color={"#CA0C64"} fontWeight={"600"} />
              </div>
            </>
          );
        }
        setLoadingPopUp(false);
        setTimeout(
          () => {
            setpopupNotify(false);
            setContentNotify(<></>);
          },
          res.status === 401 ? 0 : 2000
        );
      });
    }
  };

  const handleOpenDeleteWd = (wdId) => {
    setContentNotify(
      <>
        <div>Apakah kamu ingin menghapus pengajuan withdraw ini ?</div>
        <div className={styles2.IconPopUp}>
          <BiQuestionMark color={"#CA0C64"} fontWeight={"600"} />
        </div>
        <div className={styles2.FormControl}>
          <Button
            title={"Hapus"}
            center={true}
            fnOnClick={() => {
              handleDeleteProcessWd(wdId);
            }}
          />
          <Button
            title={"Batal"}
            bgColor={"white"}
            textColor={"rgb(202, 12, 100"}
            center={true}
            fnOnClick={handleCancelProcess}
          />
        </div>
      </>
    );
    setPopUpTitle("Hapus Withdraw");
    setpopupNotify(true);
  };

  const handleDeleteProcessWd = (wdId) => {
    setLoadingPopUp(true);
    // calling backend
    deleteWd({
      orgId: orgSelected,
      wdId: wdId,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 202) {
        setWds(wds.filter((wd) => wd.id !== wdId));
        setContentNotify(
          <>
            <div>Withdraw telah dihapus</div>
            <div className={styles2.IconPopUp}>
              <BiCheckCircle style={{ color: "green" }} fontWeight={600} />
            </div>
          </>
        );
      } else if (res.status === 401) {
        fnSetLogin(false);
        setPausedProcess("delete-wd~!@!~" + wdId);
      } else {
        setContentNotify(
          <>
            <div>Withdraw gagal dihapus</div>
            <div className={styles2.IconPopUp}>
              <BiError color={"#CA0C64"} fontWeight={"600"} />
            </div>
          </>
        );
      }

      // execute reload function if res === true
      setLoadingPopUp(false);
      setTimeout(
        () => {
          setpopupNotify(false);
          setContentNotify(<></>);
        },
        res.status === 401 ? 0 : 2000
      );
    });
  };

  useEffect(() => {
    if (selectedEvent !== null && availableWds) {
      let data = availableWds.data.find(
        (avl) => avl.event.id === selectedEvent.value
      );
      setDataTable(data);
      // console.log("reload data table");
    } else {
      setDataTable(null);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (firstLoad === false) {
      loadEvents({ orgId: appData.activeOrg }).then((res) => {
        if (res.status === 200) {
          setEvents(res.data.events);
        } else if (res.status === 401) {
          fnSetLogin(false);
        } else if (res.status !== 404) {
          setEvents([]);
          setErrorState(true);
        } else {
          setEvents([]);
        }
      });
      loadAvlWd({ orgId: appData.activeOrg, token: appData.accessToken }).then(
        (res) => {
          if (res.status === 200) {
            setAvlWds(res.data);
          } else if (res.status === 401) {
            fnSetLogin(false);
          } else if (res.status !== 404) {
            setEvents([]);
            setErrorState(true);
          } else {
            setAvlWds([]);
          }
        }
      );
      // console.log("reload data event & wd");
    }
  }, [wds]);

  useEffect(() => {
    document.title = "Billing - Agendakota";
    if (formAddBank !== <></>) {
      window.scrollTo(0, document.body.scrollHeight);
    }
    if (!appData.activeOrg) {
      setLoading(true);
    } else {
      setSelectedEvent(null);
      setAvlWds(null);
      setLoading(true);
      loadEvents({ orgId: appData.activeOrg }).then((res) => {
        if (res.status === 200) {
          setEvents(res.data.events);
        } else if (res.status === 401) {
          fnSetLogin(false);
        } else if (res.status !== 404) {
          setEvents([]);
          setErrorState(true);
        } else {
          setEvents([]);
        }
      });
      loadAvlWd({ orgId: appData.activeOrg, token: appData.accessToken }).then(
        (res) => {
          if (res.status === 200) {
            setAvlWds(res.data);
          } else if (res.status === 401) {
            fnSetLogin(false);
          } else if (res.status !== 404) {
            setEvents([]);
            setErrorState(true);
          } else {
            setAvlWds([]);
          }
        }
      );
      loadBanks({ orgId: appData.activeOrg, token: appData.accessToken }).then(
        (res) => {
          if (res.status === 200) {
            setBanksName(res.data.banks);
          } else if (res.status === 401) {
            fnSetLogin(false);
          } else if (res.status !== 404) {
            setEvents([]);
            setErrorState(true);
          } else {
            setBanksName([]);
          }
        }
      );
      loadAccs({ orgId: appData.activeOrg, token: appData.accessToken }).then(
        (res) => {
          if (res.status === 200) {
            setBanks(res.data.data);
          } else if (res.status === 401) {
            fnSetLogin(false);
          } else if (res.status !== 404) {
            setEvents([]);
            setErrorState(true);
          } else {
            setBanks([]);
          }
        }
      );
      loadWds({ orgId: appData.activeOrg, token: appData.accessToken }).then(
        (res) => {
          if (res.status === 200) {
            setWds(res.data.withdraws);
          } else if (res.status === 401) {
            fnSetLogin(false);
          } else if (res.status !== 404) {
            setEvents([]);
            setErrorState(true);
          } else {
            setWds([]);
          }
        }
      );
      setOrgSelected(appData.activeOrg);
    }
  }, [appData]);

  useEffect(() => {
    if (
      events !== null &&
      availableWds !== null &&
      banks !== null &&
      banksName !== null &&
      wds !== null
    ) {
      setLoading(false);
      if (
        (selectedEvent === null || firstLoad === false) &&
        events.length > 0
      ) {
        setSelectedEvent({
          label: events[0].event.name,
          value: events[0].event.id,
        });
      } else {
        setSelectedEvent(null);
      }

      if (banks.length === 0) {
        handleAddBankRq();
      }
      setFirstLoad(false);
      // console.log("set select event wd");
    }
  }, [events, availableWds, banks, banksName, wds]);

  useEffect(() => {
    if (isLogin && pausedProcess) {
      if (pausedProcess === "verify-otp") {
        handleVerifyOtpProcess();
      } else if (pausedProcess === "add-bank") {
        handleSubmitAddBank();
      } else if (pausedProcess.split("~!@!~")[0] === "delete-bank") {
        handleDeleteProcess(pausedProcess.split("~!@!~")[1]);
      } else if (pausedProcess === "add-wd") {
        handleSubmitWd();
      } else if (pausedProcess.split("~!@!~")[0] === "delete-wd") {
        handleDeleteProcessWd(pausedProcess.split("~!@!~")[1]);
      }
      setPausedProcess(null);
    }
  }, [pausedProcess, isLogin]);

  return (
    <>
      <PopUp
        title={popUpTitle}
        width="45%"
        isActive={popupNotify}
        setActiveFn={setpopupNotify}
        content={
          <div className={styles2.PopupNotify}>
            <div className={`${isLoadingPopUp ? "" : "d-none"}`}>
              <Loading />
            </div>
            <div className={`${isLoadingPopUp ? "d-none" : ""}`}>
              {contentNotify}
            </div>
          </div>
        }
      />
      <div className="content organizer">
        <div className={styles.DecorationBox}>
          <div className={styles.Decoration}></div>
        </div>
        {errorState ? (
          <ErrorPage />
        ) : (
          <>
            <div
              className={styles.TitleArea}
              style={{ marginBottom: "27.5px" }}
            >
              <h1 className={styles.Title}>Billing</h1>
              <Toggler
                value={viewing}
                setValue={setViewing}
                options={["Report", "Banks", "Withdrawals"]}
              />
            </div>
            {viewing === "Report" && (
              <>
                <div
                  className={`${styles.BlankData} ${isLoading ? "" : "d-none"}`}
                  style={{ marginTop: "135px" }}
                >
                  <Loading />
                </div>
                <div className={`${isLoading ? "d-none" : ""}`}>
                  {events && availableWds && banks ? (
                    <div>
                      <h5 className={styles2.BillingTitle}>Pilih Event</h5>
                      <div
                        className={styles.TitleArea}
                        style={{ marginBottom: "27.5px" }}
                      >
                        <div>
                          <Select
                            placeholder="--- Pilih Event ---"
                            className={styles2.EventSelector}
                            options={events.map((event) => {
                              return {
                                value: event.event.id,
                                label: event.event.name,
                              };
                            })}
                            value={selectedEvent}
                            styles={{
                              option: (basicStyle, state) => ({
                                ...basicStyle,
                                backgroundColor: state.isFocused
                                  ? "#fecadf"
                                  : "white",
                              }),
                            }}
                            onChange={handleSelect}
                          />
                        </div>
                        <Button
                          icon={<BiDownload />}
                          title={"Download Report"}
                          style={{ width: "unset", marginLeft: "auto" }}
                          fnOnClick={handleDownloadReport}
                        />
                      </div>
                      <h5 className={styles2.BillingTitle}>
                        Total penghasilan tersedia :{" "}
                      </h5>
                      <div className={styles2.TotalAmount}>
                        Rp. {numberFormat.format(availableWds.total_amount)}
                        ,00
                      </div>
                      {dataTable ? (
                        <div style={{ overflow: "auto", width: "100%" }}>
                          <Table className={styles3.BorderedHeader} responsive>
                            <thead>
                              <tr>
                                <th>Jumlah Penghasilan</th>
                                <th>Tiket Komisi</th>
                                <th>Admin Fee</th>
                                <th>Pendapatan Bersih</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  Rp.{" "}
                                  {numberFormat.format(dataTable.origin_amount)}
                                  ,00
                                </td>
                                <td>
                                  Rp.{numberFormat.format(dataTable.commision)}
                                  ,00
                                </td>
                                <td>{dataTable.admin_fee}</td>
                                <td>
                                  Rp. {numberFormat.format(dataTable.amount)},00
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <div className={styles2.BlankDataTable}>
                          <div className={styles2.IconPopUp}>
                            <BiError color={"#CA0C64"} fontWeight={"600"} />
                          </div>
                          <div>
                            Kamu belum bisa mengajukan withdraw untuk event ini
                            !!!
                          </div>
                        </div>
                      )}
                      <form
                        onSubmit={handleSubmitWd}
                        className={styles2.FormAddWd1}
                      >
                        <label>Pilih Rekening :</label>
                        <div className={styles2.FormWd1Content}>
                          <Select
                            required
                            className={styles2.EventSelector}
                            placeholder={"Pilih Rekening"}
                            options={
                              banks.length > 0
                                ? banks
                                    .map((bank) => {
                                      if (bank.status === 1) {
                                        return {
                                          value: bank.id,
                                          label:
                                            bank.bank_name +
                                            " - " +
                                            bank.acc_number,
                                        };
                                      }
                                    })
                                    .filter((bank) => bank !== undefined)
                                : [
                                    {
                                      value: null,
                                      label: (
                                        <a
                                          href="#Banks"
                                          style={{
                                            textDecoration: "none",
                                            textAlign: "center",
                                          }}
                                        >
                                          <Button
                                            icon={<BiPlusCircle />}
                                            title={"Rekening"}
                                            center={true}
                                            bgColor={"#CA0C6414"}
                                            textColor={"rgb(202, 12, 100)"}
                                            borderColor={"#fff"}
                                            style={{
                                              width: "100%",
                                            }}
                                            fnOnClick={() =>
                                              setViewing("Banks")
                                            }
                                          />
                                        </a>
                                      ),
                                    },
                                  ]
                            }
                            styles={{
                              option: (basicStyle, state) => ({
                                ...basicStyle,
                                backgroundColor: state.isFocused
                                  ? "#fecadf"
                                  : "white",
                              }),
                            }}
                            onChange={handleSelectBank}
                          />
                          <Button title={"Withdraw"} typeBtn="submmit" />
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className={styles.BlankData}>
                      <img
                        className={`${styles.IconBlank} ${styles.IconBlank2}`}
                        src="/images/blank_events.png"
                      />
                      <div className={styles.BlankTitle}>
                        Belum ada event yang kamu buat
                      </div>
                      <div className={styles.BlankDesc}>
                        Tap pada tombol ‘Create event’ untuk mmebuat event baru
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {viewing === "Banks" && (
              <>
                <div
                  className={`${styles.BlankData} ${isLoading ? "" : "d-none"}`}
                  style={{ marginTop: "135px" }}
                >
                  <Loading />
                </div>
                <div className={`${isLoading ? "d-none" : ""}`}>
                  <h5 className={styles2.BillingTitle}>Bank Account</h5>

                  <div className={styles3.BoxTable}>
                    <Table className={styles3.BorderedHeader} responsive>
                      <thead>
                        <tr>
                          <td style={{ minWidth: "270px" }}>
                            <div>Nama Bank</div>
                          </td>
                          <td>
                            <div>Pemilik Rekening</div>
                          </td>
                          <td>
                            <div>Nomor Rekening</div>
                          </td>
                          <td>
                            <div>Status</div>
                          </td>
                          <td>Aksi</td>
                        </tr>
                      </thead>
                      <tbody>
                        {banks &&
                          banks.map((bank) => {
                            return (
                              <tr>
                                <td>
                                  <div className={styles3.LabeledColumn}>
                                    {/* <img
                                      className={styles3.IconLabel}
                                      src={
                                        process.env.REACT_APP_BACKEND_URL +
                                        bank.icon
                                      }
                                    /> */}
                                    <div className={styles3.TitleLabel}>
                                      {bank.bank_name}
                                    </div>
                                  </div>
                                </td>
                                <td>{bank.acc_name}</td>
                                <td>{bank.acc_number}</td>
                                <td>
                                  {bank.status === 0 ? (
                                    <Button
                                      title={"Input OTP"}
                                      bgColor={"white"}
                                      textColor={"rgb(202, 12, 100)"}
                                      style={{ width: "unset" }}
                                      fnOnClick={() => {
                                        handleOpenFormOtp(bank.id);
                                      }}
                                    />
                                  ) : (
                                    <Button
                                      title={"Verified"}
                                      icon={<BiCheckCircle />}
                                      bgColor={"green"}
                                      textColor={"white"}
                                      borderColor={"green"}
                                      center={true}
                                      style={{ width: "unset" }}
                                    />
                                  )}
                                </td>
                                <td>
                                  <Button
                                    icon={<BiTrash />}
                                    bgColor={"red"}
                                    center={true}
                                    style={{ width: "unset" }}
                                    textColor={"white"}
                                    fnOnClick={() => {
                                      handleOpenDelete(bank.id);
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        {formAddBank}
                      </tbody>
                    </Table>
                  </div>

                  <div className={styles2.AddListTbl} onClick={handleAddBankRq}>
                    <BiPlusCircle className={styles2.IconAddListTbl} />
                    <div className={styles2.TitleAddListTbl}>
                      Tambah Rekening
                    </div>
                  </div>
                </div>
              </>
            )}
            {viewing === "Withdrawals" && (
              <>
                <div
                  className={`${styles.BlankData} ${isLoading ? "" : "d-none"}`}
                  style={{ marginTop: "135px" }}
                >
                  <Loading />
                </div>
                <div className={`${isLoading ? "d-none" : ""}`}>
                  <h5 className={`${styles2.BillingTitle}`}>Withdraw Data</h5>
                  {wds && wds.length === 0 ? (
                    <div className={styles.BlankData}>
                      <img
                        style={{ marginTop: "50px", marginBottom: "50px" }}
                        className={`${styles.IconBlank} ${styles.IconBlank2}`}
                        src="/images/wallet.png"
                      />
                      <div className={styles.BlankTitle}>
                        Belum ada data pengajuan penarikan dana
                      </div>
                      <div className={styles.BlankDesc}>
                        <Button
                          title={"Ajukan Witdraw"}
                          center={true}
                          style={{ width: "140px", margin: "auto" }}
                          fnOnClick={() => {
                            setViewing("Report");
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={styles3.BoxTable}>
                        <Table className={styles3.BorderedHeader} responsive>
                          <thead>
                            <tr>
                              <td>
                                <div>Nama Event</div>
                              </td>
                              <td>
                                <div>Organizer</div>
                              </td>
                              <td>
                                <div>Tanggal Berakhir Event</div>
                              </td>
                              <td>
                                <div>Nominal Withdraw</div>
                              </td>
                              <td>
                                <div>Rekening</div>
                              </td>
                              <td>
                                <div>Status</div>
                              </td>
                              <td>
                                <div>Aksi</div>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {wds.map((wd) => {
                              return (
                                <tr>
                                  <td>{wd.event.name}</td>
                                  <td>{wd.organization.name}</td>
                                  <td>
                                    {moment(wd.event.end_date)
                                      .locale("id")
                                      .format("D MMMM YYYY")}
                                  </td>
                                  <td>
                                    Rp.{numberFormat.format(wd.nominal)},00
                                  </td>
                                  <td>
                                    <div className={styles3.LabeledColumn}>
                                      {/* <img
                                        className={styles3.IconLabel}
                                        src={"/images/008.png"}
                                      /> */}
                                      <div className={styles3.TitleLabel}>
                                        {wd.bank.acc_number}
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    {wd.status === 0 ? (
                                      <Button
                                        title={"Tertunda"}
                                        bgColor={"yellow"}
                                        borderColor={"yellow"}
                                        textColor={"black"}
                                        style={{ width: "unset" }}
                                        icon={<BiTimer />}
                                        center={true}
                                      />
                                    ) : wd.status === -1 ? (
                                      <Button
                                        title={"Gagal"}
                                        icon={<BiX />}
                                        bgColor={"red"}
                                        textColor={"white"}
                                        borderColor={"red"}
                                        center={true}
                                        style={{ width: "unset" }}
                                      />
                                    ) : (
                                      <Button
                                        title={"Selesai"}
                                        icon={<BiCheckCircle />}
                                        bgColor={"green"}
                                        textColor={"white"}
                                        borderColor={"green"}
                                        center={true}
                                        style={{ width: "unset" }}
                                      />
                                    )}
                                  </td>
                                  <td>
                                    {wd.status === 1 &&
                                    (wd.event.categorycategory ==
                                      "Attraction" ||
                                      wd.event.categorycategory ==
                                        "Daily Activities" ||
                                      wd.event.categorycategory ==
                                        "Tour Travel (recurring)") ? (
                                      <Button
                                        icon={<BiTrash />}
                                        bgColor={"grey"}
                                        center={true}
                                        borderColor={"grey"}
                                        style={{ width: "unset" }}
                                        textColor={"white"}
                                      />
                                    ) : (
                                      <Button
                                        icon={<BiTrash />}
                                        bgColor={"red"}
                                        center={true}
                                        style={{ width: "unset" }}
                                        textColor={"white"}
                                        fnOnClick={() => {
                                          handleOpenDeleteWd(wd.id);
                                        }}
                                      />
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                      <div
                        className={styles2.AddListTbl}
                        onClick={() => {
                          setViewing("Report");
                        }}
                      >
                        <BiPlusCircle className={styles2.IconAddListTbl} />
                        <div className={styles2.TitleAddListTbl}>
                          Ajukan Withdraw
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OrganizerBilling;
