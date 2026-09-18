const mongoose = require("mongoose");

const learningPathSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    topics: [
      {
        topic: {
          type: String,
          required: true,
          trim: true,
        },

        difficulty: {
          type: String,
          enum: ["easy", "medium", "hard"],
          default: "easy",
        },

        status: {
          type: String,
          enum: ["not_started", "in_progress", "completed"],
          default: "not_started",
        },

        order: {
          type: Number,
          required: true,
        },
      },
    ],

    currentTopic: {
      type: String,
      default: "",
      trim: true,
    },

    completedTopics: {
      type: [String],
      default: [],
    },

    generatedBy: {
      type: String,
      enum: ["system", "ai", "admin"],
      default: "system",
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const LearningPath = mongoose.model(
  "LearningPath",
  learningPathSchema
);

module.exports = LearningPath;