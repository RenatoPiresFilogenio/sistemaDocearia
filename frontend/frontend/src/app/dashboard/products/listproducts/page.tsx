
import { api } from "@/app/services/api"
import { getCookieServer } from "@/lib/cookieServer"
import style from "./page.module.scss"
async function listproduct(){
        const token = await getCookieServer()
        const products = await api.get("/productlist",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return products.data;
}


export default  async function ListProduct(){

    const product = await listproduct();

    return(
       <div className={style.product_list}>
            {product.map((product: any) => (
            <div key={product.id} className={style.product_card}>
                <h3 className={style.product_name}>🍪 {product.name}</h3>
                <span className={style.product_price}>💰 R$ {product.price}</span>
                <button>Editar</button>
                <button>Remover</button>
            </div>
            ))}
        </div>
    )
}