const express = require("express");
const router = express.Router();
const { signupUser, login, getUser } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/signup", signupUser);
router.post("/login", login);
router.get("/", protect, getUser);

module.exports = router;
