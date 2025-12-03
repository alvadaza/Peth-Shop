import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function LoginRegister() {
  const [isActive, setIsActive] = useState(false);

  const nav = useNavigate();
  const { login, register } = useAuth();

  // LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorLogin("");

    try {
      await login(email, password);
      nav("/productos");
    } catch (err) {
      setErrorLogin(err.message);
    }
  };

  // REGISTER
  const [data, setData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
  });

  const [errorReg, setErrorReg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorReg("");

    try {
      await register(data.email, data.password, data.nombre, data.telefono);
      alert("Usuario creado, revisa tu correo para confirmar");
      setIsActive(false);
    } catch (err) {
      setErrorReg(err.message);
    }
  };

  return (
    <div className={`container-login ${isActive ? "right-panel-active" : ""}`}>
      {/* HEADER MORADO FIJO (solo en móvil) */}
      <div className="mobile-header">
        <h1>{isActive ? "¡Bienvenido de nuevo!" : "Hola amigo"}</h1>
        <p>
          {isActive
            ? "Para poder comprar, inicia sesión con tus datos."
            : "Regístrate con tus datos y empieza con nosotros"}
        </p>
      </div>

      {/* TOGGLE FUNCIONAL - AHORA SÍ CAMBIA EL FORMULARIO */}
      <div className="mobile-toggle">
        <div className="toggle-bg"></div>

        <button
          type="button"
          className="toggle-text"
          onClick={() => setIsActive(false)}
        >
          Iniciar sesión
        </button>

        <button
          type="button"
          className="toggle-text"
          onClick={() => setIsActive(true)}
        >
          Inscribirse
        </button>
      </div>

      {/* REGISTER (arriba en el DOM) */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleRegister}>
          <h1>Crear una cuenta</h1>
          {errorReg && <p className="auth-error">{errorReg}</p>}

          <input
            type="text"
            placeholder="Nombre"
            value={data.nombre}
            onChange={(e) => setData({ ...data, nombre: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={data.telefono}
            onChange={(e) => setData({ ...data, telefono: e.target.value })}
            required
          />
          <button type="submit">Inscribirse</button>
        </form>
      </div>

      {/* LOGIN (abajo en el DOM) */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Iniciar sesión</h1>
          {errorLogin && <p className="auth-error">{errorLogin}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>

      {/* PANEL MORADO DESKTOP (solo visible en escritorio) */}
      <div className="overlay-container desktop-only">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Para poder comprar, inicia sesión con tus datos.</p>
            <button className="ghost" onClick={() => setIsActive(false)}>
              Iniciar sesión
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hola amigo</h1>
            <p>Regístrate con tus datos y empieza con nosotros</p>
            <button className="ghost" onClick={() => setIsActive(true)}>
              Inscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
