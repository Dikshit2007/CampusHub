"use client";
import { useSession } from "@/providers/SessionProvider";
import { toast } from "sonner";
import { useCart } from "@/components/context/CartContext";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const WEBHOOK_URL =
  "https://hazelnut-drank-powwow.ngrok-free.dev/webhook/700df436-1e46-4cf8-9427-8a205708924d";

/** Sends order data to the n8n webhook. Returns true on success, false on failure. */
async function notifyWebhook(payload: object): Promise<{ order_id: string } | null> {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

function generateLocalOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CH-${ts}-${rand}`;
}

export default function CheckoutModal({
  open,
  onClose,
}: Props) {
  const { studentSession } = useSession();
  const { items, clearCart } = useCart();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<"cash" | "online">("cash");

  const total = items.reduce(
    (sum, item) =>
      sum +
      item.product.price * item.quantity,
    0
  );

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    try {
      if (paymentMethod === "online") {
        const loaded = await loadRazorpay();
        if (!loaded) {
          toast.error("Failed to load Razorpay. Check your internet connection.");
          return;
        }

        let razorpayOrder: any = null;
        try {
          const orderResponse = await fetch("/api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total }),
          });
          if (!orderResponse.ok) throw new Error("Order creation failed");
          razorpayOrder = await orderResponse.json();
        } catch {
          toast.error("Failed to create payment order. Please try cash payment.");
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
            name: studentSession?.user.full_name,
          },
          theme: { color: "#2563eb" },
          handler: async function (response: any) {
            const payload = {
              studentName: studentSession?.user.full_name,
              studentSic: studentSession?.user.sic_number,
              items: items.map((item) => ({
                name: item.product.name,
                qty: item.quantity,
              })),
              total,
              paymentMethod: "online",
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              notes,
            };

            const data = await notifyWebhook(payload);
            const confirmedOrderId =
              data?.order_id ?? response.razorpay_order_id ?? generateLocalOrderId();

            clearCart();
            setOrderId(confirmedOrderId);
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", () => {
          toast.error("Payment failed. Please try again.");
        });
        rzp.open();
        return;
      }

      // Cash on delivery flow
      setLoading(true);

      const payload = {
        studentName: studentSession?.user.full_name,
        studentSic: studentSession?.user.sic_number,
        items: items.map((item) => ({
          name: item.product.name,
          qty: item.quantity,
        })),
        total,
        paymentMethod,
        notes,
      };

      const data = await notifyWebhook(payload);
      const confirmedOrderId = data?.order_id ?? generateLocalOrderId();

      clearCart();
      setOrderId(confirmedOrderId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <>
        <div className="fixed inset-0 bg-black/40 z-50" />

        <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">

            <div className="text-5xl mb-4">
              🎉
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Order Placed Successfully
            </h2>

            <p className="text-gray-500">
              Order ID
            </p>

            <p className="font-bold text-lg mb-4">
              {orderId}
            </p>

            <p className="text-gray-500 mb-6">
              {paymentMethod === "cash" ? "Cash on Delivery" : "Online Payment"}
            </p>

            <button
              onClick={() => {
                setOrderId("");
                setNotes("");
                onClose();
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Continue Shopping
            </button>

          </div>
        </div>
      </>
    );
  }

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Checkout
            </h2>

            <button
              onClick={onClose}
              className="text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="border rounded-xl p-4 mb-4">
            <h3 className="font-semibold mb-3">
              Payment Method
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cash"}
                  onChange={() =>
                    setPaymentMethod("cash")
                  }
                />

                <span>Cash on Delivery</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "online"}
                  onChange={() =>
                    setPaymentMethod("online")
                  }
                />

                <span>Pay Online (Razorpay)</span>
              </label>
            </div>
          </div>

          <div className="border rounded-xl p-4 mb-4">
            <h3 className="font-semibold mb-3">
              Notes for Shopkeeper
            </h3>
            <textarea
              placeholder="Any special instructions..."
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />
          </div>

          <div className="border rounded-xl p-4 mb-4">
            <h3 className="font-semibold mb-3">
              Order Summary
            </h3>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between"
                >
                  <span>
                    {item.product.name} ×{" "}
                    {item.quantity}
                  </span>

                  <span>
                    ₹
                    {item.product.price *
                      item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-xl p-4">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading || items.length === 0}
              className="
                w-full
                bg-blue-600
                text-white
                py-3
                rounded-xl
                hover:bg-blue-700
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}