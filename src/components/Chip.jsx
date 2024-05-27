import React from "react";
import styles from "./styles/Chip.module.css";
import config from "../config";
import { isArray } from "util";

const Chip = ({
  value,
  setValue,
  options,
  itemStyle,
  containerStyle,
  rounded = 8,
  item = null,
  max = null,
  multiple = true,
  showLimit = null,
  labelItem = [],
}) => {
  let index = 0;
  return (
    <div className={styles.Container} style={containerStyle}>
      {options.map((option, o) => {
        let vals = multiple ? [...value] : value;
        console.log(option, "CHIP OPTION LOOP");
        let i = vals.indexOf(option);
        let isActive = multiple ? i >= 0 : value === option;
        // console.log(index);
        if (showLimit === null || index < showLimit) {
          index++;
          return (
            <div
              key={o}
              className={`${styles.Item} ${isActive ? styles.ItemActive : ""}`}
              style={{
                borderRadius: rounded,
                backgroundColor: isActive ? `${config.primaryColor}20` : "#fff",
                color: isActive ? `${config.primaryColor}` : "#000",
                borderColor: isActive ? config.primaryColor : "#ddd",
                ...itemStyle,
              }}
              onClick={() => {
                if (multiple) {
                  if (i >= 0) {
                    vals.splice(i, 1);
                  } else {
                    if (max === null || vals.length < max) {
                      vals.push(option);
                    }
                  }
                  setValue(vals);
                } else {
                  setValue(option);
                }
              }}
            >
              {Array.isArray(labelItem) && labelItem.length === options.length
                ? labelItem[o]
                : item === null
                ? option
                : item(option, o)}
            </div>
          );
        }
        index++;
      })}
    </div>
  );
};

export default Chip;
