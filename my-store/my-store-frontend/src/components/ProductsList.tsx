"use client";

import Link from "next/link";
import ProductCarousel from "./ProductCarousel";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  specialprice?: number; // Optional field for discounted price
  imageUrls: string[];
}

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    console.log("Adding product to cart:", product); // Debugging log
    addToCart({
      id: product.id,
      name: product.name,
      quantity: 1,
      price: product.specialprice || product.price,
    });
    toast.success(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded-lg shadow-md relative">
          {/* Badge for products on sale */}
          {product.specialprice && (
            <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
              On Sale
            </span>
          )}

          {/* Render product name */}
          <h2 className="text-2xl font-semibold">{product.name}</h2>

          {/* Render product description */}
          <p className="mt-2">{product.description}</p>

          {/* Product images carousel */}
          <ProductCarousel images={product.imageUrls} />

          {/* Dynamic price rendering */}
          <div className="mt-2">
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

          {/* Add to cart and view details */}
          <div className="mt-4 flex justify-between items-center">
            <Link
              href={`/products/${product.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;

