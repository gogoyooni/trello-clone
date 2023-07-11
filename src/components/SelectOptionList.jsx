import React from 'react'
import SelectOptionItem from './SelectOptionItem'

const style={
    dropdownMenu: {
        width: "100%",
        // height: "300px",
        position: "absolute",
        top: "48px",
        left: "0px",
        // backgroundColor: "cyan",
        borderRadius: "3px",
        border: "0.5px solid rgba(0,0,0,0.24)",
        boxSizing: "border-box",
        // boxShadow: "inset 1px 2px 0px 0px rgba(0,0,0,0.24)",
      },
}

export default function SelectOptionList({workspaces, ...props }) {
    console.log("workspaces inside SelectoptionList::", workspaces)
  return (
    <div className="dropdown-menu__wrapper" style={style.dropdownMenu}>
        {workspaces?.map((workspace, i) => (
            <SelectOptionItem key={i} workspace={workspace} {...props}/>
        ))}
    </div>
  )
}
