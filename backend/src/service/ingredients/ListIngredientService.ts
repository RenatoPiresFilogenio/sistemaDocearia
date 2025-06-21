import prismaClient from "../../../prisma";

interface Prop{
    userId: string;
}

class ListIngredientService{
async execute({userId}:Prop){

    if(!userId){
        throw new Error("Not Authorized");
    }

    try {
         const ingredient = await prismaClient.ingredient.findMany({
        where:{
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