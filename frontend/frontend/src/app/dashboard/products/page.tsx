import style from "./page.module.scss"
import { api } from "@/app/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import Link from "next/link";
async function getIngredients() {
  const token = await getCookieServer();
  const response = await api.get("/listIngredient", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export default async function CreateProduct() {
  const ingredients = await getIngredients();

 async function handleCreateProduct(formData: FormData) {
  "use server";

  try {
    const token = await getCookieServer();

    const name = formData.get("name");
    const selectedIds = formData.getAll("selectedIds[]");

    const ingredientsSelected = selectedIds.map(id => {
      const quantity = Number(formData.get(`quantity-${id}`)) || 0;
      return {
        id: Number(id),
        quantity,
      };
    });

    const product = {
      name,
      ingredients: ingredientsSelected,
    };

    const createProduct = await api.post("/product", product, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Produto criado com sucesso:", createProduct.data);

  } catch (error: any) {
    console.error("Erro ao criar produto:", error?.response?.data || error.message || error);
   
  }
}

  return (
    <main className={style.main_container}>
      <section className={style.section_container}>
        <form action={handleCreateProduct}>
          <h1>Crie seu produto</h1>
          <input
            type="text"
            required
            placeholder="Crie um nome para seu produto"
            name="name"
          />
          <button type="submit">Criar</button>
          <Link href={"products/listproducts"}><button>Ver produtos criados</button></Link>
          <ul>
            {ingredients.map((ingredient: any) => (
              <li key={ingredient.id}>
                <div className="ingredient-name">Nome: {ingredient.name}</div>
                <div className="ingredient-price">
                  Preço: R${ingredient.unitPrice} por {ingredient.unitConversion}
                </div>
                <div className="quantity-label">
                  Quantidade para adicionar ao produto em unidade de {ingredient.unitConversion}:
                </div>

                <input
                  type="checkbox"
                  id={`select-${ingredient.id}`}
                  name="selectedIds[]"
                  value={ingredient.id}
                />
                <label htmlFor={`select-${ingredient.id}`}>Selecionar</label>

                <input
                  type="number"
                  placeholder="Ex: 10"
                  name={`quantity-${ingredient.id}`}
                  min={0}
                />
              </li>
            ))}
          </ul>
        </form>
      </section>
    </main>
  );
}
