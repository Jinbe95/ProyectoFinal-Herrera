import React, { useState } from 'react';
import ItemCount from './ItemCount';
import { toast } from 'react-toastify';

const ItemDetail = ({ producto, addToCart }) => {
  const [agregado, setAgregado] = useState(false);

  if (!producto) return <p>Cargando producto...</p>;

 const handleAdd = (cantidad) => {
  addToCart(producto, cantidad);
  };

  return (
    <div className="item-detail textos item-detail-container">
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} className="producto-imagen detalle-imagen" />
      <p className="descripcion">{producto.descripcion}</p>

      {producto.imagenTalles && (
        <div className="tabla-talles">
          <h3>Tabla de talles</h3>
          <img src={producto.imagenTalles} alt="Tabla de talles" className="tabla-talles-imagen" />
        </div>
      )}

      <p className="precio">Precio: ${producto.precio}</p>

      {agregado ? (
        <p className="confirmacion">¡Producto agregado al carrito!</p>
      ) : (
        <ItemCount stock={producto.stock || 10} onAdd={handleAdd} />
      )}
    </div>
  );
};

export default ItemDetail;
