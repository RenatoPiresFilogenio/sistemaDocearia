import prismaClient from "../../../prisma/index";
import { hash } from "bcryptjs";
import xss from "xss";
interface Prop {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name,email, password }: Prop) {

        if (!email || !password || !name) {
            throw new Error("User creation failed: Email and password are required.");
        }

      try {
        const hashPass = await hash(password, 10);

           const safeName = xss(name);
            const safeEmail = xss(email);
       
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashPass
            },
            select:{
              name:true,
              email:true,
            }
        });

        return user; 
      } catch (error) {
        console.log(error)
      }

    }
}

export { CreateUserService };
