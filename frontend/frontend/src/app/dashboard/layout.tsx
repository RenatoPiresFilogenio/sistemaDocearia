import Header from "@/app/dashboard/components/header/header";
import {IngredientProvider} from "@/providers/ingredient"
import {ProductProvider} from "@/providers/product";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <IngredientProvider>
        <ProductProvider>
      <main>{children}</main>
      </ProductProvider>
      </IngredientProvider>
    </>
  );
}