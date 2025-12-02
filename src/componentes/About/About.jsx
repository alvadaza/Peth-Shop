import React from "react";
import Articulos from "../Articulos/Articulos";
import "./about.css";

export default function About() {
  // ARRAY DINÁMICO DE ARTÍCULOS
  const articulos = [
    {
      titulo: "Tu mascota siempre en primer lugar",
      descripcion:
        "Seleccionamos solo productos que nosotros mismos le daríamos a nuestros propios perros y gatos. Su felicidad y salud es nuestra obsesión.",
      imagen:
        "https://images.pexels.com/photos/7726318/pexels-photo-7726318.jpeg",
      icono: "❤️",
    },
    {
      titulo: "Calidad Premium garantizada",
      descripcion:
        "Trabajamos únicamente con marcas líderes mundiales que cumplen los más altos estándares de nutrición, seguridad y durabilidad.",
      imagen:
        "https://images.pexels.com/photos/28829473/pexels-photo-28829473.jpeg",
      icono: "Trophy",
    },
    {
      titulo: "Equipo 100% pet lover",
      descripcion:
        "Todos aquí somos papás y mamás de mascotas. Te entendemos, te asesoramos y te ayudamos como si fueras de la familia.",
      imagen:
        "https://images.pexels.com/photos/5732454/pexels-photo-5732454.jpeg",
      icono: "Smiling Face with Heart-Eyes",
    },
    {
      titulo: "Entrega rápida en todo Colombia",
      descripcion:
        "✨ Bogotá: domicilio el mismo día o al día siguiente\n Colombia: 2-4 días hábiles con Servientrega o Coordinadora. ¡Tu peludo nunca espera!",
      imagen:
        "https://images.pexels.com/photos/4391477/pexels-photo-4391477.jpeg",
      icono: "Truck",
    },
    {
      titulo: "Precios justos todo el año",
      descripcion:
        "Calidad premium sin inflar precios. Ofertas reales y descuentos exclusivos para los que más quieren a sus peludos.",
      imagen:
        "https://images.pexels.com/photos/6693650/pexels-photo-6693650.jpeg",
      icono: "Money Bag",
    },
    {
      titulo: "Soporte real por WhatsApp",
      descripcion:
        "¿Dudas con la comida ideal o el tamaño del arnés? Escríbenos por WhatsApp y te respondemos en minutos, de pet lover a pet lover.",
      imagen:
        "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg",
      icono: "Speech Bubble",
    },
    {
      titulo: "Garantía de felicidad 30 días",
      descripcion:
        "Si a tu peludo no le encanta el producto, te lo cambiamos o te devolvemos el dinero. Así de seguros estamos de nuestra calidad.",
      imagen:
        "https://images.pexels.com/photos/7195589/pexels-photo-7195589.jpeg",
      icono: "Shield",
    },
    {
      titulo: "+12.000 clientes felices",
      descripcion:
        "Miles de colitas y bigotes felices en toda Colombia ya confían en nosotros mes tras mes. ¡Únete a la familia!",
      imagen:
        "https://images.pexels.com/photos/7315536/pexels-photo-7315536.jpeg",
      icono: "Party Popper",
    },
  ];

  return (
    <section id="about">
      <div className="about-container">
        <div className="about-text">
          <h2>Sobre Nosotros</h2>
          <p>
            Somos la tienda favorita de miles de papás y mamás de mascotas que
            solo quieren lo mejor para sus peludos.
            <br />
            <br />
            ✅ Alimentos premium y súper premium de las marcas más confiables
            del mundo
            <br />
            ✅ Juguetes resistentes e inteligentes que mantienen feliz y activo
            a tu engreído
            <br />
            ✅ Accesorios cómodos, elegantes y hechos para durar años
            <br />
            <br />
            Porque para nosotros tu mascota{" "}
            <strong>no es “solo una mascota”… es familia ❤️</strong>
            <br />
            <br />
            Por eso cada producto que ves aquí lo seleccionamos con el mismo
            cariño y exigencia que usamos para nuestros propios peludos. Nos
            obsesiona la calidad, la seguridad y que cuando recibas tu pedido
            digas:
            <br />
            <br />
            <strong style={{ fontSize: "1.4em", color: "#c2410c" }}>
              “¡Esto sí valió cada peso!”
            </strong>
            <br />
            <br />
            Más de <strong>12.000 clientes felices</strong> ya confían en
            nosotros todos los meses. ¡Únete tú también y dale a tu mejor amigo
            lo que realmente se merece!
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/5732473/pexels-photo-5732473.jpeg"
            alt="Mascotas felices"
          />
        </div>
      </div>

      {/* 🌟 Insertamos el nuevo componente dinámico */}
      <Articulos articulos={articulos} />
    </section>
  );
}
