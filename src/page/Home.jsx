import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../api/firebase";
import ProductCard from "../components/Products/ProductCard";

export default function Home() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], () => getProducts());
  return (
    <>
      <>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div>
          <img
            src="/teatime-asset/banner/banner.png"
            alt="배너이미지"
            className="w-full"
          />
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 p-4 mt-8">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </ul>
      </>
    </>
  );
}
