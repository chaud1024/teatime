import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import AddProducts from "./page/AddProducts";
import AllProducts from "./page/AllProducts";
import Cart from "./page/Cart";
import ProductDetail from "./page/ProductDetail";

import ProtectedRoute from "./page/ProtectedRoute";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>페이지를 찾을 수 없습니다.</p>,
    children: [
      {
        index: true,
        element: <AllProducts />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/products/:keyword",
        element: <AllProducts />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/products/add",
        element: (
          <ProtectedRoute requireAdmin>
            <AddProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
