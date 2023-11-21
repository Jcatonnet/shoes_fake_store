import { addToInventory, getUserInventory } from '../services/inventoryService.js';

export async function addInventoryItem(req, res) {
    try {
        const { userId, items } = req.body;
        const inventoryItem = await addToInventory(userId, items);
        res.status(200).json({inventoryItem, message: 'Items added to inventory' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getUserInventoryItems(req, res) {
    try {
        const userId = req.params.userId;
        const inventoryItems = await getUserInventory(userId);
        res.json(inventoryItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
