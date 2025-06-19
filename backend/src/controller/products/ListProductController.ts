import { Request,Response } from "express";
import { UpdateProductService } from "../../service/products/UpdateProductController";
class ListProductController{
    async handle(req:Request,res:Response){
        const userId = req.userId!
        const {id, name} = req.body

        const updateproductservice = new UpdateProductService();

        const product = await updateproductservice.execute({id,userId,name})
        
        return res.json(product)
    }
}

export {ListProductController}