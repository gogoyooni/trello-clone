const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // workspace: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Workspace",
    // },
    name: {
      type: String,
    },
    bgColor: {
      type:String,
    },
    bgUrl: {
      type: String,
    },
    data: [
      {
        column: {
          type: Number,
        },
        title: {
          type: String,
        },
        // id: {
        //   type: Number
        // },
        tasks: [
          {
            // taskId: {
            //   type: mongoose.Schema.Types.ObjectId,
            // },
            title: {
              type: String,
            },
            description: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", boardSchema);
