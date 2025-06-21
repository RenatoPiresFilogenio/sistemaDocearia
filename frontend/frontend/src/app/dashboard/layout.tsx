import Header from "@/app/dashboard/components/header/header";
import {IngredientProvider} from "@/providers/ingredient"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <IngredientProvider>
      <main>{children}</main>
      </IngredientProvider>
    </>
  );
}