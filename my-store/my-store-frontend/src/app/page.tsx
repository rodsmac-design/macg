"use client";

import { useCart } from "@/context/CartContext";
import { fetchProducts } from "@/utils/api";

export default async function HomePage() {
  const { addToCart } = useCart();
  const products = await fetchProducts();

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.description}</p>
            <p className="mt-2">
              {product.specialPrice ? (
                <>
                  <span className="line-through text-red-500">
                    ${product.price}
                  </span>{" "}
                  <span className="text-green-600">
                    ${product.specialPrice}
                  </span>
                </>
              ) : (
                <span>${product.price}</span>
              )}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

