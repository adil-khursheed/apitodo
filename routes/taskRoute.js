import { isAuthenticated } from "../middleware/auth.js";
import express from "express";
import {
  addTask,
  deleteCompletedTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Add Task route
router
  .route("/newtask")
  .post(isAuthenticated, addTask)
  .get(isAuthenticated, getAllTasks);

// Delete and update task route
router
  .route("/task/:taskId")
  .get(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

// Delete completed tasks route
router.route("/clearcompleted").delete(isAuthenticated, deleteCompletedTask);

export default router;
