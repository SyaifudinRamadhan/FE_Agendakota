import React from "react";
import styles from "./styles/Chip.module.css";
import config from "../config";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

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
  showNav = false,
  scrollVal = 100,
  id = "continer-chip",
}) => {
  let index = 0;

  const handleBasicScroll = ({ type = "left", value = 10, idTarget = "" }) => {
    try {
      let scrollVal = document.getElementById(idTarget).scrollLeft;

      document.getElementById(idTarget).scrollLeft +=
        type === "left" ? value : -value;

      if (
        scrollVal === document.getElementById(idTarget).scrollLeft &&
        scrollVal > 0
      ) {
        document.getElementById(idTarget).scrollLeft = 0;
      } else if (
        scrollVal === document.getElementById(idTarget).scrollLeft &&
        scrollVal === 0
      ) {
        document.getElementById(idTarget).scrollLeft =
          document.getElementById(idTarget).scrollWidth;
      }
    } catch (error) {}
  };

  return (
    <div className={styles.MainChipBox}>
      {showNav ? (
        <div
          className={styles.ChipNavLeft}
          onClick={() => {
            handleBasicScroll({ type: "left", value: scrollVal, idTarget: id });
          }}
        >
          <BiChevronLeft />
        </div>
      ) : (
        <></>
      )}
      {showNav ? (
        <div
          className={styles.ChipNavRight}
          onClick={() => {
            handleBasicScroll({
              type: "right",
              value: scrollVal,
              idTarget: id,
            });
          }}
        >
          <BiChevronRight />
        </div>
      ) : (
        <></>
      )}
      <div id={id} className={styles.Container} style={containerStyle}>
        {options.map((option, o) => {
          let vals = multiple ? [...value] : value;
          // console.log(option, "CHIP OPTION LOOP");
          let i = vals.indexOf(option);
          let isActive = multiple ? i >= 0 : value === option;
          // // console.log(index);
          if (showLimit === null || index < showLimit) {
            index++;
            return (
              <div
                key={o}
                className={`${styles.Item} ${
                  isActive ? styles.ItemActive : ""
                }`}
                style={{
                  borderRadius: rounded,
                  backgroundColor: isActive
                    ? `${config.primaryColor}20`
                    : "#fff",
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
    </div>
  );
};

export default Chip;
