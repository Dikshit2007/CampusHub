
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { ROUTES } from "@/lib/constants";
import { setStudentSession } from "@/lib/auth/mock-student-auth";
import { useSession } from "@/providers/SessionProvider";
import type { StudentSession } from "@/types/auth";

export default function StudentLoginPage() {
  const router = useRouter();
  const { refreshStudent } = useSession();

  const [sic, setSic] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const normalizedSic = sic.trim().toUpperCase();

    if (!normalizedSic || !password) {
      setError("Please enter your SIC number and password.");
      return;
    }

    setIsLoading(true);

    try {
      let session: StudentSession;

      // Check CR records first.
      const { data: cr, error: crError } = await supabase
        .from("authorized_representatives")
        .select("sic, name, password")
        .ilike("sic", normalizedSic)
        .maybeSingle();

      if (crError) {
        console.error("CR lookup failed:", crError);
        setError("Unable to verify your account. Please try again.");
        return;
      }

      if (cr) {
        if (cr.password !== password) {
          setError("Invalid SIC number or password.");
          return;
        }

        session = {
          user: {
            id: String(cr.sic),
            sic_number: String(cr.sic),
            full_name: cr.name,
            created_at: new Date().toISOString(),
          },
          rememberMe,
        };
      } else {
        // If the SIC is not a CR, check normal student records.
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("id, sic, name, password, created_at")
          .ilike("sic", normalizedSic)
          .maybeSingle();

        if (userError) {
          console.error("Student lookup failed:", userError);
          setError("Unable to verify your account. Please try again.");
          return;
        }

        if (!user || user.password !== password) {
          setError("Invalid SIC number or password.");
          return;
        }

        session = {
          user: {
            id: String(user.id),
            sic_number: String(user.sic),
            full_name: user.name,
            created_at: user.created_at,
          },
          rememberMe,
        };
      }

      // Preserve the working session flow.
      setStudentSession(session);
      refreshStudent();

      router.replace(ROUTES.dashboard);
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 lg:p-3">
      <div className="min-h-[calc(100vh-24px)] overflow-hidden rounded-3xl bg-white shadow-xl lg:grid lg:grid-cols-[1.05fr_0.95fr]">

        {/* Campus image panel */}
        <section className="relative hidden min-h-[calc(100vh-24px)] overflow-hidden bg-slate-950 lg:block lg:rounded-r-[5rem]">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://silicon.ac.in/wp-content/uploads/2025/02/4.jpg')",
            }}
          />

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/55 via-blue-950/25 to-slate-950/60" />

          {/* Subtle curved accents */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/20" />
          <div className="absolute -bottom-36 -left-24 h-[28rem] w-[28rem] rounded-full border border-white/15" />
          <div className="absolute bottom-12 right-12 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />

          {/* Only branding and tagline */}
          <div className="absolute left-9 top-9 z-10 flex items-center gap-4 xl:left-14 xl:top-12">
            

            
          </div>
        </section>

        {/* Login panel */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-white to-blue-50/70 px-5 py-10 sm:px-10 lg:min-h-[calc(100vh-24px)] lg:px-12 xl:px-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-200/20 blur-3xl" />

          <div className="relative z-10 w-full max-w-md">

            {/* Branding for mobile screens */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              

              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  CampusHub
                </h1>
                <p className="text-xs font-medium text-slate-500">
                  YOUR CAMPUS. ONE PLATFORM.
                </p>
              </div>
            </div>

            {/* Minimal heading */}
           
{/* Minimal heading */}
<div className="mb-8">
  <div className="mb-9">
    <h1 className="text-4xl font-extrabold tracking-[-0.045em] text-[#102A56] sm:text-5xl">
      CampusHub
    </h1>

    <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-blue-700 to-cyan-400" />

    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
      YOUR CAMPUS. ONE PLATFORM.
    </p>
  </div>

  <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
    Welcome back<span className="text-blue-600"> !</span>
  </h2>

  <p className="mt-3 text-sm leading-6 text-slate-500">
    Sign in to access your campus dashboard.
  </p>
</div>


            {/* Login card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_70px_-25px_rgba(30,64,175,0.22)] backdrop-blur-xl sm:p-8">
              <form onSubmit={handleLogin} className="space-y-5">

                {/* SIC */}
                <div>
                  <label
                    htmlFor="sic"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    SIC Number
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="sic"
                      name="sic"
                      type="text"
                      autoComplete="username"
                      value={sic}
                      onChange={(e) => setSic(e.target.value)}
                      placeholder="Enter your SIC number"
                      required
                      disabled={isLoading}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between gap-3">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                      className="h-4 w-4 rounded border-slate-300 accent-blue-600 focus:ring-blue-500"
                    />
                    Remember me
                  </label>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                    <ShieldCheck size={15} />
                    Student portal
                  </span>
                </div>

                {/* Error message */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                  >
                    {error}
                  </div>
                )}

                {/* Sign in */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-blue-800 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Signing you in...
                    </>
                  ) : (
                    <>
                      Sign in to CampusHub
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              Silicon University · Student Portal
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
