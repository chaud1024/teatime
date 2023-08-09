import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="w-full flex justify-between px-10 py-4 bg-white drop-shadow-lg">
      <a className="w-40" href="/">
        <Logo />
      </a>
      <div className="flex gap-2">
        <button className="p-2">
          <HiOutlineShoppingBag className="text-2xl" />
        </button>
        <button className="p-2">
          <AiOutlineUser className="text-2xl" />
        </button>
      </div>
    </header>
  );
}
