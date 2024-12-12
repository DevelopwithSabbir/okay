import express from 'express';
import { 
  loginAdmin, 
  getAdminProfile, 
  createAdmin,
  updateLanguagePreference
} from '../controllers/adminController.js';
import { protect, authorize, checkPermission } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.post('/', protect, authorize('super_admin'), createAdmin);
router.put('/language', protect, updateLanguagePreference);

export default router;