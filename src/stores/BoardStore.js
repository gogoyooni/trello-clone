import { create } from "zustand";
// import { persist } from "zustand/middleware";
import axios from "axios";
// import workspaceService from "../features/workspace/workspaceService";

const BASE_URL = "http://localhost:3000";

const useBoardStore = create((set, get) => ({
  ref: null,
  passRef: (props, ref) => {
    set((state) => ({ ref: ref }));

    console.log("props : ", props, "ref : ", ref);
  },
  createBoardIsClicked: false,
  setCreateBoardIsClicked: () =>
    set((state) => ({
      createBoardIsClicked: !state.createBoardIsClicked,
    })),
  closeCreateBoardModal: () => {
    set((state) => ({
      createBoardIsClicked: false,
    }));
  },
  // createBoardPositions: { width: 0, x: 0, y: 0, right: 0 },
  setCreateBoardPositions: (positions) =>
    set((state) => ({
      createBoardPositions: positions,
    })),
  getCreateBoardPosition: (target) => {
    // if (e.target !== e.currentTarget) return;
    // if(target === )
    const screenCenter = window.innerWidth / 2;
    const clickedElemWidth = target?.getBoundingClientRect().width;
    const clickedElemXPosition = target?.getBoundingClientRect().x;
    const clickedElemYPosition = target?.getBoundingClientRect().y;
    const clickedElemRightPosition = target?.getBoundingClientRect().right; // 요소의 넓이 + y값

    return {
      screenCenter: screenCenter,
      width: clickedElemWidth,
      x: clickedElemXPosition,
      y: clickedElemYPosition,
      right: clickedElemRightPosition,
    };
  },
  modalPosition: { top: "0px", left: "0px" },
  setModalPosition: (position) => {
    const { screenCenter, width, x, y, right } = position;
    // position은 {top: 0px, left: 0px} 이런형태
    // right position ( createBoard가 화면 오른쪽에 있을때)
    if (x > screenCenter) {
      set((state) => ({
        modalPosition: {
          top: `-${y + 150}px`,
          left: `${x - width - 150}px`,
        },
      }));
      // return {
      //   top: `-${y + 150}px`,
      //   left: `-${right + 5}px`,
      // };
    }
    // left position ( createBoard가 화면 왼쪽에 있을때)
    if (x < screenCenter) {
      set((state) => ({
        modalPosition: {
          top: `-${y + 150}px`,
          left: `${right + 5}px`,
        },
      }));
      // return {
      //   top: `-${y + 150}px`,
      //   left: `${right + 5}px`,
      // };
    }
  },
  workspaceName: "",
  website: "", // optional
  description: "", //optional
  isWorkspaceInfoEdited: false,
  setIsWorkspaceInfoEdited: () =>
    set((state) => ({
      isWorkspaceInfoEdited: !state.isWorkspaceInfoEdited,
    })),
  setWorkspaceName: (workspaceName) =>
    set((state) => ({ workspaceName: workspaceName })),
  setWebsite: (website) => set((state) => ({ website: website })),
  setDescription: (description) =>
    set((state) => ({ description: description })),
  updateWorkspaceInfo: async (data, id) => {
    return await axios
      .post(`${BASE_URL}/api/workspace/${id}`, {
        data,
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return e.response;
        // console.log(e.status, e.response);
      });
  },
  getWorkspaceInfo: async (workspaceId) => {
    workspaceService._getWorkspace();
    // const { _id } = userData;
    // return axios
    //   .post(`${BASE_URL}/api/user`, {
    //     data: {
    //       signupUsername,
    //       signupPassword,
    //     },
    //   })
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((e) => {
    //     return e.response;
    //     // console.log(e.status, e.response);
    //   });
  },
  login: async (userData) => {
    const { loginUsername, loginPassword } = userData;
    return axios
      .post(`${BASE_URL}/api/auth/login`, {
        data: {
          loginUsername,
          loginPassword,
        },
      })
      .then((data) => {
        // console.log("store안에 로그인 데이터", data);
        get().setAccessToken(data.data.accessToken);
        get().setUsername(data.data.username);
        get().setIsLoggedIn();

        return data;
      })
      .catch((e) => {
        return e.response;
      });

    // console.log("login response: ", response);
  },
  createWorkspace: async (workspaceName) => {
    return await axios.post(`${BASE_URL}/api/user/`);
  },
  getWorkspaceName: (name) => {
    return name;
  },
  // bears: 0,
  // removeAllBears: () => set({ bears: 0 }),
  // addBear: () => set({ bears: get().bears + 1 }),
}));

export default useBoardStore;
