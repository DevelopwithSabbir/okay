import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tuition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tuition',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true
  },
  metrics: {
    teachingQuality: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    },
    punctuality: {
      type: Number,
      min: 1,
      max: 5
    },
    subjectExpertise: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  status: {
    type: String,
    enum: ['active', 'reported', 'hidden'],
    default: 'active'
  },
  reports: [{
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;