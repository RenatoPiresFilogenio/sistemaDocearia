import Link from "next/link";
import style from "./page.module.scss"

export default function header(){

    return(
       <main className={style.header}>
        <h1>CandyTrack</h1>
        
        <Link href={"/dashboard/ingredients"}>Ingredientes</Link>
         <Link href={"/dashboard/products"}>Produtos</Link>
         <Link href={"/dashboard/perfil"}>Perfil</Link>
         <Link href={"/dashboard/main"}>Menu</Link>
         
        </main>
    );
}

