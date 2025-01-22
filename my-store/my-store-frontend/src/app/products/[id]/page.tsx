import ProductDetails from "@/components/ProductDetails";
import { fetchProductById } from "@/utils/api";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = decodeURIComponent(params.id);
  console.log("Dynamic Route ID:", id); // Debugging log

  const product = await fetchProductById(id);
  console.log("Fetched Product for Details Page:", product); // Debugging log

  if (!product) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
        <p>We couldn’t find the product you were looking for.</p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}

