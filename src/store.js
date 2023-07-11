import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import workspaceService from "./features/workspace/workspaceService";
import { checkUserHasLoggedIn } from "./utils/workspace";

const BASE_URL = "http://localhost:3000";

// method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }

const checkLocalStorage = (username) => {
  // let keys = Object.keys(localStorage);
  // for (let key of keys) {
  //   console.log(`${key}: ${localStorage.getItem(key)}`);
  // }
  // Object.keys(localStorage).forEach(function (key) {
  //   const userData = JSON.parse(localStorage.getItem(key));
  //   if (userData.state.username === username) {
  //   }
  // });
  // if (localStorage.length == 0) return "";
  // return localStorage.length;
  // useUserStore.persist.setOptions({
  //   name: `${username}`,
  // });
  // to rehydrate the zustand store using the new name
  // useUserStore.persist.rehydrate();
};
// checkLocalStorage();

const useUserStore = create(
  persist(
    (set, get) => ({
      userIndex: 0, // default value
      _id: "",
      username: "",
      // signupUsername: "",
      // password: "",
      // isSignedUp: false,
      isLoggedIn: false,
      setId: (id) => {
        set((state) => ({ _id: id }));
      },
      // setIsSignedUp: () => {
      //   set((state) => ({ isSignedUp: !state.isSignedUp }));
      // },
      // setSignupUsername: (username) => {
      //   set((state) => ({ signupUsername: username }));
      // },
      setIsLoggedIn: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
      setUsername: (username) => set((state) => ({ username: username })),
      // setPassword: (password) => set((state) => ({ password: password })),
      accessToken: "",
      setAccessToken: (token) => set((state) => ({ accessToken: token })),
      // setSignupUSERNAME: (username) =>
      //   set((state) => ({ signupUSERNAME: username })),
      // setSignupPW: (password) => set((state) => ({ signupPW: password })),
      recentlyVeiwed: [],
      signup: async (userData) => {
        // always initialize "user-info" data in localstorage
        localStorage.removeItem("user-info");
        const { signupUsername, signupPassword } = userData;
        return await axios
          .post(`${BASE_URL}/api/auth/users/signup`, {
            data: {
              signupUsername,
              signupPassword,
            },
          })
          .then((data) => {
            console.log("data in signup: ", data);
            // to check if the signd up user who makes his/her workspace
            set((state) => ({
              // signupUsername: data.data.username,
              _id: data.data._id,
              isLoggedIn: true,
              username: signupUsername,
              // isSignedUp: true,
              accessToken: data.data.accessToken,
            }));
            // get().setSignupUsername(data.data.username);
            // get().setId(data.data._id);
            // get().setIsSignedUp();
            // get().setAccessToken(data.data.accessToken);
            return data;
          })
          .catch((e) => {
            return e.response;
            // console.log(e.status, e.response);
          });
      },
      login: async (userData) => {
        // initialize "user-info" data before logging in
        //check if user data exists in localstorage
        // localStorage.removeItem("user-info");
        const { loginUsername, loginPassword } = userData;

        // Object.keys(localStorage).forEach(function (key) {
        //   console.log(JSON.parse(localStorage.getItem(key)));
        // });

        return await axios
          .post(`${BASE_URL}/api/auth/users/login`, {
            data: {
              loginUsername,
              loginPassword,
            },
          })
          .then((data) => {
            // console.log("store안에 로그인 데이터", data);
            let userdata, users, userIndex;
            set((state) => ({
              _id: data.data._id,
              username: data.data.username,
              isLoggedIn: true,
              accessToken: data.data.accessToken,
            }));

            const userInfo = {
              _id: data.data._id,
              username: data.data.username,
              isLoggedIn: true,
              accessToken: data.data.accessToken,
            };

            localStorage.setItem("user", JSON.stringify(userInfo));
            // 처음 로그인할때
            // if (localStorage.getItem("users") == null) {
            //   localStorage.setItem("users", JSON.stringify([userInfo]));
            // } else if (localStorage.getItem("users") !== null) {
            //   // 유저가 예전에 로그인한 적이 있을때
            //   users = JSON.parse(localStorage.getItem("users"));
            //   userIndex = users.findIndex(
            //     (user) => user.username === loginUsername
            //   );
            //   if (userIndex > -1) {
            //     users[userIndex].userIndex = userIndex;
            //     localStorage.setItem("users", JSON.stringify(users));
            //     userdata = [userInfo];
            //   } else if (userIndex === -1) {
            //     // 로그인 한적 없고 처음 했는데(로컬스토리지에 기록이 없음)
            //     // 기존 array에 저장된 유저 에 push 해줘야됨
            //     users.push(userInfo);
            //     users[users.length - 1].userIndex = users.length - 1;
            //     localStorage.setItem("users", JSON.stringify(users));
            //   }
            // }

            return data;
          })
          .catch((e) => {
            return e.response;
          });

        // console.log("login response: ", response);
      },
      logout: async () => {
        // localStorage.clear();
        set((state) => ({
          _id: "",
          username: "",
          isLoggedIn: false,
          accessToken: "",
        }));
      },
      createWorkspace: async (workspaceName) => {
        // const id = localStorage.getItem("user", _id);
        // const token = localStorage.getItem("user", accessToken);
        const id = get()._id;
        const token = get().accessToken;

        // const id = get()._id;
        // const token = get().accessToken;
        // console.log("id: ", id);

        return await workspaceService._createWorkspace(
          `/api/user/${id}/workspace`,
          { workspaceName },
          token
        );
      },
      getWorkspace: async (workspaceId) => {
        const id = get()._id;
        const token = get().accessToken;
        // const id = localStorage.getItem("user", id);
        // const token = localStorage.getItem("user", accessToken);

        return await workspaceService._getWorkspace(
          `/api/user/${id}/workspace/${workspaceId}`,
          {},
          token
        );
      },
      getWorkspaces: async () => {
        const id = get()._id;
        const token = get().accessToken;
        // const id = localStorage.getItem("user", id);
        // const token = localStorage.getItem("user", accessToken);
        console.log(
          "inside getWorkspaces function in store:::::",
          id,
          accessToken
        );
        return await workspaceService._getWorkspaces(
          `/api/user/${id}/workspaces`,
          {},
          token
        );
      },
      // checkUserHasLoggedIn: (username) => {

      //   const users = JSON.parse(localStorage.getItem("users"));
      //   const userIndex = users.findIndex((user) => user.username === username);
      //   if (userIndex > -1) {
      //     users[userIndex].userIndex = userIndex;
      //     localStorage.setItem("users", JSON.stringify(users));
      //   }
      // },
      initializeLocalStorage: () => {
        localStorage.clear();
      },
      updateLocalStorage: (key, obj) => {
        localStorage.setItem(key, obj);
      },
      // getParticularUser : (username) => {
      //   const users = JSON.parse(localStorage.getItem("users"));
      //   const userIndex = users.findIndex((user) => user.username === username);

      // },
      pushRecentlyViewed: (boardId, boardName, username) => {
        // const user = JSON.parse(localStorage.getItem("user"));
        // const boardUrl = `/b/${boardId}/${boardName}`;

        // // 최근에 접속햇던 보드 데이터 localStorage에 저장
        // user.recentlyVeiwed.push(boardUrl);
        // const dataToSave = JSON.stringify(user);
        // get().updateLocalStorage("user", dataToSave);

        // console.log("이것도 안먹히니?");

        // sessionstorage에 유저의 _id로 key 값으로 만들고 거기에 recentlyViewed에 대한 링크 array에 저장한다.

        const users = JSON.parse(localStorage.getItem("users"));
        const userIndex = users.findIndex((user) => user.username === username);

        const boardUrl = `/b/${boardId}/${boardName}`;

        // 최근에 접속햇던 보드 데이터 localStorage에 저장
        users[userIndex].recentlyVeiwed.unshift(boardUrl);
        const dataToSave = JSON.stringify(users);
        localStorage.setItem("users", dataToSave);
      },
      checkLocalStorage: (userId) => {
        return localStorage.getItem(userId);
      },
      saveRecentlyViewed: (boardId, boardName, bgUrl) => {
        let data = [];
        data.unshift({
          boardId,
          boardName,
          url: `/b/${boardId}/${boardName}`,
          bgUrl: bgUrl,
        });
        localStorage.setItem(get()._id, JSON.stringify(data)); // 이 줄에 쓰인 boardId는 유저아이디이지만 boardId로 활용하고있음
      },
      getRecentlyViewed: (userId) => {
        return JSON.parse(localStorage.getItem(userId));
      },
    }),
    {
      name: "user-info",
    },
    {
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
