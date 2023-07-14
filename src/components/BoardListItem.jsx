import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, matchPath, useNavigate } from "react-router-dom";
import "./BoardListItem.css";
import { FiStar } from "react-icons/fi";
import Lottie from "lottie-react";
import starAnimation from "../assets/star.json";
import { getRandomImg } from "../utils/workspace";
import useUserStore from "../store";

const style = {
  // height: 50,
  // border: 3,
  // borderStyle: "solid",
  // borderRadius: 7,
};



export default function BoardListItem({ name, boardId, bgUrl, bgColor, workspaceName, workspaceId, userId,...props }) {
  // if (noBoard) {
  //   return;
  // }

  // const bgColors = {
  //   bgColor1: {background: "linear-gradient( 158deg, rgba(170, 119, 255, 1) 0%, rgba(201, 238, 255, 1) 46%, rgba(151, 222, 255, 1) 80% )"},
  //   bgColor2: {background:"linear-gradient( 158deg, rgba(11, 80, 175, 0.9108018207282913) 0%, rgba(11, 116, 164, 1) 46%, rgba(3, 71, 103, 1) 80% )"},
  //   bgColor3: {background:"linear-gradient( 158deg, rgba(20, 42, 152, 1) 0%, rgba(71, 23, 110, 1) 46%, rgba(162, 76, 143, 1) 80% )"},
  //   bgColor4: {background:"linear-gradient( 158deg, rgba(103, 66, 132, 1) 0%, rgba(168, 42, 209, 1) 46%, rgba(196, 19, 133, 1) 80% )"},
  //   bgColor5: {background:"linear-gradient( 158deg, rgba(239, 118, 58, 1) 0%, rgba(250, 207, 95, 1) 46%, rgba(255, 187, 125, 1) 80% )"}, 
  // }
  // console.log("bgColors.bgColor1: ", bgColors[`${bgColor}`])

  const [isHovered, setIsHovered] = useState(false);
  const [starIsClicked, setStarIsClicked] = useState(false);
  // const { View } = useLottie(options, style);
  const starRef = useRef();
  const options = {
    animationData: starAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigate = useNavigate();

  // const
  // const match = matchPath(boardUrl, {
  //   path: "/b/:boardId/:boardName",
  //   exact: true,
  //   strict: true,
  // });
  // console.log("match:::::", match);

  const updateRecentlyViewed = useUserStore((state) => state.updateRecentlyViewed);
  // console.log("boardId", boardId);
  //@desc hover event for board list item

  const handleHoverOnBoardItem = useCallback(
    (e) => {
      e.stopPropagation();
      setIsHovered((prevState) => !prevState);
    },
    [isHovered]
  );

  const handleStarAnimation = useCallback(
    (e) => {
      e.stopPropagation();
      // console.log("star clicked");
      setStarIsClicked((prevState) => !prevState);
    },
    [starIsClicked]
  );

  const handleSaveRecentlyViewed = useCallback(() => {
    const saveRecentlyViewed = props.saveRecentlyViewed;
    const checkLocalStorage = props.checkLocalStorage;
    const dataIsExisted = checkLocalStorage();
    if (!dataIsExisted) {
      // when it doesn't exist
      saveRecentlyViewed(boardId, name, bgUrl, bgColor);
      // console.log("check local storage ::", checkLocalStorage());
    } else {
          // 유저가 들어갔던 보드가 있으면 기존에 있던 localStorage에 데이터 추가
      updateRecentlyViewed(boardId, name, bgUrl, bgColor);
    }
    
    


    // console.log("dataIsExisted", dataIsExisted);
  }, [boardId, name, bgUrl, bgColor]);

  // console.log("함수 넘어왔니", saveRecentlyViewed, checkLocalStorage);

  const bgActive = {
    height: "100%",
    backgroundColor: isHovered ? "#0000004d" : "",
    // zIndex: "10",
  };
  // console.log("starIsClicked", starIsClicked);
  console.log("bgColor: ", bgColor)
  // useEffect(() => {}, [starIsClicked]);
  return (
    <div className="board-list-item__wrapper">
      <div className="board-list-item">
        <div
          // to={url}
          className="board-list-item-bg"
          onMouseEnter={handleHoverOnBoardItem}
          onMouseLeave={handleHoverOnBoardItem}
          style={{background: `${bgColor}`}}
        >
          {/* <img
            className="board-list-item-bg__img"
            src={bgUrl}
            alt="background image"
          /> */}
          <div className="board-list-item__name-1">{name}</div>
          {isHovered ? (
            <div className="board-list-item-overlay">
              <Link
                className="board-link-item-link"
                // to={`/b/${boardId}/${name}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveRecentlyViewed();
                  navigate(`/b/${boardId}/${name}`, {state :{
                    userId,
                    workspaceId
                  }});
                }}
              >
                <div className="board-list-item-overlay__inner">
                  <div className="board-list-item__name-2">{name}</div>
                  <div className="board-list-item-favorite-icon__wrapper">
                    {starIsClicked ? (
                      // <Lottie options={options} width={20} height={20} />
                      <Lottie
                        className="board-list-item-favorite__lottie"
                        lottieRef={starRef}
                        loop={false}
                        // onComplete={() => {
                        //   console.log("complete");
                        //   console.log("current", starRef.current);
                        //   starRef.current?.stop();
                        //   // starRef.current
                        // }}
                        animationData={starAnimation}
                        onClick={(e) => {
                          e.preventDefault();
                          handleStarAnimation(e);
                          starRef.current?.goToAndStop(0, true);
                          // starRef.current?.playSegments([0, 100], true);
                        }}
                      />
                    ) : (
                      <Lottie
                        className="board-list-item-favorite__lottie"
                        lottieRef={starRef}
                        autoplay={false}
                        loop={false}
                        // onSegmentStart={() => {

                        // }}
                        // onComplete={() => {
                        //   console.log("complete");
                        //   console.log("current", starRef.current);
                        //   starRef.current?.goToAndStop(80, true);
                        //   // starRef.current
                        // }}
                        animationData={starAnimation}
                        // initialSegment={[0, 0]}
                        onClick={(e) => {
                          e.preventDefault();
                          handleStarAnimation(e);
                          starRef.current?.playSegments([0, 100], true);
                          // starRef.current?.playSegments([0, 100], true);
                        }}
                      />
                      // <FiStar
                      //   className="board-list-item-favorite__icon"
                      //   onClick={handleStarAnimation}
                      // />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
