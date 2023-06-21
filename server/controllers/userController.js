const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
// @desc Register a new user
// @route POST /api/auth/users/signup
// @access Public

const signupUser = asyncHandler(async (req, res) => {
  const { signupUsername, signupPassword } = req.body.data;
  console.log(req.body);
  // all fields are required for signup
  if (!signupUsername || !signupPassword)
    return res.status(400).json({ message: "All fields are required" });

  // Check if user exists
  const userExists = await User.findOne({ username: signupUsername });

  if (userExists) {
    return res.status(409).json({ message: "This username already exists." });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(signupPassword, 10);

  // Create user
  const user = await User.create({
    username: signupUsername,
    password: hashedPassword,
    // workspaces: [
    //   {
    //     name: "",
    //     website: "",
    //     description: "",
    //     isOwner: false,
    //   },
    // ],
  });

  console.log("user::", user);
  if (user) {
    return res.status(201).json({
      _id: user.id,
      username: user.username,
      accessToken: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ message: "Invalid user data received" });
  }

  //   res.json({ message: "Sign up User" });
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
  const { loginUsername, loginPassword } = req.body.data;

  // Check for user email
  const user = await User.findOne({ username: loginUsername }).populate(
    "workspaces"
  );
  console.log("로그인 후에 workspaces Populate 했을때:", user);

  if (!user) {
    return res.status(404).json({ message: "This user doens't exist" });
  }

  if (user && (await bcrypt.compare(loginPassword, user.password))) {
    return res.status(200).json({
      _id: user.id,
      username: user.username,
      accessToken: generateToken(user._id),
      workspaces: user.workspaces,
    });
  } else {
    return res.status(401).json({ message: "Invalid password." });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { signupUser, login, getUser };
