import { Request,Response } from "express";
import { EditProductService } from "../../service/products/EditProductService";

class EditProductController{
async handle(req:Request,res:Response){
    const userId = req.userId!
    const { id, name, price} = req.body;

    const editproductservice = new EditProductService();

    const product = await editproductservice.execute({userId,id, name, price})


    return res.json(product)
}

}

export {EditProductController}