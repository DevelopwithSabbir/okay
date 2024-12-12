import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    enum: ['subscription', 'verification', 'demo_class', 'tuition_fee'],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['bkash', 'nagad', 'rocket', 'card'],
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  relatedTo: {
    model: {
      type: String,
      enum: ['Tuition', 'DemoClass', 'Subscription']
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'relatedTo.model'
    }
  },
  breakdown: {
    platformFee: Number,
    tutorAmount: Number,
    tax: Number
  },
  refundDetails: {
    reason: String,
    refundedAt: Date,
    refundedAmount: Number
  }
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;