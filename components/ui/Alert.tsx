import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

type AlertVariant = "info" | "success" | "error" | "warning";

const styles: Record<AlertVariant, string> = {
  info: "bg-primary-50 border-primary-200 text-primary-800",
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-amber-50 border-amber-200 text-amber-900",
};

const icons: Record<AlertVariant, typeof Info> = {
  info: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
};

export function Alert({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = icons[variant];
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm animate-fade-in",
        styles[variant],
        className
      )}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div>
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
}
