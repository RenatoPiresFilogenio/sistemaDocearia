import prismaClient from '../../../prisma'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

interface authProps{
    email: string,
    password: string,
}

class AuthUserService{
    async execute({email,password}:authProps){

      const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user){
            throw new Error("usuario ou senha incorreto")
        }

        const passwordMatch = await compare(password,user.password)

        if(!passwordMatch){
           throw new Error("usuario ou senha incorreto")
        }

        const token = sign({
           name:user.name,
            email: user.email
        }, process.env.JWT_SECRET as string,
        {
            subject: user.id,
            expiresIn: '30d'
        }
    )

        return {
            id: user.id,
            name:user.name,
            email:user.email,
            token: token
        }
    }
}
export {AuthUserService}