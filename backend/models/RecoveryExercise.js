const mongoose = require("mongoose");

const recoveryExerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    misconception: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    language: {
      type: String,
      required: true,
      trim: true,
    },

    instructions: {
      type: [String],
      default: [],
    },

    hints: {
      type: [String],
      default: [],
    },

    expectedConcept: {
      type: String,
      default: "",
      trim: true,
    },

    relatedProblemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const RecoveryExercise = mongoose.model(
  "RecoveryExercise",
  recoveryExerciseSchema
);

module.exports = RecoveryExercise;