import React from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  specialprice: number;
  imageUrls: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      quantity: 1,
      price: product.specialprice || product.price,
    });
  };

  return (
    <div className="product-card">
      <img src={product.imageUrls[0]} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        Price:{" "}
        {product.specialprice > 0 ? (
          <>
            <span className="special-price">${product.specialprice}</span>{" "}
            <span className="original-price">${product.price}</span>
          </>
        ) : (
          <span>${product.price}</span>
        )}
      </p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;

