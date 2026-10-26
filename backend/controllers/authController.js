const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");

async function registerUser(req, res) {
  try {
    const fullName = typeof req.body.fullName === "string" ? req.body.fullName.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = req.body.password;

    if (!fullName || !email || typeof password !== "string") {
      return res.status(400).json({ message: "Full name, email and password are required." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hashedPassword });
    const token = generateToken(user._id.toString());

    return res.status(201).json({
      message: "Account created successfully.",
      token,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        level: user.level,
      },
    });
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }
    console.error("registerUser:", error);
    return res.status(500).json({ message: "Unable to create the account right now." });
  }
}

async function loginUser(req, res) {
  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = req.body.password;

    if (!email || typeof password !== "string" || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user._id.toString());
    return res.json({
      message: "Logged in successfully.",
      token,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        level: user.level,
      },
    });
  } catch (error) {
    console.error("loginUser:", error);
    return res.status(500).json({ message: "Unable to log in right now." });
  }
}

function getCurrentUser(req, res) {
  const { _id, fullName, email, level, createdAt } = req.user;
  return res.json({ id: _id.toString(), fullName, email, level, createdAt });
}

module.exports = { registerUser, loginUser, getCurrentUser };
