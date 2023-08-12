import express from "express";
import {
  forgotPassword,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  verify,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Register route
router.route("/register").post(register);

// Verify route
router.route("/verify").post(isAuthenticated, verify);

// Login route
router.route("/login").post(login);

// Logout route
router.route("/logout").post(logout);

// Get My Profile route
router.route("/me").get(isAuthenticated, getMyProfile);

// Update Profile route
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// Update Password route
router.route("/updatepassword").put(isAuthenticated, updatePassword);

// Forgot password route
router.route("/forgotpassword").post(forgotPassword);

// Reset password route
router.route("/resetpassword").put(resetPassword);

export default router;
