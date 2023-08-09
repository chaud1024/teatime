import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex items-center shrink-0">
      <img
        src={photoURL}
        alt={displayName}
        className="w-8 rounded-full md:mr-2"
      />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
}
