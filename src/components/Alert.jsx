import React, { useEffect, useState } from "react";
import styles from "./styles/Alert.module.css";
import config from "../config";
import { BiX } from "react-icons/bi";
const Alert = ({
	isShow = false,
	setShowFn,
	type = "success" ? "success" : "warning" ? "warning" : "danger",
	className = [],
	style = {},
	message = "",
	closeBtn = true,
}) => {
	const [basicStyle, setBasicStyle] = useState({});

	const classNames = [styles.Alert].concat(className);

	const hanldeAutoClose = ({ timeout = 5, isShow }) => {
		setTimeout(() => {
			setShowFn(!isShow);
		}, timeout * 1000);
	};

	useEffect(() => {
		if (isShow) {
			const colorStyle = {
				backgroundColor: null,
				color: null,
			};
			if (type == "success") {
				colorStyle.backgroundColor = "rgb(18 145 0)";
				colorStyle.color = "#fff";
			} else if (type == "warning") {
				colorStyle.backgroundColor = config.colors.yellow;
				colorStyle.color = "#000";
			} else {
				colorStyle.backgroundColor = config.colors.red;
				colorStyle.color = "#fff";
			}
			setBasicStyle({
				...colorStyle,
				display: "block",
			});
			hanldeAutoClose({ isShow: isShow });
		} else {
			setBasicStyle({
				...basicStyle,
				display: "none",
			});
		}
	}, [isShow]);

	return (
		<div className={classNames.join(" ")} style={{ ...basicStyle, ...style }}>
			<div className={styles.InnerAlert}>
				<div>{message}</div>
				{closeBtn ? <BiX onClick={() => setShowFn(!isShow)} /> : <></>}
			</div>
		</div>
	);
};

export default Alert;
