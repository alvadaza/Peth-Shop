import { useState, useEffect } from "react";

export function useValidacion(value, opciones = {}) {
  const {
    required = true,
    nombreCompleto = false,
    esCorreo = false,
    esDireccion = false,
    mensajeRequired = "Este campo es obligatorio",
    mensajeNombre = "Escribe tu nombre y apellido (solo letras)",
    mensajeEmail = "Ingresa un correo electrónico válido",
    mensajeDireccion = "La dirección debe tener al menos 10 caracteres y un número",
  } = opciones;

  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let nuevoError = "";

    if (required && !value.trim()) {
      nuevoError = mensajeRequired;
    } else if (nombreCompleto && value.trim()) {
      const palabras = value.trim().split(/\s+/);
      if (palabras.length < 2) {
        nuevoError = mensajeNombre;
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
        nuevoError = "El nombre solo debe contener letras";
      }
    } else if (esCorreo && value.trim()) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        nuevoError = mensajeEmail;
      }
    } else if (esDireccion && value.trim()) {
      const val = value.trim();
      if (val.length < 10) {
        nuevoError = "La dirección es muy corta";
      } else if (!/\d/.test(val)) {
        nuevoError = "Incluye el número de tu calle, casa o apto";
      }
    }

    // Solución: usar setTimeout con 0 para que sea asíncrono
    setTimeout(() => setError(nuevoError), 0);
  }, [
    value,
    required,
    nombreCompleto,
    esCorreo,
    esDireccion,
    mensajeRequired,
    mensajeNombre,
    mensajeEmail,
    mensajeDireccion,
  ]);

  return {
    error,
    touched,
    setTouched,
    hayError: touched && !!error,
  };
}
