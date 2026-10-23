
"use client";

import { useState } from "react";
import { useSession } from "@/providers/SessionProvider";
import { toast } from "sonner";
import { useCart } from "@/components/context/CartContext";
import type { OrderSuccessDetails } from "./CartDrawer";

interface Props {
  open: boolean;
  onClose: () => void;
  onOrderSuccess: (details: OrderSuccessDetails) => void;
}

const WEBHOOK_URL =
  "https://hazelnut-drank-powwow.ngrok-free.dev/webhook/700df436-1e46-4cf8-9427-8a205708924d";

export default function CheckoutModal({
  open,
  onClose,
  onOrderSuccess,
}: Props) {
  const { studentSession } = useSession();
  const { items, clearCart } = useCart();

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const loadRazorpay = (): Promise<boolean> =>
    new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const submitOrderToWebhook = async (
    method: "cash" | "online",
    paymentId?: string,
    razorpayOrderId?: string
  ): Promise<boolean> => {
    if (!studentSession) {
      toast.error("Please log in before placing an order.");
      return false;
    }

    const orderDate = new Date().toISOString();

    const payload = {
      studentName: studentSession.user.full_name,
      studentSic: studentSession.user.sic_number,
      items: items.map((item) => ({
        name: item.product.name,
        qty: item.quantity,
        price: item.product.price,
      })),
      total,
      paymentMethod: method,
      paymentId: paymentId ?? null,
      orderId: razorpayOrderId ?? null,
      notes,
      createdAt: orderDate,
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      console.log("QuickMart webhook status:", response.status);
      console.log("QuickMart webhook response:", responseText);

      if (!response.ok) {
        toast.error("The order could not be confirmed. Please try again.");
        return false;
      }

      let webhookData: any = {};

      try {
        webhookData = responseText ? JSON.parse(responseText) : {};
      } catch {
        // The webhook may return plain text or an empty response.
      }

      // Support common response formats from n8n.
      const returnedOrderId =
        webhookData?.order_id ??
        webhookData?.orderId ??
        webhookData?.order?.order_id ??
        webhookData?.data?.order_id ??
        webhookData?.data?.orderId;

      const displayOrderId =
        returnedOrderId != null && String(returnedOrderId).trim() !== ""
          ? String(returnedOrderId)
          : `QM-${Date.now().toString().slice(-10)}`;

      const details: OrderSuccessDetails = {
        orderId: displayOrderId,
        studentName: studentSession.user.full_name,
        studentSic: studentSession.user.sic_number,
        items: items.map((item) => ({
          name: item.product.name,
          qty: item.quantity,
          price: item.product.price,
        })),
        total,
        paymentMethod: method,
        paymentId: paymentId ?? null,
        date: orderDate,
      };

      // Show success only after the webhook responds successfully.
      clearCart();
      setNotes("");
      setPaymentMethod("cash");
      onOrderSuccess(details);

      return true;
    } catch (error) {
      console.error("QuickMart order error:", error);
      toast.error(
        "Could not connect to the store. Please check your connection."
      );
      return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (loading || items.length === 0) return;

    if (!studentSession) {
      toast.error("Please log in before placing an order.");
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === "cash") {
        await submitOrderToWebhook("cash");
        return;
      }

      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error("Failed to load Razorpay. Check your internet connection.");
        return;
      }

      let razorpayOrder: any;

      try {
        const response = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total }),
        });

        if (!response.ok) {
          throw new Error("Payment order creation failed");
        }

        razorpayOrder = await response.json();
      } catch (error) {
        console.error(error);
        toast.error("Failed to start payment. Please try again.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "CampusHub",
        description: "QuickMart Order",
        prefill: {
          name: studentSession.user.full_name,
        },
        theme: { color: "#2563eb" },

        handler: async (paymentResponse: any) => {
          setLoading(true);

          try {
            await submitOrderToWebhook(
              "online",
              paymentResponse.razorpay_payment_id,
              paymentResponse.razorpay_order_id
            );
          } finally {
            setLoading(false);
          }
        },
      };

      const razorpay = new (window as any).Razorpay(options);

      razorpay.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
      });

      razorpay.open();
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-black/40"
        onClick={() => {
          if (!loading) onClose();
        }}
      />

      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Checkout</h2>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              aria-label="Close checkout"
              className="text-2xl disabled:opacity-50"
            >
              ✕
            </button>
          </div>

          <div className="mb-4 rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">Payment Method</h3>

            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cash"}
                  disabled={loading}
                  onChange={() => setPaymentMethod("cash")}
                />
                <span>Cash on Delivery</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "online"}
                  disabled={loading}
                  onChange={() => setPaymentMethod("online")}
                />
                <span>Pay Online (Razorpay)</span>
              </label>
            </div>
          </div>

          <div className="mb-4 rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">Notes for Shopkeeper</h3>

            <textarea
              placeholder="Any special instructions..."
              className="w-full rounded-lg border px-3 py-2"
              rows={3}
              value={notes}
              disabled={loading}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>

          <div className="mb-4 rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">Order Summary</h3>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between gap-4"
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>

                  <span>
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="mb-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading || items.length === 0}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
