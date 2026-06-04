import { supabase } from "@/lib/supabase";

export async function isAuthorizedCR(sicNumber: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("authorized_representatives")
    .select("*")
    .eq("sic", sicNumber)
    .single();

  if (error || !data) {
    return false;
  }

  return true;
}
