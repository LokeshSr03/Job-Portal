import jwt from "jsonwebtoken";
import asynchandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT).select("-password");
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      throw new Error("token is not authorized");
    }
  } else {
    throw new Error("token not found");
  }
});

export const admin = asynchandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error(`Not Authorized.Only for admins`);
  }
});
