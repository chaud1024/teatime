import React from "react";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../../ui/Button";
import CartStatus from "../Cart/CartStatus";
import Logo from "./Logo";
import User from "./User";

export default function Header() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="w-full flex justify-between px-6 py-1 md:px-10 md:py-4 bg-white drop-shadow-lg">
      <Link className="w-40" to="/">
        <Logo />
      </Link>
      <nav className="flex items-center gap-2">
        <Link className="p-2 font-semibold" to="/products">
          All Products
        </Link>
        {user && <CartStatus />}
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
          <Button onClick={login}>
            <AiOutlineUser className="text-2xl" />
          </Button>
        )}
        {user && (
          <Button onClick={logout}>
            <BiExit className="text-2xl" />
          </Button>
        )}
      </nav>
    </header>
  );
}
