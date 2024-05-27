import React, { useEffect, useRef, useState } from "react";
import SidebarUser from "../../partials/SidebarUser";
import HeaderUser from "../../partials/HeaderUser";
import styles from "./styles/PersonalEvent.module.css";
import styles2 from "../Organizer/styles/Legality.module.css";
import styles3 from "./styles/Settings.module.css";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import InputForm from "../../components/InputForm";
import Loading from "../../components/Loading";
import PopUp from "../../partials/PopUp";
import { BiCheckCircle, BiError } from "react-icons/bi";
import axios from "axios";
import { useSelector } from "react-redux";

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

const updatePassword = async ({ newPass, lastPass, confirmPass, token }) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/update-password",
      {
        _method: "PUT",
        last_password: lastPass,
        new_password: newPass,
        confirm_password: confirmPass,
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

const Setting = ({ isLogin, fnSetLogin = () => {} }) => {
  const [alertDanger, setAlertDanger] = useState({
    state: false,
    content: "Semua field wajib diisi !",
  });
  const [isLoading, setLoading] = useState(false);
  const [popUpActive, setPopUpActive] = useState(false);
  const [popUpContent, setPopUpContent] = useState(<></>);
  const [pausedProcess, setPausedProcess] = useState(null);
  const appData = useSelector((state) => state.appDataReducer);

  const fieldProfile = {
    lastPass: useRef(null),
    newPass: useRef(null),
    confirmPass: useRef(null),
  };

  const dummyLoad = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(false);
      }, 3000);
    });
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (
      fieldProfile.newPass.current.value === "" ||
      fieldProfile.confirmPass.current.value === "" ||
      fieldProfile.newPass.current.value !==
        fieldProfile.confirmPass.current.value ||
      fieldProfile.newPass.current.value.split("").length < 8 ||
      fieldProfile.confirmPass.current.value.split("").length < 8
    ) {
      setAlertDanger({
        state: true,
        content:
          fieldProfile.newPass.current.value !==
          fieldProfile.confirmPass.current.value
            ? "Konfirmasi password tidak sesuai dengan password baru !"
            : "Semua field selain password lama wajib diisi !!!",
      });
      setTimeout(() => {
        setAlertDanger({
          state: false,
          content: "Semua field selain password lama wajib diisi !!!",
        });
      }, 3000);
    } else {
      setLoading(true);
      updatePassword({
        lastPass: fieldProfile.lastPass.current.value,
        newPass: fieldProfile.newPass.current.value,
        confirmPass: fieldProfile.confirmPass.current.value,
        token: appData.accessToken,
      }).then((res) => {
        if (res.status === 202) {
          setPopUpContent(
            <div className={styles3.PopupNotify}>
              <div className={styles3.IconPopUp}>
                <BiCheckCircle color="green" fontWeight={"600"} />
              </div>
              <div>Password berhasil diperbarui</div>
              <Button
                title={"Ok"}
                fnOnClick={() => {
                  setPopUpActive(false);
                }}
              />
            </div>
          );
          setPopUpActive(true);
          fieldProfile.newPass.current.value = "";
          fieldProfile.confirmPass.current.value = "";
          fieldProfile.lastPass.current.value = "";
          setLoading(false);
        } else if (res.status === 401) {
          setPausedProcess("update");
          fnSetLogin(false);
        } else {
          setPopUpContent(
            <div className={styles3.PopupNotify}>
              <div className={styles3.IconPopUp}>
                <BiError color="#CA0C64" fontWeight={"600"} />
              </div>
              <div>Password gagal diperbarui. Silahkan coba lagi !</div>
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
    }
  };

  useEffect(() => {
    if (pausedProcess && isLogin) {
      handleSubmit();
    }
  }, [pausedProcess, isLogin]);

  return (
    <>
      <PopUp
        width="45%"
        isActive={popUpActive}
        setActiveFn={setPopUpActive}
        content={popUpContent}
        title="Ubah Password"
      />
      <div className="content user">
        <div className={styles.DecorationBox}>
          <div className={styles.Decoration}></div>
        </div>
        <div className={styles.Inline} style={{ marginTop: 20 }}>
          <form
            onSubmit={handleSubmit}
            className={`${styles2.FormLayout}`}
            style={{
              marginTop: "-10px",
            }}
          >
            <div className={styles2.FormHeader}>
              <div className={styles2.TitleArea}>
                <h1 className={styles.Title}>Atur Ulang Password</h1>
              </div>
              <div className={styles2.HeaderControl}>
                <Button
                  title={"Ubah Password"}
                  typeBtn="submit"
                  classes={[styles2.FormButton]}
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
                <Alert
                  type="danger"
                  isShow={alertDanger.state}
                  setShowFn={() => {}}
                  message={alertDanger.content}
                />
              </div>
              <div className={styles2.FormFieldBox}>
                <div className={styles2.TitleInput}>Password Lama</div>
                <InputForm
                  refData={fieldProfile.lastPass}
                  type={"password"}
                  placeholder={"Tuliskan password lama kamu"}
                />
              </div>
              <div className={styles2.FormFieldBox}>
                <div className={styles2.FormFooter}>
                  Password lama, wajib diisi jika kamu pernah membuat password
                  saat register ataupun pernah mengubah password sebelumnya.
                  Jika kamu lupa password sebelumnya, silahkan hubungi admin
                  Agendakota.id.
                </div>
              </div>
              <div className={styles2.FormFieldBox}>
                <div className={styles2.TitleInput}>Password Baru</div>
                <InputForm
                  refData={fieldProfile.newPass}
                  type={"password"}
                  placeholder={
                    "Tuliskan password baru yang diinginkan min 8 karakter"
                  }
                />
              </div>
              <div className={styles2.FormFieldBox}>
                <div className={styles2.TitleInput}>Konfirmasi Password</div>
                <InputForm
                  refData={fieldProfile.confirmPass}
                  type={"password"}
                  placeholder={"Tuliskan kembali password baru diatas"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting;
