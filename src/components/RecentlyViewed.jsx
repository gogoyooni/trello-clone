import React from "react";
import RecentlyViewedHeader from "./RecentlyViewedHeader";
import BoardList from "./BoardList";
import NoActivity from "./NoActivity";

const recentlyViewedStyle = {
  // height: "100%",
};

// recently - viewed - boards__section;
export default function RecentlyViewed({ recentlyViewedBoards }) {
  // console.log("recentlyViewedBoards", recentlyViewedBoards);
  return (
    <div
      className="recently-viewed-boards__section all-boards-list__section"
      // style={recentlyViewedStyle}
    >
      <RecentlyViewedHeader />
      {recentlyViewedBoards?.length > 0 ? (
        <BoardList
          recentlyViewed
          recentlyViewedBoards={recentlyViewedBoards}
          // getRecentlyViewed={getRecentlyViewed}
        />
      ) : (
        <NoActivity />
      )}
    </div>
  );
}
