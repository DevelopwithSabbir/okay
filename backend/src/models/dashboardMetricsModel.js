import mongoose from 'mongoose';

const dashboardMetricsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  users: {
    totalTutors: Number,
    activeTutors: Number,
    totalGuardians: Number,
    newRegistrations: Number
  },
  tuitions: {
    total: Number,
    active: Number,
    completed: Number,
    pending: Number,
    cancelled: Number
  },
  revenue: {
    daily: Number,
    monthly: Number,
    commissions: Number
  },
  engagement: {
    activeUsers: Number,
    averageSessionDuration: Number,
    completionRate: Number
  }
}, {
  timestamps: true
});

const DashboardMetrics = mongoose.model('DashboardMetrics', dashboardMetricsSchema);
export default DashboardMetrics;