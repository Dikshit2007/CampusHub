
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { ArrowRight,GraduationCap, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f4f8ff]">
      {/* Soft blue background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-sky-50" />
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 -z-10 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-[1600px] items-center px-4 py-5 sm:px-8 lg:px-10">
        <div className="w-full overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_25px_80px_-30px_rgba(30,64,175,0.22)]">
          <div className="grid lg:grid-cols-2">
            {/* Left: Brand and minimal content */}
            <section className="relative flex flex-col justify-center p-7 sm:p-10 lg:min-h-[690px] lg:p-14 xl:p-16">
              {/* Brand */}
              <div className="mb-14 flex items-center gap-4 sm:mb-20">
               <div className="flex h-24 w-34 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-600/20 ring-1 ring-blue-100">
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNYCD7-0bXe8SdKGLezMbq3_X_VG5qEd2UhX-vM9DCv6TX_p0fD4dppW5p&s=10"
    alt="Silicon University Logo"
    className="h-full w-full object-contain p-1"
  />
</div>

                <div>
                  <h2 className="text-[2.35rem] font-black leading-none tracking-[-0.075em] text-[#142d5b] sm:text-5xl">
                    CampusHub
                  </h2>
                  <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-blue-700 to-sky-400" />
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600 sm:text-xs">
                    Silicon University
                  </p>
                </div>
              </div>

              {/* Subtle decoration */}
              <div className="absolute right-10 top-12 hidden grid-cols-5 gap-3 opacity-60 sm:grid">
                {Array.from({ length: 25 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1 w-1 rounded-full bg-blue-400"
                  />
                ))}
              </div>

              {/* Main message */}
              <div className="max-w-xl">
                <h1 className="text-5xl font-extrabold leading-[1.08] tracking-[-0.045em] text-[#111c35] sm:text-6xl xl:text-7xl">
                  Your campus,
                  <span className="mt-2 block font-light tracking-[-0.055em] text-blue-600">
                    beautifully connected.
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                  Campus complaints, lost and found, student marketplace and a mini shopping mart
                  — all in one simple platform.
                </p>

                {/* Only the requested actions */}
                <div className="mt-9 flex flex-wrap gap-4">
                  <Link href={ROUTES.studentLogin}>
                    <Button
                      size="lg"
                      className="rounded-xl bg-blue-600 px-7 py-6 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      Student Login
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  


<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=adityadikshit07@gmail.com&su=CampusHub%20Enquiry"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Contact CampusHub by email"
  className="inline-flex min-h-14 items-center justify-center rounded-xl border border-blue-200 bg-white px-7 py-4 font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  <Mail className="mr-2 h-4 w-4" />
  Contact Us
</a>



                </div>
              </div>

              {/* Minimal accent */}
              <div className="mt-14 flex items-center gap-3 sm:mt-20">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-700 to-sky-400" />
                <span className="text-xs font-medium tracking-wide text-slate-500">
                  Aditya Diksit | CSE | 2nd Year
                </span>
              </div>
            </section>

            {/* Right: Campus image */}
            <section className="relative min-h-[360px] overflow-hidden bg-[#142d5b] sm:min-h-[480px] lg:min-h-[690px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                style={{
                  backgroundImage:
                    "url('https://assets.findmycollege.com/FMC_IMAGES/57016/assets/silicon-institute-of-technology-patia-gds-bhubaneshwar-technical-institutes-xpRZlfLQeI.jpg')",
                }}
              />

              {/* Keep the image atmospheric, not text-heavy */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152f]/65 via-[#102b50]/10 to-[#102b50]/10" />

              {/* Rounded decorative shapes */}
              <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm" />
              <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border border-white/25 bg-blue-500/15" />

              <div className="absolute right-7 top-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-white/15 text-white shadow-xl backdrop-blur-md sm:right-10 sm:top-10">
                <GraduationCap size={30} />
              </div>

              <div className="absolute bottom-8 left-8 sm:bottom-10 sm:left-10">
                <div className="h-1 w-14 rounded-full bg-sky-300" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                  Your campus. One platform.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
