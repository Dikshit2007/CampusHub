"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Logo } from "@/components/layout/Logo";
import { ROUTES } from "@/lib/constants";
import { login } from "@/lib/auth/mock-student-auth";
import type { StudentLoginError } from "@/types/auth";
import { useSession } from "@/providers/SessionProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const errorMessages: Record<StudentLoginError, string> = {
  INVALID_SIC: "Invalid SIC Number",
  INCORRECT_PASSWORD: "Incorrect password. Please try again.",
  NOT_FOUND: "Account not found. Please sign up first.",
};

export default function LoginPage() {
  const router = useRouter();
  const { refreshStudent } = useSession();
  const [sic, setSic] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<StudentLoginError | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const result = await login({ sic, password, rememberMe });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    refreshStudent();
    setTimeout(() => router.push(ROUTES.studentDashboard), 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4 py-12">
      <Logo className="mb-8" />
      <Card className="w-full max-w-md animate-slide-up">
        <CardHeader>
          <CardTitle>Student Login</CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            Sign in with your SIC number and password
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="error" className="mb-4">
              {errorMessages[error]}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-4">
              Login successful! Redirecting to dashboard...
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="sic">SIC Number</Label>
              <Input
                id="sic"
                value={sic}
                onChange={(e) => setSic(e.target.value)}
                placeholder="SIC2021001"
                required
                error={!!error}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={!!error}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm text-primary-600 hover:underline"
                onClick={() => alert("Password reset will be available when Supabase Auth is connected.")}
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES.studentSignup} className="text-primary-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-slate-400">
            Demo CR: SIC2021001 / crpass123 · Student: SIC2021088 / student123
          </p>
        </CardContent>
      </Card>
      <Link href={ROUTES.home} className="mt-6 text-sm text-slate-500 hover:text-primary-600">
        ← Back to home
      </Link>
    </div>
  );
}
