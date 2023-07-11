import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import "./styles/UserBoards.css";
import Img1 from "../assets/bg1.jpg";
import Img2 from "../assets/bg2.jpg";
import Img3 from "../assets/bg3.jpg";
import NoActivity from "../components/NoActivity";
import RecentlyViewed from "../components/RecentlyViewed";
import RecentlyViewedHeader from "../components/RecentlyViewedHeader";
import UserWorkspacesBoards from "../components/UserWorkspacesBoards";
import Loading from "../components/Loading";
import useUserStore from "../store";
import RecentlyViewedContainer from "../components/RecentlyViewedContainer";
import RecentlyViewedList from "../components/RecentlyViewedList";
import FlexContainer from "../components/FlexContainer";
import CreateBoardModal from "../components/CreateBoardModal";
import useBoardStore from "../stores/BoardStore";

const data = [
  {
    name: "테스트1",
    img: Img1,
    boardId: "qweqweasd",
  },
  {
    name: "테스트2",
    img: Img2,
    boardId: "qweqweqwe",
  },
  {
    name: "테스트3",
    img: Img3,
    boardId: "qweqrqweasd",
  },
];

// Workspace 데이터와 각 workspace에 포함된 Boards 데이터 다 받아서 여기서 props drilling 해야함 -> 한유저가 가지고 있는 모든 워크스페이스와 데이터 다 가져온다.

export default function UserBoards() {
  const { username } = useParams();
  // const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { workspaces } = useOutletContext();
  const [recentlyViewedBoards, setRecentlyViewedBoards] = useState([]);

  const userId = useUserStore((state) => state._id);

  // const [createBoardIsClicked, setCreateBoardIsClicked] = useState(false);
  const [createBoardPositions, setCreateBoardPositions] = useState({});
  const [createBoardModalPosition, setCreateBoardModalPosition] = useState({});

  const passRef = useBoardStore((state) => state.passRef);
  const createBoardRef = useRef();
  // passRef({}, createBoardRef);

  const refForChild = useBoardStore((state) => state.ref);

  // @ createBoard 관련 states
  const createBoardIsClicked = useBoardStore(
    (state) => state.createBoardIsClicked
  );
  const setCreateBoardIsClicked = useBoardStore(
    (state) => state.setCreateBoardIsClicked
  );

  const getCreateBoardPosition = useBoardStore(
    (state) => state.getCreateBoardPosition
  );
  const modalPosition = useBoardStore((state) => state.modalPosition);
  const setModalPosition = useBoardStore((state) => state.setModalPosition);

  // useEffect(() => {
  //   // console.log(refForChild.current.innerHTML);
  //   // refForChild.current
  //   //1. 보드 추가 하는 버튼을 클릭한다.
  //   //2. 보드를 만드는 모달이 뜬다.
  //   //3. 모달은 브라우저 스크린의 위치에 따라서 클릭한 보드 추가 버튼의 왼쪽 또는 오른쪽에 위치한다.
  // }, []);

  // const [windowSize, setWindowSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });

  // const createBoardRef = useRef();

  // console.log("_id in userboards :", _id);
  // console.log("workspaces:::::::::::::::::", workspaces);

  // const getWorkspaces = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await workspaceService._getWorkspaces(
  //       `/api/user/${username}/workspaces`,
  //       {},
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTliMmZmNTVmNTdkNzZiMmRmM2ZmMCIsImlhdCI6MTY4ODAyNjkzNSwiZXhwIjoxNjg4NjMxNzM1fQ.GuwhPv0EviA6d54XWnXM_3E1Ssq8WCbUbu-KT2Mfwjc"
  //     );

  //     console.log(data);
  //     setIsLoading(false);
  //     setWorkspaces(data);
  //   } catch (e) {
  //     setIsLoading(false);
  //     // throw new Error(e);
  //     return <div>Something wrong</div>;
  //   }
  // };
  // if (!workspaces?.length < 1) {
  //   return <Loading />;
  // } else {
  //   return <UserWorkspacesBoards data={workspaces} />;
  // }

  // useEffect(() => {
  //   getWorkspaces();
  // }, []);
  // const saveRecentlyVeiwed = useUserStore(state => state.saveRecentlyVeiwed);

  const showRemainingBoards = useMemo(
    (data) => {
      if (typeof data === "object" && data.length > 0) return 10 - data.length;
    },
    [data.length]
  );

  const checkLocalStorage = useUserStore((state) => state.checkLocalStorage);
  const saveRecentlyViewed = useUserStore((state) => state.saveRecentlyViewed);
  const getRecentlyViewed = useUserStore((state) => state.getRecentlyViewed);

  useEffect(() => {
    setRecentlyViewedBoards(getRecentlyViewed(userId));
    passRef({}, createBoardRef);
    // window.addEventListener("resize", () => {
    //   setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    //   // console.log("window width: ", windowSizes.width);
    //   console.log("window::::::::::", windowSize.width);
    // });
  }, []);

  // console.log("workspaces inside Userboards::::", workspaces);
  console.log(
    "recentlyViewedBoards",
    recentlyViewedBoards,
    "userID::::",
    userId
  );
  // console.log()
  useEffect(() => {
    window.addEventListener("resize", () => {
      // console.log("Ref:", refFromUserBoards.current.getBoundingClientRect());
      // console.log("Ref:", refForChild.current.getBoundingClientRect());
      // setModalPosition(getCreateBoardPosition(refFromUserBoards.current));
      setModalPosition(getCreateBoardPosition(refForChild?.current));
    });

    return () => {
      window.removeEventListener("resize", () => {
        console.log("clean up resize event");
      });
    };
  }, [window.innerWidth]);
  return (
    <div className="user-boards-content__section">
      {/* <header className="workspace-content__header">
        <div className=""></div>
      </header> */}
      u/{username}/boards
      {/* {data?.length > 0 ? <BoardList boards={data} /> : <NoActivity />} */}
      {/* RecentlyViewed는 localStorage이용해서 만들기 */}
      <RecentlyViewedContainer>
        <RecentlyViewedHeader />
        <RecentlyViewedList
          recentlyViewedBoards={recentlyViewedBoards && recentlyViewedBoards}
        />
      </RecentlyViewedContainer>
      {/* <RecentlyViewed
        // boards={data}
        recentlyViewedBoards={recentlyViewedBoards}
      /> */}
      {workspaces && workspaces?.length === 0 ? (
        <FlexContainer>
          <Loading />
        </FlexContainer>
      ) : (
        <UserWorkspacesBoards
          data={workspaces}
          showRemainingBoards={showRemainingBoards}
          saveRecentlyViewed={saveRecentlyViewed}
          checkLocalStorage={checkLocalStorage}
          // createBoardIsClicked={createBoardIsClicked}
          // setCreateBoardIsClicked={setCreateBoardIsClicked}
          // reßf={}
          // ref={createBoardRef}
        />
      )}
      {createBoardIsClicked ? (
        <CreateBoardModal
          modalPosition={modalPosition}
          workspaces={workspaces}
          
        />
      ) : null}
    </div>
  );
}
