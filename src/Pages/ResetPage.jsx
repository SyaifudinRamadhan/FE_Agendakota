import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/ResetPage.module.css";
import styles2 from "./styles/Login.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { BiCheckCircle, BiError, BiInfoCircle } from "react-icons/bi";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import ReCAPTCHA from "react-google-recaptcha";
import PopUp from "../partials/PopUp";
import axios from "axios";

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
    console.log(error);
    return {
      data: error.response,
      status: error.response.status,
    };
  }
};

const requestReset = async ({ email }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/request-reset-pass",
      {
        email,
      },
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

const resetPass = async ({ token, password, password_confirmation, email }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/reset-pass",
      {
        token,
        password,
        password_confirmation,
        email,
      },
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

const ResetPage = ({ isLogin }) => {
  // =============== State control ==================
  const [mode, setMode] = useState("request");
  const [captcha, setCaptchaState] = useState(false);
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(null);
  const [alert, setAlert] = useState({
    state: false,
    type: "",
    content: "",
    fnAction: null,
  });

  const navigate = useNavigate();

  // ============= Form data =======================
  const email = useRef();
  const newPass = useRef();
  const confirmPass = useRef();

  const basicValidator = () => {
    if (
      (mode === "request" &&
        (email.current.value === "" || email.current.value === null)) ||
      (mode !== "request" &&
        (email.current.value === "" ||
          email.current.value === null ||
          newPass.current.value === "" ||
          newPass.current.value === null ||
          newPass.current.value.length < 8 ||
          confirmPass.current.value === "" ||
          confirmPass.current.value === null ||
          confirmPass.current.value.length < 8 ||
          newPass.current.value !== confirmPass.current.value)) ||
      !captcha
    ) {
      if (mode !== "request" && newPass.current.value.length < 8) {
        setAlert({
          state: true,
          type: "danger",
          content: "Password minimal 8 karakter !",
          fnAction: null,
        });
      } else if (
        mode !== "request" &&
        newPass.current.value !== confirmPass.current.value
      ) {
        setAlert({
          state: true,
          type: "danger",
          content: "Konfirmasi password tidak sesuai !",
          fnAction: null,
        });
      } else if (!captcha) {
        setAlert({
          state: true,
          type: "danger",
          content: "Re-Captcha wajib diisi !",
          fnAction: null,
        });
      }
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (basicValidator()) {
      setLoading(true);
      if (mode === "request") {
        requestReset({ email: email.current.value }).then((res) => {
          if (res.status === 202) {
            setAlert({
              state: true,
              type: "success",
              content: "Email reset password berhasil dikirim !",
              fnAction: null,
            });
            let interval = 120000;
            if (interval > 0) {
              let x = setInterval(() => {
                if (interval > 0) {
                  interval -= 1000;
                  let intervalObj = new Date(interval);
                  setWaiting(
                    `${Math.floor(
                      ((intervalObj % 86400000) % 3600000) / 60000
                    )}m ${Math.floor(
                      (((intervalObj % 86400000) % 3600000) % 60000) / 1000
                    )}d`
                  );
                } else {
                  setWaiting(null);
                  clearInterval(x);
                }
              }, [1000]);
            } else {
              setWaiting(null);
            }
          } else if (res.status === 403) {
            setAlert({
              state: true,
              type: "danger",
              content: "Mohon tunggu selama 2 menit dari submit terakhir !",
              fnAction: null,
            });
          } else {
            setAlert({
              state: true,
              type: "danger",
              content:
                res.status === 404
                  ? "Akun anda tidak dapat ditemukan. Pastikan email yang inputkan sudah terdaftar di agendakota !"
                  : "Terjadi masalah jaringan. Silahkan coba lagi !",
              fnAction: null,
            });
          }
          setLoading(false);
        });
      } else {
        resetPass({
          token: token,
          password: newPass.current.value,
          password_confirmation: confirmPass.current.value,
          email: email.current.value,
        }).then((res) => {
          if (res.status === 202) {
            setAlert({
              state: true,
              type: "success",
              content: "Reset password telah berhasil !",
              fnAction: () => {
                navigate("/auth-user");
              },
            });
          } else if (res.status === 403) {
            setAlert({
              state: true,
              type: "danger",
              content:
                "Pastikan email yang diinputkan sudah benar. Atau token sudah kadaluwarsa !",
              fnAction: null,
            });
          } else {
            setAlert({
              state: true,
              type: "danger",
              content: "Terjadi masalah jaringan. Silahkan coba lagi !",
              fnAction: null,
            });
          }
          setLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    if (token) {
      setMode(token);
    }
  });

  return (
    <div className={`${styles2.BgLayout} ${styles.BgLayout}`}>
      <PopUp
        title="Notifikasi"
        isActive={alert.state}
        width="35%"
        content={
          <div className={styles.Notification}>
            {alert.type === "danger" ? (
              <BiError style={{ color: "#ca0c64" }} />
            ) : (
              <BiCheckCircle style={{ color: "green" }} />
            )}
            <p>{alert.content}</p>
            <Button
              title={"Ok"}
              fnOnClick={() => {
                if (alert.fnAction !== null) {
                  alert.fnAction();
                } else {
                  setAlert({
                    state: false,
                    type: "",
                    content: "",
                    fnAction: null,
                  });
                }
              }}
            />
          </div>
        }
        setActiveFn={() => {
          setAlert({ state: false, type: "", content: "", fnAction: null });
        }}
      />
      <form className={styles.FormReset} onSubmit={handleSubmit}>
        {mode === "request" ? (
          <>
            <h5>Password Reset Request</h5>
            <div className={styles.InfoBox}>
              <BiInfoCircle />
              <ol>
                <p>
                  Untuk mereset password, silahkan menginputkan email akun yang
                  akan direset. Setelahnya, anda akan segera menerima email
                  verifikasi.
                </p>
              </ol>
            </div>
            <div className={styles.FieldBox}>
              <label htmlFor="email-reset">Email</label>
              <InputForm
                id={"email-reset"}
                type={"email"}
                placeholder={"Email akun agendakota"}
                required
                refData={email}
              />
            </div>
          </>
        ) : (
          <>
            <h5>Password Reset Form</h5>
            <div className={styles.InfoBox}>
              <BiInfoCircle />
              <ol>
                <p>
                  Silahkan isi semua formulir reset password di bawah ini. Token
                  reset, hanya berlaku satu kali setelah berhasil melakukan
                  reset password.
                </p>
              </ol>
            </div>
            <div className={styles.FieldBox}>
              <label htmlFor="email-reset">Email</label>
              <InputForm
                id={"email-reset"}
                type={"email"}
                placeholder={"Email akun agendakota"}
                required
                refData={email}
              />
            </div>
            <div className={styles.FieldBox}>
              <label htmlFor="new-pass">Password Baru</label>
              <div className={styles.PassField}>
                <InputForm
                  id={"new-pass"}
                  type={"password"}
                  placeholder={"Password baru"}
                  required
                  refData={newPass}
                />
              </div>
            </div>
            <div className={styles.FieldBox}>
              <label htmlFor="confirm">Konfirmasi Password</label>
              <div className={styles.PassField}>
                <InputForm
                  id={"confirm"}
                  type={"password"}
                  placeholder={"Ketik ulang password"}
                  required
                  refData={confirmPass}
                />
              </div>
            </div>
          </>
        )}
        <div
          className={styles2.CapcthaField}
          style={{ marginBottom: "0", marginTop: "10px" }}
        >
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
            onChange={(value) => {
              setCaptchaState(value);
            }}
            style={{ margin: "auto" }}
          />
        </div>
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
        ) : waiting ? (
          <Button
            bgColor={"#ca0c64"}
            textColor={"#fff"}
            borderColor={"#ca0c64"}
            title={waiting}
            style={{ marginTop: "10px" }}
            disabled
          />
        ) : (
          <Button
            bgColor={"#ca0c64"}
            textColor={"#fff"}
            borderColor={"#ca0c64"}
            title={"Submit"}
            typeBtn="submit"
            style={{ marginTop: "10px" }}
          />
        )}
      </form>
    </div>
  );
};

export default ResetPage;
