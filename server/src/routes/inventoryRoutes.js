import express from 'express';
import { addInventoryItem, getUserInventoryItems } from '../controllers/inventoryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/inventory', authMiddleware, addInventoryItem);
router.get('/inventory/:userId', authMiddleware, getUserInventoryItems);

export default router;
