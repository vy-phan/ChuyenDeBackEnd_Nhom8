import express from 'express';
import { signup, login, logout, updateUser, getAllUsers, verifyEmail } from '../controllers/auth.controllers.js';
import protectRoute from '../middleware/protectToken.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.get('/', getAllUsers);
router.put('/favorite/:id', updateUser);

export default router;