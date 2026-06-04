import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-white" />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary-100 blur-3xl" />
        <div className="absolute bottom-20 right-40 w-96 h-96 rounded-full bg-primary-50 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl animate-slide-up">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 border border-primary-100 mb-6">
            University Digital Campus Platform
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your campus life,{" "}
            <span className="text-primary-600">centralized</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            CampusHub connects students with complaint reporting, lost & found,
            and a peer marketplace — all in one professional university portal.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href={ROUTES.studentLogin}>
              <Button size="lg" className="w-full sm:w-auto">
                Student Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={ROUTES.studentSignup}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Student Signup
              </Button>
            </Link>
            <Link href={ROUTES.adminLogin}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Shield className="mr-2 h-4 w-4" />
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
