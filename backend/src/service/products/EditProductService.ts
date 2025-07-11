import prismaClient from "../../../prisma";
import xss from "xss";

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

    const product = await prismaClient.product.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!product) {
      throw new Error("Product not found or you don't have permission.");
    }
    
    const dataToUpdate: any = {};

    if (name !== undefined) {
      dataToUpdate.name = xss(name); // sanitiza aqui
    }
    if (price !== undefined) {
      if (price < 0) {
        throw new Error("Price can't be below 0");
      }
      dataToUpdate.price = price;
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

export { EditProductService };