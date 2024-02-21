import React, { useEffect, useState } from "react";
import styles from "./styles/InputForm.module.css";
import Button from "./Button";
import { BiShow } from "react-icons/bi";

const InputForm = ({
	id,
	type,
	placeholder,
	style = {},
	className = [],
	refData,
	required = false,
	readOnly = false,
	hidePassBtn = true,
	min = 0,
	onFocus = () => {},
	value,
	onInput = () => {},
}) => {
	const [showPass, setShowPass] = useState(false);

	const classNames = [
		styles.InputForm,
		type === "password" ? styles.InputPassword : "",
	].concat(className);

	const showPassFn = () => {
		setShowPass(!showPass);
	};
	return (
		<>
			<input
				id={id}
				type={showPass ? "text" : type}
				placeholder={placeholder}
				className={classNames.join(" ")}
				style={style}
				ref={refData}
				required={required}
				readOnly={readOnly}
				onFocus={onFocus}
				min={min}
				onInput={onInput}
				defaultValue={value}
			/>
			{hidePassBtn ? (
				<Button
					style={{ display: type === "password" ? "unset" : "none" }}
					classes={styles.HidePassword}
					bgColor={"white"}
					borderColor={"white"}
					textColor={"black"}
					icon={<BiShow />}
					fnOnClick={showPassFn}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default InputForm;
