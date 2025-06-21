"use client"
import { getCookieClient } from "@/lib/cookieClient"
import { IngredientType } from "@/lib/searchIngredienttypes"
import style  from "./page.module.scss"
import { api } from "@/app/services/api"
import Link from "next/link"
import { redirect } from "next/navigation";
interface Props{
    ingredients: IngredientType[]
}



export default function Form({ ingredients }: Props) {

    async function RemoveIngredient(id:number){
      const token = getCookieClient();
      const response = await api.delete("/deleteIngredient", {
        data:{id},
        headers:{
            Authorization: `Bearer ${token}`
        }
      })

      redirect("searchIngredient")
    }

  return (
    <section className={style.main_section}>
            
      <div className={style.main_div}>
        <h1 className={style.title}>🍭 Ingredientes</h1>
          <Link className={style.btnSearch}  href="/dashboard/ingredients"><button>Voltar página</button></Link>
        <ul className={style.ingredient_list}>
                {[...ingredients]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item, index) => (
            <li key={index} className={style.ingredient_card}>
            <div className={style.ingredient_header}>
                <h3>{item.name}</h3>
            </div>
            <div className={style.ingredient_info}>
                <p>
                <strong>Preço unitário:</strong> R$ {item.unitPrice.toFixed(2)} por {item.unitConversion}
                </p>
                <p>
                <strong>Estoque total:</strong> {item.totalUnit} {item.unitConversion}
                </p>
                <p>
                <strong>Valor total:</strong> R$ {item.totalPrice.toFixed(2)}
                </p>

                <button onClick={() => RemoveIngredient(item.id)}>Remover</button>
            </div>
            </li>
        ))}
        </ul>
      </div>
    </section>
  );
}
