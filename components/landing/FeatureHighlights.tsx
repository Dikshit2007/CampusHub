import { Card, CardContent } from "@/components/ui/Card";
import { MessageSquareWarning, Search, ShoppingBag } from "lucide-react";

const features = [
  {
    icon: MessageSquareWarning,
    title: "Complaint Portal",
    description:
      "Class representatives can submit and track campus complaints on behalf of their class with full status visibility.",
  },
  {
    icon: Search,
    title: "Lost & Found",
    description:
      "Report lost items or post found belongings. Search across campus listings and reconnect with your valuables.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    description:
      "Browse and list books, electronics, cycles, and hostel essentials. Simple peer-to-peer listings for students.",
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl font-bold text-slate-900">
            Everything students need
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Three integrated modules designed for modern campus life
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card
                key={f.title}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="rounded-xl bg-primary-50 p-3 w-fit mb-4">
                    <Icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
