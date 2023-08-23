import React from "react";

export default function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  return (
    <nav className="w-full flex gap-4 justify-center items-center mb-10">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="bg-gray-200 py-2 px-4 rounded-lg">
        앞으로
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`w-8 h-8 rounded-full  ${
              page === i + 1 ? "bg-neutral-300" : "bg-neutral-100"
            }`}>
            {i + 1}
          </button>
        ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        className="bg-gray-200 py-2 px-4 rounded-lg">
        뒤로
      </button>
    </nav>
  );
}
