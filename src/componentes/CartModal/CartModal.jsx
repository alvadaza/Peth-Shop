import React from "react";
import "./CartModal.css";

function CartModal({
  abierto,
  carrito,
  onCerrar,
  onEliminarItem,
  onActualizarCantidad,
  onVaciarCarrito,
  onProcederPedido, // ✅ RECIBIENDO LA FUNCIÓN
}) {
  if (!abierto) return null;

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const obtenerPrimeraImagen = () => {
    if (carrito.length === 0) return null;
    const primerProducto = carrito[0];
    const imagenesStr =
      primerProducto.imagen_url || primerProducto.imagen || "";
    return (
      imagenesStr
        .split(",")
        .map((u) => u.trim())
        .find((u) => u) || null
    );
  };
  const imagenPrincipal = obtenerPrimeraImagen();

  return (
    <section
      id="cartModal"
      className="modal"
      style={{ display: abierto ? "block" : "none" }}
    >
      <div className="modal-content">
        <span id="closeCartBtn" onClick={onCerrar}>
          &times;
        </span>
        <h2>🛒 Tu carrito</h2>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            <ul id="cartItems">
              {carrito.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={imagenPrincipal} alt={item.nombre} width="50" />
                  <div className="item-info">
                    <strong>{item.nombre}</strong>
                    <p>
                      ${item.precio.toLocaleString()} x {item.cantidad}
                    </p>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() =>
                        onActualizarCantidad(item.id, item.cantidad - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      onClick={() =>
                        onActualizarCantidad(item.id, item.cantidad + 1)
                      }
                    >
                      +
                    </button>
                    <button onClick={() => onEliminarItem(item.id)}>🗑️</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-total">
              <p>
                <strong>
                  Total: $<span id="cartTotal">{total.toLocaleString()}</span>
                </strong>
              </p>
            </div>

            <div className="cart-actions">
              <button onClick={onVaciarCarrito} className="btn-vaciar">
                Vaciar Carrito
              </button>
              <button onClick={onProcederPedido} className="btn-whatsapp">
                📱 Proceder con el Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default CartModal;
