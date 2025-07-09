import styles from "./page.module.scss";
import { cookies } from "next/headers";
import { api } from "./services/api";
import { redirect } from "next/navigation";
import Link from "next/link";
export default function Home() {
  async function HandleLogin(formData:FormData){
      "use server"

    try {
      const email = formData.get("email")
      const password = formData.get("password")

      const response = await api.post('/login', {
      email,
      password
    })
      
 const CookieStore = await cookies(); 
      const expresstime = 60 * 60 * 24 * 30 * 1000; 
      CookieStore.set("session", response.data.token, {
      maxAge:expresstime,
      path:"/",
      httpOnly:false,
      secure: process.env.NODE_ENV === "production"
      })
    } catch (error) {
      console.error(error)
      return;
    }
      redirect("/dashboard/main")
  }

  
  return (
    <div>
      <form action={HandleLogin} className={styles.form}>
        <h1><strong>CandyTrack</strong></h1>
        <h3>Login</h3>

      <input type="email" required placeholder="Email" name="email" />
      <br />
      
      <input type="password" required placeholder="Password" name="password"  />
      <br />

        <button type="submit">Login</button>
        <br />
        <Link href={"/signup"}><button>Criar Conta</button></Link>
      </form>
    </div>
  );
}
