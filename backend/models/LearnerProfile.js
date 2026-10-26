const mongoose = require("mongoose");

const learnerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    skillLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    programmingLanguages: {
      type: [String],
      default: [],
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    learningPreferences: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    goals: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const LearnerProfile = mongoose.model(
  "LearnerProfile",
  learnerProfileSchema
);

module.exports = LearnerProfile;