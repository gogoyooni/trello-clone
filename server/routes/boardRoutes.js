const express = require("express");
const router = express.Router();
const { createBoard } = require("../controllers/boardController");

const { protect } = require("../middleware/authMiddleware");

router.post("/:id/workspaces/:workspaceId/boards", protect, createBoard);
// router.post("/login", login);
// router.get("/", protect, getUser);

module.exports = router;
