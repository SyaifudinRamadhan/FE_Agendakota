import React from "react";
import styles from "../styles/Chip.module.css";
import Skeleton from "../styles/Skeleton.module.css";
import config from "../../config";

const Chip = ({ itemStyle, rounded = 8, numOfShow = 7 }) => {
	let chips = [];
	for (let i = 0; i < numOfShow; i++) {
		chips.push(
			<div
				key={i}
				className={`${styles.Item} ${Skeleton.Skeleton}`}
				style={{
					borderRadius: rounded,
					borderColor: "#ddd",
					...itemStyle,
				}}
			></div>
		);
	}
	return <div className={styles.Container}>{chips.map((chip) => chip)}</div>;
};

export default Chip;
