// Load variables from the .env file (PORT, JWT_SECRET, etc.)
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Route files (one per feature/page)
const authRoutes = require("./routes/authRoutes");
const diagnosticRoutes = require("./routes/diagnosticRoutes");
const practiceRoutes = require("./routes/practiceRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const progressRoutes = require("./routes/progressRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// ---------- Global middleware ----------
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json()); // lets us read JSON from req.body

// ---------- Health check ----------
// Visit http://localhost:5000/ to confirm the server is running.
app.get("/", (req, res) => {
  res.json({ message: "VizStruct backend is running." });
});

// ---------- Feature routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/diagnostic", diagnosticRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/profile", profileRoutes);

// ---------- 404 handler (for unknown routes) ----------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// ---------- Generic error handler ----------
// Catches anything thrown/passed to next(err) and stops the server from crashing.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`VizStruct backend listening on http://localhost:${PORT}`);
});
