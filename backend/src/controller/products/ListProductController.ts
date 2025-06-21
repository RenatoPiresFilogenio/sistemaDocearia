import { Request,Response } from "express";
import { ListProductService } from "../../service/products/ListProductService";
class ListProductController{
    async handle(req:Request,res:Response){
        const userId = req.userId!
       

        const listproductservice = new ListProductService();

        const product = await listproductservice.execute({userId})
        
        return res.json(product)
    }
}

export {ListProductController}