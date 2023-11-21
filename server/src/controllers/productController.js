import { getAllProducts as getAllProductsService } from "../services/productService.js";
import { updateProductStock as updateProductStockService } from "../services/productService.js";

export async function getAllProducts(req, res) {
    try {
        const products = await getAllProductsService();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function updateStock(req, res) {
    try {
        const purchasedItems = req.body;
        await updateProductStockService(purchasedItems);
        res.status(200).send('Stock updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
}