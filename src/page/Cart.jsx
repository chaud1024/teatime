import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEquals } from "react-icons/fa";
import { HiPlusSm } from "react-icons/hi";
import { getCart } from "../api/firebase";
import PriceCard from "../components/Cart/PriceCard";
import CartItem from "../components/Cart/CartItem";
import { useAuthContext } from "../context/AuthContext";

const SHIPPING = 3000;

export default function Cart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseFloat(current.price) * current.quantity,
      0,
    );
  return (
    <section>
      <p>My Cart</p>
      {!hasProducts && <p>Empty cart</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>

          <div>
            <PriceCard text="상품 총액" price={totalPrice} />
            <HiPlusSm />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
        </>
      )}
    </section>
  );
}
