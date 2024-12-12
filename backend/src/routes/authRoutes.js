import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working' });
});

export default router;