import React from "react";
import RecentlyViewedHeader from "./RecentlyViewedHeader";
import BoardList from "./BoardList";
import NoActivity from "./NoActivity";

const recentlyViewedBoardsSection = {
  // display: "flex",
  // flexWrap: "wrap"
};

// recently - viewed - boards__section;
export default function RecentlyViewed({ recentlyViewedBoards }) {
  // console.log("recentlyViewedBoards", recentlyViewedBoards);
  return (
    <>
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
    </>
  );
}
