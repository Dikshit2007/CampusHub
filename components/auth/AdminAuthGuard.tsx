"use client";

import { PageLoading } from "@/components/ui/LoadingSkeleton";
import { ROUTES } from "@/lib/constants";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { adminSession, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !adminSession) {
      router.replace(ROUTES.adminLogin);
    }
  }, [isLoading, adminSession, router]);

  if (isLoading) return <PageLoading />;
  if (!adminSession) return <PageLoading />;

  return <>{children}</>;
}
