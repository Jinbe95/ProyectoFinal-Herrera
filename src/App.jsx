import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout"; // 💡 IMPORTANTE: agregá esta línea
import { useCartContext } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const App = () => {
  const { cartCount, addToCart } = useCartContext();

  return (
    <>
      <NavBar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<ItemListContainer addToCart={addToCart} />} />
        <Route
          path="/categoria/:categoriaId"
          element={<ItemListContainer addToCart={addToCart} />}
        />
        <Route
          path="/item/:itemId"
          element={<ItemDetailContainer addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> {/* ✅ RUTA AGREGADA */}

        <Route
          path="*"
          element={
            <ItemListContainer
              mensaje="Error 404: Página no encontrada"
              addToCart={addToCart}
            />
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default App;
