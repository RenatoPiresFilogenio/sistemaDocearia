import prismaClient from "../../../prisma";

interface Prop{
    userid: string;
    id:number;
}

class DeleteIngredientService{
    async execute({id,userid}:Prop){
        if (!id) {
      throw new Error("Ingredient invalid");
    }

    if (!userid) {
      throw new Error("user not authorized");
    }

    const ingredient = await prismaClient.ingredient.findFirst({
      where: {
        id: id,
        userId: userid,
      },
    });

    if (!ingredient) {
      throw new Error("Ingredient not found or you don't have permission.");
    }

    await prismaClient.ingredient.delete({
      where: {
        id: ingredient.id,
      },
    });

    return { message: "Ingredient deleted successfully." };
  }
    }


export {DeleteIngredientService}