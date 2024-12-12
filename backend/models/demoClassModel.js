import mongoose from 'mongoose';

const demoClassSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  teachingMode: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  feedback: {
    guardian: {
      rating: Number,
      comment: String
    },
    tutor: {
      rating: Number,
      comment: String
    }
  },
  completedAt: Date
}, {
  timestamps: true
});

const DemoClass = mongoose.model('DemoClass', demoClassSchema);
export default DemoClass;