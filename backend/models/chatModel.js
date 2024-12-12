import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const chatSchema = new mongoose.Schema({
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
  messages: [messageSchema],
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  },
  lastMessage: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;