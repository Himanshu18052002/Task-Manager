const Tasks = require("../model/tasks.js");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({ userEmail: req.user.id });

    return res
      .status(200)
      .json({ message: "Here is the tasks ", tasks: tasks });
  } catch (err) {
    console.error("An error occured while getting all tasks : ", err);
    return res
      .status(400)
      .json({ message: "An error occured in getting all tasks " });
  }
};

const taskDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    return res
      .status(200)
      .json({ message: "Task found succesfully ", task: task });
  } catch (err) {
    console.error("An error occured in tasksDetails: ", err);
    return res
      .status(400)
      .json({ message: "An error occured while getting tasks " + err });
  }
};

const addTask = async (req, res) => {
  console.log("Hewe is the task ", req.body);
  try {
    const { title, description, priority, category, status, date, deadLine } =
      req.body;

    await Tasks.create({
      title,
      description,
      priority,
      category,
      status,
      date,
      deadLine,
      userEmail: req.user.id,
    });
    return res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    console.error("An error occured in add task function ", err);
    return res
      .status(400)
      .json({ message: "An error occured while adding tasks " + err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, category, status, date, deadLine } =
      req.body;
    await Tasks.findByIdAndUpdate(id, {
      title,
      description,
      priority,
      category,
      status,
      date,
      deadLine,
    });
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    console.error("An error occured in the update tasks function ", err);
    return res
      .status(400)
      .json({ message: "An error occured while updating tasks " + err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Tasks.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task Deleted succesfully" });
  } catch (err) {
    console.error("An error occured in deleteTasks function ", err);
    return res
      .status(400)
      .json({ message: "AN error occured while deleting the tasks" + err });
  }
};

module.exports = { getAllTasks, taskDetails, addTask, updateTask, deleteTask };
