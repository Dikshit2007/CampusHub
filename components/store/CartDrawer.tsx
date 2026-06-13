"use client";
import { useCart } from "@/components/context/CartContext";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";
interface Props {
  open: boolean;
  onClose: () => void;
}


export default function CartDrawer({
  open,
  onClose,
}: Props) {
  const {
  items,
  increaseQuantity,
  decreaseQuantity,
} = useCart();

const [checkoutOpen, setCheckoutOpen] =
  useState(false);

  const total = items.reduce(
    (sum, item) =>
      sum +
      item.product.price * item.quantity,
    0
  );

  if (!open) return null;
<></>
 return (
  <>
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={onClose}
    />

    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 max-h-[75vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Your Cart
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500">
            Cart is empty
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="border rounded-xl px-4 py-3 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1">

                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain rounded-lg border"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        No Img
                      </div>
                    )}

                    <div>
                      <p className="font-medium">
                        {item.product.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        ₹{item.product.price}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center bg-blue-600 text-white rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.product.id
                        )
                      }
                      className="w-8 h-8"
                    >
                      -
                    </button>

                    <span className="w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product.id
                        )
                      }
                      className="w-8 h-8"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
  onClick={() =>
    setCheckoutOpen(true)
  }
  className="
    w-full
    mt-4
    bg-blue-600
    text-white
    py-3
    rounded-xl
    hover:bg-blue-700
  "
>
  Checkout
</button>
            </div>
            <CheckoutModal
  open={checkoutOpen}
  onClose={() =>
    setCheckoutOpen(false)
  }
/>
          </>
        )}

      </div>
    </div>
  </>
);
}