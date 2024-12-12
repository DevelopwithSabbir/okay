import mongoose from 'mongoose';

const tuitionSchema = new mongoose.Schema({
  guardian: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  subject: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  requirements: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Tuition = mongoose.model('Tuition', tuitionSchema);
export default Tuition;