import React from "react";
import styles from "./styles/PopUp.module.css";
import { BiX, BiXCircle } from "react-icons/bi";

const PopUp = ({
	content,
	title = "Create Organizer",
	customTitle,
	isActive = false,
	setActiveFn,
	width = "70%",
	customStyleWrapper = {},
}) => {
	const closePopUp = () => {
		setActiveFn(false);
	};
	return (
		<div
			className={styles.Wrapper}
			style={
				isActive
					? { display: "block", ...customStyleWrapper }
					: { display: "none", ...customStyleWrapper }
			}
		>
			<div className={styles.ModalDialog}>
				<div className={styles.PopUpBox} style={{ width: width }}>
					<div className={styles.Header}>
						{customTitle}
						{title !== "" ? (
							<>
								<h5>{title}</h5>
								<a href="#" className={styles.CloseButton}>
									<BiX onClick={closePopUp} />
								</a>
							</>
						) : (
							<></>
						)}
					</div>
					<div className={styles.Content}>{content}</div>
				</div>
			</div>
		</div>
	);
};

export default PopUp;
