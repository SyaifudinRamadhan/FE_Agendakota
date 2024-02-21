import React from "react";
import styles from "./styles/InputToogle.module.css";

const InputToogle = ({ refData, checked, id, onChange = () => {}, style }) => {
	return (
		<label style={style} className={styles.Switch}>
			<input
				id={id}
				ref={refData}
				defaultChecked={checked}
				type="checkbox"
				onChange={onChange}
			/>
			<span className={`${styles.Slider} ${styles.Round}`}></span>
		</label>
	);
};

export default InputToogle;
