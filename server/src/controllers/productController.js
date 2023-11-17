import { getAllProducts as getAllProductsService } from "../services/productService.js";

export async function getAllProducts(req, res) {
    try {
        const products = await getAllProductsService();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
