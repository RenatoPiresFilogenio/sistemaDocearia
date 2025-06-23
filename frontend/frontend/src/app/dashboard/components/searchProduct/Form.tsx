"use client";

import styles from './page.module.scss';
import ModalProduct from "@/app/dashboard/components/modalProduct/index"
import { productContext } from '@/providers/product'; // IMPORT nomeado
import { useContext } from "react";

interface ProductProp {
  id: number;
  name: string;
  price: number;
}

interface FormProps {
  products: ProductProp[];
}

export default function Form({ products }: FormProps) {
  const { isOpen, onRequestOpen } = useContext(productContext);

    async function handleProduct(product_id:number) {
        onRequestOpen(product_id);
    }
            
  return (
    <div>
         <div className={styles.container}>
      {products.map(product => (
        <div key={product.id} className={styles.productCard}>
          <h2 className={styles.productName}>
            🍪 {product.name}
          </h2>
          <span className={styles.productPrice}>
            💰 R$ {product.price.toFixed(2)}
          </span>

          <button onClick={()=> handleProduct(product.id)}>Visualizar</button>
        </div>
      ))}
     {isOpen && <ModalProduct />}
    </div>
  </div>
  );
} 
