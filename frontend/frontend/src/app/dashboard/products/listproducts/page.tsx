
import { api } from "@/app/services/api"
import { getCookieServer } from "@/lib/cookieServer";
import Form from "@/app/dashboard/components/searchProduct/Form"

export default async function ListProduct() {
  const token = await getCookieServer();
  
  const response = await api.get("/productlist", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return (
    <div >
     
    <Form products={response.data}/>
   
    </div>
  );
}
