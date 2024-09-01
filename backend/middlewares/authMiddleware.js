import jwt from "jsonwebtoken";
import asynchandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asynchandler(async () => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT);
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      throw new Error("Not Authorized , token failde", error.message);
    }
  } else {
    throw new Error("Token not found");
  }
});
