import { ActiveTask } from "../models/ActiveTaskModel.js";
import { CompletedTask } from "../models/CompletedTaskModel.js";
import { Task } from "../models/TaskModel.js";
import { v4 as uuidv4 } from "uuid";

// Add Task controller
export const addTask = async (req, res) => {
  try {
    const { title } = req.body;

    const userId = req.user._id;

    const taskId = uuidv4();

    const taskOptions = { userId, _id: taskId, title };

    // Add new task to the Task Model
    const newTask = await Task.create(taskOptions);

    // Add the new task to the Active Task Model
    const activeTask = await ActiveTask.create(taskOptions);

    res.status(200).json({
      success: true,
      message: "Task added successfully",
      newTask,
      activeTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Task controller
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Delete the task from Task Model
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Delete the task from Active Task Model
    await ActiveTask.findOneAndDelete({ _id: taskId });

    // Delete the task from Completed Task Model
    await CompletedTask.findOneAndDelete({ _id: taskId });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Completed Task controller
export const deleteCompletedTask = async (req, res) => {
  try {
    // Delete all the completed tasks from Task Model
    await Task.deleteMany({ completed: true });

    // Delete all the completed tasks from Task Model
    await CompletedTask.deleteMany({});

    res.status(200).json({
      success: true,
      message: "Tasks deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Task controller
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    const task = await Task.findById(taskId);
    const activeTask = await ActiveTask.findById(taskId);
    const completedTask = await CompletedTask.findById(taskId);

    task.completed = !task.completed;

    if (task.completed === true) {
      // Delete task from Active Task Model
      activeTask.deleteOne();

      // Add the completed task to the Complete Task Model
      await CompletedTask.create({
        userId,
        _id: task._id,
        title: task.title,
        completed: task.completed,
      });
    } else {
      // Delete the task from the Completed Task Model
      completedTask.deleteOne();

      // Add the task back to the Active Task Model
      await ActiveTask.create({
        userId,
        _id: task._id,
        title: task.title,
        completed: task.completed,
      });
    }

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Active Tasks
export const getAllActiveTasks = async (req, res) => {
  try {
    const activeTasks = await ActiveTask.find({
      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
      activeTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Completed Tasks
export const getAllCompletedTasks = async (req, res) => {
  try {
    const completedTasks = await CompletedTask.find({
      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
      completedTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
