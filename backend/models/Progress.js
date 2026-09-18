const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    problemsAttempted: {
      type: Number,
      default: 0,
      min: 0,
    },

    problemsSolved: {
      type: Number,
      default: 0,
      min: 0,
    },

    problemsFailed: {
      type: Number,
      default: 0,
      min: 0,
    },

    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    topicsCompleted: {
      type: [String],
      default: [],
    },

    topicProgress: [
      {
        topic: {
          type: String,
          required: true,
          trim: true,
        },

        attempted: {
          type: Number,
          default: 0,
          min: 0,
        },

        solved: {
          type: Number,
          default: 0,
          min: 0,
        },

        accuracy: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
      },
    ],

    totalSubmissions: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;