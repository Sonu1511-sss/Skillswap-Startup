import express from 'express';
import { SignUp , Login , Logout } from '../controllers/authController.js'; 

import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/signup' , SignUp) ; 
router.post('/login' , Login) ; 
router.post('/logout', authMiddleware, Logout);

export default router;