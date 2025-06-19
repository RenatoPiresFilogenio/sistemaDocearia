import prismaClient from "../../../prisma";

interface Prop{
    id:number;
    userId:string;
}

class DeleteProductService {
  async execute({ id, userId }: Prop) {
    if (!id || !userId) {
      throw new Error("invalid id user or id product");
    }

    const product = await prismaClient.product.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!product) {
      throw new Error("Product not found or you don't have permission to delete it");
    }

    const deleteassoctable = await prismaClient.productIngredient.deleteMany({
        where: {
            productId: product.id
        }
        });

    const deleteproduct = await prismaClient.product.delete({
      where: {
        id: product.id
      }
    });

    


    return deleteproduct;
  }
}

export {DeleteProductService}