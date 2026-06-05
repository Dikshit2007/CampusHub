"use client";
import type { Complaint } from "@/types/database";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";
import { ComplaintTable } from "@/components/complaints/ComplaintTable";
import { UnauthorizedCRWarning } from "@/components/complaints/UnauthorizedCRWarning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageLoading } from "@/components/ui/LoadingSkeleton";
import { isAuthorizedCR } from "@/lib/authorization/isAuthorizedCR";
import {
  listComplaintsByStudent,
  listAllComplaints,
} from "@/lib/data/complaints";
import { useSession } from "@/providers/SessionProvider";
import { useCallback, useEffect, useState } from "react";

export function ComplaintsClient() {
  const { studentSession } = useSession();

  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!studentSession) return;

    try {
      if (authorized) {
        const data = await listComplaintsByStudent(
          studentSession.user.sic_number
        );
        setComplaints(data || []);
      } else {
        const data = await listAllComplaints();
        setComplaints(data || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, [studentSession, authorized]);

  useEffect(() => {
    async function loadData() {
      if (!studentSession) return;

      try {
        const ok = await isAuthorizedCR(
          studentSession.user.sic_number
        );

        setAuthorized(ok);

        if (ok) {
          const data = await listComplaintsByStudent(
            studentSession.user.sic_number
          );
          setComplaints(data || []);
        } else {
          const data = await listAllComplaints();
          setComplaints(data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
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
                ? "My Complaints"
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