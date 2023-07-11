const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Workspace = require("../models/Workspace");

// @desc User creates a single board
// @route POST /api/users/:id/workspace/:workspaceId/board/:boardId
// @access Private

const createBoard = asyncHandler(async (req, res) => {
  // console.log("req.params:", req.params);
  const { id, workspaceId } = req.params;
  // const { workspaceName } = req.body;

  //   console.log()
  // Check if user exists
  const user = await User.findOne({ _id: id });

  // 또는 populate({ path: 'bestFriend' })도 가능
  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  } else {
    await Workspace.findById({ _id: workspaceId })
      .lean()
      .then((data) => {
        // console.log("getWorkspace ---data ", data.workspaces);
        // const workspace = data.workspaces.find((item) => {
        //   return item._id.toString() === workspaceId;
        // });
        console.log(data);

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
