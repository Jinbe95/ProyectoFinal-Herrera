import React from 'react';
import '../css/style.css'; 

const CartWidget = ({ count }) => {
    return (
        <div className="cart-widget">
            <span role="img" aria-label="carrito">🛒</span>
            <span>{count}</span>
        </div>
    );
};

export default CartWidget;
