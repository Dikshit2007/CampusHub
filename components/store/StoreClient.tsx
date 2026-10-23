
"use client";

import ViewCartBar from "./ViewCartBar";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { StoreProduct } from "@/types/database";
import { useCart } from "@/components/context/CartContext";
import CartDrawer from "./CartDrawer";
import {
  ShoppingBag,
  Search,
  Package,
  Apple,
  Sparkles,
  Cookie,
} from "lucide-react";

interface Props {
  products: StoreProduct[];
}

const categoryIcons: Record<string, typeof Package> = {
  All: ShoppingBag,
  Stationery: Package,
  "College Essentials": Package,
  "Food & Snacks": Apple,
  Snacks: Cookie,
  "Chocolates & Ice Creams": Sparkles,
  Beverages: ShoppingBag,
};

export default function StoreClient({ products }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);

  const { cartCount } = useCart();

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        (product.description ?? "").toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="w-full min-w-0 bg-white text-slate-900">
      {/* Simple Quick-Mart header */}
      <header className="mb-5 border-b border-slate-200 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight">
              Quick-Mart
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Shop stationery, snacks, drinks, and college essentials.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart ({cartCount})
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </header>

      {/* Compact category navigation */}
      <nav
        aria-label="Product categories"
        className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-7"
      >
        {categories.map((category) => {
          const Icon = categoryIcons[category] ?? Package;
          const active = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedCategory(category)}
              className={`flex min-w-0 flex-col items-center justify-start gap-1.5 rounded-lg px-1.5 py-2.5 transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>

              <span className="text-xs font-medium leading-tight text-center">
                {category}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Products heading */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold">
              {selectedCategory === "All"
                ? "All Products"
                : selectedCategory}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your everyday campus essentials.
            </p>
          </div>

          <span className="text-xs text-slate-500">
            {filteredProducts.length} products
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center">
            <Package className="mx-auto h-8 w-8 text-slate-400" />

            <p className="mt-3 text-sm font-semibold text-slate-800">
              No products found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try another search term or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Cart and checkout */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <ViewCartBar
        onOpenCart={() => setCartOpen(true)}
      />
    </div>
  );
}
