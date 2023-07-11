import React from "react";

const noActivityStyle = {
  height: "95px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function NoActivity() {
  return (
    <div className="userboard-no-activity" style={noActivityStyle}>
      No activity yet
    </div>
  );
}
