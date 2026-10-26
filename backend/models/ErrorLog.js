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
      default: null,
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
      required: true,
    },

    errorMessage: {
      type: String,
      default: "",
    },

    misconception: {
      type: String,
      default: "",
    },

    explanation: {
      type: String,
      default: "",
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

module.exports = mongoose.model("ErrorLog", errorLogSchema);