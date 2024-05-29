import React, { useRef, useState, useEffect } from "react";
import styles from "./styles/InputImage.module.css";
import { BiEdit, BiImage, BiTrash } from "react-icons/bi";
import Button from "./Button";

const InputImage3 = ({
  refData,
  defaultFile = null,
  hiddenDelete = false,
  style,
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
      refData.current.value = null;
    } else {
      try {
        setContent(URL.createObjectURL(evt.target.files[0]));
        // console.log(evt.target.files[0]);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    setContent(defaultFile);
  }, [defaultFile]);

  return (
    <div className={styles.InputImage3} style={style}>
      <input
        type="file"
        accept=".jpg, .png"
        ref={refData}
        className={styles.InputForm}
        onChange={handlePreview}
      />
      <div className={`${styles.InputPreview} ${content ? "" : styles.Hidden}`}>
        <img
          src={content}
          className={`${styles.PreviewImage} ${styles.PreviewImage100}`}
          style={style}
          onClick={handleOpenInput}
        />
      </div>
    </div>
  );
};

export default InputImage3;
