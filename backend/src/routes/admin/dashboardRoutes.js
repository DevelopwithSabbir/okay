import express from 'express';
import { 
  getDashboardMetrics,
  updateTuitionStatus,
  getTuitionStatusHistory,
  getAdminActivityLog
} from '../../controllers/admin/dashboardController.js';
import { protect, checkPermission } from '../../middleware/adminAuth.js';
import { validateRequest } from '../../utils/validators.js';

const router = express.Router();

router.get('/metrics', protect, getDashboardMetrics);

router.put(
  '/tuition/:tuitionId/status',
  protect,
  checkPermission('manage_content'),
  validateRequest(adminValidationSchema.updateTuitionStatus),
  updateTuitionStatus
);

router.get(
  '/tuition/:tuitionId/history',
  protect,
  getTuitionStatusHistory
);

router.get(
  '/activity-log',
  protect,
  checkPermission('view_analytics'),
  getAdminActivityLog
);

export default router;