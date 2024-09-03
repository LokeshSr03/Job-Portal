import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  loginUser,
  verifyOtp,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/verifyotp", verifyOtp);
router.route("/login").post(loginUser);

export default router;
