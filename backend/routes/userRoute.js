import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  loginUser,
  verifyOtp,
  getUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/verifyotp", verifyOtp);
router.route("/login").post(loginUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
