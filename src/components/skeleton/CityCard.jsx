import React from "react";
import styles from "../styles/CityCard.module.css";
import Skeleton from "../styles/Skeleton.module.css";

const CityCard = ({ style, className }) => {
	let classNames = [styles.Card].concat(className);
	return (
		<div style={style} className={classNames.join(" ")}>
			<div
				style={{ width: "100%" }}
				className={`${styles.Cover} ${Skeleton.Skeleton}`}
			></div>
			<div className={`${styles.TitleSkeleton} ${Skeleton.Skeleton}`}></div>
		</div>
	);
};

export default CityCard;
