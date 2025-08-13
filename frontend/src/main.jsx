import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CartList from "./components/CartList.jsx";
import Profile from "./pages/Profile.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import MyOrders from "./pages/MyOrder.jsx";
import Checkout from "./pages/Checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "get-product/:id",
            element: <ProductDetails />,
          },
          {
            path: "cart-List",
            element: <CartList />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path:"order",
            element:<MyOrders />
          },
          {
            path:"checkout",
            element:<Checkout />
          }
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
