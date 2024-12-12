import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from './AdminLayout';
import { useMetrics } from '../../contexts/MetricsContext';
import {
  Users,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const { metrics } = useMetrics();
  const [tuitionStatuses, setTuitionStatuses] = useState({
    available: 0,
    notAvailable: 0,
    demoScheduled: 0,
    managedExternally: 0,
    needsUpdate: 0,
    needsReplacement: 0,
    confirmed: 0
  });

  useEffect(() => {
    // In a real app, fetch these from API
    setTuitionStatuses({
      available: 15,
      notAvailable: 5,
      demoScheduled: 8,
      managedExternally: 3,
      needsUpdate: 2,
      needsReplacement: 4,
      confirmed: 20
    });
  }, []);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Tutors',
      value: metrics.activeTutors,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Tuitions',
      value: metrics.liveTuitions,
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      label: 'Pending Approvals',
      value: tuitionStatuses.needsUpdate + tuitionStatuses.needsReplacement,
      icon: AlertTriangle,
      color: 'bg-yellow-500'
    },
    {
      label: 'Total Revenue',
      value: '৳50,000',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  const tuitionStatusCards = [
    {
      label: 'Available',
      value: tuitionStatuses.available,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800'
    },
    {
      label: 'Demo Scheduled',
      value: tuitionStatuses.demoScheduled,
      icon: Clock,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      label: 'Needs Update',
      value: tuitionStatuses.needsUpdate,
      icon: AlertTriangle,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      label: 'Needs Replacement',
      value: tuitionStatuses.needsReplacement,
      icon: Users,
      color: 'bg-red-100 text-red-800'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tuition Status Cards */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Tuition Status Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tuitionStatusCards.map((card, index) => (
              <div key={index} className="p-4 rounded-lg bg-white border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${card.color}`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                </div>
                <p className="text-gray-600">{card.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {/* Add recent activities here */}
            <div className="text-center text-gray-500 py-8">
              No recent activities to display
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;