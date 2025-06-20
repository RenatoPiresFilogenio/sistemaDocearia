import style from "./page.module.scss"
import { api } from "@/app/services/api"
import { getCookieServer } from "@/lib/cookieServer";
import Link from "next/link";
export default async function ingredients(){
    const token = await getCookieServer();
    async function handleIngredient(formData:FormData){
        "use server"
        
        try {
           

        const data = {
        name: formData.get("name"),
        totalPrice: Number(formData.get("totalPrice")),
        totalUnit: Number(formData.get("totalUnit")),
        unitConversion: formData.get("unitConversion")
        };

        console.log(data);
        
        const response = await api.post("/ingredient", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });

       
       
        } catch (error) {
            console.error(error)
            console.log("Error to create ingredient")
            return;}

        try {



        } catch (error) {
              console.error(error)
            console.log("To list ingredient")
             return;
        }

    }
    return(
      <div>
        <button className={style.btnSearch}><Link href="ingredients/searchIngredient">Buscar ingredientes</Link></button>
  <form action={handleIngredient} className={style.form}>
  <h1>Ingredientes</h1>
  <p>Crie seus ingredientes, o sistema irá calcular o preço por unidade automaticamente.</p>

  <div className={style['form-group']}>
    <label htmlFor="name">Nome do ingrediente</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Digite o nome do ingrediente"
      required
    />
  </div>

  <div className={style['form-group']}>
    <label htmlFor="totalPrice">Preço total do ingrediente (R$)</label>
    <input
      type="number"
      id="totalPrice"
      name="totalPrice"
      placeholder="Ex: 15.50"
      required
      min="0"
      step="0.01"
    />
  </div>

  <div className={style['form-group']}>
    <label htmlFor="totalUnit">Peso/Quantidade do produto</label>
    <input
      type="number"
      id="totalUnit"
      name="totalUnit"
      placeholder="Ex: 1000"
      required
      min="0"
      step="0.01"
    />
  </div>

  <div className={style['form-group']}>
    <label htmlFor="unitConversion">Unidade de medida (peso, volume ou unidade)</label>
    <select
      id="unitConversion"
      name="unitConversion"
      required
    >
      <option value="">Selecione uma unidade</option>
      <option value="KG">Kilograma</option>
      <option value="GRAMAS">Grama</option>
      <option value="LITRO">Litro</option>
      <option value="MILILITROS">Mililitros</option>
      <option value="UNIDADE">Unidade</option>
    </select>
  </div>

  <button type="submit">Adicionar Ingrediente</button>
</form>

</div>

    )
}