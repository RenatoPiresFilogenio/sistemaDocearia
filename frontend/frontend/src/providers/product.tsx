"use client";

import { createContext, ReactNode, useState } from "react";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/app/services/api";

type Ingredient = {
  name: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  ingredients: { ingredient: Ingredient }[];
};

type ProductContextData = {
  isOpen: boolean;
  onRequestOpen: (product_id: number) => Promise<void>;
  onRequestClose: () => void;
  product: Product | null;
};

export const productContext = createContext({} as ProductContextData);

type ProductProviderProps = {
  children: ReactNode;
};

export function ProductProvider({ children }: ProductProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  async function onRequestOpen(product_id: number) {
    const token = await getCookieClient();

    const response = await api.patch(
      "/productUpdate",
      { id: product_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    setProduct(response.data);
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
    setProduct(null);
  }

  return (
    <productContext.Provider
      value={{
        isOpen,
        onRequestClose,
        onRequestOpen,
        product,
      }}
    >
      {children}
    </productContext.Provider>
  );
}
