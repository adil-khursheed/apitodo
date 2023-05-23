import express from "express";
import {
  addTask,
  deleteCompletedTask,
  deleteTask,
  forgotPassword,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  updateTask,
  verify,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
import cors from "cors";

const corsOptions = {
  origin: "https://todo-beryl-pi.vercel.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = express.Router();

// Register route
router.route("/register").post(cors(corsOptions), register);

// Verify route
router.route("/verify").post(isAuthenticated, verify);

// Login route
router.route("/login").post(login);

// Logout route
router.route("/logout").get(isAuthenticated, logout);

// Add Task route
router.route("/newtask").post(isAuthenticated, addTask);

// Delete task route
router
  .route("/task/:taskId")
  .get(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

// Get My Profile route
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete completed tasks route
router.route("/clearcompleted").delete(isAuthenticated, deleteCompletedTask);

// Update Profile route
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// Update Password route
router.route("/updatepassword").put(isAuthenticated, updatePassword);

// Forgot password route
router.route("/forgotpassword").post(forgotPassword);

// Reset password route
router.route("/resetpassword").put(resetPassword);

export default router;
