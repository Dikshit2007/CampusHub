"use client";
import { uploadImage } from "@/lib/services/storage";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { MARKETPLACE_CATEGORIES } from "@/lib/constants";
import { useImagePreview } from "@/hooks/useImagePreview";
import { createListing, listMarketplaceListings } from "@/lib/data/marketplace";
import type {
  MarketplaceCategory,
  MarketplaceListing,
} from "@/types/database";
import { useSession } from "@/providers/SessionProvider";
import { Plus, Search, ShoppingBag } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import { toast } from "sonner";

export function MarketplaceClient() {
  const { studentSession } = useSession();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { previewUrl, file, handleFileChange, resetPreview } =
    useImagePreview();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<MarketplaceCategory>(MARKETPLACE_CATEGORIES[0]);
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");

  const refresh = useCallback(async () => {
    try {
      const data = await listMarketplaceListings();
      setListings(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load listings.");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return listings
      .filter((l) => !l.is_spam)
      .filter((l) => categoryFilter === "all" || l.category === categoryFilter)
      .filter(
        (l) =>
          !q ||
          l.product_name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
  }, [listings, search, categoryFilter]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentSession) return;

    if (!name.trim()) { toast.error("Product name is required."); return; }
    if (!description.trim()) { toast.error("Description is required."); return; }
    const parsedPrice = Number(price);
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Please enter a valid price greater than 0.");
      return;
    }
    if (!email.trim()) { toast.error("Contact email is required."); return; }

    setSubmitting(true);
    try {
      let imageUrl =
        "https://placehold.co/400x300/e2e8f0/64748b?text=Product";

      if (file) {
        imageUrl = await uploadImage(file, "marketplace-images");
      }

      await createListing({
        product_name: name.trim(),
        description: description.trim(),
        category,
        price: parsedPrice,
        contact_email: email.trim(),
        image_url: imageUrl,
        posted_by_sic: studentSession.user.sic_number,
      });

      setName("");
      setDescription("");
      setPrice("");
      setEmail("");
      resetPreview();
      setModalOpen(false);
      toast.success("Listing published successfully!");
      await refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Marketplace"
        description="Browse student listings or create your own. Contact sellers directly."
        action={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Create Listing
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            className="pl-10"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="sm:w-56"
        >
          <option value="all">All Categories</option>
          {MARKETPLACE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No listings found"
          description="Try adjusting your search or create a new listing."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Listing"
        size="lg"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <Label>Product Image <span className="text-slate-400 font-normal">(optional)</span></Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="relative mt-2 h-40 w-full rounded-lg overflow-hidden bg-slate-100">
              <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
            </div>
          </div>
          <div>
            <Label>Product Name <span className="text-red-500">*</span></Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Scientific Calculator" />
          </div>
          <div>
            <Label>Description <span className="text-red-500">*</span></Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Describe the item..." />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Category</Label>
              <Select value={category} onChange={(e) => setCategory(e.target.value as MarketplaceCategory)}>
                {MARKETPLACE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Price (₹) <span className="text-red-500">*</span></Label>
              <Input type="number" min="1" step="1" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="e.g. 500" />
            </div>
          </div>
          <div>
            <Label>Contact Email <span className="text-red-500">*</span></Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your.email@college.edu" />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Publishing..." : "Publish Listing"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
