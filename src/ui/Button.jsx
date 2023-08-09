import React from "react";

export default function Button({ children, onClick }) {
  return (
    <button className="p-2" onclick={onClick}>
      {children}
    </button>
  );
}
