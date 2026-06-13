"use client";

import { useCart } from "@/components/context/CartContext";

interface Props {
  onOpenCart: () => void;
}

export default function ViewCartBar({
  onOpenCart,
}: Props) {
  const { items, cartCount } = useCart();

  const total = items.reduce(
    (sum, item) =>
      sum +
      item.product.price *
        item.quantity,
    0
  );

  if (cartCount === 0) {
    return null;
  }

 return (
  <div
    className="
      fixed
      bottom-4
      left-1/2
      -translate-x-1/2
      z-50
      w-[360px]
      max-w-[90vw]
    "
  >
    <button
      onClick={onOpenCart}
      className="
        w-full
        bg-white
        border
        rounded-2xl
        shadow-lg
        px-3
        py-2
        flex
        items-center
        justify-between
      "
    >
      <div className="text-left">
        <p className="font-semibold text-sm text-slate-900">
          {cartCount} items
        </p>

        <p className="text-xs text-slate-500">
          ₹{total}
        </p>
      </div>

      <div
        className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-xl
          font-medium
        "
      >
        View Cart →
      </div>
    </button>
  </div>
);
}