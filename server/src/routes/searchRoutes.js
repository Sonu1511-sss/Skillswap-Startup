// server/src/routes/searchRoutes.js
import express from 'express';
import { search } from '../controllers/searchController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

// The main search route
router.get('/', search);

export default router;