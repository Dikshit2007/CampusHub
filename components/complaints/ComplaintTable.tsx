"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import type { Complaint } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { FileText } from "lucide-react";
import { useState } from "react";

export function ComplaintTable({
  complaints,
  viewOnly,
}: {
  complaints: Complaint[];
  viewOnly?: boolean;
}) {
  const [selected, setSelected] = useState<Complaint | null>(null);

  if (complaints.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No complaints yet"
        description={
          viewOnly
            ? "No complaints to display at this time."
            : "Submit your first complaint using the form above."
        }
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Complaint ID
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Title
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Date
              </th>
              <th className="px-4 py-3 text-right font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr
                key={c.id}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-primary-700">
                  {c.id}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {c.title}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {formatDate(c.created_at)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelected(c)}
                  >
                    View Details
                  </Button>
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
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-500">ID</p>
                <p className="font-mono font-medium">{selected.id}</p>
              </div>
              <div>
                <p className="text-slate-500">Status</p>
                <StatusBadge status={selected.status} />
              </div>
              <div>
                <p className="text-slate-500">Category</p>
                <p className="font-medium">{selected.category}</p>
              </div>
              <div>
                <p className="text-slate-500">Location</p>
                <p className="font-medium">{selected.location}</p>
              </div>
            </div>
            <div>
              <p className="text-slate-500">Title</p>
              <p className="font-semibold text-base">{selected.title}</p>
            </div>
            <div>
              <p className="text-slate-500">Description</p>
              <p className="text-slate-700 leading-relaxed">
                {selected.description}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Submitted</p>
              <p>{formatDate(selected.created_at)}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
