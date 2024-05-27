import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/CardProfile.module.css";
import CardBasic from "./CardBasic";

const CardProfile2 = ({
  className = [],
  style = {},
  data = { info: "", title: "", cover: "", desc: "" },
  titleStyle = {},
  navStyle = {},
  customNavButton,
  profileRadius = "100%",
}) => {
  const classes = [styles.CardProfile].concat(className);
  const box = useRef();
  const [layerNavHeight, setHeight] = useState(0);
  const [layerNavWidth, setWidth] = useState(0);

  useEffect(() => {
    if (box.current) {
      try {
        setHeight(box.current.clientHeight);
        setWidth(box.current.clientWidth);
      } catch (error) {}

      window.addEventListener("resize", () => {
        try {
          setHeight(box.current.clientHeight);
          setWidth(box.current.clientWidth);
        } catch (error) {}
      });
    }
  });

  return (
    // <CardBasic
    // 	className={classes.join(" ")}
    // 	style={{
    // 		...style,
    // 		display: "flex",
    // 		flexDirection: "row",
    // 		gap: "10px",
    // 	}}
    // 	data={{
    // 		info: data.info,
    // 		title: data.title,
    // 		cover: "",
    // 	}}
    // 	titleStyle={titleStyle}
    // 	customContent={
    // 		<>
    // 			{customNavButton ? (
    // 				<div className={styles.BoxButtonNav2} style={navStyle}>
    // 					{customNavButton}
    // 				</div>
    // 			) : (
    // 				<></>
    // 			)}
    // 		</>
    // 	}
    // 	customCover={
    // <div className={styles.BoxIconProfile}>
    // 	<img
    // 		className={styles.IconProfile2}
    // 		style={{ borderRadius: profileRadius }}
    // 		src={data.cover}
    // 		alt=""
    // 	/>
    // </div>
    // 	}
    // />
    <div className={styles.BoxCardProfile} ref={box}>
      <div
        className={styles.NavLayer}
        style={{
          width: layerNavWidth,
          height: layerNavHeight,
        }}
      >
        {customNavButton}
      </div>
      <div className={styles.BoxCardContent}>
        <div className={styles.BoxIconProfile2}>
          <img
            className={styles.IconProfile2}
            style={{ borderRadius: profileRadius }}
            src={data.cover}
            alt=""
          />
        </div>
        <div className={styles.TextBox}>
          <h5>{data.title}</h5>
          <p>{data.info}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProfile2;
