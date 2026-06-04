import { Card, CardContent } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
}) {
  return (
    <Card className="animate-slide-up">
      <CardContent className="flex items-center gap-4 py-5">
        <div className="rounded-lg bg-primary-50 p-3">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
