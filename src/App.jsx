import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

const App = () => {
  // Estado del carrito centralizado
  const [cart, setCart] = useState([]);

  // Función para agregar al carrito, que se pasa a los componentes hijos
  const addToCart = (producto) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === producto.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...producto, quantity: 1 }];
      }
    });
  };

  // Calcular la cantidad total de productos en el carrito
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Paso la cantidad de productos en carrito a NavBar */}
      <NavBar cartCount={cartCount} />

      {/* Rutas de la aplicación */}
      <Routes>
        {/* Ruta principal que muestra todos los productos */}
        <Route path="/" element={<ItemListContainer addToCart={addToCart} />} />

        {/* Ruta de categoria */}
        <Route path="/categoria/:categoriaId" element={<ItemListContainer addToCart={addToCart} />} />

        {/* Mostrar detalles del producto por ID */}
        <Route path="/item/:itemId" element={<ItemDetailContainer addToCart={addToCart} />} />

        {/* Ruta de error 404 */}
        <Route path="*" element={<ItemListContainer mensaje="Error 404: Página no encontrada" addToCart={addToCart} />} />
      </Routes>
    </>
  );
};

export default App;
