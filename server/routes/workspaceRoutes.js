const express = require("express");
const router = express.Router();
const {
  getWorkspace,
  createWorkspace,
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.get("/:id/workspace", getWorkspace);
router.post("/:id/workspace", createWorkspace);

// router.post("/login", login);
// router.get("/", protect, getUser);

module.exports = router;
//
