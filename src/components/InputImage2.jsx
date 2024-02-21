import React, { useRef, useState, useEffect } from "react";
import styles from "./styles/InputImage.module.css";
import { BiEdit, BiImage, BiTrash } from "react-icons/bi";
import Button from "./Button";

const InputImage2 = ({
	refData,
	defaultFile = null,
	hiddenDelete = false,
	style,
	coverStyle,
}) => {
	const [content, setContent] = useState(defaultFile);

	const handleOpenInput = () => {
		refData.current.click();
	};

	const handlePreview = (evt) => {
		try {
			setContent(URL.createObjectURL(evt.target.files[0]));
			console.log(evt.target.files[0]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setContent(defaultFile);
	}, [defaultFile]);

	return (
		<div className={styles.AbsoluteImage} style={coverStyle}>
			<div className={styles.InputImage} style={style}>
				<input
					type="file"
					accept=".jpg, .png"
					ref={refData}
					className={styles.InputForm}
					onChange={handlePreview}
				/>
				<div
					className={`${styles.InputPreview} ${content ? "" : styles.Hidden}`}
				>
					<img
						src={content}
						className={`${styles.PreviewImage} ${styles.FitCover} ${
							hiddenDelete ? styles.PreviewImage100 : ""
						}`}
						style={style}
					/>
					<Button
						icon={<BiEdit style={{ width: "21px", height: "21px" }} />}
						classes={styles.AutoEditImage}
						fnOnClick={handleOpenInput}
						center={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default InputImage2;
