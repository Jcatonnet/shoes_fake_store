import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllProducts() {
    try {
        return await prisma.products.findMany();
    } catch (error) {
        throw error;
    }
}
