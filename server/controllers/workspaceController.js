const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc User creates a workspace (when signing up)
// @route POST /api/users/:id/workspace
// @access Private

const getWorkspace = asyncHandler(async (req, res) => {
  // console.log("req.params:", req.params);
  const { id } = req.params;
  // console.log("id::", id);
  // const { workspaceName } = req.body;

  // console.log("workspace name:: ", workspaceName);
  // Check if user exists
  const user = await User.findOne({ _id: id });

  // return res.status(200).json({ message: "workspace data" });
  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  } else {
    const { workspaces } = await User.findById({ _id: id });

    return res.status(200).json({ workspaces });
  }
});

// @desc User creates a workspace (when signing up)
// @route POST /api/users/:id/workspace
// @access Private

const createWorkspace = asyncHandler(async (req, res) => {
  // console.log("req.params:", req.params);
  const { id } = req.params;
  // console.log("id::", id);
  const { workspaceName } = req.body;

  // console.log("workspace name:: ", workspaceName);
  // Check if user exists
  const user = await User.findOne({ _id: id });

  // return res.status(200).json({ message: "workspace data" });
  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  } else {
    //   // if (!user.workspaces?.length) {
    //   //   user.
    //   // }

    await User.findByIdAndUpdate(
      { _id: id },
      {
        workspaces: [
          {
            name: workspaceName,
            isOwner: true,
          },
        ],
      }
    );

    return res
      .status(200)
      .json({ message: "Successfuly updated your workspace" });
  }
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

module.exports = { getWorkspace, createWorkspace };
