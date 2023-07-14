const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Workspace = require("../models/Workspace");
const { ObjectId } = require("mongodb");
const Board = require("../models/Board");
const Column = require("../models/Column");

// @desc User creates a single board
// @route POST /api/users/:id/workspaces/:workspaceId/boards/
// @access Private

const createBoard = asyncHandler(async (req, res) => {
  // console.log("req.params:", req.params);
  // const { id, workspaceId } = req.params;
  const { id, workspaceId } = req.params;
  console.log("나오지?:", id, workspaceId);

  const {boardTitle, bgColor, workspaceName} = req.body;
  console.log("저장하려는 데이터:",boardTitle, bgColor, workspaceName )

  // console.log()

  //   console.log()
  // Check if user exists
  const user = await User.findOne({ _id: id });

  console.log("유저도 나오니?", user);

  // 또는 populate({ path: 'bestFriend' })도 가능
  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  } else {
    const workspaceDoc = await Workspace.findOne({ _id: workspaceId })
    console.log("workspaceDoc: ", workspaceDoc)

  const newBoard = await Board.create({
      name : boardTitle,
      data: [],
      bgUrl: "",
      bgColor
    })
    workspaceDoc.boards.push(newBoard)
    await workspaceDoc.save();

    return res.status(200).json({ workspace: workspaceDoc });

    // workspaceDoc.boards.push({
      
    // })

      // .then((data) => {
      //   // console.log("getWorkspace ---data ", data.workspaces);
      //   // const workspace = data.workspaces.find((item) => {
      //   //   return item._id.toString() === workspaceId;
      //   // });
      //   console.log("workspace 데이터: ", data);


      //   // return res.status(200).json({ workspace });
      // });
  }

 
});

// @desc User creates a column in a particular board
// @route POST /api/users/:id/workspaces/:workspaceId/boards/:boardId
// @access Private

const createNewColumn = asyncHandler(async (req, res) => {
  // console.log("req.params:", req.params);
  // const { id, workspaceId } = req.params;
  const { id, workspaceId, boardId } = req.params;
  console.log("나오지?:", id, workspaceId, boardId);

  const {column,title} = req.body;
  console.log("저장하려는 데이터:",column, title );

  // console.log()

  //   console.log()
  // Check if user exists
  const user = await User.findOne({ _id: id });

  console.log("유저도 나오니?", user);

  // 또는 populate({ path: 'bestFriend' })도 가능
  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  } else {
    const workspaceDoc = await Workspace.findOne({ _id: workspaceId })
    console.log("workspaceDoc: ", workspaceDoc)

    // const test = workspaceDoc.boards.map(board => {
    //   if(board._id.toString() === boardId){
    //     return board;
    //   }
    //   // if(board._id === boardId){
    //   //   console.log("일치하는거 나오는거같은데")
    //   //   return board;
    //   // }
    // })
    const newColumn = await Column.create({
      column,
      title,
      tasks: []
    })
    // console.log("test:::", test);
    workspaceDoc.boards.map(board => {
      if(board._id.toString() === boardId){
        // const dataToInsert = {
        //  column,
        //  title,
        //  tasks: []
        // }
        board.data.push(newColumn);
        
      }
    })

    await workspaceDoc.save();
    return res.status(200).json({ board: workspaceDoc });
  }

 
});





module.exports = { createBoard, createNewColumn};