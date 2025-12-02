import React from "react";
import "./Navar.css";

function Navar() {
  return (
    <nav className="hero">
      <div className="top-bar">
        <a href="#productos" className="login">
          🌙 PetShop - Amigo Fiel
        </a>
        <a href="/login.html" className="login-btn">
          Iniciar Sesión
        </a>
      </div>

      <section className="hero-content">
        <img
          src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1758065779/PERRO-removebg-preview_5_c0osrz.png"
          alt="Logo PetShop Amigo Fiel"
          className="logo"
        />
        <p>Todo para el cuidado de tu mascota</p>
        <h2>PetShop Amigo Fiel</h2>
        <a href="#about" className="btn">
          Explorar Servicios
        </a>
      </section>
    </nav>
  );
}

export default Navar;
