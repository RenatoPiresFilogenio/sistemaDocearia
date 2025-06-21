"use client"

import {use} from 'react'
import { getCookieClient } from "@/lib/cookieClient"
import { IngredientType } from "@/lib/searchIngredienttypes"
import style  from "./page.module.scss"
import { api } from "@/app/services/api"
import Link from "next/link"
import { redirect } from "next/navigation";
import {IngredientModal} from "@/app/dashboard/components/modal/index"
import { IngredientContext } from "@/providers/ingredient"

interface Props{
    ingredients: IngredientType[]
}



export default function Form({ ingredients }: Props) {
  const {isOpen, onRequestOpen} = use(IngredientContext)


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

    async function handleDetailIngredient(ingredient_id : number){
    await onRequestOpen(ingredient_id);
    }

  return (
    <section className={style.main_section}>
            <>
              <div className={style.main_div}>
                <h1 className={style.title}>🍭 Ingredientes</h1>
                  <Link className={style.btnSearch}  href="/dashboard/ingredients"><button>Voltar página</button></Link>
                <ul className={style.ingredient_list}>
                        {[...ingredients]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((ingredient, index) => (
                    <li key={index} className={style.ingredient_card}>
                    <div className={style.ingredient_header}>
                        <h3>{ingredient.name}</h3>
                    </div>
                    <div className={style.ingredient_info}>
                        <p>
                        <strong>Preço unitário:</strong> R$ {ingredient.unitPrice.toFixed(2)} por {ingredient.unitConversion}
                        </p>
                        <p>
                        <strong>Estoque total:</strong> {ingredient.totalUnit} {ingredient.unitConversion}
                        </p>
                        <p>
                        <strong>Valor total:</strong> R$ {ingredient.totalPrice.toFixed(2)}
                        </p>
                        <button className={style.removeButton} onClick={() => RemoveIngredient(ingredient.id)}>
                          Remover
                        </button>
                        <button className={style.viewButton} onClick={() => handleDetailIngredient(ingredient.id)}>
                          Editar
                        </button>
                    </div>
                    </li>
                ))}
                </ul>
              </div>

              {isOpen && <IngredientModal/>}
            </>
    </section>
  );
}
