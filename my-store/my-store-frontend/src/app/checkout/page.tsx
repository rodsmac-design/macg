"use client";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const handlePaymentMethod = (method) => {
    if (method === "stripe") {
      // Navigate to Stripe integration page
      router.push("/checkout/stripe");
    } else if (method === "coinbase") {
      // Navigate to Coinbase integration page
      router.push("/checkout/coinbase");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Checkout</h1>
      <p className="mt-4">Select a payment method to complete your order:</p>

      <div className="flex flex-col mt-6 space-y-4">
        <button
          onClick={() => handlePaymentMethod("stripe")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Pay with Stripe
        </button>
        <button
          onClick={() => handlePaymentMethod("coinbase")}
          className="bg-yellow-500 text-black px-4 py-2 rounded"
        >
          Pay with Coinbase
        </button>
      </div>
    </div>
  );
}

