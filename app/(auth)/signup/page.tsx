"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Logo } from "@/components/layout/Logo";
import { ROUTES } from "@/lib/constants";
import { signup } from "@/lib/auth/mock-student-auth";
import type { StudentSignupError } from "@/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const errorMessages: Record<StudentSignupError, string> = {
  SIC_REQUIRED: "SIC number is required.",
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORDS_MISMATCH: "Passwords do not match.",
  SIC_EXISTS: "An account with this SIC already exists.",
};

export default function SignupPage() {
  const router = useRouter();
  const [sic, setSic] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<StudentSignupError | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const result = await signup({ sic, fullName, password, confirmPassword });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push(ROUTES.studentLogin), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4 py-12">
      <Logo className="mb-8" />
      <Card className="w-full max-w-md animate-slide-up">
        <CardHeader>
          <CardTitle>Student Signup</CardTitle>
          <p className="text-sm text-slate-500 mt-1">Create your CampusHub account</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="error" className="mb-4">
              {errorMessages[error]}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-4">
              Account created successfully! Redirecting to login...
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="sic">SIC Number</Label>
              <Input
                id="sic"
                value={sic}
                onChange={(e) => setSic(e.target.value)}
                placeholder="SIC2021999"
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
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
              />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || success}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Already registered?{" "}
            <Link href={ROUTES.studentLogin} className="text-primary-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
      <Link href={ROUTES.home} className="mt-6 text-sm text-slate-500 hover:text-primary-600">
        ← Back to home
      </Link>
    </div>
  );
}
