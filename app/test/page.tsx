"use client";

export default function TestPage() {
  const testOrder = async () => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 100,
      }),
    });

    const data = await res.json();

    console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <button onClick={testOrder}>
      Create Razorpay Order
    </button>
  );
}