import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/InputForm.module.css";
import styles2 from "./styles/InputLabeled.module.css";

const FieldBox = ({
	id,
	style = {},
	contentStyle = {},
	contentWidth = undefined,
	className = [],
	iconSvg,
	label,
	children,
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
			<div
				style={{
					...contentStyle,
					display: "flex",
					flexDirection: "row",
					width: contentWidth ? contentWidth : widthInput,
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default FieldBox;
