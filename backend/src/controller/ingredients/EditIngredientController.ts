import { Request,Response } from "express";
import { EditIngredientService } from "../../service/ingredients/EditIngredientService";

class EditIngredientController{
async handle(req:Request,res:Response){
    const userId = req.userId!
    const { id, name, unitConversion, totalUnit, totalPrice } = req.body;

    const editingredientservice = new EditIngredientService();

    const ingredient = await editingredientservice.execute({userId,id, name, unitConversion, totalUnit, totalPrice})


    return res.json(ingredient)
}

}

export {EditIngredientController}