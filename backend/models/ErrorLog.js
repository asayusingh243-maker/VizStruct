const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    errorType: {
      type: String,
      enum: [
        "syntax_error",
        "compile_error",
        "runtime_error",
        "logical_error",
        "wrong_answer",
        "time_limit",
        "memory_limit",
        "other",
      ],
      default: "other",
    },

    errorMessage: {
      type: String,
      default: "",
    },

    misconception: {
      type: String,
      default: "",
      trim: true,
    },

    explanation: {
      type: String,
      default: "",
      trim: true,
    },

    suggestedTopics: {
      type: [String],
      default: [],
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    resolved: {
      type: Boolean,
      default: false,
    },

    detectedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const ErrorLog = mongoose.model("ErrorLog", errorLogSchema);

module.exports = ErrorLog;