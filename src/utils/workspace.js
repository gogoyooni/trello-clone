import img1 from "../assets/bg1.jpg";
import img2 from "../assets/bg2.jpg";
import img3 from "../assets/bg3.jpg";
import img4 from "../assets/bg4.jpg";
import img5 from "../assets/bg5.jpg";
import img6 from "../assets/bg6.jpg";

export const getFirstLetter = (workspaceData) => {
  return workspaceData.split("")[0];
};

// 이 함수는 아직 완성안됨 @desc saving user info into localStorage on login
export const saveUserInfo = (data) => {
  console.log("saveUserInfo -- data: ", data);
  const {
    data: { username, _id, accessToken },
  } = data;
  // const userData = {
  //   state: {
  //     _id,
  //     username,
  //     userIndex: null,
  //     accessToken,
  //     isLoggedIn: true,
  //     recentlyViewed: [],
  //   },
  // };
  console.log("후후훟", username, _id, accessToken);

  const userData = [
    {
      _id,
      username,
      userIndex: null,
      accessToken,
      isLoggedIn: true,
      recentlyViewed: [],
    },
  ];
  // checkUserHasLoggedIn(username);

  // localStorage.setItem(`${username}`, JSON.stringify(userData));
  localStorage.setItem("users", JSON.stringify(userData));
};

export const initializeLocalStorage = () => {
  localStorage.clear();
};

export const checkUserHasLoggedIn = (username) => {
  // let keys = Object.keys(localStorage);
  // for (let key of keys) {
  console.log("localStorage", JSON.parse(localStorage.getItem("users")));
  if (localStorage.getItem("users") !== null) {
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex((user) => user.username === username);
    if (userIndex > -1) {
      users[userIndex].userIndex = userIndex;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  // if (key === "user") {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user.username === username) {
  //     console.log("welcome back!");
  //   }
  //   // }
  // }
};

export const updateLocalStorage = (key, obj) => {
  localStorage.setItem(key, obj);
};

export const pushRecentlyViewed = (boardId, boardName) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const userIndex = users.findIndex((user) => user.username === username);

  const boardUrl = `/b/${boardId}/${boardName}`;

  // 최근에 접속햇던 보드 데이터 localStorage에 저장
  users[userIndex].recentlyVeiwed.unshift(boardUrl);
  const dataToSave = JSON.stringify(users);
  updateLocalStorage("users", dataToSave);
};

export const getRecentlyViewedBoards = () => {
  localStorage.setItem("");
};

export const getRandomImg = () => {
  const imgArr = [img1, img2, img3, img4, img5, img6];
  const randomIndex = () => {
    return Math.floor(imgArr.length * Math.random());
  };
  return imgArr[randomIndex()];
};
// https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80

export const checkLocalStorage = (id) => {
  return localStorage.getItem(id);
};

export const saveRecentlyVeiwed = (userId, boardId, boardName) => {
  let data = [];
  data.unshift(`/b/${boardId}/${boardName}`);
  localStorage.setItem(userId, JSON.stringify(data));
};

export const getRecentlyVeiwed = (userId) => {
  return JSON.parse(localStorage.getItem(userId));
};
