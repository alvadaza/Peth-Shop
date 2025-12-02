import React from "react";
import "./ConfirmModal.css";

function ConfirmModal({
  visible,
  titulo,
  mensaje,
  textoConfirmar = "Sí, confirmar",
  textoCancelar = "Cancelar",
  onConfirmar,
  onCancelar,
}) {
  if (!visible) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <div className="confirm-header">
          <h3>{titulo}</h3>
        </div>
        <div className="confirm-body">
          <p>{mensaje}</p>
        </div>
        <div className="confirm-actions">
          <button className="btn-cancelar" onClick={onCancelar}>
            {textoCancelar}
          </button>
          <button className="btn-confirmar" onClick={onConfirmar}>
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
