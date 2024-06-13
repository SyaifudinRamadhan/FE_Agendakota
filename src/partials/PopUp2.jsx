import React from "react";
import styles from "./styles/PopUp.module.css";
import { BiX, BiXCircle } from "react-icons/bi";
import Button from "../components/Button";

const PopUp2 = ({
  content,
  titleHeader = "",
  closeBtnTitle,
  closeBtnAbs = { title: "", fn: () => {} },
  isActive = false,
  setActiveFn,
  width = "70%",
  classNames = {
    wrapper: [],
    modalDialog: [],
    popUpBox: [],
    header: [],
    content: [],
  },
}) => {
  const closePopUp = () => {
    setActiveFn(false);
  };
  return (
    <div
      className={classNames.wrapper.concat(styles.Wrapper).join(" ")}
      style={isActive ? { display: "block" } : { display: "none" }}
    >
      <div
        className={classNames.modalDialog.concat(styles.ModalDialog).join(" ")}
      >
        <div
          className={classNames.popUpBox.concat(styles.PopUpBox).join(" ")}
          style={{ width: width, padding: 25 }}
        >
          <div
            className={classNames.header.concat(styles.Header).join(" ")}
            style={{ marginTop: 0, marginBottom: 0 }}
          >
            {titleHeader}
            <div className={styles.BtnAction}>
              {closeBtnAbs.title !== "" ? (
                <Button
                  title={closeBtnAbs.title}
                  fnOnClick={closeBtnAbs.fn}
                  bgColor={"#fff"}
                  textColor={"#ca0c64"}
                  borderColor={"#ca0c64"}
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <></>
              )}
              <Button title={closeBtnTitle} fnOnClick={closePopUp} />
            </div>
          </div>
          <div className={classNames.content.concat(styles.Content).join(" ")}>
            {content}
          </div>
          <div className={`${styles.BtnActionOver}`}>
            {closeBtnAbs.title !== "" ? (
              <Button
                title={closeBtnAbs.title}
                fnOnClick={closeBtnAbs.fn}
                bgColor={"#fff"}
                textColor={"#ca0c64"}
                borderColor={"#ca0c64"}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <></>
            )}
            <Button title={closeBtnTitle} fnOnClick={closePopUp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp2;
