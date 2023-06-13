const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  console.log("authHeader:", authHeader);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Get token from header
  const token = authHeader.split(" ")[1];
  console.log("token: ", token);

  // Verify token
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // Get user from the token
  req.user = await User.findById(decoded.id).select("-password"); // select 함수 안에 '-'를 붙여줌으로써 password를 제외시킬수 있다.

  next();

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
  //   console.log("error::", err);
  //   console.log("decoded:: ", decoded);
  //   if (err) return res.status(403).json({ message: "Forbidden" });
  //   req.user = decoded.username;
  //   next();
  // });
});

module.exports = { protect };
