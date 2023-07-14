const express = require("express");
const router = express.Router();
const { createBoard, createNewColumn } = require("../controllers/boardController");

const { protect } = require("../middleware/authMiddleware");

router.post("/:id/workspaces/:workspaceId/boards", protect, createBoard);
// 보드 페이지 안에서 이뤄지는 http request 처리하는 REST api
router.post("/:id/workspaces/:workspaceId/boards/:boardId", protect, createNewColumn);
// router.post("/login", login);
// router.get("/", protect, getUser);

module.exports = router;
