import { Request,Response } from "express";
import { DeleteIngredientProduct } from "../../service/products/DeleteIngredientProductService";

class DeleteIngredientProductController{
async handle(req:Request,res:Response){
    const {ingredientId,productId} = req.body;

    const deleteingredientproductservice = new DeleteIngredientProduct();

    const deleted = await deleteingredientproductservice.execute({
        ingredientId,productId
    })

    return res.json(deleted)
}
}

export {DeleteIngredientProductController}