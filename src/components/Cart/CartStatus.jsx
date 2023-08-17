import { useQuery } from "@tanstack/react-query";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { getCart } from "../../api/firebase";
import { useAuthContext } from "../../context/AuthContext";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts"], () => getCart(uid));

  return (
    <Link className="p-2 relative" to="/cart">
      <HiOutlineShoppingBag className="text-2xl" />
      {products && (
        <p className="w-5 h-5 text-center text-sm bg-black text-white font-semibold rounded-full absolute -top-1 -right-2">
          {products.length}
        </p>
      )}
    </Link>
  );
}
