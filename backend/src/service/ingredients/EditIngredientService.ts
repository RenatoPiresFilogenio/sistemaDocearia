import prismaClient from "../../../prisma";
import xss from "xss";

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

    if (name !== undefined) dataToUpdate.name = xss(name);
    if (unitConversion !== undefined) dataToUpdate.unitConversion = xss(unitConversion);
    
    if (totalUnit !== undefined) {
      if (totalUnit <= 0) {
        throw new Error("totalUnit must be greater than zero");
      }
      dataToUpdate.totalUnit = totalUnit;
    }
    
    if (totalPrice !== undefined) {
      if (totalPrice < 0) {
        throw new Error("totalPrice cannot be negative");
      }
      dataToUpdate.totalPrice = totalPrice;
    }

    if (
      totalPrice !== undefined &&
      totalPrice >= 0 &&
      totalUnit !== undefined &&
      totalUnit > 0
    ) {
      dataToUpdate.unitPrice = Number((totalPrice / totalUnit).toFixed(2));
    }

    const updatedIngredient = await prismaClient.ingredient.update({
      where: { id },
      data: dataToUpdate,
      select:{
        id:true,
        name:true,
        unitConversion:true,
        unitPrice:true,
        totalUnit:true,
        totalPrice:true,
      }
    });

    return updatedIngredient;
  }

}

export {EditIngredientService};