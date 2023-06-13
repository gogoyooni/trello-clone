import React from "react";
import "./Input.css";

export default function Input({
  labelName,
  required,
  style,
  isTextArea,
  ...props
}) {
  const { setFunc } = props;
  return (
    <div className="input-wrapper">
      <div className="label-wrapper">
        <label htmlFor={labelName}>{labelName}</label>
        {required ? <span className="required">*</span> : null}
      </div>
      {!isTextArea ? (
        <input
          className="input-component"
          type="text"
          name={labelName}
          // value={}
          style={style}
          onChange={(e) => setFunc(e.target.value)}
        />
      ) : (
        <textarea
          className="textarea-component"
          name={labelName}
          style={style}
          onChange={(e) => setFunc(e.target.value)}
        ></textarea>
      )}
    </div>
  );
}
