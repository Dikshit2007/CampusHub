
"use client";

import { FeatureModuleCard } from "@/components/dashboard/FeatureModuleCard";
import { ROUTES } from "@/lib/constants";
import { useSession } from "@/providers/SessionProvider";
import {
  MessageSquareWarning,
  Search,
  ShoppingBag,
  ShoppingCart,
  GraduationCap,
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
    <main className="min-h-full animate-fade-in bg-slate-50/70 p-1 sm:p-2">
      {/* Silicon University welcome banner */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-[#104b94] shadow-md">
        <div className="flex h-36 items-center justify-center px-4 py-3 sm:h-44 sm:px-6">
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ISWASOELypknou5F4U0QbBAXK3gmcTHsk5j5qVGc7bCCt_a5_AmAmD0&s=10"
    alt="Silicon University — Beyond Teaching"
    className="block h-full w-full object-contain"
  />
</div>
        <div className="border-t border-white/20 bg-white px-6 py-5 sm:px-10 sm:py-6">
  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
    Welcome, {name}!
  </h1>

  <p className="mt-2 text-base leading-relaxed text-slate-600 sm:text-lg">
    Everything you need for campus life, all in one place.
  </p>
</div>
      </section>

      {/* Dashboard heading */}
      <section id="campus-modules" className="scroll-mt-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              Student dashboard
            </p>

            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Explore CampusHub
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Choose a service to get started.
            </p>
          </div>

          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            {modules.length} campus services
          </span>
        </div>

        {/* Module cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <FeatureModuleCard
              key={module.href}
              {...module}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
