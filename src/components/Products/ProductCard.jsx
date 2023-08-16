import React from "react";

export default function ProductCard({
  product: { id, image, title, description, category, price },
}) {
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>
          <span>{category}</span>
          <span>{description}</span>
        </p>
        <p>€{price} Per 100g</p>
      </div>
    </li>
  );
}
