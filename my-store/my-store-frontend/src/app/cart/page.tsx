"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + (item.specialPrice ? item.specialPrice : item.price) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold">Your Cart</h1>
        <p className="mt-4">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Your Cart</h1>
      <ul className="mt-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div>
              <h2 className="text-xl">{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>
                Price: $
                {item.specialPrice
                  ? item.specialPrice * item.quantity
                  : item.price * item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h2 className="text-2xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
        <button
          onClick={clearCart}
          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => router.push("/checkout")}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

