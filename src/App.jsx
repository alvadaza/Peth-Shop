import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RouterApp from "./router/Router";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import Loader from "./componentes/Loader/Loader";
import AuthProvider from "./context/AuthProvider";

function App() {
  const [modalAbierto, setModalAbierto] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [search, setSearch] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("");

  const abrirModal = (modal, producto = null) => {
    setModalAbierto(modal);
    setProductoSeleccionado(producto);
  };

  const cerrarModal = () => {
    setModalAbierto(null);
    setProductoSeleccionado(null);
  };
  const routes = RouterApp({
    abrirModal,
    cerrarModal,
    modalAbierto,
    productoSeleccionado,
    search,
    setSearch,
    categoriaActiva,
    setCategoriaActiva,
  });
  return (
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
