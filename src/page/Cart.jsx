import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCart } from "../api/firebase";
import CartItem from "../components/Cart/CartItem";
import PriceCard from "../components/Cart/PriceCard";
import { useAuthContext } from "../context/AuthContext";

const SHIPPING = 3.2;

export default function Cart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  const totalPrice =
    products &&
    products.reduce(
      (prev, current) =>
        prev +
        ((parseFloat(current.price) * parseInt(current.option)) / 100) *
          current.quantity,
      0,
    );
  return (
    <section className="">
      <p className="font-bold text-2xl tracking-widest pb-4  mx-6 my-4 border-b-2 border-black">
        My Cart
      </p>
      {!hasProducts && <p>Empty cart</p>}
      {hasProducts && (
        <>
          <ul className="mt-14 mx-6">
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>

          <div className="flex flex-col items-center px-6 pb-6 bg-gray-100">
            <PriceCard
              text="Total products price incl. VAT"
              price={totalPrice}
            />
            <PriceCard
              text="Estimated delivery"
              price={totalPrice > 50 ? 0 : SHIPPING}
              delivery
            />
            <PriceCard
              text="Total price incl. VAT"
              price={totalPrice + SHIPPING}
              final
            />
            <button className="uppercase font-bold bg-black tracking-widest text-white w-full py-4 inline-block">
              proceed to checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
