const mongoose = require("mongoose");

const topicProgressSchema = new mongoose.Schema(
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
  {
    _id: false,
  }
);

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
      type: Number,
      default: 0,
      min: 0,
    },

    topicProgress: {
      type: [topicProgressSchema],
      default: [],
    },

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

module.exports = mongoose.model("Progress", progressSchema);