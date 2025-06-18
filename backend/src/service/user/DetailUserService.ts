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
                    id:userid,
                },
                select: {
                id: true,
                name: true,
                email: true,
                ingredients:true,
                products:true,
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