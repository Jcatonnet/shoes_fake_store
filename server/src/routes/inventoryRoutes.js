import express from 'express';
import { addInventoryItem, getUserInventoryItems } from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/inventory', addInventoryItem);
router.get('/inventory/:userId', getUserInventoryItems);

export default router;
