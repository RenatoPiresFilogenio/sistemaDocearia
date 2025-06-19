import prismaClient from "../../../prisma";

interface Prop {
  userId: string;
  id: number;
  name?: string;
}

class UpdateProductService {
  async execute({ userId, id, name }: Prop) {
    if (!id || !userId) {
      throw new Error("Product ID or User ID is missing");
    }

    
    if (name) {
      await prismaClient.product.update({
        where: { id },
        data: { name }
      });
    }

    
    const productWithIngredients = await prismaClient.product.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true
          }
        }
      }
    });

    if (!productWithIngredients || productWithIngredients.userId !== userId) {
      throw new Error("Product not found or not authorized");
    }

    
    let RefreshPrice = 0;

    for (const item of productWithIngredients.ingredients) {
      const unitPrice = item.ingredient.unitPrice ?? item.ingredient.unitPrice; 
      const quantity = item.quantity;
      RefreshPrice += unitPrice * quantity;
    }

    
    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: {
        price: RefreshPrice
      }
    });

    return updatedProduct;
  }
}

export { UpdateProductService };
