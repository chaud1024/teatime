import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { login, logout, onUserStateChange } from "../../api/firebase";
import Logo from "./Logo";
import User from "./User";

export default function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => setUser(user));
  }, []);

  const handleLogIn = () => {
    login().then(setUser);
  };
  const handleLogOut = () => {
    logout().then(setUser);
  };

  return (
    <header className="w-full flex justify-between px-10 py-4 bg-white drop-shadow-lg">
      <Link className="w-40" href="/">
        <Logo />
      </Link>
      <nav className="flex items-center gap-2">
        <Link
          className="p-2 font-semibold"
          onClick={() => navigate("/products")}>
          All Products
        </Link>
        <Link className="p-2" onClick={() => navigate("/cart")}>
          <HiOutlineShoppingBag className="text-2xl" />
        </Link>
        <Link className="p-2" onClick={() => navigate("/products/add")}>
          <AiOutlineEdit className="text-2xl" />
        </Link>
        {user && <User user={user} />}
        {!user && (
          <button className="p-2" onClick={handleLogIn}>
            <AiOutlineUser className="text-2xl" />
          </button>
        )}
        {user && (
          <button className="p-2" onClick={handleLogOut}>
            <BiExit className="text-2xl" />
          </button>
        )}
      </nav>
    </header>
  );
}
