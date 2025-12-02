import React from "react";
import { lazy } from "react";
const Home = lazy(() => import("../pages/Home"));
const Main = lazy(() => import("../pages/Main"));
const ContactForm = lazy(() => import("../pages/ContactForm"));
const NotFound = lazy(() => import("../pages/NotFound"));

const appRoutes = ({
  abrirModal,
  cerrarModal,
  modalAbierto,
  productoSeleccionado,
  search,
  setSearch,
  categoriaActiva,
  setCategoriaActiva,
}) => [
  {
    path: "/",
    name: "Home",
    element: <Home onAbrirCarrito={() => abrirModal("carrito")} />,
  },
  {
    path: "/productos",
    name: "Productos",
    element: (
      <Main
        modalAbierto={modalAbierto}
        productoSeleccionado={productoSeleccionado}
        onAbrirModal={abrirModal}
        onCerrarModal={cerrarModal}
        searchTerm={search}
        setSearch={setSearch}
        categoriaActiva={categoriaActiva}
        setCategoriaActiva={setCategoriaActiva}
      />
    ),
  },
  {
    path: "/contacto",
    name: "Contacto",
    element: <ContactForm />,
  },
  {
    path: "*",
    name: "NotFound",
    element: <NotFound />,
  },
];

export default appRoutes;
