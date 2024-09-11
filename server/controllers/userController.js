const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message:
        "User is not registered or entered password or email is incorrect",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    const access_token = jwt.sign({ id: user.email }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    // req.header.Authorization = "Bearer " + access_token;
    return res.status(200).json({ access_token });
  } else {
    return res.status(400).json({ message: "Invalid password" });
  }
};

const register = async (req, res) => {
  console.log("body: ", req.body);
  const { name, email, password } = req.body;
  const admin = req.body.admin;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: "User is already registered login instead" });
  }
  try {
    const newPass = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const user = await User.create({ name, email, password: newPass, admin });

    return res
      .status(200)
      .json({ message: `User succesfully created ${user}` });
  } catch (error) {
    console.error("An error occured ", error);
    res
      .status(400)
      .json({ message: "Error occured while registering the user" });
  }
};

const user = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ email: id });
    return res
      .status(200)
      .json({ message: "User data found succesfully ", user });
  } catch (err) {
    console.error("An error occured in user detail function ", err);
    return res
      .status(400)
      .json({ message: "An errror occured while getting user Data" });
  }
};

const users = async (req, res) => {
  try {
    const users = await User.find();
    if (!user) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ message: "here are the users", users });
  } catch (err) {
    console.error("An error occured in users funciton ", err);
    return res
      .status(400)
      .json({ message: "An error occured while fetching all users" });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const newPass = await bcrypt.hash(password, await bcrypt.genSalt(10));

    await User.findByIdAndUpdate(id, { name, email, password: newPass });
    return res.status(201).json({ message: "User updated succesfully" });
  } catch (err) {
    console.error("An error occured in edit user function ", err);
    return res
      .status(400)
      .json({ message: "An error occured while editing user data" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted succesfully" });
  } catch (err) {
    console.error("An error occured in the deleteUser fucntion ", err);
    return res
      .status(400)
      .json({ message: "An error occured while deleting the user" });
  }
};

module.exports = {
  login,
  register,
  users,
  user,
  editUser,
  deleteUser,
};
