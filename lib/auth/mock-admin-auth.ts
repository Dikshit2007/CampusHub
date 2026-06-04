"use client";

import type { AdminSession } from "@/types/auth";
import { ADMIN_SESSION_KEY } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function setAdminSession(session: AdminSession): void {
  sessionStorage.setItem(
    ADMIN_SESSION_KEY,
    JSON.stringify(session)
  );
}

export function clearAdminSession(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export async function adminLogin(params: {
  adminId: string;
  password: string;
}): Promise<
  { ok: true; session: AdminSession } |
  { ok: false; message: string }
> {

  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("admin_id", params.adminId)
    .eq("password", params.password)
    .single();

  if (error || !data) {
    return {
      ok: false,
      message: "Invalid admin credentials",
    };
  }

  const session: AdminSession = {
    admin: {
      id: data.id,
      admin_id: data.admin_id,
      name: data.name,
    },
  };

  setAdminSession(session);

  return {
    ok: true,
    session,
  };
}