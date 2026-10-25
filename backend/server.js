require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const diagnosticRoutes = require("./routes/diagnosticRoutes");
const practiceRoutes = require("./routes/practiceRoutes");
const profileRoutes = require("./routes/profileRoutes");
const progressRoutes = require("./routes/progressRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const mlRoutes = require("./routes/mlRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "VizStruct backend is running",
    database: "MongoDB Atlas",
  });
});

app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "database_disconnected",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/diagnostic", diagnosticRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/ml", mlRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`VizStruct backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
