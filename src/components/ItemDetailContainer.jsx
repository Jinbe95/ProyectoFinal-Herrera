import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productos from '../data/productos';
import '../css/style.css';

const fetchProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find(p => p.id === parseInt(id));
      if (producto) {
        resolve(producto);
      } else {
        reject('Producto no encontrado');
      }
    }, 1000);
  });
};

const ItemDetailContainer = ({ addToCart }) => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProductById(itemId)
      .then(prod => {
        setProducto(prod);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setProducto(null);
      })
      .finally(() => setLoading(false));
  }, [itemId]);

  // Si está cargando, mostrar mensaje
  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

return (
    <div className='textos item-detail-container'>
      <Link to="/" className="button volver-button">Volver</Link>

      <h2>{producto.nombre}</h2>

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="producto-imagen detalle-imagen"
      />

      <p className="descripcion">{producto.descripcion}</p>

      {producto.imagenTalles && (
        <div className="tabla-talles">
          <h3>Tabla de talles</h3>
          <img
            src={producto.imagenTalles}
            alt="Tabla de talles"
            className="tabla-talles-imagen"
          />
        </div>
      )}

      <p className="precio">Precio: ${producto.precio}</p>

      <button className="button" onClick={() => addToCart(producto)}>Agregar al carrito</button>
    </div>
  );
};

export default ItemDetailContainer;

