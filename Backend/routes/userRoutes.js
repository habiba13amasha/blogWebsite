import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  userProfile
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { body } from "express-validator";
const router = express.Router();

// Route to register a new user
router.post(
  "/register",
  [
    body("userName").notEmpty().withMessage("userName is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);
// Route to login an existing user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);
// Route to logout a user
router.get("/logout", protect, logoutUser);
router.get("/user-profile", protect, userProfile);
export default router;
