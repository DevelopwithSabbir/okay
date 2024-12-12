import DashboardMetrics from '../models/dashboardMetricsModel.js';
import User from '../models/userModel.js';
import Tuition from '../models/tuitionModel.js';
import Payment from '../models/paymentModel.js';

export const generateDailyMetrics = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    tutorCount,
    activeTutorCount,
    guardianCount,
    tuitionStats,
    revenueStats
  ] = await Promise.all([
    User.countDocuments({ role: 'tutor' }),
    User.countDocuments({ role: 'tutor', status: 'active' }),
    User.countDocuments({ role: 'guardian' }),
    Tuition.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: { 
            $sum: { 
              $cond: [{ $eq: ['$status', 'active'] }, 1, 0] 
            }
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
            }
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pending'] }, 1, 0]
            }
          }
        }
      }
    ]),
    Payment.aggregate([
      {
        $match: {
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: null,
          daily: { $sum: '$amount' },
          commissions: { $sum: '$platformFee' }
        }
      }
    ])
  ]);

  const metrics = new DashboardMetrics({
    date: today,
    users: {
      totalTutors: tutorCount,
      activeTutors: activeTutorCount,
      totalGuardians: guardianCount,
      newRegistrations: 0 // Calculate from daily registrations
    },
    tuitions: {
      total: tuitionStats[0]?.total || 0,
      active: tuitionStats[0]?.active || 0,
      completed: tuitionStats[0]?.completed || 0,
      pending: tuitionStats[0]?.pending || 0
    },
    revenue: {
      daily: revenueStats[0]?.daily || 0,
      monthly: 0, // Calculate from monthly aggregation
      commissions: revenueStats[0]?.commissions || 0
    }
  });

  await metrics.save();
  return metrics;
};