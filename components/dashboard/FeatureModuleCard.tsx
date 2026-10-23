
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export function FeatureModuleCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-6">
        {/* Module icon */}
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-blue-700">
          <Icon className="h-7 w-7" strokeWidth={1.8} />
        </div>

        {/* Module title */}
        <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
          {title}
        </h3>

        {/* Module description */}
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {description}
        </p>

        {/* Open module */}
        <Link href={href} className="mt-6 block">
          <Button className="w-full rounded-xl bg-blue-600 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Open Module
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
