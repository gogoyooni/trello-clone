import React from "react";



export default function FlexContainer({ children, height}) {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height
  };
  return <div style={style}>{children}</div>;
}
