import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";
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
    <Card className="flex flex-col h-full animate-slide-up hover:border-primary-200">
      <CardContent className="flex flex-col flex-1 pt-6">
        <div className="rounded-xl bg-primary-600 p-4 w-fit mb-5 shadow-sm">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 flex-1 leading-relaxed">
          {description}
        </p>
        <Link href={href} className="mt-6">
          <Button className="w-full">Open Module</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
