// server/src/routes/userRoutes.js

import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  addReviewToUser,
} from '../controllers/userController.js';

import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(authMiddleware);

router.get('/', getAllUsers);
router.put('/profile', updateUserProfile);
router.get('/:id', getUserById);
router.post('/:id/reviews', addReviewToUser);

export default router;