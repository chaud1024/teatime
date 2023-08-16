import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { id, image, title, note, category, price },
}) {
  const navigate = useNavigate();
  return (
    <li
      className="mb-8 flex flex-col cursor-pointer"
      key={id}
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}>
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full transition-all hover:scale-105"
        />
      </div>
      <div className="flex flex-col grow justify-between">
        <div>
          <h3 className="font-bold mt-4 mb-2 uppercase">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            <span>{category}</span>
            <span className="inline-block w-[1px] h-[10px] bg-gray-400 mx-2"></span>
            <span className="capitalize">{note}</span>
          </p>
        </div>
        <p>
          <span className="font-bold">€{price}</span>
          <span className="text-gray-600 text-sm ml-2">Per 100g</span>
        </p>
      </div>
    </li>
  );
}
