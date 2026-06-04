import type { CreateComplaintInput } from "@/types/auth";
import { supabase } from "@/lib/supabase";

export async function submitComplaint(input: CreateComplaintInput) {
  const { data, error } = await supabase
    .from("complaints")
    .insert([
      {
        reported_by_sic: input.student_sic,
        title: input.title,
        description: input.description,
        category: input.category,
        location: input.location,
        status: "Open",
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
