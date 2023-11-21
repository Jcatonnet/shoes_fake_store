import express from 'express';
import { getAllProducts } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/products', authMiddleware, getAllProducts);

export default router;
