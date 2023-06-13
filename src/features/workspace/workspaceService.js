import axios from "axios";

let BASE_URL = `http://localhost:3000`;

// Create a workspace
const _createWorkspace = async (url, name, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${BASE_URL}${url}`, name, config)
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

const workspaceService = {
  _createWorkspace,
  _getWorkspace,
};

export default workspaceService;
