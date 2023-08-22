import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const filters = [
    {
      id: 0,
      name: "All",
      image: "./teatime-asset/category/black.jpg",
    },
    {
      id: 2,
      name: "Black tea",
      image: "./teatime-asset/category/black.jpg",
    },
    {
      id: 3,
      name: "Green tea",
      image: "./teatime-asset/category/green.jpg",
    },
    {
      id: 4,
      name: "Oolong tea",
      image: "./teatime-asset/category/oolong.jpg",
    },
    {
      id: 5,
      name: "White tea",
      image: "./teatime-asset/category/white.jpg",
    },
  ];

  const [filter, setFilter] = useState(filters[0].name);

  function getFilteredProducts(products, filter) {
    if (filter === filters[0].name) return products;
    return products.filter((item) => item.category === filter);
  }

  const filteredProductList = getFilteredProducts(products, filter);

  return (
    <>
      <ul className="flex gap-6 justify-center mt-10">
        {filters.map((item) => (
          <li
            key={item.id}
            className="w-24 h-24 rounded-full overflow-hidden relative">
            <img
              src={item.image}
              alt={item.name}
              className={`opacity-30 ${
                item.name === filter ? "opacity-70" : ""
              } `}
            />
            <button
              onClick={() => {
                setFilter(item.name);
              }}
              value={item.name}
              className="w-full h-full bg-transparent absolute inset-0">
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 p-4 mt-8">
        {products &&
          filteredProductList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
