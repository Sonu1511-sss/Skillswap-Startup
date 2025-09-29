// server/src/routes/sessionRoutes.js

import express from 'express';
import { createSession, getMySessions , updateSession , deleteSession } from '../controllers/sessionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/me', getMySessions);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;