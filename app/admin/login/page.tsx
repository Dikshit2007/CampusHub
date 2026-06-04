"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Logo } from "@/components/layout/Logo";
import { ROUTES } from "@/lib/constants";
import { adminLogin } from "@/lib/auth/mock-admin-auth";
import { useSession } from "@/providers/SessionProvider";
import { Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { refreshAdmin } = useSession();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await adminLogin({ adminId, password });
    setLoading(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    refreshAdmin();
    router.push(ROUTES.adminDashboard);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-slate-900 to-slate-900" />
      <div className="relative w-full max-w-md animate-slide-up">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-primary-600 p-3">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex justify-center mb-4 [&_span]:text-white">
          <Logo href={ROUTES.home} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Campus administration portal
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="error" className="mb-4">
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="adminId">Admin ID</Label>
                <Input
                  id="adminId"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="ADMIN001"
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Access Admin Portal"}
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-slate-400">
              Demo: ADMIN001 / admin123
            </p>
          </CardContent>
        </Card>
        <Link
          href={ROUTES.home}
          className="mt-6 block text-center text-sm text-slate-400 hover:text-white"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
