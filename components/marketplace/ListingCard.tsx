import { Card, CardContent } from "@/components/ui/Card";
import type { MarketplaceListing } from "@/types/database";
import { formatPrice } from "@/lib/utils";
import { Mail } from "lucide-react";
import Image from "next/image";

export function ListingCard({ listing }: { listing: MarketplaceListing }) {
  return (
    <Card className="overflow-hidden animate-slide-up flex flex-col">
      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={listing.image_url}
          alt={listing.product_name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
          unoptimized
        />
        {listing.is_spam && (
          <span className="absolute top-2 right-2 rounded bg-red-600 px-2 py-0.5 text-xs text-white font-medium">
            Spam
          </span>
        )}
      </div>
      <CardContent className="pt-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900">{listing.product_name}</h3>
          <span className="text-lg font-bold text-primary-600 shrink-0">
            {formatPrice(listing.price)}
          </span>
        </div>
        <span className="inline-flex mt-2 w-fit rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
          {listing.category}
        </span>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 flex-1">
          {listing.description}
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <Mail className="h-4 w-4 text-primary-500" />
          {listing.contact_email}
        </p>
      </CardContent>
    </Card>
  );
}
