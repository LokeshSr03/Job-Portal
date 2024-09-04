import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Otp from "../models/otp.js";
import generateOtp from "../utils/generateOtp.js";
import sendOtpEmail from "../utils/sendOtpMail.js";

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

/**
 * @desc		verify new user
 * @route		POST /api/users/
 * @access	public
 */
export const verifyOtp = asyncHandler(async (req, res) => {
  const { name, email, phone, otp, password } = req.body;
  // Find OTP record
  const otpRecord = await Otp.findOne({ email, phone });
  if (!otpRecord || otpRecord.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  if (email.endsWith("@gmail.com")) {
    return res
      .status(400)
      .json({ message: "Gmail accounts are not allowed for registration" });
  }
  // Determine if the user is an admin based on email domain
  let isAdmin = false;

  if (email.endsWith("@alphaware.com")) {
    isAdmin = true;
  } else if (email.endsWith("@alphawarenext.com")) {
    isAdmin = false;
  } else {
    return res.status(400).json({ message: "Invalid email domain" });
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    isAdmin,
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

/**
 * @desc get User Detail
 * @route GET /api/users/profile
 *@access private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user_id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new Error("User Not found");
  }
});
