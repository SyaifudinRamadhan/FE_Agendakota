import React from "react";
import styles from "./styles/PopUp.module.css";
import { BiX, BiXCircle } from "react-icons/bi";
import Button from "../components/Button";

const PopUp2 = ({
	content,
	titleHeader = "",
	closeBtnTitle,
	isActive = false,
	setActiveFn,
	width = "70%",
}) => {
	const closePopUp = () => {
		setActiveFn(false);
	};
	return (
		<div
			className={styles.Wrapper}
			style={isActive ? { display: "block" } : { display: "none" }}
		>
			<div className={styles.ModalDialog}>
				<div className={styles.PopUpBox} style={{ width: width, padding: 25 }}>
					<div
						className={styles.Header}
						style={{ marginTop: 0, marginBottom: 0 }}
					>
						{titleHeader}
						<Button title={closeBtnTitle} fnOnClick={closePopUp} />
					</div>
					<div className={styles.Content}>{content}</div>
				</div>
			</div>
		</div>
	);
};

export default PopUp2;
