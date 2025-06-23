import { api } from "@/app/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import style from "./page.module.scss";

async function callprofile() {
  const token = await getCookieServer();
  const response = await api.get("/userInfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export default async function Profile() {
  const profileinfo = await callprofile();

  return (
    <div className={style.container}>
        <div className={style.profileHeader}>
            <h1 className={style.title}>Perfil</h1>
            <p>👤 Nome: {profileinfo.name}</p>
            <p>📧 Email: {profileinfo.email}</p>
        </div>

      <p className={style.sectionTitle}>Produtos Criados</p>
      <div className={style.cardList}>
        {profileinfo.products.map((product: any, index: number) => (
          <div key={index} className={style.card}>
            <p>Nome: {product.name}</p>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <p className={style.sectionTitle}>Ingredientes</p>
      <div className={style.cardList}>
        {profileinfo.ingredients.map((ingredient: any, index: number) => (
          <div key={index} className={style.card}>
            <p>Nome: {ingredient.name}</p>
            <p>Preço Total: R$ {ingredient.totalPrice.toFixed(2)}</p>
            <p>Em: {ingredient.unitConversion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
