import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { login, logout, onUserStateChange } from "../../api/firebase";
import Button from "../../ui/Button";
import Logo from "./Logo";
import User from "./User";

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  const handleLogIn = () => {
    login().then(setUser);
  };
  const handleLogOut = () => {
    logout().then(setUser);
  };

  return (
    <header className="w-full flex justify-between px-6 py-1 md:px-10 md:py-4 bg-white drop-shadow-lg">
      <Link className="w-40" to="/">
        <Logo />
      </Link>
      <nav className="flex items-center gap-2">
        <Link className="p-2 font-semibold" to="/products">
          All Products
        </Link>
        {user && (
          <Link className="p-2" to="/cart">
            <HiOutlineShoppingBag className="text-2xl" />
          </Link>
        )}
        {user && (
          <>
            {user.isAdmin ? (
              <Link className="p-2" to="/products/add">
                <AiOutlineEdit className="text-2xl" />
              </Link>
            ) : null}
            <User user={user} />
          </>
        )}
        {!user && (
            <AiOutlineUser className="text-2xl" />
        )}
        {user && (
            <BiExit className="text-2xl" />
        )}
      </nav>
    </header>
  );
}
