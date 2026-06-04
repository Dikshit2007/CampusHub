import { APP_NAME } from "@/lib/constants";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  className,
  size = "md",
}: {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { icon: "h-6 w-6", text: "text-lg" },
    md: { icon: "h-8 w-8", text: "text-xl" },
    lg: { icon: "h-10 w-10", text: "text-2xl" },
  };
  const s = sizes[size];

  return (
    <Link href={href} className={cn("flex items-center gap-2 group", className)}>
      <div className="rounded-lg bg-primary-600 p-1.5 text-white shadow-sm group-hover:bg-primary-700 transition-colors">
        <GraduationCap className={s.icon} />
      </div>
      <span className={cn("font-bold text-slate-900 tracking-tight", s.text)}>
        {APP_NAME}
      </span>
    </Link>
  );
}
