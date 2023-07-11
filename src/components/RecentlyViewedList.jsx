import React from "react";
import BoardList from "./BoardList";
import NoActivity from "./NoActivity";
import RecentlyViewedItem from "./RecentlyViewedItem";

export default function RecentlyViewedList({ recentlyViewedBoards }) {
  if (recentlyViewedBoards === null) {
    return <NoActivity />;
  }
  return (
    <div className="recently-viewed-boards__section all-boards-list__section">
      {recentlyViewedBoards?.map((board, i) => (
        <RecentlyViewedItem key={i} {...board} />
      ))}
      {/* {
      recentlyViewedBoards?.length > 0 ? (
        <BoardList recentlyViewed recentlyViewedBoards={recentlyViewedBoards} />       
      ) : (
        <NoActivity />
      )
      } */}
    </div>
  );
}
