import express from 'express';
import { getConversations, getMessages } from '../controllers/messageController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', getConversations);
router.get('/:conversationId', getMessages);

export default router;