
import { Card, CardContent } from "@/components/ui/Card";
import type { MarketplaceListing } from "@/types/database";
import { formatPrice } from "@/lib/utils";
import { Mail, MessageCircle } from "lucide-react";
import Image from "next/image";

export function ListingCard({
  listing,
}: {
  listing: MarketplaceListing;
}) {
  const subject = `Interested in buying: ${listing.product_name}`;

  const message = `Hi, I saw your product "${listing.product_name}" listed for ${formatPrice(listing.price)} on CampusHub Marketplace. I am interested in buying it. Is it still available?`;

  const contactLink = `mailto:${listing.contact_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

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
          <h3 className="font-semibold text-slate-900">
            {listing.product_name}
          </h3>

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

        <p className="mt-4 flex items-center gap-2 text-sm text-slate-500 break-all">
          <Mail className="h-4 w-4 text-primary-500 shrink-0" />
          <span>{listing.contact_email}</span>
        </p>

        <a
          href="https://wa.me/9090222300"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <MessageCircle className="h-4 w-4" />
          Contact Seller
        </a>
      </CardContent>
    </Card>
  );
}
