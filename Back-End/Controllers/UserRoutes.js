import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import { isAuthenticatedUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", catchAsyncError(async (req, res) => {
  console.log(req.body);
  const { fullName, email, phone, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "User already exists" });

  await User.create({ fullName, email, phone, password });

  res.status(201).json({ message: "User registered successfully" });
}));

router.post("/login", catchAsyncError(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({
    message: "Login success",
    token,
    user: { id: user._id, fullName: user.fullName, email: user.email, phone: user.phone }
  });
}));

router.get("/profile", isAuthenticatedUser, catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
}));

router.put("/profile", isAuthenticatedUser, catchAsyncError(async (req, res) => {
  const { fullName, phone } = req.body;
  await User.findByIdAndUpdate(req.user.id, { fullName, phone });
  res.status(200).json({ message: "Profile updated" });
}));

router.post("/forgot-password", catchAsyncError(async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
}));

router.delete("/delete", isAuthenticatedUser, catchAsyncError(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({ message: "Account deleted successfully" });
}));

export default router;
