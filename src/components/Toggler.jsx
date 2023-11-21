import React from "react";
import styles from "./styles/Toggler.module.css";

const Toggler = ({ options, value, setValue, onClick = () => {} }) => {
  return (
    <div className={styles.Area}>
      {options.map((option, o) => (
        <div
          key={o}
          className={`${styles.Option} ${
            value === option ? styles.OptionActive : ""
          }`}
          onClick={() => {
            setValue(option);
            onClick();
          }}
        >
          <a
            style={{ textDecoration: "none", color: "black" }}
            href={`#${option}`}
          >
            {option}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Toggler;
