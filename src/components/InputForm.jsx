import React from "react";
import styles from "./styles/InputForm.module.css";

const InputForm = ({id, type, placeholder, style = {}, className = [], refData, required = false}) => {
    const classNames = [styles.InputForm].concat(className);
    return (
        <input id={id} 
            type={type} 
            placeholder={placeholder} 
            className={classNames.join(" ")} 
            style={style}
            ref={refData}
            required={required}/>
    );
}

export default InputForm;