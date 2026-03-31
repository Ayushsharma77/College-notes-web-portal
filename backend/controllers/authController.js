const asyncHandler = require("express-async-handler");
const jwt  = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ success: false, message: "Invalid credentials" });

  const token = signToken(user._id);

  res.json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// GET /api/auth/me
exports.getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

// POST /api/auth/create-admin  (seed once, then remove or protect)
exports.createAdmin = asyncHandler(async (req, res) => {
  const existing = await User.findOne({ role: "admin" });
  if (existing)
    return res.status(400).json({ success: false, message: "Admin already exists" });

  const admin = await User.create({
    name:     req.body.name     || "Admin",
    email:    req.body.email    || process.env.ADMIN_EMAIL,
    password: req.body.password || process.env.ADMIN_PASSWORD,
    role:     "admin",
  });

  res.status(201).json({
    success: true,
    message: "Admin created successfully",
    user: { id: admin._id, name: admin.name, email: admin.email },
  });
});
