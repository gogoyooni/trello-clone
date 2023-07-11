import axios from "axios";

let BASE_URL = `http://localhost:3000`;

// Get boards @desc 각 워크스페이스에 포함된 board를 가져온다
const _getBoards = async (url, name, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${BASE_URL}${url}`, name, config)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      return e.response;
    });
};

// Star board( as a Like button) @desc 보드에 favoriteBoardsd에 추가

// Create a board 
// @desc u/유저네임/boards 에서 'Create new board' 모달로 보드 만들때 사용
const _createBoard = async (url, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${BASE_URL}${url}`, data, config)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      return e.response;
    });
};

// Get a workspace
const _getWorkspace = async (url, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${BASE_URL}${url}`, data, config)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      return e.response;
    });
};

// Get multiple workspaces
const _getWorkspaces = async (url, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${BASE_URL}${url}`, data, config)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      return e.response;
    });
};

const boardService = {
  _createBoard,
  
};

export default boardService;
