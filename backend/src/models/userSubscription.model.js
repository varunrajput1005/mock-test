const mongoose = require('mongoose');

const userSubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true }
});

userSubscriptionSchema.pre('save', function(next) {
  if (!this.endDate) {
    const Subscription = mongoose.model('Subscription');
    Subscription.findById(this.subscriptionId).then(sub => {
      if (sub) {
        this.endDate = new Date(this.startDate.getTime() + (1000 * 60 * 60 * 24 * sub.durationDays));
      }
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('UserSubscription', userSubscriptionSchema);
