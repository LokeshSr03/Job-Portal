import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Otp from "../models/otp.js";

const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// Send OTP via email (or phone via SMS gateway)
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or any other email service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });
};

/**
 * @desc		Register new user
 * @route		POST /api/users/
 * @access	public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad request
    throw new Error("User already exists");
  }

  // Create OTP
  const otp = generateOtp();

  // Save OTP in database
  await Otp.create({ email, phone, otp });

  // Send OTP via email or SMS
  await sendOtpEmail(email, otp);

  // Return success response
  res.status(200).json({ message: "OTP sent successfully. Please verify." });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { name, email, phone, otp, password } = req.body;
  // Find OTP record
  const otpRecord = await Otp.findOne({ email, phone });
  if (!otpRecord || otpRecord.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    isVerified: true,
  });

  // Delete OTP record after verification
  await Otp.deleteOne({ email, phone });

  if (user) {
    res.json({
      message: "User registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc Login the user
 * @route GET /api/users/login
 * @access public
 */

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Unauthorized;
    throw new Error("Invalid email or password");
  }
});
