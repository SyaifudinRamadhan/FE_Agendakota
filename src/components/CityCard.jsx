import React from "react";
import styles from "./styles/CityCard.module.css";

const CityCard = ({ data, style, className, fnOnClick = () => {} }) => {
	let classNames = [styles.Card].concat(className);
	return (
		<div style={style} className={classNames.join(" ")} onClick={fnOnClick}>
			<img
				src={process.env.REACT_APP_BACKEND_URL + data.photo}
				alt={data.name}
				className={styles.Cover}
			/>
			<div className={styles.Title}>{data.name}</div>
		</div>
	);
};

export default CityCard;
