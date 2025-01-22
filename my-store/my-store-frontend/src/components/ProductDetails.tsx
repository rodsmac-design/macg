"use client";

import { useCart } from "@/context/CartContext"; // Import useCart
import ProductCarousel from "./ProductCarousel";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  specialprice?: number;
  features: string;
  tags: string;
  dimensions: string;
  imageUrls: string[];
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addToCart } = useCart(); // Use the imported hook

    const handleAddToCart = () => {
    console.log("Adding product to cart:", product); // Debugging log
    const price = product.specialprice || product.price || 0; // Fallback to 0
    addToCart({
      id: product.id,
      name: product.name,
      quantity: 1,
      price,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <p className="mt-4 text-lg">{product.description}</p>

      <div className="mt-4">
        {product.specialprice ? (
          <>
            <p className="text-lg text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-lg font-bold text-red-600">
              ${product.specialprice.toFixed(2)}
            </p>
          </>
        ) : (
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Images</h2>
        <ProductCarousel images={product.imageUrls} />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-disc pl-6">
          {product.features.split(",").map((feature, index) => (
            <li key={index}>{feature.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Tags</h2>
        <p>{product.tags}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Dimensions</h2>
        <p>{product.dimensions}</p>
      </div>

      <div className="mt-6">
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;


