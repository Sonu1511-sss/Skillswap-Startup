import express from 'express';
import { handleChat } from '../controllers/chatbotController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware); // Protect the chatbot route

router.post('/', handleChat);

export default router;