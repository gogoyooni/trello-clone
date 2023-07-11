const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Workspace = require("../models/Workspace");
const Board = require("../models/Board");
const Task = require("../models/Task");

// @desc User gets a single workspace (when signing up)
// @route GET /api/users/:id/workspace/:workspaceId
// @access Private

const getWorkspace = asyncHandler(async (req, res) => {
  console.log("req.params:", req.params);
  const { id, workspaceId } = req.params;
  // const { workspaceName } = req.body;

  console.log("workspaceId - getWorkspace ::::::: ", workspaceId);
  // Check if user exists
  const user = await User.findOne({ _id: id });

  // 또는 populate({ path: 'bestFriend' })도 가능

  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  } else {
    await User.findById({ _id: id })
      .populate("workspaces")
      .then((data) => {
        console.log("getWorkspace ---data ", data.workspaces);
        const workspace = data.workspaces.find((item) => {
          return item._id.toString() === workspaceId;
        });

        return res.status(200).json({ workspace });
      });
  }

  // if (!workspace) {
  //   return res.status(404).json({ message: "This user doesn't exist" });
  // } else {
  //   const { workspaces } = await User.findById({ _id: id });

  //   return res.status(200).json({ workspaces });
  // }
});
// @desc User gets multiple workspaces
// @route GET /api/users/:id/workspaces
// @access Private

const getWorkspaces = asyncHandler(async (req, res) => {
  // console.log("req.params:", req.params);
  const { id } = req.params;

  console.log("id:::::::::::::::::,", id);

  // console.log("workspace name:: ", workspaceName);
  // Check if user exists
  const user = await User.findOne({ _id: id });

  // 또는 populate({ path: 'bestFriend' })도 가능

  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  } else {
    await User.findById({ _id: id })
      .lean()
      .populate("workspaces")
      .then((data) => {
        console.log("data::", data);
        // const testData = data.workspaces;
        return res.status(200).json({ workspaces: data.workspaces });
        // 오리지널;
      });
  }

  // if (!workspace) {
  //   return res.status(404).json({ message: "This user doesn't exist" });
  // } else {
  //   const { workspaces } = await User.findById({ _id: id });

  //   return res.status(200).json({ workspaces });
  // }
});

// @desc User creates a workspace (when signing up and etc.)
// @route POST /api/users/:id/workspace
// @access Private

const createWorkspace = asyncHandler(async (req, res) => {
  console.log("req.params inside createWorkspace:", req.params);
  const { id } = req.params;
  // console.log("id::", id);
  console.log("req.body:::::", req.body);
  const { workspaceName, workspaceDescription } = req.body;
  if (!workspaceName)
    return res.status(404).json({ message: "Workspace name is required" });

  // console.log("workspace name:: ", workspaceName);
  // Check if user exists
  const user = await User.findOne({ _id: id });

  console.log("user inside createWorkspace:::: ", user);
  // return res.status(200).json({ message: "workspace data" });

  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  }
  // const workspace = await Workspace.findOne({ name: workspaceName });

  // if (workspace) {
  //   return res
  //     .status(404)
  //     .json({ message: "This workspace name is already taken" });
  // } else {
  const workspaceMade = await Workspace.create({
    user: user._id,
    name: workspaceName,
    website: "",
    description: workspaceDescription ? workspaceDescription : "",
    isOwner: true,
    boards: [],
    team: [
      {
        memberId: user._id,
        isAdmin: true,
      },
    ],
  });

  user.workspaces.push(workspaceMade._id);
  user.save();

  // const addedWorkspaceArr = workspaces.push(workspaceMade._id.toString());
  // console.log("addedWorkspaceArr: ", addedWorkspaceArr);

  // await User.findOneAndUpdate(
  //   { _id: user._id },
  //   {
  //     workspaces: addedWorkspaceArr,
  //   }
  // );

  return res
    .status(200)
    .json({ message: "Successfuly created your workspace" });
  // }
});

// @desc Get user data
// @route Get /api/auth/users/:username
// @access Public

const getUser = asyncHandler(async (req, res) => {
  const { _id, username } = await User.findById(req.user.id);
  // I can get the data for a particular user ( 로그인한 유저 )
  console.log(_id, username);
  return res.status(200).json({ message: "get user data" });
});

// @desc Authenticate a user (login)
// @route POST /api/auth/users/login
// @access Public

const login = asyncHandler(async (req, res) => {
  const { loginUsername, loginPassword } = req.body;

  // Check for user email
  const user = await User.findOne({ username: loginUsername });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user && (await bcrypt.compare(loginPassword, user.password))) {
    return res.status(200).json({
      _id: user.id,
      username: user.username,
      accessToken: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: "Invalid password." });
  }
});

module.exports = { getWorkspace, getWorkspaces, createWorkspace };
