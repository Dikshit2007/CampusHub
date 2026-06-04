"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { ROUTES } from "@/lib/constants";
import { getComplaintCount } from "@/lib/data/complaints";
import { getLostFoundCount } from "@/lib/data/lost-found";
import { getMarketplaceCount } from "@/lib/data/marketplace";
import {
  ArrowRight,
  MessageSquareWarning,
  Search,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ complaints: 0, lostFound: 0, marketplace: 0 });

  useEffect(() => {
    setStats({
      complaints: getComplaintCount(),
      lostFound: getLostFoundCount(),
      marketplace: getMarketplaceCount(),
    });
  }, []);

  const sections = [
    {
      title: "Complaints",
      description: "Review and update complaint statuses",
      href: ROUTES.adminComplaints,
      icon: MessageSquareWarning,
    },
    {
      title: "Lost & Found",
      description: "Moderate posts and mark items returned",
      href: ROUTES.adminLostFound,
      icon: Search,
    },
    {
      title: "Marketplace",
      description: "Moderate listings and remove spam",
      href: ROUTES.adminMarketplace,
      icon: ShoppingBag,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Campus-wide overview and module management"
      />
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatCard label="Total Complaints" value={stats.complaints} icon={MessageSquareWarning} />
        <StatCard label="Lost & Found Posts" value={stats.lostFound} icon={Search} />
        <StatCard label="Marketplace Listings" value={stats.marketplace} icon={ShoppingBag} />
      </div>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Management</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href}>
              <Card className="h-full hover:border-primary-200 transition-colors group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-primary-50 p-2">
                      <Icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <CardTitle className="text-base mt-3">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-500">{s.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
