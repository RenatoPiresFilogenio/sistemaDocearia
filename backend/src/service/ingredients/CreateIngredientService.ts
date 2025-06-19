import prismaClient from "../../../prisma";

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

    let unitPriceCalculated = totalPrice / totalUnit;

    if (unitPriceCalculated < 0.01) {
      unitPriceCalculated = Math.ceil(unitPriceCalculated * 100) / 100;
    }

    const ingredient = await prismaClient.ingredient.create({
      data: {
        name,
        unitConversion,
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
