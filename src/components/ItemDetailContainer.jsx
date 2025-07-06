import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = ({ addToCart }) => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const docRef = doc(db, 'Daruma-Store', itemId);

    getDoc(docRef)
      .then((res) => {
        if (res.exists()) {
          setProducto({ id: res.id, ...res.data() });
          setError(null);
        } else {
          setError('Producto no encontrado');
        }
      })
      .catch(() => {
        setError('Error al obtener el producto');
      })
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

  return <ItemDetail producto={producto} addToCart={addToCart} />;
};

export default ItemDetailContainer;
