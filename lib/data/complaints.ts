import { supabase } from "@/lib/supabase";

export async function listComplaintsByStudent(sic: string) {
  const { data, error } = await supabase
    .from("complaints")
    .select("*")
    .eq("reported_by_sic", sic)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function listAllComplaints() {
  const { data, error } = await supabase
    .from("complaints")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateComplaintStatus(
  id: number,
  status: string
) {
  const { data, error } = await supabase
    .from("complaints")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteComplaint(id: number) {
  const { error } = await supabase
    .from("complaints")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function getComplaintCount(): Promise<number> {
  const complaints = await listAllComplaints();
  return complaints.length;
}