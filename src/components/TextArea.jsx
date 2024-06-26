import React from "react";
import styles from "./styles/TextArea.module.css";

const TextArea = ({
  id,
  content = "",
  placehorder = "",
  style = {},
  className = [],
  refData,
  required = false,
  fnOnInput = () => {},
  fnOnChange = () => {},
  fnOnFocus = () => {},
}) => {
  const classNames = [styles.TextArea].concat(className);
  return (
    <textarea
      id={id}
      placeholder={placehorder}
      ref={refData}
      style={style}
      required={required}
      className={classNames.join(" ")}
      defaultValue={content}
      onInput={fnOnInput}
      onChange={fnOnChange}
      onFocus={fnOnFocus}
    ></textarea>
  );
};

export default TextArea;
