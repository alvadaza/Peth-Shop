import React from "react";
import { useDatos } from "../../hooks/useDatos";
import "./Filter.css";

export default function Filters({ categoriaActiva, onCambiarCategoria }) {
  const { categorias, cargando } = useDatos();

  if (cargando) {
    return (
      <section id="filters">
        <p>Cargando categorías...</p>
      </section>
    );
  }

  return (
    <section id="filters">
      <button
        className={`filter-btn ${!categoriaActiva ? "active" : ""}`}
        onClick={() => onCambiarCategoria("")}
      >
        Todos
      </button>

      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          className={`filter-btn ${
            categoriaActiva === categoria.id.toString() ? "active" : ""
          }`}
          onClick={() => onCambiarCategoria(categoria.id.toString())}
        >
          {categoria.nombre}
        </button>
      ))}
    </section>
  );
}
