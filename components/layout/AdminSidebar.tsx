"use client";

import { Logo } from "@/components/layout/Logo";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquareWarning,
  Search,
  ShoppingBag,
  Shield,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: ROUTES.adminDashboard, label: "Overview", icon: LayoutDashboard },
  {
    href: ROUTES.adminComplaints,
    label: "Complaints",
    icon: MessageSquareWarning,
  },
  { href: ROUTES.adminLostFound, label: "Lost & Found", icon: Search },
  { href: ROUTES.adminMarketplace, label: "Marketplace", icon: ShoppingBag },
];

export function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 lg:static",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
          <Logo href={ROUTES.adminDashboard} size="sm" />
          <button
            type="button"
            className="lg:hidden rounded-lg p-1 hover:bg-slate-100"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2 text-xs font-medium text-primary-700">
            <Shield className="h-4 w-4" />
            Admin Portal
          </div>
        </div>
        <nav className="px-4 space-y-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== ROUTES.adminDashboard &&
                pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
