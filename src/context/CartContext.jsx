import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (producto, cantidad = 1) => {
    const existingItem = cart.find(item => item.id === producto.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ));
    } else {
      setCart([...cart, { ...producto, cantidad }]);
    }

    toast.success(`${producto.nombre} x${cantidad} agregado al carrito!`);
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
