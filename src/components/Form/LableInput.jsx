import React from "react";

export default function LableInput({
  text,
  type,
  name,
  id,
  onChange,
  value,
  placeholder,
}) {
  return (
    <div className="w-full flex gap-4 items-center">
      <label htmlFor={id} className="w-3/12 text-start">
        {text}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required
        className="border border-gray-400 p-2 w-9/12"
      />
    </div>
  );
}
