import prismaClient from "../../../prisma";

interface prop{
    ingredientId: number;
    productId: number;
}

class DeleteIngredientProduct{
    async execute({ingredientId,productId}:prop){
        if(!ingredientId){
            throw new Error("All info requested is needed");
        }


        const deleted = await prismaClient.productIngredient.delete({
            where: {
                productId_ingredientId: {
                productId: productId,
                ingredientId: ingredientId
                }
            }
            });

        return deleted
    }
}

export {DeleteIngredientProduct}