const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    deadLine: {
      type: Date,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
