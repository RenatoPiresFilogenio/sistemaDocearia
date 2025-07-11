import prismaClient from "../../../prisma";
import xss from "xss";

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

    // Busca o produto e valida permissão primeiro
    const productWithIngredients = await prismaClient.product.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    if (!productWithIngredients || productWithIngredients.userId !== userId) {
      throw new Error("Product not found or not authorized");
    }

    
    const safeName = name ? xss(name) : undefined;

    
    let refreshPrice = 0;
    for (const item of productWithIngredients.ingredients) {
      const unitPrice = item.ingredient.unitPrice ?? 0;
      const quantity = item.quantity;
      refreshPrice += unitPrice * quantity;
    }

   
    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: {
        ...(safeName !== undefined && { name: safeName }),
        price: refreshPrice,
      },
    });

    return updatedProduct;
  }
}

export { UpdateProductService };