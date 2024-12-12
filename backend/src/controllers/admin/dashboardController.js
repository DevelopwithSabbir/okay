import asyncHandler from 'express-async-handler';
import DashboardMetrics from '../../models/dashboardMetricsModel.js';
import TuitionStatus from '../../models/tuitionStatusModel.js';
import { logAdminAction } from '../../middleware/auditLogger.js';

export const getDashboardMetrics = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const metrics = await DashboardMetrics.findOne({ date: today });
  
  if (!metrics) {
    res.status(404);
    throw new Error('Metrics not found for today');
  }

  res.json(metrics);
});

export const updateTuitionStatus = asyncHandler(async (req, res) => {
  const { tuitionId } = req.params;
  const { status, notes } = req.body;

  // Get current status
  let tuitionStatus = await TuitionStatus.findOne({ tuitionId });
  const previousStatus = tuitionStatus?.status;

  if (!tuitionStatus) {
    tuitionStatus = new TuitionStatus({
      tuitionId,
      status,
      notes,
      updatedBy: req.admin._id
    });
  } else {
    tuitionStatus.previousStatus = tuitionStatus.status;
    tuitionStatus.status = status;
    tuitionStatus.notes = notes;
    tuitionStatus.updatedBy = req.admin._id;
    tuitionStatus.updateHistory.push({
      status,
      updatedBy: req.admin._id,
      notes,
      timestamp: new Date()
    });
  }

  await tuitionStatus.save();

  // Log the action
  await logAdminAction(req, 'UPDATE_TUITION_STATUS', 'tuition', tuitionId, {
    previousStatus,
    newStatus: status,
    notes
  });

  res.json({
    message: 'Tuition status updated successfully',
    tuitionStatus
  });
});

export const getTuitionStatusHistory = asyncHandler(async (req, res) => {
  const { tuitionId } = req.params;

  const statusHistory = await TuitionStatus.findOne({ tuitionId })
    .populate('updateHistory.updatedBy', 'name email')
    .populate('updatedBy', 'name email');

  if (!statusHistory) {
    res.status(404);
    throw new Error('No status history found for this tuition');
  }

  res.json(statusHistory);
});

export const getAdminActivityLog = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const logs = await AuditLog.find()
    .populate('adminId', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await AuditLog.countDocuments();

  res.json({
    logs,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  });
});