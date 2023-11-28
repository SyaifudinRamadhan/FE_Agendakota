import React from "react";
import styles from "./styles/Separator.module.css";

const Separator = ({
	margin = "5px 0px",
	width = "100%",
	height = 1,
	color = "#e5e5e5",
}) => {
	return (
		<div
			className={styles.Separator}
			style={{
				margin: margin,
				width: width,
				height: height,
				backgroundColor: color,
			}}
		></div>
	);
};

export default Separator;
