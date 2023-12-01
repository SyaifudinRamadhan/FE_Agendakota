import React, { useRef, useState } from "react";
import styles from "./styles/InputImage.module.css";
import { BiImage, BiTrash } from "react-icons/bi";
import Button from "./Button";

const InputImage = ({
	refData,
	defaultFile = null,
	hiddenDelete = false,
	style,
}) => {
	const [content, setContent] = useState(defaultFile);

	const handleOpenInput = () => {
		refData.current.click();
	};

	const handlePreview = (evt) => {
		setContent(URL.createObjectURL(evt.target.files[0]));
		console.log(evt.target.files[0]);
	};

	const handleRemoveImage = () => {
		setContent(null);
		refData.current.value = null;
	};

	return (
		<div className={styles.InputImage} style={style}>
			<input
				type="file"
				accept=".jpg, .png"
				ref={refData}
				className={styles.InputForm}
				onChange={handlePreview}
			/>
			<div
				className={`${styles.InputArea} ${content ? styles.Hidden : ""}`}
				onClick={handleOpenInput}
			>
				<BiImage className={styles.InputIcon} />
				<div className={styles.InputText}>Input gambar (max : 2 Mb)</div>
			</div>
			<div className={`${styles.InputPreview} ${content ? "" : styles.Hidden}`}>
				<img
					src={content}
					className={`${styles.PreviewImage} ${
						hiddenDelete ? styles.PreviewImage100 : ""
					}`}
					style={style}
				/>
				{hiddenDelete ? (
					<></>
				) : (
					<Button
						icon={<BiTrash />}
						title={"Hapus"}
						classes={styles.DeleteImage}
						fnOnClick={handleRemoveImage}
						center={true}
					/>
				)}
			</div>
		</div>
	);
};

export default InputImage;
