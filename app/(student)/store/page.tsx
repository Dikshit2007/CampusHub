import { getProducts } from "@/lib/data/store";
import StoreClient from "@/components/store/StoreClient";

export default async function StorePage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          QuickMart
        </h1>
        
      </div>

      <StoreClient products={products} />
    </div>
  );
}
