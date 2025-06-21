
import Form from "@/app/dashboard/components/searchingredient/Form";
import { api } from "@/app/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import {IngredientType} from "@/lib/searchIngredienttypes";

async function getIngredients(): Promise<IngredientType[] | []>{
    try {
        const token = await getCookieServer();
         const response = await api.get("/listIngredient",  {
         headers: {
            Authorization: `Bearer ${token}`
        }
        });
         
        return response.data || []

       
    } catch (error) {
        console.error(error)
        console.log("Search Error")
        return [];  
    }
}

export default async function searchIngredient(){

    const ingredients = await getIngredients();
    
    return(
        
        <div>
                 <Form ingredients={ingredients}/>    
        </div>
    );

}

