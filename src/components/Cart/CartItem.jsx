import React from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { addOrUpdateToCart, removeFromCart } from "../../api/firebase";

const ICON_CLASS = "cursor-pointer hover:scale-105 text-lg";

export default function ProductItem({
  product,
  product: { id, image, title, option, quantity, price },
  uid,
}) {
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });
  const handleDelete = () => removeFromCart(uid, id);

  return (
    <li className="flex gap-6 pb-6 mb-6 border-b border-gray-200">
      <div className="basis-1/6 overflow-hidden">
        <img src={image} alt={title} className="w-full" />
      </div>
      <div className="flex flex-col justify-between grow">
        <div>
          <p className="tracking-widest font-semibold">{title}</p>
          <p className="text-gray-600 my-2">€{price} Per 100g</p>
          <p className="font-semibold">Ordered: {option}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">
            €{(parseFloat(price) * parseInt(option)) / 100}
          </p>
          <div className="flex items-center gap-2">
            <AiOutlineMinusSquare
              onClick={handleMinus}
              className={ICON_CLASS}
            />
            <span>{quantity}</span>
            <AiOutlinePlusSquare onClick={handlePlus} className={ICON_CLASS} />
            <BsTrash3 onClick={handleDelete} className={ICON_CLASS} />
          </div>
        </div>
      </div>
    </li>
  );
}
