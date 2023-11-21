import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function addToInventory(userId, items) {
    const inventoryPromises = items.map(item => {
        return prisma.inventory.create({
            data: {
                userid: userId,
                productsizeid: item.productSizeId,
                quantity: item.quantity
            }
        });
    });
    return Promise.all(inventoryPromises);
}

export async function getUserInventory(userId) {
    return prisma.inventory.findMany({
        where: { userid: userId },
        include: {
            productsize: {
                include: {
                    product: true,
                },
            },
        },
    });
}
