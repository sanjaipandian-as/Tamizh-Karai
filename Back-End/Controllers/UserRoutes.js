import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import { catchAsync } from "../middleware/error.middleware.js";
import { isAuthenticatedUser } from "../middleware/authMiddleware.js";
import {
  signupValidation,
  loginValidation,
  profileUpdateValidation,
  passwordResetValidation
} from "../middleware/validation.middleware.js";
import { authLimiter, passwordResetLimiter } from "../middleware/security.middleware.js";
import config from "../config/env.config.js";
import logger from "../config/logger.js";

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expire
  });
};

// Helper function to generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpire
  });
};

// @route   POST /api/v1/auth/users/signup
// @desc    Register a new user
// @access  Public
router.post("/signup", authLimiter, signupValidation, catchAsync(async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists"
    });
  }

  // Create new user (password will be hashed by pre-save hook)
  const user = await User.create({ fullName, email, phone, password });

  logger.info(`New user registered: ${email}`);

  res.status(201).json({
    success: true,
    message: "User registered successfully. Please login to continue.",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone
    }
  });
}));

// @route   POST /api/v1/auth/users/login
// @desc    Login user
// @access  Public
router.post("/login", authLimiter, loginValidation, catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Debug logging
  console.log('🔐 Login attempt:', { email, passwordLength: password?.length });

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    console.log('❌ User not found:', email);
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  console.log('✅ User found:', email);

  // Check password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    console.log('❌ Password mismatch for:', email);
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  console.log('✅ Password matched for:', email);

  // Generate tokens
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  logger.info(`User logged in: ${email}`);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    refreshToken,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone
    }
  });
}));

// @route   POST /api/v1/auth/users/refresh-token
// @desc    Refresh access token
// @access  Public
router.post("/refresh-token", catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token is required"
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    const newToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      token: newToken
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token"
    });
  }
}));

// @route   GET /api/v1/auth/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", isAuthenticatedUser, catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    user
  });
}));

// @route   PUT /api/v1/auth/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", isAuthenticatedUser, profileUpdateValidation, catchAsync(async (req, res) => {
  const { fullName, phone } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { fullName, phone },
    { new: true, runValidators: true }
  ).select("-password");

  logger.info(`User profile updated: ${req.user.id}`);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser
  });
}));

// @route   POST /api/v1/auth/users/forgot-password
// @desc    Reset password
// @access  Public
router.post("/forgot-password", passwordResetLimiter, passwordResetValidation, catchAsync(async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found with this email address"
    });
  }

  // Update password (will be hashed by pre-save hook)
  user.password = newPassword;
  await user.save();

  logger.info(`Password reset for user: ${email}`);

  res.status(200).json({
    success: true,
    message: "Password reset successful. Please login with your new password."
  });
}));

// @route   DELETE /api/v1/auth/users/delete
// @desc    Delete user account
// @access  Private
router.delete("/delete", isAuthenticatedUser, catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);

  logger.info(`User account deleted: ${req.user.id}`);

  res.status(200).json({
    success: true,
    message: "Account deleted successfully"
  });
}));

export default router;
