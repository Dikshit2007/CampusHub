import { cn } from "@/lib/utils";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-200",
        className
      )}
    />
  );
}

export function PageLoading() {
  return (
    <div className="space-y-4 p-6 animate-fade-in">
      <LoadingSkeleton className="h-8 w-48" />
      <div className="grid gap-4 md:grid-cols-3">
        <LoadingSkeleton className="h-32" />
        <LoadingSkeleton className="h-32" />
        <LoadingSkeleton className="h-32" />
      </div>
      <LoadingSkeleton className="h-64 w-full" />
    </div>
  );
}
