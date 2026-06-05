"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { StoreProduct } from "@/types/database";

interface Props {
  products: StoreProduct[];
}

export default function StoreClient({ products }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

 return (
  <div>
    {/* Search */}
    <input
      type="text"
      placeholder="🔍 Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border rounded-xl px-4 py-3 mb-4"
    />

    {/* Category Chips */}
    <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-white border hover:bg-gray-50"
          }`}
        >
          {category}
        </button>
      ))}
    </div>

    {/* Product Count */}
    <p className="text-gray-500 mb-4">
      {filteredProducts.length} Products Available
    </p>

    {/* Products */}
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
  {filteredProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}
</div>
    {filteredProducts.length === 0 && (
      <p className="text-gray-500 mt-6">
        No products found.
      </p>
    )}
  </div>
)
}
