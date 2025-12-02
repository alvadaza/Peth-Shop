import React, { useState } from "react";
import { generarPDFPedido } from "/src/utils/generarPDFPedido.js";
import { supabase } from "/src/supabase/supabase.js";
import { useValidacion } from "/src/hooks/useValidacion.js";

function DatosClienteModal({
  abierto,
  onCerrar,
  carrito,
  setCarrito,
  mostrarAlerta,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });
  const [procesando, setProcesando] = useState(false);

  // Validaciones con tu hook
  const nombreVal = useValidacion(formData.nombre, {
    required: true,
    nombreCompleto: true,
    mensajeNombre: "Escribe tu nombre y apellido completo",
  });
  const direccionVal = useValidacion(formData.direccion, {
    required: true,
    esDireccion: true,
    mensajeDireccion:
      "Ingresa una dirección válida con número (ej: Calle 45 #12-34)",
  });
  const telefonoVal = useValidacion(formData.telefono, {
    required: true,
    mensajeRequired: "El teléfono es obligatorio",
  });
  // Bloquear envío si hay errores o campos vacíos
  const hayErrores =
    nombreVal.hayError || direccionVal.hayError || telefonoVal.hayError;
  const camposVacios =
    !formData.nombre.trim() ||
    !formData.direccion.trim() ||
    !formData.telefono.trim();
  // --------------------------------------------------
  // handleChange
  // --------------------------------------------------
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Marcar como tocado al escribir (opcional, para validar en tiempo real)
    if (id === "nombre") nombreVal.setTouched(true);
    if (id === "direccion") direccionVal.setTouched(true);
    if (id === "telefono") telefonoVal.setTouched(true);
  };
  // --------------------------------------------------
  // guardarPedidoEnBD
  // --------------------------------------------------
  const guardarPedidoEnBD = async () => {
    try {
      console.log("🛒 Carrito:", carrito);
      console.log("👤 Datos cliente:", formData);

      const total = carrito.reduce(
        (sum, item) => sum + (item.precio || 0) * (item.cantidad || 0),
        0
      );

      // 1) Insertar pedido
      const { data: pedidoData, error: errorPedido } = await supabase
        .from("pedidos")
        .insert([
          {
            cliente: formData.nombre.trim(),
            direccion: formData.direccion.trim(),
            telefono: formData.telefono.trim(),
            productos: carrito,
            total,
            fecha: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (errorPedido) {
        console.error("❌ Error guardando pedido:", errorPedido);
        throw new Error(errorPedido.message);
      }

      console.log("✅ Pedido guardado:", pedidoData);

      // 2) Si carrito vacío, terminamos
      if (!carrito || carrito.length === 0) {
        return { success: true, pedidoId: pedidoData.id };
      }

      // 3) Obtener IDs del carrito
      const ids = carrito.map((it) => it.id);
      console.log("IDs a consultar:", ids);

      // 4) Traer productos reales desde BD
      const { data: productosDB, error: errorFetch } = await supabase
        .from("productos")
        .select("id, stock")
        .in("id", ids);

      if (errorFetch) {
        console.error("❌ Error obteniendo productos:", errorFetch);
        throw new Error(errorFetch.message);
      }

      console.log("Productos desde BD:", productosDB);

      // 5) Calcular nuevos stocks
      const updates = productosDB.map((p) => {
        const itemCarrito = carrito.find((c) => String(c.id) === String(p.id));
        const cantidadVendida = itemCarrito ? Number(itemCarrito.cantidad) : 0;
        const stockActual = Number(p.stock);
        const nuevoStock = Math.max(stockActual - cantidadVendida, 0);

        return {
          id: p.id,
          stockActual,
          cantidadVendida,
          nuevoStock,
        };
      });

      console.log("UPDATES calculados:");
      console.table(updates);

      // 6) Actualizar stock por cada producto
      const erroresUpdate = [];

      for (const u of updates) {
        try {
          console.log("🔧 Intentando actualizar:", u);

          // Intento 1: REST
          const { data, error } = await supabase
            .from("productos")
            .update({
              stock: u.nuevoStock,
            })
            .eq("id", u.id)
            .select();

          console.log("Resultado REST:", { data, error });

          if (error) {
            console.error("❌ Error REST:", error);

            // Intento 2: RPC fallback
            const rpc = await supabase.rpc("restar_stock_int", {
              p_id: u.id,
              p_cantidad: u.cantidadVendida,
            });

            console.log("Resultado RPC:", rpc);

            if (rpc.error) {
              console.error("❌ RPC también falló:", rpc.error);
              erroresUpdate.push({
                id: u.id,
                error: rpc.error.message,
              });
            }
          } else {
            console.log(`✔️ Stock actualizado para ID ${u.id}`);
          }
        } catch (err) {
          console.error("❌ Excepción actualizando stock:", err);
          erroresUpdate.push({ id: u.id, error: err.message });
        }
      }

      if (erroresUpdate.length > 0) {
        console.error("❌ Errores de actualización:", erroresUpdate);
        return { success: false, error: "Error actualizando stock" };
      }

      return { success: true, pedidoId: pedidoData.id };
    } catch (err) {
      console.error("❌ Error en guardarPedidoEnBD:", err);
      return { success: false, error: err.message };
    }
  };

  // --------------------------------------------------
  // handleSubmit
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (procesando || carrito.length === 0 || hayErrores || camposVacios) {
      // Forzar que se vean todos los errores
      nombreVal.setTouched(true);
      direccionVal.setTouched(true);
      telefonoVal.setTouched(true);

      if (carrito.length === 0)
        mostrarAlerta?.("Tu carrito está vacío", "error");
      else if (camposVacios || hayErrores)
        mostrarAlerta?.("Completa todos los campos correctamente", "error");
      return;
    }

    setProcesando(true);

    try {
      const resultadoBD = await guardarPedidoEnBD();

      if (!resultadoBD.success) {
        mostrarAlerta?.(
          `Error guardando pedido: ${resultadoBD.error}`,
          "error"
        );
        setProcesando(false);
        return;
      }

      // generar PDF
      try {
        generarPDFPedido(carrito, formData);
      } catch (e) {
        console.error("PDF error:", e);
      }

      // mensaje WhatsApp
      const itemsTexto = carrito
        .map(
          (item) =>
            `• ${item.nombre} - ${
              item.cantidad
            } x $${item.precio.toLocaleString()}`
        )
        .join("\n");

      const total = carrito.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
      );

      const mensaje = `¡Hola! Quiero hacer este pedido:\n\n${itemsTexto}\n\nTotal: $${total.toLocaleString()}\n\nDatos:\n${
        formData.nombre
      }\n${formData.direccion}\n${formData.telefono}\n\nPedido #${
        resultadoBD.pedidoId
      }`;

      const whatsappUrl = `https://wa.me/573133574711?text=${encodeURIComponent(
        mensaje
      )}`;

      // limpiar y cerrar
      setCarrito([]);
      setFormData({ nombre: "", direccion: "", telefono: "" });
      onCerrar();

      mostrarAlerta?.(
        `✅ Pedido #${resultadoBD.pedidoId} guardado correctamente.`,
        "success"
      );

      setTimeout(() => window.open(whatsappUrl, "_blank"), 800);
    } finally {
      setProcesando(false);
    }
  };

  if (!abierto) return null;

  return (
    <section
      id="datosClienteModal"
      className="modal-client"
      style={{ display: abierto ? "block" : "none" }}
    >
      <div className="modal-content-client">
        <h2>📋 Confirmar Pedido</h2>

        <form id="formDatosCliente" onSubmit={handleSubmit}>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre completo *"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={() => nombreVal.setTouched(true)}
            disabled={procesando}
            style={{
              border: nombreVal.hayError
                ? "2px solid #ef4444"
                : "2px solid #e2e8f0",
              backgroundColor: nombreVal.hayError ? "#fef2f2" : "white",
            }}
          />
          {nombreVal.hayError && (
            <p
              style={{
                color: "#ef4444",
                fontSize: "14px",
                margin: "4px 0 10px",
              }}
            >
              {nombreVal.error}
            </p>
          )}
          <input
            type="text"
            id="direccion"
            placeholder="Dirección completa (calle, número, barrio) *"
            value={formData.direccion}
            onChange={handleChange}
            onBlur={() => direccionVal.setTouched(true)}
            disabled={procesando}
            style={{
              border: direccionVal.hayError
                ? "2px solid #ef4444"
                : "2px solid #e2e8f0",
              backgroundColor: direccionVal.hayError ? "#fef2f2" : "white",
            }}
          />
          {direccionVal.hayError && (
            <p
              style={{
                color: "#ef4444",
                fontSize: "14px",
                margin: "4px 0 10px",
              }}
            >
              {direccionVal.error}
            </p>
          )}
          <input
            type="tel"
            id="telefono"
            placeholder="Teléfono (ej: 300 123 4567) *"
            value={formData.telefono}
            onChange={handleChange}
            onBlur={() => telefonoVal.setTouched(true)}
            disabled={procesando}
            style={{
              border: telefonoVal.hayError
                ? "2px solid #ef4444"
                : "2px solid #e2e8f0",
              backgroundColor: telefonoVal.hayError ? "#fef2f2" : "white",
            }}
          />
          {telefonoVal.hayError && (
            <p
              style={{
                color: "#ef4444",
                fontSize: "14px",
                margin: "4px 0 10px",
              }}
            >
              {telefonoVal.error}
            </p>
          )}

          <button
            type="submit"
            disabled={
              procesando || hayErrores || camposVacios || carrito.length === 0
            }
            style={{
              background:
                procesando || hayErrores || camposVacios || carrito.length === 0
                  ? "#94a3b8"
                  : "#06b6d4",
            }}
          >
            {procesando ? "⏳ Procesando..." : "📱 Enviar Pedido + PDF"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default DatosClienteModal;
