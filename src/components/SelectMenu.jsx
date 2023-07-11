import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./SelectMenu.css";
import SelectDefaultOption from "./SelectDefaultOption";
import SelectOptionList from "./SelectOptionList";


const style = {
  wrapper: {
    // maxWidth: "304px",
    position: "relative",
  },
};

export default function SelectMenu({workspaces, isDropped, setIsDropped}) {
  // const [isDropped, setIsDropped] = useState(false);
  console.log("inside SelectMenu::", workspaces)
  return (
    <div className="select-menu__wrapper" style={style.wrapper}>
      {/* // 이 밑에 워크스페이스 데이터가 와서 map 함수로 돌려야됨 */}
      {/* <>{children}</> */}
      <SelectDefaultOption isDropped={isDropped} setIsDropped={setIsDropped}/>
      {isDropped && workspaces.length > 1 ? <SelectOptionList workspaces={workspaces} isDropped={isDropped} setIsDropped={setIsDropped}/> : null}
      
    </div>
  );
}
