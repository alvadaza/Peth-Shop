import React, { useState, useEffect } from "react";
import "./GaleriaModal.css";

function GaleriaModal({ abierto, producto, onCerrar, onAgregarCarrito }) {
  const [cantidad, setCantidad] = useState(1);
  const [stockLocal, setStockLocal] = useState(0); // ← ESTA LÍNEA TE FALTABA
  const [imagenPrincipal, setImagenPrincipal] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!abierto || !producto) return;

    setCantidad(1);
    setStockLocal(producto.stock || 0); // ← ahora sí existe

    const imagenes = (producto.imagen_url || "")
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);

    setImagenPrincipal(
      imagenes[0] || "https://via.placeholder.com/500x500.png?text=Sin+Imagen"
    );
  }, [abierto, producto]);

  if (!abierto || !producto) return null;

  // Procesar imágenes
  const imagenes = (producto.imagen_url || "")
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url);

  const cambiarImagen = (url) => setImagenPrincipal(url);

  const sumar = () => {
    if (cantidad < stockLocal) setCantidad(cantidad + 1);
  };

  const restar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const agregarAlCarrito = () => {
    onAgregarCarrito(producto, cantidad);
    setCantidad(1);
    setTimeout(onCerrar, 800);
  };

  return (
    <section className="modal" style={{ display: abierto ? "flex" : "none" }}>
      <article className="modal-content galeria-modal">
        <span className="close" onClick={onCerrar}>
          ×
        </span>

        <h2>{producto.nombre}</h2>
        <p className="precio-grande">
          ${Number(producto.precio).toLocaleString("es-CO")}
        </p>

        <div className="imagen-principal">
          <img src={imagenPrincipal} alt={producto.nombre} />
        </div>

        {imagenes.length > 1 && (
          <div className="galeria-imagenes">
            {imagenes.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Vista ${i + 1}`}
                className={url === imagenPrincipal ? "activa" : ""}
                onClick={() => cambiarImagen(url)}
              />
            ))}
          </div>
        )}

        <p className="descripcion">{producto.descripcion}</p>

        <p
          className="stock"
          style={{
            color: stockLocal > 5 ? "green" : stockLocal > 0 ? "orange" : "red",
            fontWeight: "bold",
          }}
        >
          Stock: {stockLocal} unidades
        </p>

        <div className="cantidad-container">
          <button onClick={restar} disabled={cantidad <= 1}>
            −
          </button>
          <input type="number" value={cantidad} readOnly />
          <button onClick={sumar} disabled={cantidad >= stockLocal}>
            +
          </button>
        </div>

        <button
          className="btn-agregar"
          onClick={agregarAlCarrito}
          disabled={stockLocal <= 0}
        >
          {stockLocal <= 0 ? "Sin Stock" : "Agregar al Carrito"}
        </button>
      </article>
    </section>
  );
}

export default GaleriaModal;
