import React from "react";
import styles from "./styles/Chip.module.css";
import config from "../config";

const Chip = ({value, setValue, options, itemStyle, containerStyle, rounded = 8, item = null, max = null, multiple = true}) => {
    return (
        <div className={styles.Container}>
            {
                options.map((option, o) => {
                    let vals = multiple ? [...value] : value;
                    let i = vals.indexOf(option);
                    let isActive = multiple ? i >= 0 : value === option;
                    return (
                        <div key={o} className={`${styles.Item} ${isActive ? styles.ItemActive : ''}`}
                        style={{
                            borderRadius: rounded,
                            backgroundColor: isActive ? `${config.primaryColor}20` : '#fff',
                            borderColor: isActive ? config.primaryColor : '#ddd',
                            ...itemStyle
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
                                setValue(option)
                            }
                        }}>
                            {item === null ? option : item(option, o)}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Chip;