// server/src/routes/conversationRoutes.js

import express from 'express';
import { getConversations, startOrGetConversation ,markAsRead } from '../controllers/conversationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', getConversations);
router.post('/', startOrGetConversation);
router.put('/:conversationId/read', markAsRead);

export default router;