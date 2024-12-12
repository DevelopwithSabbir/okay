import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Get tutor profile
// @route   GET /api/tutors/:id
// @access  Public
const getTutorProfile = asyncHandler(async (req, res) => {
  const tutor = await User.findById(req.params.id).select('-password');

  if (tutor && tutor.role === 'tutor') {
    res.json(tutor);
  } else {
    res.status(404);
    throw new Error('Tutor not found');
  }
});

// @desc    Get all tutors
// @route   GET /api/tutors
// @access  Public
const getTutors = asyncHandler(async (req, res) => {
  const tutors = await User.find({ role: 'tutor' }).select('-password');
  res.json(tutors);
});

export { getTutorProfile, getTutors };