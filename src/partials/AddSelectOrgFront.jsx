import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/AddSelectOrgFront.module.css";
import PopUpLogin from "./PopUpLogin";
import PopUp from "./PopUp";

import {
  BiArrowBack,
  BiChevronDown,
  BiCircle,
  BiError,
  BiFilter,
  BiGroup,
  BiPlus,
  BiPlusCircle,
  BiX,
} from "react-icons/bi";
import Button from "../components/Button";
import Select from "react-select";
import TextArea from "../components/TextArea";
import Alert from "../components/Alert";
import config from "../config";
import InputLabeled from "../components/InputLabeled";
import FieldBox from "../components/FieldBox";
import axios from "axios";
import Loading from "../components/Loading";
import EditorAddEvtAct from "./EditorAddEvtAct";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAppData } from "../actions/appdata";

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

const loadAddOrg = async ({ type, name, interest, desc, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/org/register-org",
      {
        type: type,
        name: name,
        interest: interest,
        desc: desc,
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

const loadOrganizers = async ({ token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/org/user-orgs",
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

const AddSelectOrgFront = ({
  isLogin,
  fnSetLogin,
  eventData,
  fnCreateEvent,
  fnUpdateEvent,
  fnCreateTickets,
  categories,
  orgTypes,
}) => {
  // const [isPopUpAddOrg, setPopUpAddOrg] = useState(false);
  const [organizers, setOrganizers] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [mode, setMode] = useState("basic");
  const [pausedProcess, setPausedProcess] = useState(null);
  const [interuptProcess, setInteruptProcess] = useState(null);
  const [savedEventId, setSavedEvtId] = useState(null);
  const [showAlert, setShowAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const [selectedOption, setSelectedOpt] = useState(null);
  const [backToEditor, setBackToEditor] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const orgName = useRef(null);
  const orgType = useRef(null);
  const interestEvt = useRef(null);
  const desc = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appData = useSelector((state) => state.appDataReducer);

  const resetAlert = () => {
    setShowAlert({
      state: false,
      type: "",
      content: "",
    });
  };

  const handleSave = (
    interuptProcess,
    savedEventId,
    selectedOrg,
    eventDataIn = { event: { orgId: null } }
  ) => {
    try {
      eventDataIn.event.orgId = selectedOrg;
      if (interuptProcess === "ticket") {
        setLoading(true);
        fnUpdateEvent({
          event_id: savedEventId,
          ...eventDataIn.event,
          token: appData.accessToken,
        }).then((res) => {
          if (res.status === 202) {
            if (eventDataIn.tickets.length > 0) {
              fnCreateTickets({
                orgId: selectedOrg,
                eventId: savedEventId,
                ticketDatas: eventDataIn.tickets,
                token: appData.accessToken,
              }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                  localStorage.setItem("active-event", savedEventId);
                  localStorage.setItem("active-org", selectedOrg);
                  // dispatch(
                  //   getAppData({
                  //     accessToken: appData.accessToken,
                  //     activeOrg: selectedOrg,
                  //     activeEvent: savedEventId,
                  //   })
                  // );
                  setTimeout(() => {
                    // navigate("/organizer/event/dashboard");
                    window.location.href = "/organizer/event/dashboard";
                  }, 50);
                } else if (res.status === 401) {
                  fnSetLogin(false);
                  setPausedProcess("ticket");
                } else {
                  setInteruptProcess("ticket");
                  setLoading(false);
                  setShowAlert({
                    state: true,
                    type: "danger",
                    content:
                      "Server Error. Silahkan coba beberapa saat kembali",
                  });
                }
              });
            } else {
              localStorage.setItem("active-event", savedEventId);
              localStorage.setItem("active-org", selectedOrg);
              // dispatch(
              //   getAppData({
              //     accessToken: appData.accessToken,
              //     activeOrg: selectedOrg,
              //     activeEvent: savedEventId,
              //   })
              // );
              setTimeout(() => {
                // navigate("/organizer/event/dashboard");
                window.location.href = "/organizer/event/dashboard";
              }, 50);
            }
          } else if (res.status === 401) {
            fnSetLogin(false);
            setPausedProcess("create-event");
          } else {
            setLoading(false);
            setInteruptProcess("create-event");
            setShowAlert({
              state: true,
              type: "danger",
              content: "Server Error. Silahkan coba beberapa saat kembali",
            });
          }
        });
      } else {
        setLoading(true);
        fnCreateEvent({
          ...eventDataIn.event,
          token: appData.accessToken,
        }).then((res) => {
          if (res.status === 201) {
            let eventId = res.data.event.id;
            setSavedEvtId(res.data.event.id);
            if (eventDataIn.tickets.length > 0) {
              fnCreateTickets({
                orgId: selectedOrg,
                eventId: eventId,
                ticketDatas: eventDataIn.tickets,
                token: appData.accessToken,
              }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                  localStorage.setItem("active-event", eventId);
                  localStorage.setItem("active-org", selectedOrg);
                  // dispatch(
                  //   getAppData({
                  //     accessToken: appData.accessToken,
                  //     activeOrg: selectedOrg,
                  //     activeEvent: eventId,
                  //   })
                  // );
                  setTimeout(() => {
                    // navigate("/organizer/event/dashboard");
                    window.location.href = "/organizer/event/dashboard";
                  }, 50);
                } else if (res.status === 401) {
                  fnSetLogin(false);
                  setPausedProcess("ticket");
                } else {
                  setInteruptProcess("ticket");
                  setLoading(false);
                  setShowAlert({
                    state: true,
                    type: "danger",
                    content:
                      "Server Error. Silahkan coba beberapa saat kembali",
                  });
                }
              });
            } else {
              localStorage.setItem("active-event", eventId);
              localStorage.setItem("active-org", selectedOrg);
              // dispatch(
              //   getAppData({
              //     accessToken: appData.accessToken,
              //     activeOrg: selectedOrg,
              //     activeEvent: eventId,
              //   })
              // );
              setTimeout(() => {
                // navigate("/organizer/event/dashboard");
                window.location.href = "/organizer/event/dashboard";
              }, 50);
            }
          } else if (res.status === 401) {
            fnSetLogin(false);
            setPausedProcess("create-event");
          } else {
            setLoading(false);
            setInteruptProcess("create-event");
            setShowAlert({
              state: true,
              type: "danger",
              content: "Server Error. Silahkan coba beberapa saat kembali",
            });
          }
        });
      }
    } catch (error) {}
  };

  const onSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (
      !orgName.current ||
      orgName.current.value === "" ||
      !orgType.current ||
      orgType.current.getValue().length === 0 ||
      !interestEvt.current ||
      interestEvt.current.getValue().length === 0 ||
      desc.current.value === ""
    ) {
      setShowAlert({
        state: true,
        type: "danger",
        content: "Semua field wajib diisi",
      });
    } else {
      setLoading(true);
      loadAddOrg({
        type: orgType.current
          .getValue()
          .map((val) => val.value)
          .join("^~!@!~^"),
        name: orgName.current.value,
        interest: interestEvt.current
          .getValue()
          .map((val) => val.value)
          .join("^~!@!~^"),
        desc: desc.current.value,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 201) {
          setSelectedOrg(res.data.data.id);
        } else if (res.status === 401) {
          fnSetLogin(false);
          setPausedProcess("create-org");
        } else {
          setShowAlert({
            state: true,
            type: "danger",
            content: "Pastikan semua field sudah terisi dengan benar",
          });
          setTimeout(() => {
            resetAlert();
          }, 5000);
          setLoading(false);
        }
      });
    }
  };

  const loadOrganizersData = (pausedProcess) => {
    setInteruptProcess(null);
    loadOrganizers({ token: appData.accessToken }).then((res) => {
      if (res.status === 200) {
        setOrganizers(res.data.organizations);
      } else if (res.status === 401) {
        fnSetLogin(false);
      } else if (res.status !== 404) {
        setInteruptProcess("load-orgs");
      } else {
        setOrganizers([]);
      }
      if (!pausedProcess) {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (isLogin) {
      setLoading(true);
      loadOrganizersData(pausedProcess);
    }
  }, [isLogin]);

  useEffect(() => {
    if (isLogin && pausedProcess) {
      if (pausedProcess === "ticket") {
        handleSave("ticket", savedEventId, selectedOrg, eventData);
      } else if (pausedProcess === "create-event") {
        handleSave(null, null, selectedOrg, eventData);
      } else if (pausedProcess === "create-org") {
        onSubmit();
      }
      setPausedProcess(null);
    }
  }, [isLogin, pausedProcess]);

  useEffect(() => {
    if (selectedOrg) {
      console.log("load create data event ", selectedOrg);
      handleSave(null, null, selectedOrg, eventData);
      setSelectedOpt(null);
    }
  }, [selectedOrg]);

  return (
    <div>
      {!isLogin ? (
        <PopUpLogin
          addtionalStyle={{
            top: "71px",
            height: "calc(100% - 71px)",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
          setLogin={fnSetLogin}
        />
      ) : (
        <></>
      )}
      <div className={`${!isLogin ? "d-none" : ""}`}>
        {/* <div> */}
        <PopUp
          isActive={true}
          setActiveFn={() => {}}
          title=""
          customTitle={
            <>
              {mode === "basic" && organizers.length > 0 ? (
                <div className={styles.CustomHeader}>
                  <h5>Select Organization</h5>
                </div>
              ) : (
                <div className={styles.CustomHeader}>
                  {mode === "create" ? (
                    <BiArrowBack
                      onClick={() => {
                        setMode("basic");
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <h5>Create Organization</h5>
                </div>
              )}
            </>
          }
          width="45%"
          content={
            <>
              {isLoading ? <Loading /> : <></>}
              {interuptProcess && !isLoading ? (
                <div className={styles.InteruptNotify}>
                  <BiError />
                  <p>
                    <b>
                      Terjadi masalah saat mengirim data ke server. Silahkan
                      klik "OK" untuk mengulanginya lagi
                    </b>
                  </p>
                  <Button
                    title={"Ok"}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    fnOnClick={() => {
                      if (interuptProcess === "load-orgs") {
                        loadOrganizersData(pausedProcess);
                      } else {
                        handleSave(
                          interuptProcess,
                          savedEventId,
                          selectedOrg,
                          eventData
                        );
                      }
                    }}
                  />
                </div>
              ) : (
                <div
                  className={`${isLoading || interuptProcess ? "d-none" : ""}`}
                >
                  {mode === "basic" && organizers.length > 0 ? (
                    <div className={styles.MainContainer}>
                      {/* Button open add organizer */}
                      <Alert
                        isShow={showAlert.state}
                        setShowFn={setShowAlert}
                        type={showAlert.type}
                        message={showAlert.content}
                      />
                      <FieldBox
                        id={"select_org"}
                        iconSvg={<BiGroup />}
                        label={"Pilih Organisasi"}
                        style={{ marginTop: "10px" }}
                      >
                        <Select
                          options={organizers.map((org) => ({
                            label: org.name,
                            value: org.id,
                          }))}
                          styles={{
                            option: (basicStyle, state) => ({
                              ...basicStyle,
                              backgroundColor: state.isFocused
                                ? "#fecadf"
                                : "white",
                            }),
                            control: (basicStyle, state) => ({
                              ...basicStyle,
                              // width: "100%",
                              // textAlign: "left",
                              // margin: "unset",
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
                          value={selectedOption}
                          onChange={(e) => {
                            console.log(e);
                            setSelectedOrg(e.value);
                            setSelectedOpt(e);
                          }}
                        />
                      </FieldBox>
                      <h5
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginBottom: "20px",
                          marginTop: "20px",
                        }}
                      >
                        Atau
                      </h5>
                      <Button
                        icon={<BiPlusCircle />}
                        title={"New Organization"}
                        center
                        style={{
                          width: "100%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginBottom: "50px",
                        }}
                        fnOnClick={() => {
                          setMode("create");
                        }}
                      />
                      {/* List organizers */}
                    </div>
                  ) : (
                    <form style={{ display: "grid" }} onSubmit={onSubmit}>
                      <Alert
                        isShow={showAlert.state}
                        setShowFn={setShowAlert}
                        type={showAlert.type}
                        message={showAlert.content}
                      />
                      <InputLabeled
                        id={"org_name"}
                        type={"text"}
                        placeholder={"Nama Organisasi"}
                        refData={orgName}
                        label={"Nama Organisasi"}
                        iconSvg={<BiGroup />}
                      />
                      <FieldBox
                        id={"type_org"}
                        iconSvg={<BiFilter />}
                        label={"Tipe Organisasi"}
                        style={{ marginTop: "10px" }}
                      >
                        <Select
                          id="type_org"
                          options={
                            orgTypes
                              ? orgTypes.map((type) => {
                                  return {
                                    label: type.name,
                                    value: type.name,
                                  };
                                })
                              : []
                          }
                          className="basic-multi-select"
                          ref={orgType}
                          styles={{
                            option: (basicStyle, state) => ({
                              ...basicStyle,
                              backgroundColor: state.isFocused
                                ? "#fecadf"
                                : "white",
                            }),
                            control: (basicStyle, state) => ({
                              ...basicStyle,
                              // width: "100%",
                              // textAlign: "left",
                              // margin: "unset",
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
                        />
                      </FieldBox>
                      <FieldBox
                        id={"interest"}
                        iconSvg={<BiFilter />}
                        label={"Tertarik Dengan"}
                        style={{ marginTop: "10px" }}
                      >
                        <Select
                          id="interest"
                          isMulti
                          options={
                            categories
                              ? categories.map((cat) => {
                                  return {
                                    label: cat.name,
                                    value: cat.name,
                                  };
                                })
                              : []
                          }
                          ref={interestEvt}
                          className="basic-multi-select"
                          styles={{
                            option: (basicStyle, state) => ({
                              ...basicStyle,
                              backgroundColor: state.isFocused
                                ? "#fecadf"
                                : "white",
                            }),
                            control: (basicStyle, state) => ({
                              ...basicStyle,
                              // width: "100%",
                              // textAlign: "left",
                              // margin: "unset",
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
                        />
                      </FieldBox>
                      <FieldBox
                        id={"org_desc"}
                        label={""}
                        style={{
                          marginTop: "10px",
                          marginBottom: "20px",
                          flexDirection: "column",
                          height: "unset",
                          alignItems: "unset",
                        }}
                        contentWidth={"100%"}
                      >
                        <TextArea
                          id={"org_desc"}
                          placehorder={"Deskripsi organisasi"}
                          refData={desc}
                          style={{
                            width: "100%",
                          }}
                          className={"no-border-outline-shadow"}
                        />
                      </FieldBox>
                      <div style={{ display: "flex" }}>
                        <Button
                          title={"Simpan"}
                          typeBtn={"submit"}
                          style={{ margin: "auto", width: "100%" }}
                        />
                      </div>
                    </form>
                  )}
                </div>
              )}
            </>
          }
        />
      </div>
    </div>
  );
};

export default AddSelectOrgFront;
