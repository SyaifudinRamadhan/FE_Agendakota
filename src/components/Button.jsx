import React from "react";
import styles from "./styles/Button.module.css";
import config from "../config";

const Button = ({title, icon, bgColor, typeBtn = "button", textColor, borderColor, fnOnClick, style = {}, classes = []}) => {
    const basicStyle = {
            background: bgColor ? bgColor : config.primaryColor,
            borderColor: borderColor ? borderColor : config.primaryColor,
            color: textColor ? textColor : "#ffffff"};
    let basicClass = [styles.Button].concat(classes);
    return (
        <button 
            className={basicClass.join(" ")} 
            style={{...basicStyle, ...style}}
            onClick={fnOnClick}
            type={typeBtn}
        >
            {icon}
            {title}
        </button>
    );
}
export default Button;