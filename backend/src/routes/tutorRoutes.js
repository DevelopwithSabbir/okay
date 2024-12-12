import express from 'express';
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Tutor route working' });
});

export default router;