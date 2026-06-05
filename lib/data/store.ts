import { supabase } from "@/lib/supabase";
import { StoreProduct } from "@/types/database";

export async function getProducts(): Promise<StoreProduct[]> {
  const { data, error } = await supabase
    .from("store_products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data as StoreProduct[];
}