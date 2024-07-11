import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/PopUpLogin.module.css";
import stylesLogin from "../Pages/styles/Login.module.css";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import jwtEncode from "jwt-encode";
import {
  BiEnvelope,
  BiInfoCircle,
  BiKey,
  BiLock,
  BiUser,
} from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { getAppData } from "../actions/appdata";

const loginDefLoad = async ({ email, password }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/login",
      {
        email: email,
        password: password,
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

const registerDefLoad = async ({ email, password, name }) => {
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

const PopUpLogin = ({ setLogin, addtionalStyle = {} }) => {
  // state control
  const [alertDanger, setAlertDanger] = useState({
    state: false,
    content: "",
    variant: "danger",
  });
  const [loading, setLoading] = useState(false);
  const [formMode, setFormMode] = useState("login");
  const [showHint, setShowHint] = useState(false);
  const dispatch = useDispatch();

  // field data basic
  const [inputFocus, setInputFocus] = useState(null);
  const [captcha, setCaptchaState] = useState(null);
  const fieldLogin = {
    email: useRef(null),
    password: useRef(null),
  };
  // field data additional for register
  const fieldAddtional = {
    username: useRef(null),
    confirm: useRef(null),
  };

  const handleResponse = (res) => {
    if (res.status === 200 || res.status === 201) {
      setAlertDanger({
        state: true,
        content: "Login / Register berhasil",
        variant: "success",
      });
      // Redirect to home
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(
        getAppData({
          accessToken: res.data.access_token,
          activeOrg: localStorage.getItem("active-org"),
          activeEvent: localStorage.getItem("active-event"),
        })
      );
      setLogin(true);
    } else {
      setAlertDanger({
        state: true,
        content:
          "Akun tidak dapat ditemukan. Periksa email, password, ataupun akunmu belum aktif. Coba cek emailmu untuk aktivasi !!!",
        variant: "danger",
      });
      setLoading(false);
      setTimeout(() => {
        setAlertDanger({
          state: false,
          content:
            "Akun tidak dapat ditemukan. Periksa email, password, ataupun akunmu belum aktif. Coba cek emailmu untuk aktivasi !!!",
          variant: "danger",
        });
      }, 3000);
    }
  };

  const handleLoginDef = (e) => {
    e.preventDefault();
    if (
      !fieldLogin.email.current ||
      fieldLogin.email.current.value === "" ||
      !fieldLogin.password.current ||
      fieldLogin.password.current.value === "" ||
      !captcha
    ) {
      setAlertDanger({
        state: true,
        content: "Semua field wajib diisi !!!",
        variant: "danger",
      });
      setTimeout(() => {
        setAlertDanger({
          state: false,
          content: "Semua field wajib diisi !!!",
          variant: "danger",
        });
      }, 3000);
    } else {
      setLoading(true);
      loginDefLoad({
        email: fieldLogin.email.current.value,
        password: fieldLogin.password.current.value,
      }).then(handleResponse);
    }
  };

  const handleRegisterDef = (e) => {
    e.preventDefault();
    if (
      !fieldLogin.email.current ||
      fieldLogin.email.current.value === "" ||
      !fieldLogin.password.current ||
      fieldLogin.password.current.value === "" ||
      !fieldAddtional.username.current ||
      fieldAddtional.username.current.value === "" ||
      !fieldAddtional.confirm.current ||
      fieldAddtional.confirm.current.value === "" ||
      !captcha
    ) {
      setAlertDanger({
        state: true,
        content: "Semua field wajib diisi !!!",
        variant: "danger",
      });
      setTimeout(() => {
        setAlertDanger({
          state: false,
          content: "Semua field wajib diisi !!!",
          variant: "danger",
        });
      }, 3000);
    } else if (
      fieldAddtional.confirm.current.value !== fieldLogin.password.current.value
    ) {
      setAlertDanger({
        state: true,
        content: "Konfirmasi password tidak sesuai !!!",
        variant: "danger",
      });
      setTimeout(() => {
        setAlertDanger({
          state: false,
          content: "Semua field wajib diisi !!!",
          variant: "danger",
        });
      }, 3000);
    } else {
      setLoading(true);
      registerDefLoad({
        email: fieldLogin.email.current.value,
        password: fieldLogin.password.current.value,
        name: fieldAddtional.username.current.value,
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
            content: "Login berhasil",
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
          setLogin(true);
        } else {
          setAlertDanger({
            state: true,
            content: "Akun tidak dapat ditemukan. Silahkan coba lagi !!!",
            variant: "danger",
          });
          setLoading(false);
          setTimeout(() => {
            setAlertDanger({
              state: false,
              content: "Akun tidak dapat ditemukan. Silahkan coba lagi !!!",
              variant: "danger",
            });
          }, 3000);
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
    window.addEventListener("click", (e) => {
      if (e.target === fieldLogin.email.current) {
        setInputFocus("email");
      } else if (e.target === fieldLogin.password.current) {
        setInputFocus("password");
      } else if (e.target === fieldAddtional.username.current) {
        setInputFocus("username");
      } else if (e.target === fieldAddtional.confirm.current) {
        setInputFocus("confirm");
      } else {
        setInputFocus(null);
        // console.log(e.target);
      }
    });
  });

  return (
    <div className={styles.Wrapper} style={{ ...addtionalStyle }}>
      <div className={styles.ModalDialog}>
        <div className={styles.PopUpBox}>
          <div className={stylesLogin.Content} style={{ marginTop: 0 }}>
            <div>
              <form
                onSubmit={(e) => {
                  formMode === "login"
                    ? handleLoginDef(e)
                    : handleRegisterDef(e);
                }}
              >
                <div className={styles.AlertBox}>
                  <Alert
                    type={"warning"}
                    isShow={true}
                    setShowFn={() => {}}
                    message={
                      "Belum login atau sesi login telah habis. Login untuk melanjutkan"
                    }
                    closeBtn={false}
                  />
                </div>
                <div className={styles.Logo}>
                  <img src="/images/logo.png" alt="" />
                </div>
                {/* <div style={{ marginBottom: "20px" }}>
									<h1 className={stylesLogin.Title}>Login</h1>
								</div> */}
                <div className={styles.AlertBox}>
                  <Alert
                    type={alertDanger.variant}
                    isShow={alertDanger.state}
                    setShowFn={() => {}}
                    message={alertDanger.content}
                    closeBtn={false}
                  />
                </div>
                <div className={styles.FormFieldBox}>
                  <div className={stylesLogin.GoogleLoginBtn}>
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
                <div
                  className={`${stylesLogin.SubTitle} ${stylesLogin.TextCenter}`}
                >
                  Atau Masuk dengan Email
                </div>
                <div>
                  {formMode === "login" ? (
                    <>
                      <div className={styles.InfoBox}>
                        <BiInfoCircle />
                        <div className={styles.InfoText}>
                          Jika anda baru saja mendaftar / register, pastikan
                          anda sudah melakukan aktivasi akun melaui email
                          verifkasi yang anda peroleh.
                        </div>
                      </div>
                      <div
                        className={styles.InfoBox}
                        style={
                          showHint
                            ? { marginBottom: "20px", textAlign: "center" }
                            : { display: "none" }
                        }
                      >
                        <div className={styles.InfoText}>
                          Jika anda saat login / register pertama kali
                          menggunakkan fitur "Login With Google". Maka login
                          berikutnnya hanya bisa login menggunakan fitur login
                          yanng sama (Login With Google). Kecuali anda sudah
                          melakukan pengubahan password di halaman setting
                          (pojok kanan icon profil). <br /> <br />
                          Namun jika anda saat login / register pertama kali
                          tidak menggunakkan fitur "Login With Google". Maka
                          login selanjutnya anda tidak akan bisa menggunakan
                          fitur "Login With Google" pada akun anda tersebut.
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div
                    className={`${stylesLogin.BoxInput} ${
                      inputFocus === "email" || inputFocus === "username"
                        ? stylesLogin.ShadowBoxInput2
                        : inputFocus === "password" || inputFocus === "confirm"
                        ? stylesLogin.ShadowBoxInput1
                        : ""
                    }`}
                  >
                    <div className={stylesLogin.FormFieldInput}>
                      <label
                        className={stylesLogin.TitleInput}
                        style={{
                          color:
                            inputFocus === "email"
                              ? "rgb(202, 12, 100)"
                              : "#000",
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
                        className={stylesLogin.FieldInput}
                        refData={fieldLogin.email}
                        type={"text"}
                        placeholder={"Tuliskan alamat email akunmu"}
                      />
                    </div>
                    {formMode === "register" ? (
                      <div className={stylesLogin.FormFieldInput}>
                        <label
                          className={stylesLogin.TitleInput}
                          style={{
                            color:
                              inputFocus === "username"
                                ? "rgb(202, 12, 100)"
                                : "#000",
                          }}
                          htmlFor="username-input"
                          onFocus={() => {
                            setInputFocus("username");
                          }}
                        >
                          <BiUser />
                          <div>Username</div>
                        </label>
                        <InputForm
                          id={"username-input"}
                          className={stylesLogin.FieldInput}
                          refData={fieldAddtional.username}
                          type={"text"}
                          placeholder={"Tuliskan username akunmu"}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className={stylesLogin.FormFieldInput}>
                      <label
                        className={stylesLogin.TitleInput}
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
                        className={stylesLogin.FieldInput}
                        refData={fieldLogin.password}
                        hidePassBtn={false}
                        type={"password"}
                        placeholder={"Tuliskan password akun agendakota"}
                      />
                    </div>
                    {formMode === "register" ? (
                      <div className={stylesLogin.FormFieldInput}>
                        <label
                          className={stylesLogin.TitleInput}
                          style={{
                            color:
                              inputFocus === "confirm"
                                ? "rgb(202, 12, 100)"
                                : "#000",
                          }}
                          htmlFor="confirm-pass-input"
                          onFocus={() => {
                            setInputFocus("confirm");
                          }}
                        >
                          <BiLock />
                          <div>Confirm</div>
                        </label>
                        <InputForm
                          id={"confirm-pass-input"}
                          className={stylesLogin.FieldInput}
                          refData={fieldAddtional.confirm}
                          hidePassBtn={false}
                          type={"password"}
                          placeholder={"Konfirmasi password akun agendakota"}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className={stylesLogin.CapcthaField}>
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                      onChange={(value) => {
                        setCaptchaState(value);
                      }}
                      style={{ margin: "auto" }}
                    />
                  </div>

                  <div
                    className={styles.RegisterButton}
                    onClick={() => {
                      formMode === "login"
                        ? setFormMode("register")
                        : setFormMode("login");
                    }}
                  >
                    {formMode === "login"
                      ? "Belum Punya Akun ? Daftar"
                      : "Sudah Punya Akun ? Login"}
                  </div>
                  <div
                    className={styles.RegisterButton}
                    style={{ marginTop: "0px" }}
                    onClick={() => {
                      setShowHint(!showHint);
                    }}
                  >
                    Login gagal terus ? Tampilkan Petunjuk
                  </div>

                  <div className={styles.FormFieldBox}>
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
                        title={formMode === "login" ? "Login" : "Register"}
                        typeBtn="submit"
                        classes={[styles.FormButton]}
                        style={{ width: "100%", margin: "auto" }}
                      />
                    )}
                    <div
                      style={{
                        flexDirection: "row",
                        margin: "auto",
                        gap: "10px",
                      }}
                    ></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpLogin;
