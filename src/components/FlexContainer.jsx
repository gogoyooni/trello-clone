import React from "react";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function FlexContainer({ children }) {
  return <div style={style}>{children}</div>;
}
