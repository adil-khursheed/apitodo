import { isAuthenticated } from "../middleware/auth.js";
import express from "express";
import {
  addTask,
  deleteCompletedTask,
  deleteTask,
  getAllActiveTasks,
  getAllCompletedTasks,
  getAllTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Add Task route
router.route("/newtask").post(isAuthenticated, addTask);

// Delete and update task route
router
  .route("/task/:taskId")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

// Delete completed tasks route
router.route("/clearcompleted").delete(isAuthenticated, deleteCompletedTask);

// Get All Tasks
router.route("/alltasks").get(isAuthenticated, getAllTasks);

// Get Active Tasks
router.route("/activetasks").get(isAuthenticated, getAllActiveTasks);

// Get Completed Tasks
router.route("/completedtasks").get(isAuthenticated, getAllCompletedTasks);

export default router;
