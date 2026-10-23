
"use client";

import type { Complaint } from "@/types/database";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";
import { ComplaintTable } from "@/components/complaints/ComplaintTable";
import { UnauthorizedCRWarning } from "@/components/complaints/UnauthorizedCRWarning";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageLoading } from "@/components/ui/LoadingSkeleton";
import { isAuthorizedCR } from "@/lib/authorization/isAuthorizedCR";
import { listAllComplaints } from "@/lib/data/complaints";
import { useSession } from "@/providers/SessionProvider";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function ComplaintsClient() {
  const { studentSession } = useSession();

  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await listAllComplaints();
      setComplaints(data ?? []);
    } catch (error) {
      console.error("Failed to load complaints:", error);
      toast.error("Failed to load complaints.");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      if (!studentSession?.user?.sic_number) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const sic = studentSession.user.sic_number.trim().toUpperCase();
        const isCR = await isAuthorizedCR(sic);

        if (cancelled) return;
        setAuthorized(isCR);

        const data = await listAllComplaints();

        if (!cancelled) {
          setComplaints(data ?? []);
        }
      } catch (error) {
        console.error("Complaint portal loading error:", error);

        if (!cancelled) {
          setAuthorized(false);
          toast.error("Unable to load the complaint portal.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [studentSession]);

  if (loading || authorized === null) {
    return <PageLoading />;
  }

  return (
    <div>
      <PageHeader
        title="Complaint Portal"
        description={
          authorized
            ? "Submit and track complaints on behalf of your class."
            : "View campus complaints. Only authorized CRs can submit new complaints."
        }
      />

      <div className="space-y-6">
        {!authorized && <UnauthorizedCRWarning />}

        {authorized && studentSession && (
          <ComplaintForm
            studentSic={studentSession.user.sic_number}
            onSuccess={refresh}
          />
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              {authorized
                ? "All Campus Complaints"
                : "Campus Complaints (View Only)"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ComplaintTable
              complaints={complaints}
              viewOnly={!authorized}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
