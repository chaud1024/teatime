import React from "react";

export default function PriceCard({ text, price, final, delivery }) {
  return (
    <div className="w-full flex justify-between items-center py-6 border-b border-gray-200">
      <div>
        <p className="text-sm text-gray-600">{text}</p>
        {delivery ? (
          <span className="text-sm text-red-500">
            <p>* Free shipping over €50</p>
          </span>
        ) : null}
      </div>
      <p className={`font-bold ${final ? "text-xl" : ""}`}>€{price}</p>
    </div>
  );
}
