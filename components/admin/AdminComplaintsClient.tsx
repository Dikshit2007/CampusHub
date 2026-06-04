"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { COMPLAINT_STATUSES } from "@/lib/constants";
import {
  deleteComplaint,
  listAllComplaints,
  updateComplaintStatus,
} from "@/lib/data/complaints";
import type { Complaint, ComplaintStatus } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export function AdminComplaintsClient() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selected, setSelected] = useState<Complaint | null>(null);

  const refresh = useCallback(async () => {
    const data = await listAllComplaints();
    setComplaints(data || []);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleStatusChange = async (
    id:number,
    status: ComplaintStatus
  ) => {
    await updateComplaintStatus(id, status);

    await refresh();

    if (selected?.id === id) {
      setSelected({
        ...selected,
        status,
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this complaint permanently?")) return;

    await deleteComplaint(id);
    setSelected(null);
    await refresh();
  };

  return (
    <div>
      <PageHeader
        title="Complaint Management"
        description="Review, update status, and manage student complaints."
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold">
                Complaint ID
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Student SIC
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Title
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Status
              </th>
              <th className="px-4 py-3 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr
                key={c.id}
                className="border-b border-slate-50 hover:bg-slate-50/50"
              >
                <td className="px-4 py-3 font-mono text-xs text-primary-700">
                  {c.id}
                </td>

                <td className="px-4 py-3">
                  {c.reported_by_sic ?? c.student_sic}
                </td>

                <td className="px-4 py-3 font-medium">
                  {c.title}
                </td>

                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected(c)}
                    >
                      View
                    </Button>

                    <Select
                      className="w-36 text-xs py-1"
                      value={c.status}
                      onChange={(e) =>
                        handleStatusChange(
                          c.id,
                          e.target.value as ComplaintStatus
                        )
                      }
                    >
                      {COMPLAINT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Select>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Complaint Details"
        size="lg"
      >
        {selected && (
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-slate-500">ID:</span>{" "}
              {selected.id}
            </p>

            <p>
              <span className="text-slate-500">SIC:</span>{" "}
              {selected.reported_by_sic ?? selected.student_sic}
            </p>

            <p>
              <span className="text-slate-500">Title:</span>{" "}
              {selected.title}
            </p>

            <p>
              <span className="text-slate-500">Category:</span>{" "}
              {selected.category}
            </p>

            <p>
              <span className="text-slate-500">Location:</span>{" "}
              {selected.location}
            </p>

            <p>
              <span className="text-slate-500">Status:</span>{" "}
              <StatusBadge status={selected.status} />
            </p>

            <p>
              <span className="text-slate-500">Date:</span>{" "}
              {formatDate(selected.created_at)}
            </p>

            <p className="text-slate-700">
              {selected.description}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}