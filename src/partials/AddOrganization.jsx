import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/AddSelectOrgFront.module.css";
import {
  BiChevronDown,
  BiCircle,
  BiFilter,
  BiGroup,
  BiPlus,
  BiPlusCircle,
} from "react-icons/bi";
import Button from "../components/Button";
import PopUp from "./PopUp";
import Select from "react-select";
import TextArea from "../components/TextArea";
import Alert from "../components/Alert";
import config from "../config";
import { useNavigate } from "react-router-dom";
import InputLabeled from "../components/InputLabeled";
import FieldBox from "../components/FieldBox";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import ErrorPage from "./ErrorPage";

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

const handleSuccess = (res) => {
  return {
    data: res.data,
    status: res.status,
  };
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

const loadCategories = async () => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/categories",
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

const loadOrgTypes = async () => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/org-types",
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

const AddOrganization = ({
  isPopUpAddOrg,
  setPopUpAddOrg,
  organizers,
  setOrganizers,
  setLogin,
}) => {
  const [showAlert, setShowAlert] = useState({
    state: false,
    type: "",
    content: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [categories, setCategories] = useState(null);
  const [orgTypes, setOrgTypes] = useState(null);

  const orgName = useRef(null);
  const orgType = useRef(null);
  const interestEvt = useRef(null);
  const desc = useRef(null);
  const navigate = useNavigate();
  const appData = useSelector((state) => state.appDataReducer);

  // ================== Sate Control =====================
  const [blankOrgName, setBlankOrgName] = useState(false);
  const [blankOrgType, setBlankOrgType] = useState(false);
  const [blankInterest, setBlankInterrest] = useState(false);
  const [blankDesc, setBlankDesc] = useState(false);
  // =====================================================

  const resetAlert = () => {
    setShowAlert({
      state: false,
      type: "",
      content: "",
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      !orgName.current ||
      orgName.current.value === "" ||
      orgName.current.value.length > 200 ||
      !orgType.current ||
      orgType.current.getValue().length === 0 ||
      !interestEvt.current ||
      interestEvt.current.getValue().length === 0 ||
      desc.current.value === ""
    ) {
      let content = "Semua field wajib diisi";
      if (
        !orgName.current ||
        orgName.current.value === "" ||
        orgName.current.value.length > 200
      ) {
        setBlankOrgName(true);
      }
      if (orgName.current.value.length > 200) {
        content = "Nama organisasi maksimal 200 karakter termasuk spasi";
      }
      if (!orgType.current || orgType.current.getValue().length === 0) {
        setBlankOrgType(true);
      }
      if (!interestEvt.current || interestEvt.current.getValue().length === 0) {
        setBlankInterrest(true);
      }
      if (desc.current.value === "") {
        setBlankDesc(true);
      }
      setShowAlert({
        state: true,
        type: "danger",
        content: content,
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
          setOrganizers([...organizers, res.data.data]);
          setShowAlert({
            state: true,
            type: "success",
            content: "Data organizer berhasil ditambahkan",
          });
          setTimeout(() => {
            setPopUpAddOrg(false);
          }, 1000);
        } else if (res.status === 401) {
          setLogin(false);
          setShowAlert({
            state: true,
            type: "danger",
            content:
              "Sesi login telah habis, silahkan login dahulu dan coba lagi !!!",
          });
        } else {
          setShowAlert({
            state: true,
            type: "danger",
            content: "Pastikan semua field sudah terisi dengan benar",
          });
        }
        setLoading(false);
        setTimeout(() => {
          resetAlert();
        }, 5000);
      });
    }
  };

  useEffect(() => {
    let labels = document.getElementsByClassName("input-labeled-label");
    let maxWidthLabel = labels.length > 0 ? labels[0].offsetWidth : 0;
    for (let i = 0; i < labels.length; i++) {
      for (let j = i; j < labels.length - 1; j++) {
        if (labels[j + 1].offsetWidth > maxWidthLabel) {
          maxWidthLabel = labels[j + 1].offsetWidth;
        }
      }
    }
    let fieldsInput = document.getElementsByClassName("input-labeled-field");
    for (let i = 0; i < fieldsInput.length; i++) {
      if (fieldsInput[i].offsetWidth !== 0) {
        fieldsInput[i].style.width = `calc(100% - ${maxWidthLabel + 38}px)`;
        fieldsInput[i].style.marginLeft = "auto";
        fieldsInput[i].style.textAlign = "left";
      }
    }
  });

  useEffect(() => {
    if (!categories && !orgTypes) {
      setMainLoading(true);
      loadCategories().then((res) => {
        if (res.status === 200) {
          setCategories(res.data.categories);
        } else {
          setCategories([]);
          if (res.status !== 404) {
            setErrorState(true);
          }
        }
      });
      loadOrgTypes().then((res) => {
        if (res.status === 200) {
          setOrgTypes(res.data.org_types);
        } else {
          setOrgTypes([]);
          if (res.status !== 404) {
            setErrorState(true);
          }
        }
      });
    } else if (categories && orgTypes) {
      setMainLoading(false);
    }
  }, [categories, orgTypes]);

  return (
    <PopUp
      isActive={isPopUpAddOrg}
      setActiveFn={setPopUpAddOrg}
      width="40%"
      content={
        errorState ? (
          <ErrorPage />
        ) : mainLoading ? (
          <Loading />
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
              className={[blankOrgName ? styles.DangerInput : ""]}
              fnOnInput={() => {
                setBlankOrgName(false);
              }}
            />
            <FieldBox
              id={"type_org"}
              className={[blankOrgType ? styles.DangerInput : ""]}
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
                    backgroundColor: state.isFocused ? "#fecadf" : "white",
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
                    // textAlign: "end",
                    fontSize: "13px",
                  }),
                  container: (basicStyle, state) => ({
                    ...basicStyle,
                    width: "100%",
                    margin: "unset",
                    borderRadius: "8px",
                    marginLeft: "15px",
                    fontSize: "13px",
                  }),
                }}
                onMenuOpen={() => {
                  setBlankOrgType(false);
                }}
              />
            </FieldBox>
            <FieldBox
              id={"interest"}
              className={[blankInterest ? styles.DangerInput : ""]}
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
                    backgroundColor: state.isFocused ? "#fecadf" : "white",
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
                    // textAlign: "end",
                    fontSize: "13px",
                  }),
                  container: (basicStyle, state) => ({
                    ...basicStyle,
                    width: "100%",
                    margin: "unset",
                    borderRadius: "8px",
                    marginLeft: "10px",
                    fontSize: "13px",
                  }),
                }}
                onMenuOpen={() => {
                  setBlankInterrest(false);
                }}
              />
            </FieldBox>
            <FieldBox
              id={"org_desc"}
              className={[blankDesc ? styles.DangerInput : ""]}
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
                fnOnInput={() => {
                  setBlankDesc(false);
                }}
              />
            </FieldBox>
            {isLoading ? (
              <div style={{ display: "flex" }}>
                <Button
                  bgColor={"rgb(212 132 169)"}
                  borderColor={"rgb(212 132 169)"}
                  title={"Loading ..."}
                  icon={
                    <div
                      className="spinner-border"
                      style={{ width: "20px", height: "20px" }}
                      animation="border"
                    />
                  }
                  center={true}
                  style={{ width: "100%", textAlign: "center" }}
                />
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <Button
                  title={"Simpan"}
                  typeBtn={"submit"}
                  style={{ margin: "auto", width: "100%" }}
                />
              </div>
            )}
          </form>
        )
      }
    />
  );
};

export default AddOrganization;
