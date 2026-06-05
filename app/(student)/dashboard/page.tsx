"use client";

import { FeatureModuleCard } from "@/components/dashboard/FeatureModuleCard";
import { ROUTES } from "@/lib/constants";
import { useSession } from "@/providers/SessionProvider";
import {
  MessageSquareWarning,
  Search,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

const modules = [
  {
    title: "Complaint Portal",
    description:
      "Submit and track campus complaints on behalf of your class. Authorized class representatives only.",
    href: ROUTES.complaints,
    icon: MessageSquareWarning,
  },
  {
    title: "Lost & Found",
    description:
      "Report lost items or post found belongings. Search and connect across campus.",
    href: ROUTES.lostFound,
    icon: Search,
  },
  {
    title: "Marketplace",
    description:
      "Browse and list books, electronics, cycles, and hostel essentials from fellow students.",
    href: ROUTES.marketplace,
    icon: ShoppingBag,
  },
  {
  title: "QuickMart",
  description:
    "Order snacks, stationery, beverages and hostel essentials from campus stores.",
  href: "/store",
  icon: ShoppingCart,
},
];

export default function DashboardPage() {
  const { studentSession } = useSession();
  const name = studentSession?.user.full_name ?? "Student";

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome, {name}
        </h1>
        <p className="mt-1 text-slate-500">
          Select a module below to get started with CampusHub.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <FeatureModuleCard key={m.href} {...m} />
        ))}
      </div>
    </div>
  );
}
