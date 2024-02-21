import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/InputForm.module.css";
import styles2 from "./styles/InputLabeled.module.css";

const InputLabeled = ({
	id,
	type,
	placeholder,
	style = {},
	className = [],
	refData,
	required = false,
	readOnly = false,
	min = 0,
	iconSvg,
	label,
	onFocus = () => {},
}) => {
	const classNames = [styles2.BoxInput].concat(className);
	const [widthInput, setWidth] = useState("unset");

	const labelRef = useRef();

	useEffect(() => {
		if (labelRef.current) {
			setWidth(`calc(100% - ${labelRef.current.clientWidth}px)`);
		}
	});

	return (
		<div className={classNames} style={style}>
			<label ref={labelRef} htmlFor={id} className={styles2.Label}>
				{iconSvg}
				<p>{label}</p>
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				className={`${styles.InputForm}`}
				style={{ width: widthInput }}
				ref={refData}
				required={required}
				readOnly={readOnly}
				onFocus={onFocus}
				min={min}
			/>
		</div>
	);
};

export default InputLabeled;
