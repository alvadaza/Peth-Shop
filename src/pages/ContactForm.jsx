import React, { useState, useEffect } from "react"; // ✅ Asegúrate de tener esta línea exacta
import { supabase } from "../supabase/supabase";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/Footer/Footer";
import { useCart } from "../context/CartContext";
import { useValidacion } from "../hooks/useValidacion";
import "./ContactForm.css";

function ContactForm({ onAbrirCarrito }) {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    email: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState("");

  // Validaciones con tu hook
  const nombreVal = useValidacion(formData.nombre, {
    required: true,
    nombreCompleto: true,
    mensajeNombre: "Escribe tu nombre y apellido completo",
  });

  const emailVal = useValidacion(formData.email, {
    required: true,
    esCorreo: true,
    mensajeEmail: "Ingresa un correo electrónico válido",
  });

  const mensajeVal = useValidacion(formData.mensaje, {
    required: true,
    mensajeRequired: "El mensaje es obligatorio",
  });

  const telefonoVal = useValidacion(formData.telefono, {
    required: false,
    mensajeRequired: "El teléfono es opcional",
  });

  const direccionVal = useValidacion(formData.direccion, {
    required: false,
    esDireccion: true,
    mensajeDireccion: "Ingresa una dirección válida si deseas domicilio",
  });
  // Detectar errores
  const hayErrores =
    nombreVal.hayError ||
    emailVal.hayError ||
    mensajeVal.hayError ||
    telefonoVal.hayError ||
    direccionVal.hayError;

  // ✅ useEffect ahora debería funcionar
  useEffect(() => {
    if (mensajeAlerta) {
      const timer = setTimeout(() => {
        setMensajeAlerta("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [mensajeAlerta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Marcar como tocado al escribir (valida en tiempo real)
    if (name === "nombre") nombreVal.setTouched(true);
    if (name === "email") emailVal.setTouched(true);
    if (name === "mensaje") mensajeVal.setTouched(true);
    if (name === "telefono") telefonoVal.setTouched(true);
    if (name === "direccion") direccionVal.setTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensajeAlerta("");

    nombreVal.setTouched(true);
    emailVal.setTouched(true);
    mensajeVal.setTouched(true);

    if (hayErrores || !formData.mensaje.trim()) {
      setMensajeAlerta(
        "Por favor completa correctamente los campos obligatorios"
      );
      setEnviando(false);
      return;
    }
    try {
      const { error } = await supabase.from("contactos").insert([
        {
          nombre: formData.nombre.trim(),
          telefono: formData.telefono.trim(),
          direccion: formData.direccion.trim(),
          email: formData.email.trim(),
          mensaje: formData.mensaje.trim(),
          fecha: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setMensajeAlerta(
        "Mensaje enviado correctamente. ¡Gracias por contactarnos!"
      );
      setFormData({
        nombre: "",
        telefono: "",
        direccion: "",
        email: "",
        mensaje: "",
      });

      nombreVal.setTouched(false);
      emailVal.setTouched(false);
      mensajeVal.setTouched(false);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMensajeAlerta("Error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  const { carrito } = useCart();
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  return (
    <>
      <Header onAbrirCarrito={onAbrirCarrito} totalItems={totalItems} />
      <div className="contact-form-moderno">
        <div className="form-header">
          <h2 className="form-title">Contáctanos</h2>
          <p className="form-subtitle">
            Estamos aquí para ayudarte. Envíanos tu mensaje y te responderemos
            pronto.
          </p>
        </div>

        {mensajeAlerta && (
          <div
            className={`alerta ${
              mensajeAlerta.includes("❌") ? "alerta-error" : "alerta-exito"
            }`}
          >
            <span className="alerta-icono">
              {mensajeAlerta.includes("❌") ? "⚠️" : "✅"}
            </span>
            {mensajeAlerta}
          </div>
        )}

        <form className="form-moderno" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">
                Nombre completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={() => nombreVal.setTouched(true)}
                disabled={enviando}
                className="form-input"
                placeholder="Juan Pérez"
                style={{
                  border: nombreVal.hayError ? "2px solid #ef4444" : "",
                  backgroundColor: nombreVal.hayError ? "#fef2f2" : "",
                }}
              />
              {nombreVal.hayError && (
                <p className="error-text">{nombreVal.error}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => emailVal.setTouched(true)}
                disabled={enviando}
                className="form-input"
                placeholder="tu@email.com"
                style={{
                  border: emailVal.hayError ? "2px solid #ef4444" : "",
                  backgroundColor: emailVal.hayError ? "#fef2f2" : "",
                }}
              />
              {emailVal.hayError && (
                <p className="error-text">{emailVal.error}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={enviando}
                className="form-input"
                placeholder="+57 300 123 4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                onBlur={() => direccionVal.setTouched(true)}
                disabled={enviando}
                className="form-input"
                placeholder="Opcional: Calle 45 #12-34"
                style={{
                  border: direccionVal.hayError ? "2px solid #ef4444" : "",
                }}
              />
              {direccionVal.hayError && (
                <p className="error-text">{direccionVal.error}</p>
              )}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="mensaje" className="form-label">
              Mensaje *
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              onBlur={() => mensajeVal.setTouched(true)}
              required
              disabled={enviando}
              className="form-textarea"
              placeholder="Cuéntanos en qué podemos ayudarte..."
              rows="6"
              style={{
                border: mensajeVal.hayError ? "2px solid #ef4444" : "",
                backgroundColor: mensajeVal.hayError ? "#fef2f2" : "",
              }}
            />
            {mensajeVal.hayError && (
              <p className="error-text">{mensajeVal.error}</p>
            )}
          </div>

          <button
            type="submit"
            className={`submit-btn ${enviando ? "loading" : ""}`}
            disabled={enviando}
          >
            {enviando ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : (
              <>
                <span className="btn-icon">📨</span>
                Enviar Mensaje
              </>
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
