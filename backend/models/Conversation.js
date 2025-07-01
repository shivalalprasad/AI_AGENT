import mongoose from 'mongoose';

// Message schema
const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'bot'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Conversation schema
const conversationSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  userId: { type: String },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Conversation', conversationSchema);
