import express from 'express';
import { getAllProducts } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { updateStock } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', authMiddleware, getAllProducts);
router.put('/products/updateStock', authMiddleware, updateStock);

export default router;