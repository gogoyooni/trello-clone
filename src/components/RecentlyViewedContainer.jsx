import React from "react";

// const recentlyViewedStyle = {
//   // height: "100%",
// };

export default function RecentlyViewedContainer({ children }) {
  return (
    <div
      // className="recently-viewed-boards__section all-boards-list__section"
      className="recently-viewed-boards__container"
      //   style={recentlyViewedStyle}
    >
      <>{children}</>
    </div>
  );
}
