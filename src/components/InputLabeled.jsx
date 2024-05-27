import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/InputForm.module.css";
import styles2 from "./styles/InputLabeled.module.css";

const filterArrCharToNumber = (arrChar = []) => {
  let newArr = arrChar.filter(
    (value) =>
      value == 0 ||
      value == 1 ||
      value == 2 ||
      value == 3 ||
      value == 4 ||
      value == 5 ||
      value == 6 ||
      value == 7 ||
      value == 8 ||
      value == 9
  );
  return newArr.join("");
};

const formatCurrency = (e) => {
  const numberFormat = Intl.NumberFormat("id-ID");
  let inputVal =
    e.target.value.split("Rp.").length > 1
      ? e.target.value.split("Rp.")[1]
      : e.target.value.split("Rp.")[0];
  inputVal = inputVal.split("");
  let res = "Rp." + numberFormat.format(filterArrCharToNumber(inputVal));
  e.target.value = res;
};

const formatNumeric = (e) => {
  let inputVal = e.target.value.split("");
  let res = filterArrCharToNumber(inputVal);
  e.target.value = res;
};

const InputLabeled = ({
  id,
  type,
  placeholder,
  style = {},
  className = [],
  refData,
  required = false,
  readOnly = false,
  min = 0,
  iconSvg,
  label,
  value,
  fnOnInput = () => {},
  fnOnChange = () => {},
  onFocus = () => {},
}) => {
  const classNames = [styles2.BoxInput].concat(className);
  const [widthInput, setWidth] = useState("unset");

  const labelRef = useRef();

  useEffect(() => {
    if (labelRef.current) {
      setWidth(`calc(100% - ${labelRef.current.clientWidth}px)`);
    }
  });

  return (
    <div className={classNames} style={style}>
      <label
        ref={labelRef}
        htmlFor={id}
        className={`${styles2.Label} input-labeled-label`}
      >
        {iconSvg}
        <p>{label}</p>
      </label>
      <input
        id={id}
        type={type === "currency" ? "text" : type}
        placeholder={placeholder}
        className={`${styles.InputForm} input-labeled-field`}
        style={{ width: widthInput }}
        ref={refData}
        required={required}
        readOnly={readOnly}
        onFocus={onFocus}
        onInput={(e) => {
          type === "currency"
            ? formatCurrency(e)
            : type === "numeric"
            ? formatNumeric(e)
            : fnOnInput(e);
        }}
        onChange={fnOnChange}
        min={min}
        defaultValue={value}
      />
    </div>
  );
};

export default InputLabeled;
