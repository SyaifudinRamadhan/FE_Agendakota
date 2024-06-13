import React from "react";
import styles from "./styles/PopUp.module.css";
import { BiX, BiXCircle } from "react-icons/bi";

const PopUp = ({
  content,
  title = "Create Organizer",
  customTitle,
  isActive = false,
  setActiveFn,
  width = "70%",
  customStyleWrapper = {},
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
      style={
        isActive
          ? { display: "block", ...customStyleWrapper }
          : { display: "none", ...customStyleWrapper }
      }
    >
      <div
        className={classNames.modalDialog.concat(styles.ModalDialog).join(" ")}
      >
        <div
          className={classNames.popUpBox.concat(styles.PopUpBox).join(" ")}
          style={{ width: width }}
        >
          <div className={classNames.header.concat(styles.Header).join(" ")}>
            {customTitle}
            {title !== "" ? (
              <>
                <h5>{title}</h5>
                <a href="#" className={styles.CloseButton}>
                  <BiX onClick={closePopUp} />
                </a>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={classNames.content.concat(styles.Content).join(" ")}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
