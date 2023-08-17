import React from "react";

export default function PriceCard({ text, price, final, delivery }) {
  return (
    <div className="w-full flex justify-between items-center py-6 border-b border-gray-200">
      <p className="text-sm text-gray-600">
        {text}
        <span className="text-red-500">
          {delivery ? <p>* Free shipping over €50</p> : null}
        </span>
      </p>
      <p className={`font-bold ${final ? "text-xl" : ""}`}>€{price}</p>
    </div>
  );
}
