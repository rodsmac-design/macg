"use client"; // Ensure this file is marked as a client component

import { useState, useEffect } from "react";
import { fetchProducts } from "@/utils/api";
import ProductsList from "@/components/ProductsList";
import SidebarFilters from "@/components/SidebarFilters";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchData();
  }, []);

const handleFilterChange = (filters) => {
  const { category, subcategory, subSubcategory, specialCategory, searchQuery } = filters;

  const filtered = products.filter((product) => {
    return (
      (!category || product.category === category) &&
      (!subcategory || product.subcategory === subcategory) &&
      (!subSubcategory || product.subSubcategory === subSubcategory) &&
      (!specialCategory || product.specialCategory === specialCategory) &&
      (!searchQuery || (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  });

  setFilteredProducts(filtered);
};
  return (
    <div className="flex">
      <aside className="w-1/4 p-4 border-r">
        <SidebarFilters products={products} onFilterChange={handleFilterChange} />
      </aside>
      <main className="flex-1 p-4">
        <h1 className="text-4xl font-bold text-center">Products</h1>
        <ProductsList products={filteredProducts} />
      </main>
    </div>
  );
}


