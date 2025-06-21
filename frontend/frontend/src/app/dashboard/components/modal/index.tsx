"use client"

import style from "./page.module.scss";
import { X } from "lucide-react";
import { useContext, useState, useEffect, FormEvent } from "react";
import { IngredientContext } from "@/providers/ingredient";
import { api } from "@/app/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { useRouter } from "next/navigation";

export function IngredientModal() {
  const { onRequestClose, ingredient } = useContext(IngredientContext);
  const router = useRouter();

  
  const [name, setName] = useState("");
  const [unitConversion, setUnitConversion] = useState("");
  const [totalUnit, setTotalUnit] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

 
  useEffect(() => {
    if (ingredient.length > 0) {
      const ingr = ingredient[0];
      setName(ingr.name);
      setUnitConversion(ingr.unitConversion);
      setTotalUnit(String(ingr.totalUnit));
      setTotalPrice(String(ingr.totalPrice));
    }
  }, [ingredient]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const token = await getCookieClient();

      await api.patch(
        "/updateIngredient",
        {
          id: ingredient[0].id,
          name,
          unitConversion,
          totalUnit: parseFloat(totalUnit),
          totalPrice: parseFloat(totalPrice),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onRequestClose();
      router.refresh();
      
    } catch (error) {
      console.error("Erro ao atualizar ingrediente:", error);
      
    }
  }

  if (ingredient.length === 0) {
    return (
      <dialog className={style.dialogContainer}>
        <div className={style.dialogContent}>
          <button className={style.closeButton} onClick={onRequestClose}>
            <X size={24} />
          </button>
          <p className={style.loading}>Carregando ingrediente...</p>
        </div>
      </dialog>
    );
  }

  return (
    <dialog className={style.dialogContainer}>
      <div className={style.dialogContent}>
        <button className={style.closeButton} onClick={onRequestClose}>
          <X size={24} />
        </button>

        <article className={style.container}>
          <header className={style.header}>
            <h2 className={style.title}>Editar Ingrediente</h2>
            <div className={style.divider}></div>
          </header>

          <form className={style.content} onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Unidade de Medida:
              <input
                type="text"
                value={unitConversion}
                onChange={(e) => setUnitConversion(e.target.value)}
                required
              />
            </label>

            <label>
              Quantidade Total:
              <input
                type="number"
                step="0.01"
                value={totalUnit}
                onChange={(e) => setTotalUnit(e.target.value)}
                required
              />
            </label>

            <label>
              Valor Total (R$):
              <input
                type="number"
                step="0.01"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
                required
              />
            </label>

            <div className={style.actions}>
              <button type="submit" className={style.saveButton}>
                Salvar
              </button>
              <button
                type="button"
                className={style.cancelButton}
                onClick={onRequestClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </article>
      </div>
    </dialog>
  );
}
