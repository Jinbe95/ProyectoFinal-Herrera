import React from 'react';
import { Link } from 'react-router-dom'; 
import '../css/style.css'; 

const CartWidget = ({ count }) => {
  return (
    <Link to="/cart" className="cart-widget">
      <span role="img" aria-label="carrito">🛒</span>
      <span>{count}</span>
    </Link>
  );
};

export default CartWidget;