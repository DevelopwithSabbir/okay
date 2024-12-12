import mongoose from 'mongoose';

const dailyStatsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  users: {
    newTutors: Number,
    newGuardians: Number,
    activeUsers: Number
  },
  tuitions: {
    newPosts: Number,
    applications: Number,
    successful: Number
  },
  demoClasses: {
    scheduled: Number,
    completed: Number,
    cancelled: Number
  },
  revenue: {
    total: Number,
    subscriptions: Number,
    tuitionFees: Number,
    platformFees: Number
  },
  metrics: {
    averageResponseTime: Number,
    tutorVerificationRate: Number,
    applicationSuccessRate: Number,
    averageRating: Number
  }
}, {
  timestamps: true
});

// Add index for date-based queries
dailyStatsSchema.index({ date: -1 });

const DailyStats = mongoose.model('DailyStats', dailyStatsSchema);
export default DailyStats;