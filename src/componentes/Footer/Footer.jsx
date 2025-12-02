import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <section className="footer-container">
        <section className="footer-content">
          <div className="footer-info">
            <h2>PetShop - Amigo Fiel</h2>
            <p>
              <i className="fas fa-map-marker-alt"></i> Dirección: Carrera #30,
              Bogotá, Colombia
            </p>
            <p>
              <i className="fas fa-phone"></i> Tel: 313 357 47 11
            </p>
            <p className="copyright-text">
              &copy; 2025 PetShop - Tienda para Mascotas
            </p>
          </div>

          <div className="social-section">
            <h3>Síguenos en redes sociales</h3>
            <div className="social-icons">
              <a
                href="#"
                className="social-icon facebook"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon youtube" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="#"
                className="social-icon instagram"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </section>

        <div className="copyright">
          <p>Todos los derechos reservados - 2025</p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
