import { useState, useEffect } from "react";
import "./inputWarning.css";
export function InputWarning(props) {
  const [warningTetx, changeWarningTetx] = useState("");
  useEffect(() => {
    props.warningSignal && changeWarningTetx("Поле является обязательным");
  }, [props.warningSignal]);
  const blurHandler = (e) => {
    e.target.value
      ? changeWarningTetx("")
      : changeWarningTetx("Поле является обязательным");
  };
  return (
    <div className="divInputWarning">
      <input
        className="inputWarning"
        onBlur={(e) => {
          blurHandler(e);
        }}
        onChange={(e) => {
          props.changeHandler(e);
          changeWarningTetx("");
        }}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value ? props.value : ""}
        style={{
          outline: warningTetx ? "1px solid #FF8484" : "",
          marginBottom: warningTetx ? "" : "19px",
        }}
      ></input>
      <div className="warning">{warningTetx}</div>
    </div>
  );
}
