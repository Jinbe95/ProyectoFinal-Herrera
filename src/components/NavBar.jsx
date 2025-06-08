import React from "react";
import { Link } from 'react-router-dom';
import CartWidget from "./CartWidget";
import '../css/style.css'; 

const NavBar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <h1>🛍️ Mi Tienda</h1>
      <Link to="/">Inicio</Link>
      <Link to="/categoria/Shonen">Shonen</Link>
      <Link to="/categoria/Spokon">Spokon</Link>
      <Link to="/categoria/Games">Games</Link>
      <Link to="/categoria/Otros">Otros</Link>
      <span>
        {/* Paso la cantidad al componente CartWidget */}
        <CartWidget count={cartCount} />
      </span>
    </nav>
  );
};

export default NavBar;
