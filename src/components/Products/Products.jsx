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
            className="w-28 h-28 rounded-full overflow-hidden relative bg-neutral-600">
            <img src={item.image} alt={item.name} className={`opacity-80`} />
            <button
              onClick={() => {
                setFilter(item.name);
              }}
              value={item.name}
              className={`w-[5.5rem] h-[5.5rem] font-bold uppercase text-sm rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all ease-in duration-800 hover:bg-white hover:text-black ${
                item.name === filter
                  ? "bg-white"
                  : "bg-transparent text-white drop-shadow-lg"
              } `}>
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
