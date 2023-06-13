import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const useWorkspaceStore = create(
  devtools((set, get) => ({
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
    getWorkspaceInfo: async () => {
      const { _id } = userData;
      return axios
        .post(`${BASE_URL}/api/user`, {
          data: {
            signupUsername,
            signupPassword,
          },
        })
        .then((data) => {
          return data;
        })
        .catch((e) => {
          return e.response;
          // console.log(e.status, e.response);
        });
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
    // bears: 0,
    // removeAllBears: () => set({ bears: 0 }),
    // addBear: () => set({ bears: get().bears + 1 }),
  }))
);

export default useWorkspaceStore;

// import axios from 'axios'

// const API_URL = '/api/goals/'

// // Create new goal
// const createGoal = async (goalData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.post(API_URL, goalData, config)

//   return response.data
// }

// // Get user goals
// const getGoals = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.get(API_URL, config)

//   return response.data
// }

// // Delete user goal
// const deleteGoal = async (goalId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.delete(API_URL + goalId, config)

//   return response.data
// }

// const goalService = {
//   createGoal,
//   getGoals,
//   deleteGoal,
// }

// export default goalService
