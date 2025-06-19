import prismaClient from "../../../prisma";

interface Prop{
    userId: string;
    id: number;
    name?: string;
    unitConversion?: string;
    totalUnit?: number;
    totalPrice?: number;
}

class EditIngredientService {
  async execute({ id, userId, name, unitConversion, totalUnit, totalPrice }: Prop) {
    if (!userId || !id) {
      throw new Error("User ID and Ingredient ID are required.");
    }

    const ingredient = await prismaClient.ingredient.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!ingredient) {
      throw new Error("Ingredient not found or you don't have permission.");
    }

    const dataToUpdate: any = {};

    if (name !== undefined) dataToUpdate.name = name;
    if (unitConversion !== undefined) dataToUpdate.unitConversion = unitConversion;
    if (totalUnit !== undefined) dataToUpdate.totalUnit = totalUnit;
    if (totalPrice !== undefined) dataToUpdate.totalPrice = totalPrice;


    if (totalPrice !== undefined && totalUnit !== undefined && totalUnit !== 0) {
      dataToUpdate.unitPrice = totalPrice / totalUnit;
    }

    const updatedIngredient = await prismaClient.ingredient.update({
      where: { id },
      data: dataToUpdate,
    });

    return updatedIngredient;
  }
}

export {EditIngredientService}