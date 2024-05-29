import React, { useEffect, useRef, useState } from "react";
import styles from "../User/styles/PersonalEvent.module.css";
import styles2 from "./styles/Legality.module.css";
import styles3 from "../User/styles/Settings.module.css";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import config from "../../config";
import Select from "react-select";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import InputForm from "../../components/InputForm";
import InputImage from "../../components/InputImage";
import Loading from "../../components/Loading";
import PopUp from "../../partials/PopUp";
import {
  BiCheckCircle,
  BiEnvelope,
  BiError,
  BiFilter,
  BiGlobe,
  BiGroup,
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useSelector } from "react-redux";
import ErrorPage from "../../partials/ErrorPage";

const handleError = (error) => {
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

const loadUpdate = async ({
  org_id,
  type,
  name,
  photo,
  banner,
  interest,
  email,
  linkedin,
  instagram,
  twitter,
  whatsapp,
  website,
  desc,
  phone,
  token,
}) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/org/update-org",
      {
        org_id: org_id,
        type: type,
        name: name,
        photo: photo.files.length === 0 ? null : photo.files[0],
        banner: banner.files.length === 0 ? null : banner.files[0],
        interest: interest,
        email: email,
        linkedin: linkedin,
        instagram: instagram,
        twitter: twitter,
        whatsapp: whatsapp,
        website: website,
        desc: desc,
        phone: phone,
        _method: "PUT",
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
    // console.log(error);
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
    // console.log(error);
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

const OrganizerSettings = ({ organization, loginState, fnSetLogin }) => {
  const [orgSelected, setOrgSelected] = useState("");
  const [alertDanger, setAlertDanger] = useState({
    state: false,
    content: "Semua field wajib diisi !",
  });
  const [errorState, setErrorState] = useState(false);
  const [popUpContent, setPopUpContent] = useState(<></>);
  const [isLoading, setLoading] = useState(false);
  const [popUpActive, setPopUpActive] = useState(false);
  const [loop, setLoop] = useState(0);
  const [desc, setDescValue] = useState(null);
  const [pausedProcess, setPausedProcess] = useState(null);
  const [categories, setCategories] = useState(null);
  const [orgTypes, setOrgTypes] = useState(null);
  const appData = useSelector((state) => state.appDataReducer);

  const btnSave = useRef();

  const fieldProfile = {
    photo: useRef(null),
    name: useRef(null),
    email: useRef(null),
    interest: useRef(null),
    banner: useRef(null),
    phone: useRef(null),
    whatsapp: useRef(null),
    instagram: useRef(null),
    linkedin: useRef(null),
    twitter: useRef(null),
    website: useRef(null),
    type: useRef(null),
  };

  const dummyLoad = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(false);
      }, 3000);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !fieldProfile.name.current ||
      fieldProfile.name.current.value === "" ||
      !fieldProfile.email.current ||
      fieldProfile.email.current.value === "" ||
      fieldProfile.email.current.value.split("@").length < 2 ||
      !fieldProfile.interest.current ||
      fieldProfile.interest.current.getValue().length === 0 ||
      !fieldProfile.phone.current ||
      fieldProfile.phone.current.value === "" ||
      (fieldProfile.phone.current.value.split("").length > 0 &&
        (fieldProfile.phone.current.value.split("").length < 10 ||
          fieldProfile.phone.current.value.split("").length > 13)) ||
      !fieldProfile.linkedin.current ||
      // fieldProfile.linkedin.current.value === "" ||
      !fieldProfile.twitter.current ||
      // fieldProfile.twitter.current.value === "" ||
      !fieldProfile.website.current ||
      // fieldProfile.website.current.value === "" ||
      !fieldProfile.instagram.current ||
      !fieldProfile.whatsapp.current ||
      (fieldProfile.whatsapp.current.value.split("").length > 0 &&
        (fieldProfile.whatsapp.current.value.split("").length < 10 ||
          fieldProfile.whatsapp.current.value.split("").length > 13)) ||
      !desc
    ) {
      if (
        (fieldProfile.whatsapp.current.value.split("").length > 0 &&
          (fieldProfile.whatsapp.current.value.split("").length < 10 ||
            fieldProfile.whatsapp.current.value.split("").length > 13)) ||
        (fieldProfile.phone.current.value.split("").length > 0 &&
          (fieldProfile.phone.current.value.split("").length < 10 ||
            fieldProfile.phone.current.value.split("").length > 13))
      ) {
        setAlertDanger({
          state: true,
          content:
            "Field nomor telepon / whatsapp minimal 10 karakter dan maksimal 13 karakter !!!",
        });
      } else if (fieldProfile.email.current.value.split("@").length < 2) {
        setAlertDanger({
          state: true,
          content: "Harap isi field email dengan benar 'example@mail.com'",
        });
      } else {
        setAlertDanger({
          state: true,
          content: "Semua field selain foto profil dan banner wajib diisi !!!",
        });
      }

      setTimeout(() => {
        setAlertDanger({
          state: false,
          content: "Semua field selain foto profil dan banner wajib diisi !!!",
        });
      }, 3000);
    } else {
      setLoading(true);
      loadUpdate({
        org_id: orgSelected,
        type: fieldProfile.type.current
          .getValue()
          .map((val) => val.value)
          .join("^~!@!~^"),
        name: fieldProfile.name.current.value,
        photo: fieldProfile.photo.current,
        banner: fieldProfile.banner.current,
        interest: fieldProfile.interest.current
          .getValue()
          .map((val) => val.value)
          .join("^~!@!~^"),
        email: fieldProfile.email.current.value,
        linkedin:
          fieldProfile.linkedin.current.value === "" ||
          fieldProfile.linkedin.current.value.split("linkedin.com/in/").length <
            2
            ? "-"
            : "https://linkedin.com/in/" +
              fieldProfile.linkedin.current.value.split("linkedin.com/in/")[1],
        instagram:
          fieldProfile.instagram.current.value === "" ||
          fieldProfile.instagram.current.value.split("instagram.com/").length <
            2
            ? "-"
            : "https://instagram.com/" +
              fieldProfile.instagram.current.value.split("instagram.com/")[1],
        twitter:
          fieldProfile.twitter.current.value === "" ||
          fieldProfile.twitter.current.value.split("x.com/").length < 2
            ? "-"
            : "https://x.com/" +
              fieldProfile.twitter.current.value.split("x.com/")[1],
        whatsapp:
          fieldProfile.whatsapp.current.value === ""
            ? "-"
            : fieldProfile.whatsapp.current.value,
        website:
          fieldProfile.website.current.value === "" ||
          fieldProfile.website.current.value.split("https://").length < 2
            ? fieldProfile.website.current.value === ""
              ? "-"
              : "https://" + fieldProfile.website.current.value
            : fieldProfile.website.current.value,
        desc: desc,
        phone: fieldProfile.phone.current.value,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status !== 202 && res.status !== 401) {
          setPopUpContent(
            <div className={styles3.PopupNotify}>
              <div>Data profile gagal diperbarui. Silahkan coba lagi !</div>
              <div className={styles3.IconPopUp}>
                <BiError color="#CA0C64" fontWeight={"600"} />
              </div>
            </div>
          );
          setLoading(false);
        } else {
          // reload data profile
          if (res.status === 401) {
            fnSetLogin(false);
            setPausedProcess(true);
          } else {
            setPopUpContent(
              <div className={styles3.PopupNotify}>
                <div>Data profile berhasil diperbarui</div>
                <div className={styles3.IconPopUp}>
                  <BiCheckCircle color="green" fontWeight={"600"} />
                </div>
              </div>
            );
            setLoading(false);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }
        setPopUpActive(true);
        setTimeout(() => {
          setPopUpActive(false);
          setPopUpContent(<></>);
        }, 3000);
      });
    }
  };

  useEffect(() => {
    document.title = "Settings - Agendakota";
    if (organization.length === 0 || categories === null || orgTypes === null) {
      setLoading(true);
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
    } else if (
      fieldProfile.name.current !== null &&
      fieldProfile.email.current !== null &&
      fieldProfile.whatsapp.current !== null &&
      fieldProfile.linkedin.current !== null &&
      fieldProfile.twitter.current !== null &&
      fieldProfile.website.current !== null &&
      fieldProfile.phone.current !== null &&
      fieldProfile.instagram.current !== null
    ) {
      fieldProfile.name.current.value = organization[0].name;
      fieldProfile.email.current.value = organization[0].email;
      fieldProfile.whatsapp.current.value =
        organization[0].whatsapp === "-" || organization[0].whatsapp === ""
          ? null
          : organization[0].whatsapp;
      fieldProfile.linkedin.current.value =
        organization[0].linkedin === "-" || organization[0].linkedin === ""
          ? null
          : organization[0].linkedin;
      fieldProfile.instagram.current.value =
        organization[0].instagram === "-" || organization[0].instagram === ""
          ? null
          : organization[0].instagram;
      fieldProfile.twitter.current.value =
        organization[0].twitter === "-" || organization[0].twitter === ""
          ? null
          : organization[0].twitter;
      fieldProfile.website.current.value =
        organization[0].website === "-" || organization[0].website === ""
          ? null
          : organization[0].website;
      fieldProfile.phone.current.value = organization[0].phone;
      setDescValue(organization[0].desc);
      setOrgSelected(organization[0].id);
      setLoading(false);
    }
  }, [organization, categories, orgTypes]);

  useEffect(() => {
    if (pausedProcess && loginState) {
      btnSave.current.click();
      setPausedProcess(false);
    }
  }, [loginState, pausedProcess]);

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
  return (
    <>
      <PopUp
        width="45%"
        isActive={popUpActive}
        setActiveFn={setPopUpActive}
        content={popUpContent}
        title="Update Profile"
      />
      <div className="content organizer">
        {errorState ? (
          <ErrorPage />
        ) : (
          <>
            <div className={styles.DecorationBox}>
              <div className={styles.Decoration}></div>
            </div>
            <form
              onSubmit={handleSubmit}
              className={`${styles2.FormLayout}`}
              style={{ marginTop: "20px" }}
            >
              <div className={styles2.FormHeader}>
                <div className={styles2.TitleArea}>
                  <div className={styles.Title}>Organizers Settings</div>
                </div>
                <div className={styles2.HeaderControl}>
                  <Button
                    title={"Cancel"}
                    typeBtn="button"
                    classes={[styles2.FormButton]}
                    bgColor={"#fff"}
                    borderColor={"#000"}
                    textColor={"#000"}
                    fnOnClick={() => {
                      window.location.reload();
                    }}
                  />
                  <Button
                    title={"Simpan"}
                    typeBtn="submit"
                    classes={[styles2.FormButton]}
                    refData={btnSave}
                  />
                </div>
              </div>
              <div
                style={{
                  margin: "auto",
                  marginTop: "150px",
                  display: isLoading ? "unset" : "none",
                }}
              >
                <Loading />
              </div>
              <div
                className={styles3.ProfileLayout}
                style={{ display: isLoading ? "none" : "unset" }}
              >
                <div className={styles2.AlertBox}>
                  {alertDanger.state ? (
                    <Alert variant="danger">{alertDanger.content}</Alert>
                  ) : (
                    <></>
                  )}
                  <Alert
                    type="danger"
                    isShow={alertDanger.state}
                    setShowFn={() => {}}
                    message={alertDanger.content}
                  />
                </div>

                {organization.length > 0 ? (
                  <>
                    <InputImage2
                      refData={fieldProfile.banner}
                      defaultFile={
                        process.env.REACT_APP_BACKEND_URL +
                        organization[0].banner
                      }
                      style={{ height: "unset", aspectRatio: 3.5 }}
                      coverStyle={{ marginLeft: "-20px" }}
                      fnSetAlert={(alert) => {
                        setAlertDanger({
                          state: alert.state,
                          content: alert.content,
                        });
                      }}
                    />
                    <div className={styles3.Content}>
                      <div className={styles2.FormSplitBox}>
                        <div className={styles3.ProfileIcon}>
                          <InputImage3
                            refData={fieldProfile.photo}
                            defaultFile={
                              process.env.REACT_APP_BACKEND_URL +
                              organization[0].photo
                            }
                            style={{
                              width: "180px",
                              aspectRatio: 1,
                              border: "none",
                              boxShadow: "none",
                            }}
                            fnSetAlert={(alert) => {
                              setAlertDanger({
                                state: alert.state,
                                content: alert.content,
                              });
                            }}
                          />
                        </div>
                        <div className={styles3.GroupBox}>
                          <InputLabeled
                            id={"org-name"}
                            placeholder={"Tulliskan disni"}
                            label={"Nama Organisasi"}
                            iconSvg={<BiGroup />}
                            refData={fieldProfile.name}
                            type={"text"}
                          />
                          <InputLabeled
                            id={"input-email"}
                            placeholder={"Tulis email disini"}
                            label={"email"}
                            iconSvg={<BiEnvelope />}
                            refData={fieldProfile.email}
                            type={"email"}
                          />
                          <InputLabeled
                            id={"input-phone"}
                            placeholder={"Tuliskan nomor telepon"}
                            label={"Nomor Telfon"}
                            iconSvg={<BiPhone />}
                            refData={fieldProfile.phone}
                            type={"numeric"}
                          />
                        </div>
                      </div>
                      <div className={styles3.GroupBox}>
                        <div className={styles3.Subtitle}>TENTANG</div>
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
                            ref={fieldProfile.interest}
                            className="basic-multi-select"
                            placeholder="Klik untuk memilih"
                            styles={{
                              option: (basicStyle, state) => ({
                                ...basicStyle,
                                backgroundColor: state.isFocused
                                  ? "#fecadf"
                                  : "white",
                                fontSize: "13px",
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
                                // marginLeft: "auto",
                                height: "21.5px",
                              }),
                              container: (basicStyle, state) => ({
                                ...basicStyle,
                                width: "100%",
                                margin: "unset",
                                borderRadius: "8px",
                              }),
                            }}
                            defaultValue={organization[0].interest
                              .split("^~!@!~^")
                              .map((text) => ({
                                label: text,
                                value: text,
                              }))}
                          />
                        </FieldBox>
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
                            ref={fieldProfile.type}
                            styles={{
                              option: (basicStyle, state) => ({
                                ...basicStyle,
                                backgroundColor: state.isFocused
                                  ? "#fecadf"
                                  : "white",
                                zIndex: 5,
                                fontSize: "13px",
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
                              }),
                              container: (basicStyle, state) => ({
                                ...basicStyle,
                                width: "100%",
                                margin: "unset",
                                borderRadius: "8px",
                                fontSize: "13px",
                              }),
                            }}
                            defaultValue={organization[0].type
                              .split("^~!@!~^")
                              .map((text) => ({
                                label: text,
                                value: text,
                              }))}
                          />
                        </FieldBox>
                      </div>
                      <div className={styles3.GroupBox}>
                        <div className={styles3.Subtitle2}>
                          Deskripsi Organisasi
                        </div>
                        <CKEditor
                          editor={ClassicEditor}
                          data={!desc ? "" : desc}
                          onChange={(event, editor) => {
                            setDescValue(editor.getData());
                          }}
                          config={{
                            toolbar: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "link",
                              "bulletedList",
                              "numberedList",
                              "blockQuote",
                            ],
                            heading: {
                              options: [
                                {
                                  model: "paragraph",
                                  title: "Paragraph",
                                  class: "ck-heading_paragraph",
                                },
                                {
                                  model: "heading1",
                                  view: "h1",
                                  title: "Heading 1",
                                  class: "ck-heading_heading1",
                                },
                                {
                                  model: "heading2",
                                  view: "h2",
                                  title: "Heading 2",
                                  class: "ck-heading_heading2",
                                },
                              ],
                            },
                            fontSize: {
                              options: ["tiny", "default", "big"],
                            },
                          }}
                        />
                      </div>
                      <div className={styles3.GroupBox}>
                        <div className={styles3.Subtitle}>
                          Social Media (Optional)
                        </div>
                        <InputLabeled
                          id={"input-wa"}
                          placeholder={"Tuliskan nomor whatsapp"}
                          label={"WhatsApp"}
                          iconSvg={<BiLogoWhatsapp />}
                          refData={fieldProfile.whatsapp}
                          type={"numeric"}
                        />
                        <InputLabeled
                          id={"input-twitter"}
                          placeholder={"https://x.com/XDevelopers"}
                          label={"X/Twitter"}
                          iconSvg={<BiLogoTwitter />}
                          refData={fieldProfile.twitter}
                          type={"text"}
                        />
                        <InputLabeled
                          id={"input-instagram"}
                          placeholder={"https://instagram.com/someone"}
                          label={"Instagram"}
                          iconSvg={<BiLogoInstagram />}
                          refData={fieldProfile.instagram}
                          type={"text"}
                        />
                        <InputLabeled
                          id={"input-web"}
                          placeholder={"https://example.com"}
                          label={"Website"}
                          iconSvg={<BiGlobe />}
                          refData={fieldProfile.website}
                          type={"text"}
                        />
                        <InputLabeled
                          id={"input-lin"}
                          placeholder={"https://linkedin.com/in/someone/"}
                          label={"Linkedin"}
                          iconSvg={<BiLogoLinkedin />}
                          refData={fieldProfile.linkedin}
                          type={"text"}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default OrganizerSettings;
