import React, { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCartContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    email: '',
    metodoPago: '',
    tarjeta: '',
    vencimiento: '',
    codigo: '',
    aliasCVU: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orden = {
      comprador: {
        nombre: form.nombre,
        apellido: form.apellido,
        direccion: form.direccion,
        email: form.email,
        metodoPago: form.metodoPago,
        ...(form.metodoPago === 'transferencia'
          ? { aliasCVU: form.aliasCVU }
          : {
              tarjeta: form.tarjeta,
              vencimiento: form.vencimiento,
              codigo: form.codigo,
            }),
      },
      items: cart.map(item => ({
        id: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
      total: totalPrice,
      fecha: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, 'ordenes'), orden);
      clearCart();
      alert(`¡Gracias por tu compra! ID de orden: ${docRef.id}`);
      navigate('/');
    } catch (err) {
      console.error('Error al guardar orden:', err);
      alert('Hubo un error al procesar tu compra.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar compra</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-row">
          <input
            name="nombre"
            placeholder="Nombre"
            required
            value={form.nombre}
            onChange={handleChange}
          />
          <input
            name="apellido"
            placeholder="Apellido"
            required
            value={form.apellido}
            onChange={handleChange}
          />
        </div>

        <input
          name="direccion"
          placeholder="Dirección"
          required
          value={form.direccion}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          required
          value={form.email}
          onChange={handleChange}
        />

        <select
          name="metodoPago"
          value={form.metodoPago}
          onChange={handleChange}
          required
        >
          <option value="">Método de pago</option>
          <option value="debito">Débito</option>
          <option value="credito">Crédito</option>
          <option value="transferencia">Transferencia</option>
        </select>

        {form.metodoPago === 'transferencia' ? (
          <input
            name="aliasCVU"
            placeholder="Alias o CVU"
            required
            value={form.aliasCVU}
            onChange={handleChange}
          />
        ) : form.metodoPago ? (
          <div className="form-row">
            <input
              name="tarjeta"
              placeholder="Número de tarjeta"
              required
              value={form.tarjeta}
              onChange={handleChange}
            />
            <input
              name="vencimiento"
              placeholder="Vencimiento"
              required
              value={form.vencimiento}
              onChange={handleChange}
            />
            <input
              name="codigo"
              placeholder="Código de seguridad"
              required
              value={form.codigo}
              onChange={handleChange}
            />
          </div>
        ) : null}

        <button type="submit" className="button">
          Confirmar pedido
        </button>
      </form>
    </div>
  );
};

export default Checkout;
