const Category = require("../model/caregory");

const getCategory = async (req, res) => {
  const { id } = req.user;
  try {
    const cat = await Category.find({ userEmail: id });
    return res.status(200).json({ cat });
  } catch (err) {
    console.error("An error ocurred in getCategory function ", err);
    res
      .status(500)
      .json({ message: "An error ocurred while getting categories " });
  }
};

const addCategory = async (req, res) => {
  const { name } = req.body;
  console.log("this is bieng executed ", req.body);
  try {
    await Category.create({ category: name, userEmail: req.user.id });
    return res.status(200).json({ message: "Category added succesfully" });
  } catch (err) {
    console.error("An error occured in addCategory function ", err);
    return res
      .status(500)
      .json({ message: "An error occured while getting category " });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findOneAndDelete({ _id: id });
    return res.status(202).json({ message: "Category deleted succesfully" });
  } catch (err) {
    console.error("An error occured in deleteCategory function ", err);
    return res
      .status(500)
      .json({ message: "An error occured while deleting the tasks" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body; // Access the nested body object
  const { name } = body; // Then, access the name property from the nested body object
  console.log("Body ", req.body);
  console.log(id, "  name  ", name);
  try {
    await Category.findOneAndUpdate({ _id: id }, { name }); // Also, note the change here
  } catch (err) {
    console.error("An error occured in the updateCategory function ", err);
    return res
      .status(500)
      .json({ message: "An error occured while updating the category" });
  }
};

module.exports = { addCategory, getCategory, updateCategory, deleteCategory };
