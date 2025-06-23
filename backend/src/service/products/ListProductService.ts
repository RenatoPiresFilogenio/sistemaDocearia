import prismaClient from "../../../prisma";

interface Prop{
    userId:string;
}

class ListProductService{
async execute({userId}:Prop){

    if(!userId){
       throw new Error("Invalid user ID or product ID");
    }

    const product = await prismaClient.product.findMany({
        where: {
            userId: userId
        },
        select: {
            id:true,
            name: true,
            price: true,
        }
        });

    
    if(!product){
         throw new Error("Product Not Found")
    }


    return product
}
}

export {ListProductService}