import Lottie from "lottie-react";
import starAnimation from "../assets/star.json";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, matchPath, useNavigate } from "react-router-dom";

export default function RecentlyViewedItem({
  boardId,
  boardName,
  url,
  bgUrl,
  bgColor,
  ...props
}) {
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

  //   console.log("boardId", boardId);
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
      console.log("star clicked");
      setStarIsClicked((prevState) => !prevState);
    },
    [starIsClicked]
  );

  const handleSaveRecentlyVeiwed = useCallback(() => {
    const saveRecentlyViewed = props.saveRecentlyViewed;
    const checkLocalStorage = props.checkLocalStorage;
    // const dataIsExisted = checkLocalStorage();
    // if (!dataIsExisted) {
    // when it doesn't exist
    saveRecentlyViewed(boardId, boardName, bgUrl, bgColor);
    // console.log("check local storage ::", checkLocalStorage());
    // }
    // console.log("dataIsExisted", dataIsExisted);
  }, [boardId, boardName, bgUrl]);

  // console.log("함수 넘어왔니", saveRecentlyViewed, checkLocalStorage);

  const bgActive = {
    height: "100%",
    backgroundColor: isHovered ? "#0000004d" : "",
    // zIndex: "10",
  };
  console.log("starIsClicked", starIsClicked);

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
          <div className="board-list-item__name-1">{boardName}</div>
          {isHovered ? (
            <div className="board-list-item-overlay">
              <Link
                className="board-link-item-link"
                // to={`/b/${boardId}/${name}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveRecentlyVeiwed();
                  navigate(`/b/${boardId}/${boardName}`);
                }}
              >
                <div className="board-list-item-overlay__inner">
                  <div className="board-list-item__name-2">{boardName}</div>
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
