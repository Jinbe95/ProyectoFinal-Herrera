import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import productos from '../data/productos';
import '../css/style.css';

const ItemListContainer = ({ addToCart, mensaje }) => {
  const { categoriaId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Simulamos fetch con timeout
    const fetchProductos = new Promise((resolve) => {
      setTimeout(() => {
        if (categoriaId) {
          const filtrados = productos.filter(
            (p) => p.categoria.toLowerCase() === categoriaId.toLowerCase()
          );
          resolve(filtrados);
        } else {
          resolve(productos);
        }
      }, 1000);
    });

    fetchProductos
      .then((data) => setItems(data))
      .finally(() => setLoading(false));
  }, [categoriaId]);

  if (loading) return <p>Cargando productos...</p>;
  if (mensaje) return <p>{mensaje}</p>;
  if (items.length === 0) return <p>No se encontraron productos.</p>;

  return (
    <div className='textos'>
      <h2>Catálogo de productos {categoriaId ? `- ${categoriaId}` : ''}</h2>

      <div className="productos-grid">
        {items.map((prod, index) => (
          <div
            key={prod.id}
            className='producto-card fade-in'
            style={{
              animationDelay: `${index * 0.5}s`,
              animationFillMode: 'forwards',
            }}
          >
            <h3>{prod.nombre}</h3>

            <img
              src={prod.imagen}
              alt={prod.nombre}
              className="producto-imagen"
            />

            <p>Precio: ${prod.precio}</p>
            
            <div className="botones-container">
              <button onClick={() => addToCart(prod)} className="button">Agregar al carrito</button>
              <Link to={`/item/${prod.id}`} className="button">Ver detalle</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;