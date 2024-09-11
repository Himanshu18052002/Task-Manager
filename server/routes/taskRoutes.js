const express = require("express");
const {
  getAllTasks,
  taskDetails,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");
const authToken = require("../middleware/authToken");
const router = express.Router();

router.get("/all-tasks", authToken, getAllTasks);

router.get("/task-details/:id", authToken, taskDetails);

router.post("/add-tasks", authToken, addTask);

router.put("/edit-tasks/:id", authToken, updateTask);

router.delete("/delete-task/:id", authToken, deleteTask);

module.exports = router;
