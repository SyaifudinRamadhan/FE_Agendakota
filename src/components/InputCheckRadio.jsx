import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/InputForm.module.css";
import styles2 from "./styles/InputLabeled.module.css";

const InputCheckRadio = ({
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
	onChange,
	checked = false,
	radioName = null,
	disabled = false,
	onFocus = () => {},
}) => {
	const classNames = [styles2.BoxInput, styles2.BoxInputRadio].concat(
		className
	);
	const [widthInput, setWidth] = useState("unset");

	const labelRef = useRef();

	useEffect(() => {
		if (labelRef.current) {
			setWidth(`calc(100% - ${labelRef.current.clientWidth}px)`);
		}
	});

	return (
		<div className={classNames.join(" ")} style={style}>
			{type === "checkbox" ? (
				<input
					id={id}
					type={type}
					placeholder={placeholder}
					className={`${styles.InputForm} ${styles2.InputCheckRadio}`}
					ref={refData}
					required={required}
					readOnly={readOnly}
					onFocus={onFocus}
					min={min}
					onChange={onChange}
					defaultChecked={checked}
				/>
			) : (
				<input
					id={id}
					type={type}
					placeholder={placeholder}
					className={`${styles.InputForm} ${styles2.InputCheckRadio}`}
					ref={refData}
					required={required}
					readOnly={readOnly}
					onFocus={onFocus}
					min={min}
					onChange={onChange}
					defaultChecked={checked}
					name={radioName}
					disabled={disabled}
				/>
			)}
			<label ref={labelRef} htmlFor={id} className={styles2.Label}>
				{iconSvg}
				<p>{label}</p>
			</label>
		</div>
	);
};

export default InputCheckRadio;
