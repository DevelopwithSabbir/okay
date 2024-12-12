import express from 'express';
import { 
  getAdminProfile, 
  updateLanguagePreference 
} from '../../controllers/admin/profileController.js';
import { protect } from '../../middleware/adminAuth.js';
import { validateRequest } from '../../utils/validators.js';
import { adminValidationSchema } from '../../utils/validators.js';

const router = express.Router();

router.get('/profile', protect, getAdminProfile);
router.put(
  '/language', 
  protect, 
  validateRequest(adminValidationSchema.updateLanguage),
  updateLanguagePreference
);

export default router;