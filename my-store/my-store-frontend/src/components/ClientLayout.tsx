"use client";

import { CartProvider, useCart } from "@/context/CartContext";
import Navigation from "@/components/Navigation";

function FloatingCartButton() {
  const { cart } = useCart();

  // Calculate total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-4 right-4">
      <a
        href="/cart"
        className="relative bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        🛒 View Cart
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </a>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {/* Header with Navigation */}
      <header className="bg-gray-800 text-white">
        <Navigation />
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-6">{children}</main>

      {/* Floating Cart Button */}
      <FloatingCartButton />

      {/* Footer */}
      <footer className="bg-gray-800 text-center text-white py-4">
        <p>&copy; {new Date().getFullYear()} My Store. All rights reserved.</p>
      </footer>
    </CartProvider>
  );
}

