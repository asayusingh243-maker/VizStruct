const jwt = require("jsonwebtoken");

/**
 * Creates a signed login token (JWT) for a user.
 * The frontend should save this token (e.g. in localStorage or a cookie)
 * and send it back on every request that needs login,
 * inside a header like:  Authorization: Bearer <token>
 */
function generateToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "dev_secret_change_me",
    { expiresIn: "7d" } // token stays valid for 7 days
  );
}

module.exports = generateToken;
