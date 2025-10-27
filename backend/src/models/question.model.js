const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  questionText: { type: String, required: true },
  options: [
    {
      optionText: String,
      isCorrect: { type: Boolean, default: false }
    }
  ],
  marks: { type: Number, required: true },
  negativeMarks: { type: Number, default: 0 }
});

module.exports = mongoose.model('Question', questionSchema);
