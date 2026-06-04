"use client";

import type {
  StudentLoginError,
  StudentSession,
  StudentSignupError,
} from "@/types/auth";

import type { User } from "@/types/database";

import { STUDENT_SESSION_KEY } from "@/lib/constants";
import { normalizeSic } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export function getStudentSession(): StudentSession | null {
  if (typeof window === "undefined") return null;

  const raw =
    sessionStorage.getItem(STUDENT_SESSION_KEY) ??
    localStorage.getItem(STUDENT_SESSION_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as StudentSession;
  } catch {
    return null;
  }
}

export function setStudentSession(session: StudentSession): void {
  const storage = session.rememberMe ? localStorage : sessionStorage;
  const other = session.rememberMe ? sessionStorage : localStorage;

  other.removeItem(STUDENT_SESSION_KEY);
  storage.setItem(STUDENT_SESSION_KEY, JSON.stringify(session));
}

export function clearStudentSession(): void {
  sessionStorage.removeItem(STUDENT_SESSION_KEY);
  localStorage.removeItem(STUDENT_SESSION_KEY);
}

export async function signup(params: {
  sic: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}): Promise<
  { ok: true; user: User } | { ok: false; error: StudentSignupError }
> {
  const sic = normalizeSic(params.sic);

  if (!sic) {
    return { ok: false, error: "SIC_REQUIRED" };
  }

  if (!params.password) {
    return { ok: false, error: "PASSWORD_REQUIRED" };
  }

  if (params.password !== params.confirmPassword) {
    return { ok: false, error: "PASSWORDS_MISMATCH" };
  }

  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("sic", sic)
    .maybeSingle();

  if (existingUser) {
    return { ok: false, error: "SIC_EXISTS" };
  }

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        sic: sic,
        name: params.fullName.trim(),
        password: params.password,
      },
    ])
    .select()
    .single();

  if (error || !data) {
    console.error(error);
    return { ok: false, error: "SIC_EXISTS" };
  }

  return {
    ok: true,
    user: {
      id: String(data.id),
      sic_number: data.sic,
      full_name: data.name,
      created_at: data.created_at,
    },
  };
}

export async function login(params: {
  sic: string;
  password: string;
  rememberMe?: boolean;
}):
  Promise<
    | { ok: true; session: StudentSession }
    | { ok: false; error: StudentLoginError }
  > {
  const sic = normalizeSic(params.sic);

  if (!sic) {
    return { ok: false, error: "INVALID_SIC" };
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("sic", sic)
    .eq("password", params.password)
    .maybeSingle();

  if (error) {
    console.error(error);
    return { ok: false, error: "NOT_FOUND" };
  }

  if (!user) {
    return { ok: false, error: "NOT_FOUND" };
  }

  const session: StudentSession = {
    user: {
      id: String(user.id),
      sic_number: user.sic,
      full_name: user.name,
      created_at: user.created_at,
    },
    rememberMe: params.rememberMe,
  };

  setStudentSession(session);

  return {
    ok: true,
    session,
  };
}