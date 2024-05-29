import React, { useRef, useState, useEffect } from "react";
import styles from "./styles/InputImage.module.css";
import { BiImage, BiPlusCircle, BiTrash, BiXCircle } from "react-icons/bi";
import Button from "./Button";

const InputImage5 = ({
  refData,
  refDelBtn,
  delExtFunction = () => {},
  defaultFile = null,
  style,
  textMsg,
  fnSetAlert = () => {},
  maxFile = 2048,
}) => {
  const [content, setContent] = useState(defaultFile);

  const handleOpenInput = () => {
    refData.current.click();
  };

  const handlePreview = (evt) => {
    if (evt.target.files[0].size > maxFile * 1024) {
      fnSetAlert({
        state: true,
        type: "danger",
        content: `Max input file ${maxFile / 1024} Mb`,
      });
      handleRemoveImage();
    } else {
      try {
        setContent(URL.createObjectURL(evt.target.files[0]));
        // console.log(evt.target.files[0]);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const handleRemoveImage = () => {
    setContent(null);
    refData.current.value = null;
    delExtFunction();
  };

  useEffect(() => {
    setContent(defaultFile);
  }, [defaultFile]);

  return (
    <div className={styles.InputImage5} style={style}>
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
        <BiPlusCircle
          className={styles.InputIcon}
          style={{ width: "21px", height: "21px" }}
        />
        <div className={styles.InputText}>{textMsg}</div>
      </div>
      <div className={`${styles.InputPreview} ${content ? "" : styles.Hidden}`}>
        <img
          src={content}
          className={`${styles.PreviewImage} ${styles.PreviewImage100}`}
          style={{
            ...style,
            cursor: "pointer",
            borderRadius: "8px",
            objectFit: "cover",
          }}
          onClick={() => handleOpenInput()}
        />
      </div>
      <button
        className={`${content ? "" : "d-none"} ${styles.DeleteImage5}`}
        ref={refDelBtn}
        onClick={handleRemoveImage}
      >
        <BiTrash />
      </button>
    </div>
  );
};

export default InputImage5;
