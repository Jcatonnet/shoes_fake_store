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

export async function updateProductStock(purchasedItems) {
  const transactions = purchasedItems.map(item => {
      return prisma.productsize.update({
          where: { id: item.id },
          data: {
              quantity: { decrement: item.quantitySold }
          }
      });
  });

  await prisma.$transaction(transactions);
}