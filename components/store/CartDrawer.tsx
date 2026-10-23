
"use client";

import { useState } from "react";
import { useCart } from "@/components/context/CartContext";
import CheckoutModal from "./CheckoutModal";

export interface OrderSuccessDetails {
  orderId: string;
  studentName: string;
  studentSic: string;
  items: {
    name: string;
    qty: number;
    price: number;
  }[];
  total: number;
  paymentMethod: "cash" | "online";
  paymentId?: string | null;
  date: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, increaseQuantity, decreaseQuantity } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDetails, setOrderDetails] =
    useState<OrderSuccessDetails | null>(null);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleOrderSuccess = (details: OrderSuccessDetails) => {
    setCheckoutOpen(false);
    setOrderDetails(details);
  };

  const handleContinueShopping = () => {
    setOrderDetails(null);
    onClose();
  };

  if (!open && !orderDetails) return null;

  return (
    <>
      {!orderDetails && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
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

              {items.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="mb-4 text-5xl">🛒</p>
                  <p className="text-gray-600">Your cart is empty.</p>

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
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between gap-4 rounded-xl border px-4 py-3"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                          {item.product.image_url ? (
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="h-16 w-16 rounded-lg border object-contain"
                            />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-400">
                              No image
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="break-words font-medium text-gray-900">
                              {item.product.name}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              ₹{item.product.price.toLocaleString("en-IN")}
                            </p>

                            <p className="mt-1 text-sm font-semibold text-gray-700">
                              Subtotal: ₹
                              {(item.product.price * item.quantity).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center overflow-hidden rounded-lg bg-blue-600 text-white">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.product.id)}
                            className="h-9 w-8 hover:bg-blue-700"
                            aria-label={`Decrease ${item.product.name} quantity`}
                          >
                            −
                          </button>

                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.product.id)}
                            className="h-9 w-8 hover:bg-blue-700"
                            aria-label={`Increase ${item.product.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-5">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCheckoutOpen(true)}
                      className="mt-5 w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700 active:scale-[0.99]"
                    >
                      Proceed to Checkout →
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <CheckoutModal
            open={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
            onOrderSuccess={handleOrderSuccess}
          />
        </>
      )}

      {orderDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-success-title"
            className="my-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white px-6 py-7 text-center shadow-2xl"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-9 w-9"
                aria-hidden="true"
              >
                <path d="M5 12.5 10 17 19 7" />
              </svg>
            </div>

            <h2
              id="order-success-title"
              className="text-2xl font-bold text-gray-900"
            >
              Order Placed Successfully!
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Thank you for shopping with CampusHub QuickMart.
            </p>

            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-left">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-600">Order ID</span>
                <span className="break-all text-right text-sm font-bold text-green-800">
                  {orderDetails.orderId}
                </span>
              </div>

              <div className="mt-3 flex items-start justify-between gap-3">
                <span className="text-sm text-gray-600">Order date</span>
                <span className="text-right text-sm font-medium text-gray-900">
                  {new Date(orderDetails.date).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border p-4 text-left">
              <h3 className="mb-3 font-semibold text-gray-900">
                Student Details
              </h3>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-500">Name</span>
                <span className="text-right font-medium text-gray-900">
                  {orderDetails.studentName}
                </span>
              </div>

              <div className="mt-2 flex justify-between gap-3 text-sm">
                <span className="text-gray-500">SIC</span>
                <span className="font-medium text-gray-900">
                  {orderDetails.studentSic}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border p-4 text-left">
              <h3 className="mb-3 font-semibold text-gray-900">
                Order Summary
              </h3>

              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="break-words font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-gray-500">
                        ₹{item.price.toLocaleString("en-IN")} × {item.qty}
                      </p>
                    </div>

                    <span className="shrink-0 font-medium text-gray-900">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-3">
                <div className="flex justify-between gap-3 font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{orderDetails.total.toLocaleString("en-IN")}</span>
                </div>

                <div className="mt-3 flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">Payment method</span>
                  <span className="font-medium text-gray-900">
                    {orderDetails.paymentMethod === "cash"
                      ? "Cash on Delivery"
                      : "Razorpay Online"}
                  </span>
                </div>

                {orderDetails.paymentId && (
                  <div className="mt-3 text-sm">
                    <p className="text-gray-500">Payment reference</p>
                    <p className="mt-1 break-all font-medium text-gray-900">
                      {orderDetails.paymentId}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinueShopping}
              className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
}
