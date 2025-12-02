import React, { useEffect } from "react";
import "./AlertModal.css";

function AlertModal({ mensaje, tipo = "success", onCerrar, visible }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onCerrar();
      }, 3000); // Se cierra automáticamente después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [visible, onCerrar]);

  if (!visible) return null;

  return (
    <div className={`alert-modal alert-${tipo}`}>
      <div className="alert-content">
        <span className="alert-icon">
          {tipo === "success" && "✅"}
          {tipo === "warning" && "⚠️"}
          {tipo === "error" && "❌"}
          {tipo === "info" && "ℹ️"}
        </span>
        <span className="alert-message">{mensaje}</span>
        <button className="alert-close" onClick={onCerrar}>
          ×
        </button>
      </div>
    </div>
  );
}

export default AlertModal;
