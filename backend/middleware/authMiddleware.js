const jwt = require("jsonwebtoken");
const { users } = require("../data/store");

/**
 * protect()
 * Use this on any route that should only work for a logged-in user.
 * It reads the token from the "Authorization" header, checks it is
 * valid, and attaches the matching user to req.user.
 *
 * Example header sent by the frontend:
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
 */
function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret_change_me");

    const user = users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User for this token no longer exists." });
    }

    req.user = user; // now available inside the controller
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token is invalid or expired." });
  }
}

module.exports = protect;
