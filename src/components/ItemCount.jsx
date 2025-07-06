import React, { useState } from 'react';


const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [cantidad, setCantidad] = useState(initial);
  const [loading, setLoading] = useState(false);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAddClick = () => {
    setLoading(true);
    onAdd(cantidad);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="item-count">
      <div className="controles">
        <button className="button" onClick={decrementar} disabled={loading}>-</button>
        <span>{cantidad}</span>
        <button className="button" onClick={incrementar} disabled={loading}>+</button>
      </div>
      <button onClick={handleAddClick} className="button" disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar al carrito'}
      </button>
    </div>
  );
};

export default ItemCount;