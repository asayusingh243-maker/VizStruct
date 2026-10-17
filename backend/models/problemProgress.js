const mongoose = require("mongoose");

const problemProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    status: {
      type: String,
      enum: ["attempted", "solved"],
      default: "attempted",
    },

    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastCode: {
      type: String,
      default: "",
    },

    lastSubmissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      default: null,
    },

    solvedAt: {
      type: Date,
      default: null,
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

problemProgressSchema.index(
  { userId: 1, problemId: 1 },
  { unique: true }
);

problemProgressSchema.index({
  userId: 1,
  status: 1,
});

module.exports =
  mongoose.models.ProblemProgress ||
  mongoose.model("ProblemProgress", problemProgressSchema);