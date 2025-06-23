import prismaClient from "../../../prisma";

interface Prop{
    userId: string;
    id: number;
    name?: string;
    price?: number;
}

class EditProductService {
  async execute({ id, userId, name, price}: Prop) {

    if (!userId || !id) {
      throw new Error("User ID and Product ID are required.");
    }

    const ingredient = await prismaClient.product.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!ingredient) {
      throw new Error("Product not found or you don't have permission.");
    }
    
    const dataToUpdate: any = {};

    if (name !== undefined) dataToUpdate.name = name;
    if (price !== undefined) dataToUpdate.price = price;

    if (price! < 0) {
     throw new Error("Price cant be below 0")
    }

   const updateProduct = await prismaClient.product.update({
  where: { id },
  data: dataToUpdate,
  select: {
    id: true,
    name: true,
    price: true,
    ingredients: {  
      select: {
        ingredient: {  
          select: {
            name: true 
          }
        }
      }
    }
  }
});
    return updateProduct;
  }

}

export {EditProductService}