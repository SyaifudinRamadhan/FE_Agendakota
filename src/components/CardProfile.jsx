import React from "react";
import styles from "./styles/CardProfile.module.css";
import CardBasic from "./CardBasic";

const CardProfile = ({
  className = [],
  style = {},
  data = { info: "", title: "", cover: "", desc: "" },
  titleStyle = {},
  customNavButton,
  profileRadius = "100%",
}) => {
  const classes = [styles.CardProfile].concat(className);
  return (
    <CardBasic
      className={classes.join(" ")}
      style={style}
      data={{
        info: data.info,
        title: data.title,
        desc: data.desc,
        cover: "",
      }}
      titleStyle={titleStyle}
      customContent={
        <>
          {customNavButton ? (
            <div className={styles.BoxButtonNav}>{customNavButton}</div>
          ) : (
            <></>
          )}
        </>
      }
      customCover={
        <div className={styles.BoxIconProfile}>
          <img
            className={styles.IconProfile}
            style={{ borderRadius: profileRadius }}
            src={data.cover}
            alt=""
          />
        </div>
      }
    />
  );
};

export default CardProfile;
