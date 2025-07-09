import { api } from "../services/api";
import { getCookieServer } from "@/lib/cookieServer";
import style from "./page.module.scss"
import Link from "next/link";
export default function Signup(){

        async function handleRegister(formData:FormData){
                "use server"

               try {

                const token = await getCookieServer()

                const email = formData.get("email")
                const name = formData.get("name")
                const password = formData.get("password")

                const userCreate = {
                    name: name,
                    email: email,
                    password: password
                }

                const response = await api.post("/users", {
                name: userCreate.name,
                email: userCreate.email,
                password: userCreate.password,
                }, {
                headers: {
                   
                    Authorization: `Bearer ${token}`
                }
                });

               } catch (error) {
                console.log(error)
               }


        }
    return(
       <div className={style.wrapper}>
            <form className={style.form} action={handleRegister}>
                <h1><strong>Crie sua conta</strong></h1>
                <h3>É rápido e fácil</h3>

                <input type="text" name="name" placeholder="Nome completo" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Senha" required />

                <button type="submit">Cadastrar</button>
                <br/>
                 <Link href={"/"}><button>Logar</button></Link>
            </form>
        </div>
    );

}