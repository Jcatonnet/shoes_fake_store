import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/updateProfile', authMiddleware, updateUserProfile);

router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;
