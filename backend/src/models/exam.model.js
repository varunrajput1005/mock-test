const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  isSubjectWise: { type: Boolean, default: false },
  negativeMarking: { type: Boolean, default: false },
  negativeMarkPerQuestion: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);
