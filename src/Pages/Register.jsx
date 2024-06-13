import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Login.module.css";
import styles2 from "./Organizer/styles/Legality.module.css";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import jwtEncode from "jwt-encode";
import { BiEnvelope, BiKey, BiLock, BiUser } from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { getAppData } from "../actions/appdata";

const dummyLoad = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(false);
    }, 3000);
  });
};

const regDefLoad = async ({ email, name, password }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/register",
      {
        email: email,
        password: password,
        f_name: name,
        l_name: name,
        name: name,
        phone: "-",
        linkedin: "-",
        instagram: "-",
        twitter: "-",
        whatsapp: "-",
      },
      {
        headers: {
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
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
  }
};

const loginGoogleLoad = async ({ email, credential }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/login-w-google",
      {
        email: email,
        credential: credential,
      },
      {
        headers: {
          "x-api-key": process.env.REACT_APP_BACKEND_KEY,
        },
      }
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
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
  }
};

const Register = ({ isLogin }) => {
  const [alertDanger, setAlertDanger] = useState({
    state: false,
    content: "",
    variant: "danger",
  });
  const [loading, setLoading] = useState(false);
  const [inputFocus, setInputFocus] = useState(null);
  const [captcha, setCaptchaState] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fieldLogin = {
    email: useRef(null),
    name: useRef(null),
    password: useRef(null),
    rePassword: useRef(null),
  };

  const handleResponse = (res) => {
    if (res.status === 201) {
      setAlertDanger({
        state: true,
        content: "Register berhasil. Silahkan cek email untuk aktivasi akunmu",
        variant: "success",
      });
      setLoading(false);
    } else {
      setAlertDanger({
        state: true,
        content: "Kesalahan server. Silahkan coba lagi !!!",
        variant: "danger",
      });
      setLoading(false);
    }
  };

  const handleRegDef = (e) => {
    e.preventDefault();
    if (
      !fieldLogin.email.current.value ||
      fieldLogin.email.current.value === "" ||
      !fieldLogin.name.current.value ||
      fieldLogin.name.current.value === "" ||
      !fieldLogin.password.current.value ||
      fieldLogin.password.current.value === "" ||
      !fieldLogin.rePassword.current.value ||
      fieldLogin.rePassword.current.value === "" ||
      !captcha
    ) {
      setAlertDanger({
        state: true,
        content: "Semua field wajib diisi !!!",
        variant: "danger",
      });
    } else if (
      fieldLogin.password.current.value !== fieldLogin.rePassword.current.value
    ) {
      setAlertDanger({
        state: true,
        content: "Konfirmasi password tidak sesuai !!!",
        variant: "danger",
      });
    } else if (fieldLogin.password.current.value.length < 8) {
      setAlertDanger({
        state: true,
        content: "Password minimal 8 karakter",
        variant: "danger",
      });
    } else {
      setLoading(true);
      regDefLoad({
        email: fieldLogin.email.current.value,
        name: fieldLogin.name.current.value,
        password: fieldLogin.password.current.value,
      }).then(handleResponse);
    }
  };

  const handleLoginGoogle = (credentialData) => {
    setLoading(true);
    let data = jwtDecode(credentialData.credential);
    let encodedCredential = jwtEncode(data, process.env.REACT_APP_JWT_SECRET, {
      alg: process.env.REACT_APP_JWT_ALG,
    });
    // console.log(encodedCredential);
    loginGoogleLoad({ email: data.email, credential: encodedCredential }).then(
      (res) => {
        if (res.status === 200) {
          setAlertDanger({
            state: true,
            content: "Register berhasil",
            variant: "success",
          });
          localStorage.setItem("access_token", res.data.access_token);
          dispatch(
            getAppData({
              accessToken: res.data.access_token,
              activeOrg: localStorage.getItem("active-org"),
              activeEvent: localStorage.getItem("active-event"),
            })
          );
          // Redirect to home
          // window.location.reload();
          navigate("/");
        } else {
          setAlertDanger({
            state: true,
            content: "Akun tidak dapat ditemukan !!!",
            variant: "danger",
          });
          setLoading(false);
        }
      }
    );
  };
  const handleLoginGoogleErr = () => {
    setAlertDanger({
      state: true,
      content: "Terjadi kesalahan. Silahkan coba lagi !",
      variant: "danger",
    });
    setTimeout(() => {
      setAlertDanger({
        state: false,
        content: "Terjadi kesalahan. Silahkan coba lagi !",
        variant: "danger",
      });
    }, 3000);
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
    window.addEventListener("click", (e) => {
      e.target !== fieldLogin.email.current &&
      e.target !== fieldLogin.password.current &&
      e.target !== fieldLogin.name.current &&
      e.target !== fieldLogin.rePassword.current
        ? setInputFocus(null)
        : console.log("");
    });
  });

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
    document.title = "Register - Agendakota";
  });

  return (
    <div className={styles.BgLayout}>
      <div className={styles.BoxContent}>
        <div className={styles.Content}>
          <div style={{ marginTop: 20 }}>
            <form onSubmit={handleRegDef}>
              <div className={styles2.FormHeader}>
                <div className={styles2.TitleArea}>
                  <h1 className={styles.Title}>Masuk atau Daftar</h1>
                  <p className={styles.SubTitle}>
                    Buat akun agendakota untuk dapat menggunakan fitur fitur
                    unggulan kami
                  </p>
                </div>
              </div>
              <div className={styles2.AlertBox}>
                {alertDanger ? (
                  <Alert
                    type={alertDanger.variant}
                    isShow={alertDanger.state}
                    setShowFn={() => {}}
                    message={alertDanger.content}
                    closeBtn={false}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className={styles2.FormFieldBox}>
                <div className={styles.GoogleLoginBtn}>
                  <GoogleOAuthProvider
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  >
                    <GoogleLogin
                      theme="filled_black"
                      logo_alignment="center"
                      shape="pill"
                      onSuccess={handleLoginGoogle}
                      onError={handleLoginGoogleErr}
                    ></GoogleLogin>
                  </GoogleOAuthProvider>
                </div>
              </div>
              <div className={`${styles.SubTitle} ${styles.TextCenter}`}>
                Atau Daftar dengan Email
              </div>
              <div>
                <div
                  className={`${styles.BoxInput} ${
                    inputFocus === "email" || inputFocus === "name"
                      ? styles.ShadowBoxInput2
                      : inputFocus === "password" ||
                        inputFocus === "retype-password"
                      ? styles.ShadowBoxInput1
                      : ""
                  }`}
                >
                  <div className={styles.FormFieldInput}>
                    <label
                      className={`${styles.TitleInput} input-labeled-label`}
                      style={{
                        color:
                          inputFocus === "email" ? "rgb(202, 12, 100)" : "#000",
                      }}
                      htmlFor="email-input"
                      onFocus={() => {
                        setInputFocus("email");
                      }}
                    >
                      <BiEnvelope />
                      <div>Email</div>
                    </label>
                    <InputForm
                      id={"email-input"}
                      className={`${styles.FieldInput} input-labeled-field`}
                      refData={fieldLogin.email}
                      type={"text"}
                      placeholder={"Tuliskan alamat email akunmu"}
                      onFocus={() => {
                        setInputFocus("email");
                      }}
                    />
                  </div>
                  <hr />
                  <div className={styles.FormFieldInput}>
                    <label
                      className={`${styles.TitleInput} input-labeled-label`}
                      style={{
                        color:
                          inputFocus === "name" ? "rgb(202, 12, 100)" : "#000",
                      }}
                      htmlFor="name-input"
                      onFocus={() => {
                        setInputFocus("name");
                      }}
                    >
                      <BiUser />
                      <div>Username</div>
                    </label>
                    <InputForm
                      id={"name-input"}
                      className={`${styles.FieldInput} input-labeled-field`}
                      refData={fieldLogin.name}
                      type={"text"}
                      placeholder={"Tuliskan username akunmu"}
                      onFocus={() => {
                        setInputFocus("name");
                      }}
                    />
                  </div>
                  <hr />
                  <div className={styles.FormFieldInput}>
                    <label
                      className={`${styles.TitleInput} input-labeled-label`}
                      style={{
                        color:
                          inputFocus === "password"
                            ? "rgb(202, 12, 100)"
                            : "#000",
                      }}
                      htmlFor="pass-input"
                      onFocus={() => {
                        setInputFocus("password");
                      }}
                    >
                      <BiKey />
                      <div>Password</div>
                    </label>
                    <InputForm
                      id={"pass-input"}
                      className={`${styles.FieldInput} input-labeled-field`}
                      refData={fieldLogin.password}
                      hidePassBtn={false}
                      type={"password"}
                      min={8}
                      placeholder={"Tuliskan password akun agendakota"}
                      onFocus={() => {
                        setInputFocus("password");
                      }}
                    />
                  </div>
                  <hr />
                  <div className={styles.FormFieldInput}>
                    <label
                      className={`${styles.TitleInput} input-labeled-label`}
                      style={{
                        color:
                          inputFocus === "retype-password"
                            ? "rgb(202, 12, 100)"
                            : "#000",
                      }}
                      htmlFor="retype-pass-input"
                      onFocus={() => {
                        setInputFocus("retype-password");
                      }}
                    >
                      <BiLock />
                      <div>Confirm</div>
                    </label>
                    <InputForm
                      id={"retype-pass-input"}
                      className={`${styles.FieldInput} input-labeled-field`}
                      refData={fieldLogin.rePassword}
                      hidePassBtn={false}
                      type={"password"}
                      placeholder={"Tuliskan ulang password mu"}
                      min={8}
                      onFocus={() => {
                        setInputFocus("retype-password");
                      }}
                    />
                  </div>
                </div>

                <div className={styles.CapcthaField}>
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                    onChange={(value) => {
                      setCaptchaState(value);
                    }}
                    style={{ margin: "auto" }}
                  />
                </div>

                <div className={styles2.FormFieldBox}>
                  {loading ? (
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
                  ) : (
                    <Button
                      title={"Daftar"}
                      typeBtn="submit"
                      classes={[styles2.FormButton]}
                      style={{ width: "100%", margin: "auto" }}
                    />
                  )}
                  <div
                    style={{
                      flexDirection: "row",
                      margin: "auto",
                      gap: "10px",
                    }}
                  >
                    <div>Sudah punya akun ? </div>
                    <Link style={{ textDecoration: "none" }} to="/auth-user">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
