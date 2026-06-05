"use client";
import { StudentAuthGuard } from "@/components/auth/StudentAuthGuard";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { StudentTopbar } from "@/components/layout/StudentTopbar";
import { useState } from "react";
import { CartProvider } from "@/components/context/CartContext";
export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
  <CartProvider>
    <StudentAuthGuard>
      <div className="flex min-h-screen bg-slate-50">
        <StudentSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex flex-1 flex-col min-w-0">
          <StudentTopbar
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </StudentAuthGuard>
  </CartProvider>
);
}
