import { Request,Response } from "express";
import { DeleteIngredientService } from "../../service/ingredients/DeleteIngredientService";
class DeleteIngredientController{
    async handle(req:Request,res:Response){
        const userid = req.userId!
        const {id} = req.body

        const deleteingredientservice = new DeleteIngredientService();

        const deletedIngredient = await deleteingredientservice.execute({userid,id})

        return res.json(deletedIngredient);
    }
}

export {DeleteIngredientController}