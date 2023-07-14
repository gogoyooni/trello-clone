const mongoose = require("mongoose");
const Task = require("./Task");

const columnSchema = new mongoose.Schema(
  {
    column: {
      type: String,      
    },
    title: {
      type: String,
    },
    tasks: [Task.schema]  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Column", columnSchema);
