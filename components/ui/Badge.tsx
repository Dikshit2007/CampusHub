import { cn } from "@/lib/utils";
import type { ComplaintStatus, ItemStatus } from "@/types/database";

const complaintColors: Record<ComplaintStatus, string> = {
  Open: "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Resolved: "bg-green-50 text-green-700 border-green-200",
  Closed: "bg-slate-100 text-slate-600 border-slate-200",
};

const itemColors: Record<ItemStatus, string> = {
  Active: "bg-blue-50 text-blue-700 border-blue-200",
  Returned: "bg-green-50 text-green-700 border-green-200",
  Claimed: "bg-purple-50 text-purple-700 border-purple-200",
};

export function StatusBadge({
  status,
  type = "complaint",
}: {
  status: ComplaintStatus | ItemStatus | string;
  type?: "complaint" | "item";
}) {
  const colors =
    type === "item"
      ? itemColors[status as ItemStatus] ?? "bg-slate-100 text-slate-600"
      : complaintColors[status as ComplaintStatus] ??
        "bg-slate-100 text-slate-600";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colors
      )}
    >
      {status}
    </span>
  );
}
