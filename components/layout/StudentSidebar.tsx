"use client";

import { Logo } from "@/components/layout/Logo";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquareWarning,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: ROUTES.studentDashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.complaints, label: "Complaint Portal", icon: MessageSquareWarning },
  { href: ROUTES.lostFound, label: "Lost & Found", icon: Search },
  { href: ROUTES.marketplace, label: "Marketplace", icon: ShoppingBag },
];

export function StudentSidebar({
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
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
          <Logo href={ROUTES.studentDashboard} size="sm" />
          <button
            type="button"
            className="lg:hidden rounded-lg p-1 hover:bg-slate-100"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
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
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "text-primary-600")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">
            Student Portal · CampusHub
          </p>
        </div>
      </aside>
    </>
  );
}
