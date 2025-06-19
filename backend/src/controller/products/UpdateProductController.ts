import { Request,Response } from "express";
import { UpdateProductService } from "../../service/products/UpdateProductController";

class UpdateProductController{
    async handle(req:Request,res:Response){
        const userId = req.userId!
        const {name, id} = req.body

        const updateproductservice = new UpdateProductService();

        const updatedproduct = await updateproductservice.execute({name,id,userId})

        return res.json(updatedproduct);
    }
}

export {UpdateProductController}    