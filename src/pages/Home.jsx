import React from "react";
import Header from "../componentes/Header/Header";
import Navar from "../componentes/Navar/Navar";
import About from "../componentes/About/About";
import Footer from "../componentes/Footer/Footer";
import { useCart } from "../context/CartContext";

function Home({ onAbrirCarrito }) {
  const { carrito } = useCart();

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  return (
    <div className="Home">
      <Header onAbrirCarrito={onAbrirCarrito} totalItems={totalItems} />
      <Navar />
      <About />
      <Footer />
    </div>
  );
}

export default Home;
