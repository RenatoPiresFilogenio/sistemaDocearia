import prismaClient from "../../../prisma";

interface Prop{
    id:number;
    userId:string;
}

class ListProductService{
async execute({id,userId}:Prop){

    if(!id || !userId){
       throw new Error("Invalid user ID or product ID");
    }

    const product = await prismaClient.product.findFirst({
        where:{
            id:id,
            userId:userId
        }
    })
    
    if(!product){
         throw new Error("Product Not Found")
    }


    return product
}
}

export {ListProductService}