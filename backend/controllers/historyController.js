import { getConversationHistory } from '../services/historyService.js';

export const getHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required.' });
    }
    console.log(`[History] Fetching history for session: ${sessionId}`);
    const history = await getConversationHistory(sessionId);
    res.json(history);
  } catch (err) {
    console.error('[History] Error:', err);
    next(err);
  }
};
