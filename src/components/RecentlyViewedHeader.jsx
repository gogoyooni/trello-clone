import React from "react";
import { MdAccessTime } from "react-icons/md";
import "./RecentlyViewedHeader.css";

export default function RecentlyViewedHeader() {
  return (
    <div className="recenty-viewed__header">
      <MdAccessTime className="recently-viewed__icon" />
      <span className="recently-viewed__title">Recently Viewed</span>
    </div>
  );
}
