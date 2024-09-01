import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").get(registerUser);

export default router;
