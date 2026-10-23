"use client";

import { useCart } from "@/components/context/CartContext";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

interface Props {
open: boolean;
onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
const {
items,
increaseQuantity,
decreaseQuantity,
} = useCart();

const [checkoutOpen, setCheckoutOpen] = useState(false);

const total = items.reduce(
(sum, item) => sum + item.product.price * item.quantity,
0
);

if (!open) return null;

return (
<>
{/* Background overlay */} 
<div
     className="fixed inset-0 bg-black/50 z-40"
     onClick={onClose}
   />

  {/* Cart dialog */}
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Cart
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="text-2xl text-gray-500 hover:text-black"
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      {/* Empty cart */}
      {items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-5xl mb-4">🛒</p>

          <p className="text-gray-600">
            Your cart is empty.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart products */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="border rounded-xl px-4 py-3 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {item.product.image_url ? (
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain rounded-lg border"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 break-words">
                      {item.product.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.product.price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      Subtotal: ₹
                      {(
                        item.product.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center bg-blue-600 text-white rounded-lg overflow-hidden shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.product.id)
                    }
                    className="w-8 h-9 hover:bg-blue-700"
                    aria-label={`Decrease ${item.product.name} quantity`}
                  >
                    −
                  </button>

                  <span className="w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.product.id)
                    }
                    className="w-8 h-9 hover:bg-blue-700"
                    aria-label={`Increase ${item.product.name} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total and checkout */}
          <div className="mt-6 border-t pt-5">
            <div className="flex justify-between font-bold text-xl text-gray-900">
              <span>Total</span>

              <span>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              className="w-full mt-5 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.99] transition"
            >
              Proceed to Checkout →
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full mt-3 border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>
          </div>

          {/* Existing checkout modal */}
          <CheckoutModal
            open={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
          />
        </>
      )}
    </div>
  </div>
</>


);
}
