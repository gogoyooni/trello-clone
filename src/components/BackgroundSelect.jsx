import React, { useCallback, useEffect, useState } from "react";
import kanbanImg from "../assets/kanban_img.svg";
import { IoMdCheckmark } from "react-icons/io";

import "./BackgroundSelect.css";
import useBoardStore from "../stores/BoardStore";

const style = {
  //   example: {
  //     textAlign: "center",
  //   },
  //   bgColors: {
  //     display: "flex",
  //     justifyContent: "center",
  //     width: "100%",
  //     gap: "10px",
  //   },
  //   bgColor: {
  //     borderRadius: "3px",
  //     width: "40px",
  //     height: "32px",
  //     // backgroundColor: "red",
  //   },
  bgChange: {
    // backgroundColor: `${bgColor === "bg-1" && }`
  },
};
// background: rgb(170, 119, 255);
//   background: linear-gradient(
//     158deg,
//     rgba(170, 119, 255, 1) 0%,
//     rgba(201, 238, 255, 1) 46%,
//     rgba(151, 222, 255, 1) 80%
//   );

export default function BackgroundSelect() {
  const [bgColor, setBgColor] = useState("bg1");
  const [changedBg, setChangedBg] = useState({});

  const bgColors = {
    bg1 : "linear-gradient(158deg,rgba(170, 119, 255, 1) 0%,rgba(201, 238, 255, 1) 46%,rgba(151, 222, 255, 1) 80%)",
    bg2 : "linear-gradient(158deg,rgba(11, 80, 175, 0.9108018207282913) 0%,rgba(11, 116, 164, 1) 46%,rgba(3, 71, 103, 1) 80%)",
    bg3 : "linear-gradient(158deg,rgba(20, 42, 152, 1) 0%,rgba(71, 23, 110, 1) 46%,rgba(162, 76, 143, 1) 80%)",
    bg4 : "linear-gradient(158deg,rgba(103, 66, 132, 1) 0%,rgba(168, 42, 209, 1) 46%,rgba(196, 19, 133, 1) 80%)",
    bg5 : "linear-gradient(158deg,rgba(239, 118, 58, 1) 0%,rgba(250, 207, 95, 1) 46%,rgba(255, 187, 125, 1) 80%)",
  }

  const setSelectedBgColor = useBoardStore((state) => state.setSelectedBgColor);

  const selectBgColor = useCallback(
    (bgColor) => {
      setBgColor(bgColor);
      setSelectedBgColor(bgColors[bgColor])
    },
    [bgColor]
  );
  const changeBg = useCallback(() => {
    if (bgColor === "bg1") {
      setChangedBg({
        // backgroundColor: "rgb(170, 119, 255)",
        background:
          "linear-gradient(158deg,rgba(170, 119, 255, 1) 0%,rgba(201, 238, 255, 1) 46%,rgba(151, 222, 255, 1) 80%)",
      });
      //   style.changedBg = {
      //     backgroundColor: "rgb(170, 119, 255)",
      //     background:
      //       "linear-gradient(158deg,rgba(170, 119, 255, 1) 0%,rgba(201, 238, 255, 1) 46%,rgba(151, 222, 255, 1) 80%)",
      //   };
    }
    if (bgColor === "bg2") {
      setChangedBg({
        // backgroundColor: "rgb(11, 80, 175)",
        background:
          "linear-gradient(158deg,rgba(11, 80, 175, 0.9108018207282913) 0%,rgba(11, 116, 164, 1) 46%,rgba(3, 71, 103, 1) 80%)",
      });
    }
    if (bgColor === "bg3") {
      setChangedBg({
        // backgroundColor: " rgb(20, 42, 152)",
        background:
          "linear-gradient(158deg,rgba(20, 42, 152, 1) 0%,rgba(71, 23, 110, 1) 46%,rgba(162, 76, 143, 1) 80%)",
      });
      //   style.changedBg =
    }
    if (bgColor === "bg4") {
      setChangedBg({
        // backgroundColor: "rgb(103, 66, 132)",
        background:
          "linear-gradient(158deg,rgba(103, 66, 132, 1) 0%,rgba(168, 42, 209, 1) 46%,rgba(196, 19, 133, 1) 80%)",
      });
      //   style.changedBg = {
      //     backgroundColor: "rgb(103, 66, 132)",
      //     background:
      //       "linear-gradient(158deg,rgba(103, 66, 132, 1) 0%,rgba(168, 42, 209, 1) 46%,rgba(196, 19, 133, 1) 80%)",
      //   };
    }
    if (bgColor === "bg5") {
      setChangedBg({
        // backgroundColor: "rgb(239, 118, 58)",
        background:
          "linear-gradient(158deg,rgba(239, 118, 58, 1) 0%,rgba(250, 207, 95, 1) 46%,rgba(255, 187, 125, 1) 80%)",
      });
    }
    return style;
  }, [bgColor]);

  useEffect(() => {
    changeBg();
  }, [bgColor]);

  useEffect(() => {
    selectBgColor("bg1")
  },[])

  //   console.log("changedBg", changedBg);
  return (
    <div className="bg-selection__wrapper">
      <div className="bg-selection__example" style={changedBg}>
        <img className="bg-example-img" src={kanbanImg} alt="kanban example" />
      </div>
      <div className="bg-selection__colors">
        <div className="bg-header">
          <label>Background</label>
        </div>
        <div className="bg-colors-group">
          <div className="bg-color bg1" onClick={() => selectBgColor("bg1")}>
            {bgColor === "bg1" && (
              <div className="bg-clicked">
                <IoMdCheckmark className="bg-check-icon" />
              </div>
            )}
          </div>
          <div className="bg-color bg2" onClick={() => selectBgColor("bg2")}>
            {bgColor === "bg2" && (
              <div className="bg-clicked">
                <IoMdCheckmark className="bg-check-icon" />
              </div>
            )}
          </div>
          <div className="bg-color bg3" onClick={() => selectBgColor("bg3")}>
            {bgColor === "bg3" && (
              <div className="bg-clicked">
                <IoMdCheckmark className="bg-check-icon" />
              </div>
            )}
          </div>
          <div className="bg-color bg4" onClick={() => selectBgColor("bg4")}>
            {bgColor === "bg4" && (
              <div className="bg-clicked">
                <IoMdCheckmark className="bg-check-icon" />
              </div>
            )}
          </div>
          <div className="bg-color bg5" onClick={() => selectBgColor("bg5")}>
            {bgColor === "bg5" && (
              <div className="bg-clicked">
                <IoMdCheckmark className="bg-check-icon" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
