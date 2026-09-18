const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DiagnosticQuestion",
          required: true,
        },

        answer: {
          type: String,
          default: "",
        },

        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
    ],

    score: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalQuestions: {
      type: Number,
      default: 0,
      min: 0,
    },

    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    identifiedStrengths: {
      type: [String],
      default: [],
    },

    identifiedWeaknesses: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["started", "completed"],
      default: "started",
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);

module.exports = Assessment;