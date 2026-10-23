
import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import type { LostFoundPost } from "@/types/database";
import { MapPin, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";

export function ItemCard({ post }: { post: LostFoundPost }) {
  const subject = `Lost & Found: ${post.product_name}`;

  const message = `Hi, I saw your ${post.type} item "${post.product_name}" on CampusHub Lost & Found. I would like to know more about it.`;

  const contactLink = `mailto:${post.contact_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  return (
    <Card className="overflow-hidden animate-slide-up flex flex-col">
      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={post.image_url}
          alt={post.product_name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
      </div>

      <CardContent className="flex flex-col flex-1 pt-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-slate-900">
            {post.product_name}
          </h3>
          <StatusBadge status={post.status} type="item" />
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 flex-1">
          {post.description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-500">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary-500 shrink-0" />
            <span>{post.location}</span>
          </p>

          <p className="flex items-center gap-2 break-all">
            <Mail className="h-4 w-4 text-primary-500 shrink-0" />
            <span>{post.contact_email}</span>
          </p>
        </div>

        <a
          href= "https://wa.me/9090222300"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <MessageCircle className="h-4 w-4" />
          Contact Owner
        </a>
      </CardContent>
    </Card>
  );
}
