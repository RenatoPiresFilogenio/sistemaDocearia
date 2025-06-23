import prismaClient from "../../../prisma";

interface Props{
    userid: string;
}

class DetailUserService{
    async execute({userid}:Props){
        if(!userid){
            throw new Error("id invalido")
        }
        try {
            const id = userid
            const userDetail = await prismaClient.user.findUnique({
                where:{
                    id:id
                },
                select: {
                name: true,
                email:true,
                products:{
                    select:{
                        name:true,
                        price:true,
                    }
                },
                ingredients: {  
                    select: {
                    name: true,
                    unitConversion: true,
                    totalPrice: true,
                    totalUnit: true,
                    unitPrice: true,
                   
                    }
                }
                }
            })
             return userDetail;
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            throw new Error("Erro interno ao buscar dados do usuário");
        }

    
    }
}

export {DetailUserService};