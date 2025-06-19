import { Request,Response } from "express";
import {CreateIngredientService} from '../../service/ingredients/CreateIngredientService'
class CreateIngredientController{
async handle(req:Request,res:Response){
    const userId = req.userId!;
    const {unitConversion,totalUnit,totalPrice,name} = req.body;
 
    const createingredientservice = new CreateIngredientService();

    const ingredient = await createingredientservice.execute({userId,unitConversion,totalUnit,totalPrice,name})

    return res.json(ingredient)
}

}

export {CreateIngredientController}