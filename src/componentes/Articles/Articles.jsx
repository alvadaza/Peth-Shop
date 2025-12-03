// src/componentes/Articulos.jsx
import React from "react";
import "./Articles.css";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function Articulos({ articulos }) {
  useScrollAnimation();
  return (
    <section className="articulos-section animate-on-scroll">
      <h3 className="articulos-title">Conoce Más Sobre Nosotros</h3>

      <div className="articulos-grid animate-on-scroll">
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
