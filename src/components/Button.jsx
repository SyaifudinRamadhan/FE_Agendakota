import React from "react";
import styles from "./styles/Button.module.css";
import config from "../config";

const Button = ({
	title,
	icon,
	bgColor,
	typeBtn = "button",
	textColor,
	borderColor,
	fnOnClick,
	style = {},
	classes = [],
	center = false,
}) => {
	const basicStyle = {
		background: bgColor ? bgColor : config.primaryColor,
		borderColor: borderColor ? borderColor : config.primaryColor,
		color: textColor ? textColor : "#ffffff",
	};
	let basicClass = [styles.Button].concat(classes);
	if (center) {
		if (!icon || !title) {
			basicStyle.gap = "0px";
		}
		basicClass = basicClass.concat([styles.ButtonCenter]);
	}
	return (
		<button
			className={basicClass.join(" ")}
			style={{ ...basicStyle, ...style }}
			onClick={fnOnClick}
			type={typeBtn}
		>
			{icon ? (
				<div id="icon" className={styles.Icon}>
					{icon}
				</div>
			) : (
				""
			)}
			<div
				id="title"
				className={styles.Title}
				style={{
					textAlign: icon ? "left" : "center",
					marginLeft: center && icon ? "unset" : "auto",
				}}
			>
				{title}
			</div>
		</button>
	);
};
export default Button;
