import Conversation from '../models/Conversation.js';

export const getConversationHistory = async (sessionId) => {
  if (!sessionId) throw new Error('sessionId is required');
  const conversation = await Conversation.findOne({ sessionId });
  console.log(`[HistoryService] Retrieved history for session ${sessionId}`);
  return conversation ? conversation.messages : [];
};
