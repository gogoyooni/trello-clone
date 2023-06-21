import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import workspaceService from "./features/workspace/workspaceService";

const BASE_URL = "http://localhost:3000";

// method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }

const useUserStore = create(
  devtools(
    persist(
      (set, get) => ({
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
        setIsLoggedIn: () =>
          set((state) => ({ isLoggedIn: !state.isLoggedIn })),
        setUsername: (username) => set((state) => ({ username: username })),
        // setPassword: (password) => set((state) => ({ password: password })),
        accessToken: "",
        setAccessToken: (token) => set((state) => ({ accessToken: token })),
        // setSignupUSERNAME: (username) =>
        //   set((state) => ({ signupUSERNAME: username })),
        // setSignupPW: (password) => set((state) => ({ signupPW: password })),
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
          localStorage.removeItem("user-info");
          const { loginUsername, loginPassword } = userData;
          return await axios
            .post(`${BASE_URL}/api/auth/users/login`, {
              data: {
                loginUsername,
                loginPassword,
              },
            })
            .then((data) => {
              // console.log("store안에 로그인 데이터", data);

              set((state) => ({
                _id: data.data._id,
                username: data.data.username,
                isLoggedIn: true,
                accessToken: data.data.accessToken,
              }));
              // get().setId(data.data._id);
              // get().setAccessToken(data.data.accessToken);
              // get().setUsername(data.data.username);
              // get().setIsLoggedIn();

              return data;
            })
            .catch((e) => {
              return e.response;
            });

          // console.log("login response: ", response);
        },
        logout: async () => {
          set((state) => ({
            _id: "",
            username: "",
            isLoggedIn: false,
            accessToken: "",
          })),
            localStorage.removeItem("user-info");
        },
        createWorkspace: async (workspaceName) => {
          const id = get()._id;
          const token = get().accessToken;
          console.log("id: ", id);

          return workspaceService._createWorkspace(
            `/api/user/${id}/workspace`,
            { workspaceName },
            token
          );
        },
        getWorkspace: async (workspaceId) => {
          const id = get()._id;
          const token = get().accessToken;

          return await workspaceService._getWorkspace(
            `/api/user/${id}/workspace/${workspaceId}`,
            {},
            token
          );
        },
        getWorkspaces: async () => {
          const id = get()._id;
          const token = get().accessToken;

          return workspaceService._getWorkspace(
            `/api/user/${id}/workspaces`,
            {},
            token
          );
        },
        // bears: 0,
        // removeAllBears: () => set({ bears: 0 }),
        // addBear: () => set({ bears: get().bears + 1 }),
      }),
      {
        name: "user-info",
      }
    )
  )
);

export default useUserStore;
