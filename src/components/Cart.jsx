import React from "react";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../css/style.css";

const Cart = () => {
  const { cart, removeItem, clearCart, totalPrice } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="textos">
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="button">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Carrito de compras</h2>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.nombre}</h3>
          <p>Cantidad: {item.cantidad}</p>
          <p>Precio unitario: ${item.precio}</p>
          <p>Subtotal: ${item.precio * item.cantidad}</p>
          <button onClick={() => removeItem(item.id)} className="button">
            Eliminar
          </button>
        </div>
      ))}

      <div className="cart-total">Total a pagar: ${totalPrice}</div>

      <div className="cart-actions">
        <button onClick={clearCart} className="button">
          Vaciar carrito
        </button>
        <Link to="/checkout" className="button">
          Finalizar compra
        </Link>
      </div>
    </div>
  );
};

export default Cart;