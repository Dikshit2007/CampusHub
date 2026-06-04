import { supabase } from "@/lib/supabase";
import type {
  ItemStatus,
  LostFoundPost,
  LostFoundType,
} from "@/types/database";
import type { CreateLostFoundInput } from "@/types/auth";

export async function listLostFound(
  type?: LostFoundType
): Promise<LostFoundPost[]> {
  let query = supabase
    .from("lost_found")
    .select("*")
    .order("created_at", { ascending: false });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data || [];
}

export async function getLostFoundById(id: number) {
  const { data, error } = await supabase
    .from("lost_found")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function createLostFoundPost(
  input: CreateLostFoundInput
) {
  const { data, error } = await supabase
    .from("lost_found")
    .insert([
      {
        type: input.type,
        product_name: input.product_name,
        description: input.description,
        location: input.location,
        contact_email: input.contact_email,
        image_url: input.image_url,
        posted_by_sic: input.posted_by_sic,
        status: "Active",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteLostFoundPost(id: number) {
  const { error } = await supabase
    .from("lost_found")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function markLostFoundReturned(id: number) {
  const { data, error } = await supabase
    .from("lost_found")
    .update({
      status: "Returned" as ItemStatus,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getLostFoundCount(): Promise<number> {
  const { count, error } = await supabase
    .from("lost_found")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count || 0;
}