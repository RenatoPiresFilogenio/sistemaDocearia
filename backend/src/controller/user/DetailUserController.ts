import { Request,Response } from "express";
import { DetailUserService } from "../../service/user/DetailUserService";
class DetailUserController{
async handle(req:Request,res:Response){

    const userid = req.userId!

    const detailUserService = new DetailUserService();
    
    const userInfo = await detailUserService.execute({userid})

    return res.json(userInfo)
}
}

export {DetailUserController}