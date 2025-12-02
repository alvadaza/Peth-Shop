import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useCart } from "/src/context/CartContext";

function Header({ onAbrirCarrito }) {
  const { carrito } = useCart();

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  return (
    <header className="header">
      <div className="header-left">
        <img
          src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1758064709/PERRO-removebg-preview_3_rfzynh.png"
          alt="Logo PetShop"
          className="logo"
        />
        <h1 className="store-name">PetShop</h1>
      </div>

      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "navActive" : "navinactive")}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/productos"
          className={({ isActive }) => (isActive ? "navActive" : "navinactive")}
        >
          Productos
        </NavLink>
        <NavLink
          to="/contacto"
          className={({ isActive }) => (isActive ? "navActive" : "navinactive")}
        >
          Contacto
        </NavLink>
      </nav>

      <button className="cart-btn" onClick={onAbrirCarrito}>
        🛒 Carrito (<span>{totalItems}</span>)
      </button>
    </header>
  );
}

export default Header;
