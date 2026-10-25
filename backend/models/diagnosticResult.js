const mongoose = require("mongoose");

const diagnosticResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  correctCount: { type: Number, required: true, min: 0 },
  totalQuestions: { type: Number, required: true, min: 1 },
  weakConcepts: { type: [String], default: [] },
  answers: [{
    questionId: { type: Number, required: true },
    selectedOption: { type: String, default: "" },
    isCorrect: { type: Boolean, required: true },
  }],
}, { timestamps: { createdAt: true, updatedAt: false } });

diagnosticResultSchema.index({ userId: 1, createdAt: -1 });
module.exports = mongoose.model("DiagnosticResult", diagnosticResultSchema);
