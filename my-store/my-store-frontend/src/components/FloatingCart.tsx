import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const FloatingCart: React.FC = () => {
  const { cart } = useCart();
  const router = useRouter();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="floating-cart"
      onClick={() => router.push("/cart")}
      style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }}
    >
      🛒 Cart ({totalItems})
    </div>
  );
};

export default FloatingCart;

