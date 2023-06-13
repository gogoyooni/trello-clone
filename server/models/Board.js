const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    name: String,
    data: [
      {
        column: Number,
        title: String,
        tasks: [
          {
            taskId: {
              type: mongoose.Schema.Types.ObjectId,
            },
            title: String,
            description: String,
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
