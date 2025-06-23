"use client"
import style from "./page.module.scss"
import { X } from "lucide-react";
import { productContext } from "@/providers/product";
import { useContext } from "react";
import { api } from "@/app/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { redirect } from 'next/navigation';

export default  function ModalProduct() {

        

    async function DeleteProduct(product_id:number){
    const token = await getCookieClient();
        const id = product_id
        await api.delete("/productDelete", {
            data:{id},
        headers:{
            Authorization: `Bearer ${token}`
        }
        })
        onRequestClose();
        redirect("/dashboard/products/listproducts")
    }


  const { onRequestClose, product } = useContext(productContext);

  if (!product) {
    return null; 
  }

  return (
    <dialog className={style.dialog} open>
      <div className={style.main_div}>
        <button className={style.btn_Fechar} onClick={onRequestClose}>
          <X size={24} />
        </button>

        <h2>Nome do produto:</h2>
        <span>{product.name}</span>

        <h3>Preço do produto:</h3>
        <span>R$ {product.price.toFixed(2)}</span>

        <h3>Ingredientes:</h3>
        <div className={style.ingredientsProducts}>
          {product.ingredients.map(({ ingredient }, index) => (
            <div key={index} className={style.ingredientItem}>
              <span>{ingredient.name}</span>
            </div>
          ))}
        </div>

        <button className={style.btn_Remover} onClick={()=>DeleteProduct(product.id)}>Excluir</button>

      </div>
    </dialog>
  );
}
