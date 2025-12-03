import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useCart } from "/src/context/CartContext";
import { useAuth } from "../../hooks/useAuth";

function Header({ onAbrirCarrito }) {
  const { carrito } = useCart();

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const { user, logout } = useAuth();
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
        <div className="login"></div>
        {user ? (
          <div className="user-menu">
            <span className="user-name">Hola, {user.nombre}</span>
            <button onClick={logout} className="logout-btn">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "navActive" : "navinactive"
            }
          >
            Iniciar sesión
          </NavLink>
        )}
      </nav>

      <button className="cart-btn" onClick={onAbrirCarrito}>
        🛒 Carrito (<span>{totalItems}</span>)
      </button>
    </header>
  );
}

export default Header;
