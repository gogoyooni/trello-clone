import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./SelectMenu.css";

const style = {
  wrapper: {
    // maxWidth: "304px",
    position: "relative",
  },
};

export default function SelectMenu({ children }) {
  const [isDropped, setIsDropped] = useState(false);

  return (
    <div className="select-menu__wrapper" style={style.wrapper}>
      {/* // 이 밑에 워크스페이스 데이터가 와서 map 함수로 돌려야됨 */}
      <>{children}</>
    </div>
  );
}
