import { Request,Response } from "express";
import { DeleteProductService } from "../../service/products/DeleteProductService";
class DeleteProductController {
    async handle(req:Request,res:Response){
        const userId = req.userId!;
        const {id} = req.body;

        const deleteproductservice = new DeleteProductService();

        const deletedproduct = await deleteproductservice.execute({userId,id})
        
        return res.json(deletedproduct)
    }
}

export {DeleteProductController}