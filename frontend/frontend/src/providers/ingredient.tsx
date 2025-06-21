"use client"

import { api } from "@/app/services/api";
import { createContext , ReactNode, useState} from "react"
import { getCookieClient } from "@/lib/cookieClient";

interface IngredientProp {
  id: number;
  name: string;
  unitConversion: string;
  unitPrice: number;
  totalUnit: number;
  totalPrice: number;
  updatedAt: string;
}

type IngredientContextData = {
    isOpen: boolean;
    onRequestOpen: (ingredient_id: number) => Promise<void>;
    onRequestClose: () => void;
    ingredient: IngredientProp[];
}

type IngredientProviderProps = {
    children : ReactNode;
}

export const IngredientContext = createContext({} as IngredientContextData )

export function IngredientProvider({children} : IngredientProviderProps){

    const [isOpen, setIsOpen] = useState(false);
    const [ingredient, setIngredient] = useState<IngredientProp[]>([]);

   async function onRequestOpen(ingredient_id: number){
    const token = await getCookieClient()
    const id = ingredient_id
    const response = await api.patch("/updateIngredient", {id},{
        headers:{
            Authorization:`Bearer ${token}`
        },

    })
    setIngredient([response.data])
        setIsOpen(true);
        
    }
    function onRequestClose(){
        setIsOpen(false);
    }

    return(
        <IngredientContext.Provider value={{
            isOpen,
            onRequestClose,
            onRequestOpen,
            ingredient
        }}>
            {children}
        </IngredientContext.Provider>
    )

}