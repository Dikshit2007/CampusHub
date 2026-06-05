import { supabase } from "@/lib/supabase";
import type { CreateListingInput } from "@/types/auth";
import type { MarketplaceListing } from "@/types/database";

export async function listMarketplaceListings(): Promise<MarketplaceListing[]> {
  const { data, error } = await supabase
    .from("marketplace")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

export async function getListingById(id: number) {
  const { data, error } = await supabase
    .from("marketplace")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function createListing(
  input: CreateListingInput
) {
  const { data, error } = await supabase
    .from("marketplace")
    .insert([
      {
        product_name: input.product_name,
        description: input.description,
        category: input.category,
        price: input.price,
        contact_email: input.contact_email,
        image_url: input.image_url,
        posted_by_sic: input.posted_by_sic,
        moderated: false,
        is_spam: false,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteListing(id: number) {
  const { error } = await supabase
    .from("marketplace")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function moderateListing(id: number) {
  const { data, error } = await supabase
    .from("marketplace")
    .update({
      moderated: true,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function markListingSpam(id: number) {
  const { data, error } = await supabase
    .from("marketplace")
    .update({
      is_spam: true,
      moderated: true,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getMarketplaceCount(): Promise<number> {
  const { count, error } = await supabase
    .from("marketplace")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count || 0;
}