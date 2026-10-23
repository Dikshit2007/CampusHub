import { getProducts } from "@/lib/data/store";
import StoreClient from "@/components/store/StoreClient";

export default async function StorePage() {
  const products = await getProducts();

  return (
    <StoreClient products={products} />
  );
}
