import asyncHandler from 'express-async-handler';
import Tuition from '../models/tuitionModel.js';

// @desc    Create new tuition post
// @route   POST /api/tuitions
// @access  Private
const createTuition = asyncHandler(async (req, res) => {
  const {
    subject,
    class: studentClass,
    location,
    salary,
    requirements
  } = req.body;

  const tuition = new Tuition({
    guardian: req.user._id,
    subject,
    class: studentClass,
    location,
    salary,
    requirements,
    status: 'pending'
  });

  const createdTuition = await tuition.save();
  res.status(201).json(createdTuition);
});

// @desc    Get all tuitions
// @route   GET /api/tuitions
// @access  Public
const getTuitions = asyncHandler(async (req, res) => {
  const tuitions = await Tuition.find({}).populate('guardian', 'name');
  res.json(tuitions);
});

export { createTuition, getTuitions };