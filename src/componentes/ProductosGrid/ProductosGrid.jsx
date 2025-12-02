import { useState } from "react";
import "./ProductosGrid.css";

function ProductosGrid({ productos, onAbrirModal, productosPorPagina = 18 }) {
  const [paginaActual, setPaginaActual] = useState(1);

  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosPagina = productos.slice(indiceInicio, indiceFin);

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  return (
    <>
      <h2 className="productos-count-title">
        Mostrando {productosPagina.length} de {productos.length} productos
        disponibles
      </h2>

      <article id="productos" className="productos-grid">
        {productosPagina.map((producto) => {
          // TU MÉTODO EXACTO: separar imágenes por coma
          const imagenes = (producto.imagen_url || "")
            .split(",")
            .map((url) => url.trim())
            .filter((url) => url); // quita vacíos

          const primeraImagen =
            imagenes[0] ||
            "https://via.placeholder.com/300x300.png?text=Sin+Imagen";

          const agotado = (producto.stock ?? 0) <= 0;

          return (
            <div className="producto-card" key={producto.id}>
              <div
                className="imagen-container"
                style={{ position: "relative" }}
              >
                <img
                  src={primeraImagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                  onClick={() => onAbrirModal("galeria", producto)}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300.png?text=Sin+Imagen";
                  }}
                />
                {agotado && <div className="agotado-badge">AGOTADO</div>}
              </div>

              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>
              <p className="producto-precio">
                ${Number(producto.precio).toLocaleString("es-CO")}
              </p>

              <button
                className="agregar-carrito-btn"
                onClick={() => onAbrirModal("galeria", producto)}
                disabled={agotado}
              >
                {agotado ? "Sin stock" : "Ver Detalles"}
              </button>
            </div>
          );
        })}
      </article>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="paginacion">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}

export default ProductosGrid;
