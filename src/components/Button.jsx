import React from "react";

import "./Button.css";

export default function Button({ btnType, btnName, style, setFunc }) {
  return (
    <button className={`${btnType}-btn`} style={style} onClick={setFunc}>
      {btnName}
    </button>
  );
}
