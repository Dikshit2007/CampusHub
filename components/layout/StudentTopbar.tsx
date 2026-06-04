"use client";

import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { LogOut, Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";

export function StudentTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { studentSession, logoutStudent } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    logoutStudent();
    router.push(ROUTES.studentLogin);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <button
        type="button"
        className="lg:hidden rounded-lg p-2 hover:bg-slate-100"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5 text-slate-600" />
      </button>
      <div className="hidden lg:block text-sm text-slate-500">
        University Student Portal
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <div className="flex items-center gap-2 text-sm">
          <div className="rounded-full bg-primary-50 p-1.5">
            <User className="h-4 w-4 text-primary-600" />
          </div>
          <div className="hidden sm:block text-right">
            <p className="font-medium text-slate-900">
              {studentSession?.user.full_name ?? "Student"}
            </p>
            <p className="text-xs text-slate-500">
              {studentSession?.user.sic_number}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>
    </header>
  );
}
