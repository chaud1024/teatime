import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addOrUpdateToCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { uid } = useAuthContext();
  const {
    state: {
      product: {
        id,
        image,
        title,
        category,
        description,
        note,
        price,
        options,
      },
    },
  } = useLocation();

  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateToCart(uid, product);
  };

  return (
    <section className="flex gap-3">
      <div className="w-1/2 overflow-hidden">
        <img src={image} alt={title} />
        <div className="w-full px-8 py-10 bg-black text-white text-center">
          <h3 className="text-2xl">
            {category} - {title}
          </h3>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <h3 className="font-bold uppercase text-2xl tracking-widest mt-8 mb-4">
          {title}
        </h3>
        <p className="font-bold uppercase text-sm mb-5">
          {category}
          <span className="mx-2 w-[1px] h-3 bg-slate-600 inline-block"></span>{" "}
          {note}
        </p>
        <div className="my-8 pb-8 border-b border-gray-950">
          <p className="font-semibold mb-4">Description</p>
          <p>{description}</p>
        </div>
        <div>
          <p>
            <span className="font-bold">€{price}</span> <span>Per 100g</span>
          </p>
          <select
            onChange={handleSelect}
            value={selected}
            className="w-full border border-gray-950 p-4 my-8">
            {options &&
              options.map((option, index) => (
                <option key={index}>{option}g</option>
              ))}
          </select>
          <button
            className="w-full p-4 bg-black text-white uppercase font-bold"
            onClick={handleClick}>
            add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
