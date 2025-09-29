// server/src/routes/skillSwapRoutes.js

import express from 'express';

import {
  createSwapRequest,
  getMySwaps,
  updateSwapStatus,
  getSwapById 
} from '../controllers/skillSwapController.js';

import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(authMiddleware);

router.get('/me', getMySwaps);
router.get('/:id', getSwapById);
router.post('/', createSwapRequest);
router.put('/:id', updateSwapStatus);

export default router;