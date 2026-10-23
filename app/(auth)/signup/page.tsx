
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";

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
      let session: StudentSession | null = null;

      // 1. Check whether the account belongs to an authorized CR.
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
        // 2. If not a CR, check the normal student account.
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

      // 3. Save the session in browser storage.
      setStudentSession(session);

      // 4. Update React session state so the auth guard sees the login.
      refreshStudent();

      // 5. Navigate to the shared student dashboard.
      router.replace(ROUTES.dashboard);
      router.refresh();
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left panel */}
        <section className="relative hidden overflow-hidden bg-blue-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{
              backgroundImage:
                "url('https://silicon.ac.in/wp-content/uploads/2025/02/4.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-950/65 to-blue-800/70" />

          <div className="relative z-10">
            <p className="text-2xl font-extrabold tracking-tight text-white">
              CampusHub
            </p>
            <p className="mt-1 text-sm text-blue-100">
              Your campus, connected.
            </p>
          </div>

          <div className="relative z-10 max-w-lg py-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Silicon University
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
              Everything on campus, in one place.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-blue-100">
              Access campus services, report issues, find lost belongings,
              and explore the student marketplace.
            </p>
          </div>

          <p className="relative z-10 text-sm text-blue-200">
            CampusHub Student Portal
          </p>
        </section>

        {/* Login panel */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <p className="text-2xl font-extrabold text-blue-800">
                CampusHub
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Silicon University Student Portal
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
              <div className="mb-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <UserRound size={28} />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in with your student SIC number and password.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="sic"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    SIC Number
                  </label>

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
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
                  />
                </div>

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
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                      className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                    />
                    Remember me
                  </label>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href={ROUTES.signup}
                  className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              For authorized students of Silicon University.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
