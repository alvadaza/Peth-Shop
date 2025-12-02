import React from "react";
import "./Tosearch.css"; // Crearemos estos estilos

function Tsearch({ search, setSearch }) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <section className="tosearch">
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            id="tosearch"
            placeholder="🔍 Buscar productos..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
          {search && (
            <button
              className="clear-search-btn"
              onClick={clearSearch}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>

        {/* Mostrar sugerencias o resultados rápidos */}
        {search && (
          <div className="search-suggestions">
            <small>
              Buscando: <strong>"{search}"</strong>
            </small>
          </div>
        )}
      </div>
    </section>
  );
}

export default Tsearch;
