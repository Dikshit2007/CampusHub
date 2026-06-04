"use client";

import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { LogOut, Menu, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { adminSession, logoutAdmin } = useSession();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <button
        type="button"
        className="lg:hidden rounded-lg p-2 hover:bg-slate-100"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600">
        <Shield className="h-4 w-4 text-primary-600" />
        Campus Administration
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <span className="text-sm font-medium text-slate-700 hidden sm:inline">
          {adminSession?.admin.name}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            logoutAdmin();
            router.push(ROUTES.adminLogin);
          }}
        >
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>
    </header>
  );
}
