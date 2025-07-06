import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Link, useParams } from 'react-router-dom';
import '../css/style.css';

const ItemListContainer = ({ addToCart, mensaje }) => {
  const { categoriaId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const productosRef = collection(db, "Daruma-Store");

    getDocs(productosRef)
      .then((resp) => {
        const docs = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (categoriaId) {
          const filtrados = docs.filter(
            (p) => p.categoria.toLowerCase() === categoriaId.toLowerCase()
          );
          setItems(filtrados);
        } else {
          setItems(docs);
        }
      })
      .catch((error) => console.error("Error al traer productos:", error))
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