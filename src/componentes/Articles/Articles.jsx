// src/componentes/Articulos.jsx
import React from "react";
import "./Articles.css";

export default function Articulos({ articulos }) {
  return (
    <section className="articulos-section">
      <h3 className="articulos-title">Conoce Más Sobre Nosotros</h3>

      <div className="articulos-grid">
        {articulos.map((art, index) => (
          <div className="articulo-card" key={index}>
            <img src={art.imagen} alt={art.titulo} />
            <h4>{art.titulo}</h4>
            <p>{art.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
