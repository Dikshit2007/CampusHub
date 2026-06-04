"use client";

import { PageLoading } from "@/components/ui/LoadingSkeleton";
import { ROUTES } from "@/lib/constants";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function StudentAuthGuard({ children }: { children: React.ReactNode }) {
  const { studentSession, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !studentSession) {
      router.replace(ROUTES.studentLogin);
    }
  }, [isLoading, studentSession, router]);

  if (isLoading) return <PageLoading />;
  if (!studentSession) return <PageLoading />;

  return <>{children}</>;
}
