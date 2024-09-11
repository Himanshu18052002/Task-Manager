const express = require("express");
const router = express.Router();
const {
  register,
  login,
  user,
  editUser,
  deleteUser,
  users,
} = require("../controllers/userController");
const authToken = require("../middleware/authToken");

router.get("/users", authToken, users);

router.get("/user", authToken, user);

router.post("/register", register);

router.post("/login", login);

router.put("/edit-user-details/:id", authToken, editUser);

router.delete("/delete-user/:id", authToken, deleteUser);

module.exports = router;
