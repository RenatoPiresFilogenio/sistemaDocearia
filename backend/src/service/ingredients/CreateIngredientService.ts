import prismaClient from "../../../prisma";
import xss from "xss";

interface Prop {
  name: string;
  unitConversion: string;
  totalUnit: number;
  userId: string;
  totalPrice: number;
}

class CreateIngredientService {
  async execute({ name, unitConversion, totalUnit, userId, totalPrice }: Prop) {
    if (!name || !unitConversion || !totalUnit || !userId) {
      throw new Error("Information is missing, all of the fields are required.");
    }

    if (totalUnit <= 0) {
      throw new Error("totalUnit must be greater than zero");
    }

    if (totalPrice < 0) {
      throw new Error("totalPrice cannot be negative");
    }

    
    const safeName = xss(name);
    const safeUnitConversion = xss(unitConversion);

    const unitPriceCalculated = Number((totalPrice / totalUnit).toFixed(2));

    const ingredient = await prismaClient.ingredient.create({
      data: {
        name: safeName,
        unitConversion: safeUnitConversion,
        unitPrice: unitPriceCalculated,
        totalUnit,
        totalPrice,
        userId,
      },
    });

    return ingredient;
  }
}

export { CreateIngredientService };
