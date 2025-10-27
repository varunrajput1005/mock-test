const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  durationMinutes: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  isFree: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', testSchema);
