const { users } = require("../data/store");

/**
 * GET /api/profile
 * Requires login. Returns the logged-in user's profile.
 */
function getProfile(req, res) {
  const { id, fullName, email, level, createdAt } = req.user;
  res.json({ id, fullName, email, level, createdAt });
}

/**
 * PUT /api/profile
 * Requires login.
 * body: { fullName }  (add more editable fields here as needed)
 */
function updateProfile(req, res) {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { fullName } = req.body;
  if (fullName && fullName.trim()) {
    user.fullName = fullName.trim();
  }

  res.json({
    message: "Profile updated.",
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      level: user.level,
    },
  });
}

module.exports = { getProfile, updateProfile };
