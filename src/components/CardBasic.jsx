import React from "react";
import styles from "./styles/CardBasic.module.css";
import config from "../config";

const CardBasic = ({
  className = [],
  style = {},
  data = { info: "", title: "", cover: "", desc: "" },
  titleStyle = {},
  customContent,
  customCover,
}) => {
  const classNames = [styles.Card].concat(className);
  return (
    <div className={classNames.join(" ")} style={style}>
      {data.cover !== "" && (
        <img
          src={data.cover}
          descalt={data.title}
          className={styles.Cover}
          style={
            config !== null && config.hasOwnProperty("coverStyle")
              ? config.coverStyle
              : null
          }
        />
      )}
      {customCover}
      <div style={{ marginTop: data.cover !== "" ? 10 : 0, height: "100%" }}>
        {data.info !== "" && <div className={styles.Info}>{data.info}</div>}
        {data.title !== "" && (
          <div className={styles.Title} style={titleStyle}>
            {data.title}
          </div>
        )}
        {data.desc !== "" && <div className={styles.Info}>{data.desc}</div>}
        {customContent}
      </div>
    </div>
  );
};

export default CardBasic;
