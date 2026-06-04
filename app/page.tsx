import { FeatureHighlights } from "@/components/landing/FeatureHighlights";
import { Hero } from "@/components/landing/Hero";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link href={ROUTES.studentLogin}>
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href={ROUTES.studentSignup}>
              <Button size="sm">Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Hero />
        <FeatureHighlights />
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} CampusHub. University ERP Platform.</p>
          <p className="mt-1">Built for campus communities. Mock data — backend ready.</p>
        </div>
      </footer>
    </div>
  );
}
