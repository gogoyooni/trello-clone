import React, { useState, useRef } from "react";

export default function NavDropdown({
  children,
  menuName,
  isOpen,
  onClickOutside,
}) {
  const dropDownRef = useRef(null);

  //   useEffect(() => {
  // console.log(dropDownRef);
  //     const handleClickOutside = (event) => {
  //       if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
  //         onClickOutside && onClickOutside();
  //       }
  //     };
  //     document.addEventListener("click", handleClickOutside, true);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside, true);
  //     };
  //   }, []);

  //   if (!isOpen) return null;

  return (
    <>
      {isOpen ? (
        <ul className="dropdown__workspaces" ref={dropDownRef}>
          {children}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
