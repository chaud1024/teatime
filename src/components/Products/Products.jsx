import React from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const filteredProducts = products.filter(
    (item) => item.category === "Black tea",
  );

  console.log(filteredProducts);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 p-4 mt-8">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
