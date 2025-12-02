import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="nf-container">
      <img
        src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1758062313/mascotas/Dise%C3%B1o_sin_t%C3%ADtulo-removebg-preview_zz3hk5.png"
        alt="Página no encontrada"
        className="nf-image"
      />

      <h1 className="nf-title">Página no encontrada (404)</h1>
      <p className="nf-text">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>

      <Link to="/" className="nf-button">
        ⬅ Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
