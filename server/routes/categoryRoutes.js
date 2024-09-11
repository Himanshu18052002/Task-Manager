const express = require("express");
const {
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const routes = express.Router();
const authToken = require("../middleware/authToken");

routes.get("/categories", authToken, getCategory);

routes.post("/add-category", authToken, addCategory);

routes.delete("/delete-category/:id", authToken, deleteCategory);

routes.put("/update-category/:id", authToken, updateCategory);

module.exports = routes;
