import React, { useEffect, useRef, useState } from "react";
import SidebarUser from "../../partials/SidebarUser";
import HeaderUser from "../../partials/HeaderUser";
import styles from "./styles/PersonalEvent.module.css";
import styles2 from "../Organizer/styles/Legality.module.css";
import styles3 from "./styles/Settings.module.css";
import styles4 from "./styles/Profile.module.css";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import InputForm from "../../components/InputForm";
import InputImage from "../../components/InputImage";
import Loading from "../../components/Loading";
import PopUp from "../../partials/PopUp";
import {
  BiAccessibility,
  BiAnalyse,
  BiCheckCircle,
  BiEnvelope,
  BiError,
  BiInfoCircle,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiLogoWhatsapp,
  BiPhone,
} from "react-icons/bi";
import InputImage2 from "../../components/InputImage2";
import InputImage3 from "../../components/InputImage3";
import InputLabeled from "../../components/InputLabeled";
import FieldBox from "../../components/FieldBox";
import Select from "react-select";
import axios from "axios";
import ErrorPage from "../../partials/ErrorPage";
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

const loadProfile = async ({ token }) => {
  try {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/api/profile",
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

const updateProfile = async ({
  fName,
  lName,
  name,
  email,
  photo,
  phone,
  linkedin,
  instagram,
  twitter,
  whatsapp,
  interest,
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/update",
      {
        _method: "PUT",
        f_name: fName,
        l_name: lName,
        name: name,
        email: email,
        photo: photo,
        phone: phone,
        linkedin: linkedin,
        instagram: instagram,
        twitter: twitter,
        whatsapp: whatsapp,
        interest: interest,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
};

const UserProfile = ({ isLogin, fnSetLogin = () => {} }) => {
  const [categories, setCategories] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [selectedInterest, setInterest] = useState([]);
  const [alertDanger, setAlertDanger] = useState({
    state: false,
    content: "Semua field wajib diisi !",
  });
  const [errorState, setErrorState] = useState(false);
  const [popUpContent, setPopUpContent] = useState(<></>);
  const [isLoading, setLoading] = useState(true);
  const [popUpActive, setPopUpActive] = useState(false);
  const [pausedProcess, setPausedProcess] = useState(null);
  const [loop, setLoop] = useState(0);
  const appData = useSelector((state) => state.appDataReducer);

  const fieldProfile = {
    fName: useRef(null),
    lName: useRef(null),
    name: useRef(null),
    email: useRef(null),
    photo: useRef(null),
    phone: useRef(null),
    linkedin: useRef(null),
    instagram: useRef(null),
    twitter: useRef(null),
    whatsapp: useRef(null),
  };

  const [tempField, setTempField] = useState({
    fName: null,
    lName: null,
    name: null,
    email: null,
    photo: null,
    phone: null,
    linkedin: null,
    instagram: null,
    twitter: null,
    whatsapp: null,
  });

  const handleSumbitCore = (
    fName,
    lName,
    name,
    email,
    photo,
    phone,
    linkedin,
    instagram,
    twitter,
    whatsapp,
    interest
  ) => {
    setLoading(true);
    updateProfile({
      fName,
      lName,
      name,
      email,
      photo,
      phone,
      linkedin,
      instagram,
      twitter,
      whatsapp,
      interest,
      token: appData.accessToken,
    }).then((res) => {
      if (res.status === 202) {
        setPopUpContent(
          <div className={styles3.PopupNotify}>
            <div className={styles3.IconPopUp}>
              <BiCheckCircle color="green" fontWeight={"600"} />
            </div>
            <div>Data profile telah diperbarui !</div>
            <Button
              title={"Ok"}
              fnOnClick={() => {
                setPopUpActive(false);
              }}
            />
          </div>
        );
        setProfileData(res.data.user);
        setPopUpActive(true);
        setLoading(false);
        tempField.email = null;
        tempField.fName = null;
        tempField.instagram = null;
        tempField.lName = null;
        tempField.linkedin = null;
        tempField.name = null;
        tempField.phone = null;
        tempField.photo = null;
        tempField.twitter = null;
        tempField.whatsapp = null;
      } else if (res.status === 401) {
        tempField.email = email;
        tempField.fName = fName;
        tempField.instagram = instagram;
        tempField.lName = lName;
        tempField.linkedin = linkedin;
        tempField.name = name;
        tempField.phone = phone;
        tempField.photo = photo;
        tempField.twitter = twitter;
        tempField.whatsapp = whatsapp;
        fnSetLogin(false);
        setPausedProcess("update");
      } else {
        setPopUpContent(
          <div className={styles3.PopupNotify}>
            <div className={styles3.IconPopUp}>
              <BiError color="#ca0c64" fontWeight={"600"} />
            </div>
            <div>
              Data gagal diperbarui. Data ditemukan atau terjadi kesalahan
              server. Silahkan coba lagi
            </div>
            <Button
              title={"Ok"}
              fnOnClick={() => {
                setPopUpActive(false);
              }}
            />
          </div>
        );
        setPopUpActive(true);
        setLoading(false);
      }
    });
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (
      fieldProfile.fName.current.value === "" ||
      fieldProfile.lName.current.value === "" ||
      fieldProfile.name.current.value === "" ||
      fieldProfile.fName.current.value === "-" ||
      fieldProfile.lName.current.value === "-" ||
      fieldProfile.name.current.value === "-" ||
      fieldProfile.email.current.value === "" ||
      fieldProfile.email.current.value === "-" ||
      fieldProfile.email.current.value.split("@").length < 2 ||
      fieldProfile.phone.current.value === "" ||
      fieldProfile.phone.current.value.split("").length < 10 ||
      fieldProfile.phone.current.value.split("").length > 13 ||
      (fieldProfile.whatsapp.current.value.split("").length > 0 &&
        (fieldProfile.whatsapp.current.value.split("").length < 10 ||
          fieldProfile.whatsapp.current.value.split("").length > 13))
    ) {
      setPopUpContent(
        <div className={styles3.PopupNotify}>
          <div className={styles3.IconPopUp}>
            <BiError color="#ca0c64" fontWeight={"600"} />
          </div>
          <div>
            {fieldProfile.email.current.value.split("@").length < 2
              ? "Tolong isi field email dengan benar (exampple@mail.com)"
              : fieldProfile.phone.current.value === "" ||
                fieldProfile.phone.current.value.split("").length < 10 ||
                fieldProfile.phone.current.value.split("").length > 13 ||
                (fieldProfile.whatsapp.current.value.split("").length > 0 &&
                  (fieldProfile.whatsapp.current.value.split("").length < 10 ||
                    fieldProfile.whatsapp.current.value.split("").length > 13))
              ? "Field nomor ponsel atau whatsapp, minimal 10 karakter dan maksimal 13 karakter"
              : "Semua field selain foto profil, interest, instagram, linkedin, dan twitter wajib diisi dengan format yanng benar !!!"}
          </div>

          <Button
            title={"Ok"}
            fnOnClick={() => {
              setPopUpActive(false);
            }}
          />
        </div>
      );
      setPopUpActive(true);
    } else {
      handleSumbitCore(
        fieldProfile.fName.current.value,
        fieldProfile.lName.current.value,
        fieldProfile.name.current.value,
        fieldProfile.email.current.value,
        fieldProfile.photo.current.files.length > 0
          ? fieldProfile.photo.current.files[0]
          : null,
        fieldProfile.phone.current.value,
        fieldProfile.linkedin.current.value === "" ||
          fieldProfile.linkedin.current.value.split("linkedin.com/in/").length <
            2
          ? "-"
          : "https://linkedin.com/in/" +
              fieldProfile.linkedin.current.value.split("linkedin.com/in/")[1],
        fieldProfile.instagram.current.value === "" ||
          fieldProfile.instagram.current.value.split("instagram.com/").length <
            2
          ? "-"
          : "https://instagram.com/" +
              fieldProfile.instagram.current.value.split("instagram.com/")[1],
        fieldProfile.twitter.current.value === "" ||
          fieldProfile.twitter.current.value.split("x.com/").length < 2
          ? "-"
          : "https://x.com/" +
              fieldProfile.twitter.current.value.split("x.com/")[1],
        fieldProfile.whatsapp.current.value === ""
          ? "-"
          : fieldProfile.whatsapp.current.value,
        selectedInterest.map((intr) => {
          return intr.value;
        })
      );
    }
  };

  useEffect(() => {
    if (pausedProcess && isLogin) {
      handleSumbitCore(
        tempField.fName,
        tempField.lName,
        tempField.name,
        tempField.email,
        tempField.photo,
        tempField.phone,
        tempField.linkedin,
        tempField.instagram,
        tempField.twitter,
        tempField.whatsapp,
        selectedInterest.map((intr) => {
          return intr.value;
        })
      );
      setPausedProcess(null);
    }
  }, [pausedProcess, isLogin]);

  useEffect(() => {
    if (!categories) {
      loadCategories().then((res) => {
        if (res.status === 200) {
          setCategories(res.data.categories);
        } else {
          setErrorState(true);
        }
      });
    }
  }, [categories]);

  useEffect(() => {
    if (!profileData) {
      loadProfile({ token: appData.accessToken }).then((res) => {
        if (res.status === 200) {
          setProfileData(res.data.user);
        } else if (res.status === 401) {
          fnSetLogin(false);
        } else {
          setErrorState(true);
        }
      });
    }
  }, [profileData, isLogin]);

  useEffect(() => {
    if (profileData && categories) {
      setLoading(false);
    }
  }, [profileData, categories]);

  useEffect(() => {
    document.title = "Settings - Agendakota";
    if (profileData && isLogin) {
      let interest = profileData.interest
        ? profileData.interest.split("~^|-|^~")
        : [""];
      let defInterest = [];
      interest.forEach((intr) => {
        if (intr !== "") {
          defInterest.push({ label: intr, value: intr });
        }
      });
      setInterest(defInterest);
      // setLoop(loop + 1);
      // console.log("SET DATA PROFILE");
    }
  }, [profileData, isLogin]);

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
    document.title = "Profile - Agendakota";
  });

  return (
    <>
      <PopUp
        width="45%"
        isActive={popUpActive}
        setActiveFn={setPopUpActive}
        content={popUpContent}
        title="Update Profile"
      />
      <div className="content user">
        <div className={styles.DecorationBox}>
          <div className={styles.Decoration}></div>
        </div>
        <div className={`${styles.Inline}`} style={{ marginTop: 20 }}>
          <form
            onSubmit={handleSubmit}
            className={`${styles2.FormLayout}`}
            style={{
              marginTop: "-10px",
            }}
          >
            <div className={styles2.FormHeader}>
              <div className={styles2.TitleArea}>
                <h1 className={styles.Title}>Profil Akun</h1>
              </div>
              <div className={styles2.HeaderControl}>
                <Button
                  title={"Simpan"}
                  typeBtn="submit"
                  classes={[styles2.FormButton]}
                />
              </div>
            </div>
            {errorState ? (
              <ErrorPage />
            ) : isLoading ? (
              <div
                style={{
                  margin: "auto",
                  marginTop: "150px",
                  display: isLoading ? "unset" : "none",
                }}
              >
                <Loading />
              </div>
            ) : (
              <div
                className={`${styles3.ProfileLayout} ${styles4.FormLayout}`}
                style={{ display: isLoading ? "none" : "unset" }}
              >
                <div className={styles2.AlertBox}>
                  <Alert
                    type="danger"
                    isShow={alertDanger.state}
                    setShowFn={() => {
                      setAlertDanger({
                        state: false,
                        content: "",
                      });
                    }}
                    message={alertDanger.content}
                  />
                </div>
                <div className={styles4.FormFieldBox}>
                  <div className={styles4.FormSplitBox}>
                    <div>
                      <div className={styles4.FormFieldBox}>
                        <InputImage3
                          refData={fieldProfile.photo}
                          defaultFile={
                            process.env.REACT_APP_BACKEND_URL +
                            profileData.photo
                          }
                          style={{
                            width: "250px",
                            aspectRatio: 1 / 1,
                            borderRadius: "18px",
                          }}
                          fnSetAlert={(alert) => {
                            setAlertDanger({
                              state: alert.state,
                              content: alert.content,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "100%" }}>
                      <div className={styles4.FormFieldBox}>
                        <div className={styles4.GroupInput}>
                          <InputLabeled
                            id={"username"}
                            type={"text"}
                            label={"Username"}
                            placeholder={"Tuliskan username mu"}
                            refData={fieldProfile.name}
                            value={profileData.name}
                            required
                          />
                          <div className={styles4.Divider}>
                            <hr />
                          </div>
                          <InputLabeled
                            id={"fname"}
                            label={"First Name"}
                            refData={fieldProfile.fName}
                            value={profileData.f_name}
                            type={"text"}
                            placeholder={"Tuliskan nama depanmu"}
                            required
                          />
                          <div className={styles4.Divider}>
                            <hr />
                          </div>
                          <InputLabeled
                            id={"lname"}
                            label={"Last Name"}
                            refData={fieldProfile.lName}
                            value={profileData.l_name}
                            type={"text"}
                            placeholder={"Tuliskan belakangmu"}
                            required
                          />
                        </div>
                        <InputLabeled
                          id={"email"}
                          label={"Email"}
                          iconSvg={<BiEnvelope />}
                          refData={fieldProfile.email}
                          value={profileData.email}
                          type={"text"}
                          placeholder={"Tuliskan alamat emailmu"}
                          style={{ backgroundColor: "white" }}
                          required
                        />
                        <InputLabeled
                          id={"phone"}
                          label={"Nomor Ponsel"}
                          iconSvg={<BiPhone />}
                          refData={fieldProfile.phone}
                          value={profileData.phone}
                          type={"numeric"}
                          placeholder={"Tuliskan nomor ponselmu yang aktif"}
                          style={{ backgroundColor: "white" }}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={styles4.FormFieldBox}
                  style={{ marginBottom: "32px" }}
                >
                  <div className={styles4.SubtitleForm}>TENTANG</div>
                  <FieldBox
                    id={"interest"}
                    iconSvg={<BiInfoCircle />}
                    style={{ backgroundColor: "#fff" }}
                    label={"Interest"}
                  >
                    <Select
                      id="interest"
                      placeholder={"Pilih yang menarik"}
                      isMulti
                      required
                      options={
                        categories
                          ? categories.map((cat) => ({
                              label: cat.name,
                              value: cat.name,
                            }))
                          : []
                      }
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
                          marginLeft: "auto",
                          height: "21.5px",
                          width: "100%",
                        }),
                        valueContainer: (basic, state) => ({
                          ...basic,
                          width: "100%",
                          overflow: "hidden",
                          flexWrap: "nowrap",
                          boxSizing: "border-box",
                          flexDirection: "row",
                          fontSize: "14px",
                        }),

                        container: (basicStyle, state) => ({
                          ...basicStyle,
                          width: "100%",
                          margin: "unset",
                          borderRadius: "8px",
                          fontSize: "13px",
                        }),
                      }}
                      value={selectedInterest}
                      onChange={(e) => {
                        setInterest(e);
                      }}
                    />
                  </FieldBox>
                </div>
                <div
                  className={styles4.FormFieldBox}
                  style={{ marginBottom: "32px" }}
                >
                  <div className={styles4.SubtitleForm}>
                    SOCIAL MEDIA (Optional)
                  </div>
                  <div className={styles4.GroupInput}>
                    <InputLabeled
                      id={"whatsapp"}
                      label={"WhatsApp"}
                      iconSvg={<BiLogoWhatsapp />}
                      refData={fieldProfile.whatsapp}
                      value={
                        profileData.whatsapp === "" ||
                        profileData.whatsapp === "-"
                          ? null
                          : profileData.whatsapp
                      }
                      type={"numeric"}
                      placeholder={"08xxxxxxxxxx"}
                    />
                    <div className={styles4.Divider}>
                      <hr />
                    </div>
                    <InputLabeled
                      id={"instagram"}
                      label={"Instagram"}
                      iconSvg={<BiLogoInstagram />}
                      refData={fieldProfile.instagram}
                      value={
                        profileData.instagram === "" ||
                        profileData.instagram === "-"
                          ? null
                          : profileData.instagram
                      }
                      type={"text"}
                      placeholder={"https://instagram.com/someone"}
                    />
                    <div className={styles4.Divider}>
                      <hr />
                    </div>
                    <InputLabeled
                      id={"linkedin"}
                      label={"Linkedin"}
                      iconSvg={<BiLogoLinkedin />}
                      refData={fieldProfile.linkedin}
                      value={
                        profileData.linkedin === "" ||
                        profileData.linkedin === "-"
                          ? null
                          : profileData.linkedin
                      }
                      type={"text"}
                      placeholder={"https://linkedin.com/in/someone"}
                    />
                    <div className={styles4.Divider}>
                      <hr />
                    </div>
                    <InputLabeled
                      id={"twitter"}
                      label={"Twitter"}
                      iconSvg={<BiLogoTwitter />}
                      refData={fieldProfile.twitter}
                      value={
                        profileData.twitter === "" ||
                        profileData.twitter === "-"
                          ? null
                          : profileData.twitter
                      }
                      type={"text"}
                      placeholder={"https://x.com/someone"}
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
