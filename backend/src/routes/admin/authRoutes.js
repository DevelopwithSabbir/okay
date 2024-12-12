import express from 'express';
import { 
  loginAdmin,
  verifyCode,
  resendVerificationCode
} from '../../controllers/admin/authController.js';
import { validateRequest } from '../../utils/validators.js';
import { adminValidationSchema } from '../../utils/validators.js';

const router = express.Router();

router.post('/login', validateRequest(adminValidationSchema.login), loginAdmin);
router.post('/verify', validateRequest(adminValidationSchema.verify), verifyCode);
router.post('/resend-code', validateRequest(adminValidationSchema.resendCode), resendVerificationCode);

export default router;