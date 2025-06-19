import prismaClient from "../../../prisma";

interface IngredientWithQuantity {
  id: number;
  quantity: number;
}

interface Prop {
  UserId: string;
  name: string;
  ingredients: IngredientWithQuantity[];
}

class CreateProductService {
  async execute({ UserId, name, ingredients }: Prop) {
    if (!UserId || !name || !ingredients || ingredients.length === 0) {
      throw new Error("Please provide all required data.");
    }

    
    const ingredientIds = ingredients.map(item => item.id);

 
    const foundIngredients = await prismaClient.ingredient.findMany({
      where: {
        id: { in: ingredientIds }
      }
    });

    if (foundIngredients.length !== ingredientIds.length) {
      throw new Error("One or more ingredients not found");
    }

    let totalPrice = 0;
    for (const item of ingredients) {
      const ing = foundIngredients.find(i => i.id === item.id);
      if (!ing) {
        throw new Error(`Ingredient with id ${item.id} not found`);
      }
      totalPrice += ing.unitPrice * item.quantity;

       if(totalPrice <= 0 ){
        throw new Error(`Price Need be positive`);
      }

    }

    
    const product = await prismaClient.product.create({
      data: {
        name,
        price: totalPrice,
        userId: UserId,
        
        ingredients: {
          create: ingredients.map(item => ({
            ingredientId: item.id,
            quantity: item.quantity
          }))
        }
      },
      include: {
        ingredients: true
      }
    });

    return product;
    
  }

  
}

export { CreateProductService };
