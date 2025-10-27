const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  durationDays: { type: Number, required: true },
  examIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
  testIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
