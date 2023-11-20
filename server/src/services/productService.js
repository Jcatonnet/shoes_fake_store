import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllProducts() {
    try {
        return await prisma.products.findMany({
            include: {
              product_sizes: true
            }
          });
    } catch (error) {
        throw error;
    }
}