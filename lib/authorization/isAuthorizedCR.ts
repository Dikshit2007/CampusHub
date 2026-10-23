
import { supabase } from "@/lib/supabase";

function normalizeSic(sic: string): string {
  return sic.trim().replace(/\s+/g, "").toUpperCase();
}

export async function isAuthorizedCR(sic: string): Promise<boolean> {
  const normalizedSic = normalizeSic(sic);

  if (!normalizedSic) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from("authorized_representatives")
      .select("sic")
      .ilike("sic", normalizedSic)
      .limit(1);

    if (error) {
      console.error("CR authorization lookup failed:", error);
      return false;
    }

    return (data ?? []).some(
      (record) => normalizeSic(String(record.sic ?? "")) === normalizedSic
    );
  } catch (error) {
    console.error("Unexpected CR authorization error:", error);
    return false;
  }
}
