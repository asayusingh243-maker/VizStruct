const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { users, getNextUserId } = require("../data/store");

/**
 * POST /api/auth/register
 * body: { fullName, email, password }
 */
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Full name, email and password are required." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  const existingUser = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existingUser) {
    return res.status(400).json({ message: "An account with this email already exists." });
  }

  // Never save plain-text passwords. Hash it first.
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: getNextUserId(),
    fullName,
    email,
    password: hashedPassword,
    level: "Beginner", // default skill level, updated after diagnostic test
    createdAt: new Date(),
  };

  users.push(newUser);

  const token = generateToken(newUser.id);

  res.status(201).json({
    message: "Account created successfully.",
    token,
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      level: newUser.level,
    },
  });
}

/**
 * POST /api/auth/login
 * body: { email, password }
 */
async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = generateToken(user.id);

  res.json({
    message: "Logged in successfully.",
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      level: user.level,
    },
  });
}

/**
 * GET /api/auth/me
 * Requires login (protect middleware). Returns the current user.
 */
function getCurrentUser(req, res) {
  const { id, fullName, email, level, createdAt } = req.user;
  res.json({ id, fullName, email, level, createdAt });
}

module.exports = { registerUser, loginUser, getCurrentUser };
