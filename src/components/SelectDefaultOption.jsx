import React from 'react'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import useBoardStore from '../stores/BoardStore'


const style={
    option: {
        display: "flex",
        minHeight: "36px",
        // justifyContent: "center",
        alignItems: "center",
        boxShadow: "inset 0 0 0 2px #DADDE2",
        borderRadius: "3px",
        width: "100%",
        padding: "8px 12px",
        boxSizing: "border-box",
        cursor: "pointer",
        // flexDirection: "column",
      },
      defaultValue: {
        flex: "1",
        textOvverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
      arrowDownIcon: {
        width: "20px",
        height: "auto",
        fontWeight: "bold",
      },
}


export default function SelectDefaultOption({isDropped, setIsDropped}) {

  const selectedWorkspace = useBoardStore((state) => state.selectedWorkspace);

  return (
    <div
    className="select-menu__option"
    style={style.option}
    onClick={() => {
      setIsDropped(!isDropped);
    }}
  >
    {/* // 여기가 처음에 모달 봤을때 Default 워크스페이스 값 보여주는곳 */}

    <div
      className="select-menu__default-value"
      id="default-workspace"
      style={style.defaultValue}
    >
      {selectedWorkspace}
    </div>
    <MdOutlineKeyboardArrowDown
      className="arrow-down__icon"
      style={style.arrowDownIcon}
    />
    {/* // 드랍다운 메뉴들 */}
  </div>
  )
}
