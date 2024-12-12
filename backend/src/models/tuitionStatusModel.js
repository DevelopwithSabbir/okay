import mongoose from 'mongoose';

const tuitionStatusSchema = new mongoose.Schema({
  tuitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tuition',
    required: true
  },
  status: {
    type: String,
    enum: [
      'available',
      'not_available',
      'demo_scheduled',
      'managed_externally',
      'guardian_update_needed',
      'tutor_replacement_needed',
      'confirmed'
    ],
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  notes: String,
  previousStatus: String,
  updateHistory: [{
    status: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    notes: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const TuitionStatus = mongoose.model('TuitionStatus', tuitionStatusSchema);
export default TuitionStatus;