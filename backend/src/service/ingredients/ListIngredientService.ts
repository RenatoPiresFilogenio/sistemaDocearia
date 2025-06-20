import prismaClient from "../../../prisma";

interface Prop{
    name: string;
    userId: string;
}

class ListIngredientService{
async execute({name,userId}:Prop){

    if(!name){
        throw new Error("Ingredient Invalid");
    }

    try {
         const ingredient = await prismaClient.ingredient.findMany({
        where:{
                name:name,
                userId: userId
            },
            select: {
                id:true,
                name: true,
                unitConversion: true,
                unitPrice: true,
                totalUnit: true,
                totalPrice: true,
            },
    })
    return ingredient
    } catch (error) {
        console.error(error);
         throw new Error("Failed to fetch ingredient from the database.");
    }
    }
   
}

export {ListIngredientService}