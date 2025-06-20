import { Request,Response } from "express"
import { ListIngredientService } from "../../service/ingredients/ListIngredientService"


class ListIngredientController{
async handle(req:Request,res:Response){
    const userId = req.userId!
    const {name} = req.body;

    const listingredientservice = new ListIngredientService();

    const ingredient = await listingredientservice.execute({name,userId})

    return res.json(ingredient)
}
}

export {ListIngredientController}