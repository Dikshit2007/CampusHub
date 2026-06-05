"use client";

import { useCart } from "@/components/context/CartContext";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <button className="border rounded-xl px-4 py-2">
      🛒 Cart ({cartCount})
    </button>
  );
}