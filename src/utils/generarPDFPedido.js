// src/utils/generarPDFPedido.js
import jsPDF from "jspdf";

const LOGO_URL =
  "https://res.cloudinary.com/dl7kjajkv/image/upload/v1758065779/PERRO-removebg-preview_5_c0osrz.png";

export function generarPDFPedido(carrito, datosCliente) {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Fecha bonita para el nombre del archivo
  const hoy = new Date();
  const fechaArchivo = hoy.toLocaleDateString("es-CO").replace(/\//g, "-");

  let y = 15;

  // ========================================
  // HEADER NARANJA CON LOGO Y NOMBRE TIENDA
  // ========================================
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.addImage(LOGO_URL, "PNG", 20, 10, 28, 28);

  doc.setFontSize(30);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("PetShop Amigo Fiel", 65, 28);

  y = 55;

  // ========================================
  // TÍTULO + FECHA
  // ========================================
  doc.setFontSize(24);
  doc.setTextColor(40, 40, 40);
  doc.text("¡Gracias por tu compra!", pageWidth / 2, y, { align: "center" });

  doc.setFontSize(13);
  doc.setTextColor(100, 100, 100);
  doc.text(
    `${hoy.toLocaleDateString("es-CO")} - ${hoy.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    pageWidth / 2,
    y + 10,
    { align: "center" }
  );

  y += 35;

  // ========================================
  // DATOS DEL CLIENTE (cajita bonita)
  // ========================================
  doc.setFillColor(255, 250, 245);
  doc.roundedRect(20, y, 170, 30, 5, 5, "F");

  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text("Enviar a:", 30, y + 10);
  doc.setFont("helvetica", "bold");
  doc.text(datosCliente.nombre.toUpperCase(), 30, y + 18);
  doc.setFont("helvetica", "normal");
  doc.text(datosCliente.direccion, 30, y + 26);
  doc.text(`Tel: ${datosCliente.telefono}`, 30, y + 34);

  y += 55;

  // ========================================
  // TABLA DE PRODUCTOS
  // ========================================
  doc.setFontSize(16);
  doc.setTextColor(245, 158, 11);
  doc.text("DETALLE DEL PEDIDO", 20, y);
  y += 12;

  // ========================================
  // DIBUJAR CABECERA DE TABLA (se repite en cada página)
  // ========================================
  const dibujarCabeceraTabla = (posY) => {
    doc.setFillColor(245, 158, 11);
    doc.rect(20, posY, 170, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Producto", 25, posY + 7);
    doc.text("Cant.", 120, posY + 7);
    doc.text("Precio", 140, posY + 7);
    doc.text("Subtotal", 165, posY + 7);
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "normal");
  };

  // Dibujamos la cabecera en la primera página
  dibujarCabeceraTabla(y);
  y += 15; // espacio después de la cabecera

  let total = 0;

  carrito.forEach((item) => {
    // Si no cabe ni una línea más → nueva página
    if (y > 260) {
      // Footer de la página actual

      doc.addPage();

      // Mini encabezado naranja en páginas siguientes (opcional pero queda lindo)
      doc.setFillColor(245, 158, 11);
      doc.rect(0, 0, pageWidth, 25, "F");
      doc.addImage(LOGO_URL, "PNG", 15, 6, 25, 25);
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("PetShop Amigo Fiel - Continuación", 45, 17);

      // Volvemos a dibujar la cabecera de la tabla en la nueva página
      y = 35;
      dibujarCabeceraTabla(y);
      y += 15;
    }

    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const nombre =
      item.nombre.length > 65
        ? item.nombre.substring(0, 62) + "..."
        : item.nombre;

    doc.setFontSize(10.5);
    doc.text(nombre, 25, y);
    doc.text(`${item.cantidad}`, 125, y);
    doc.text(`$ ${item.precio.toLocaleString("es-CO")}`, 140, y);
    doc.text(`$ ${subtotal.toLocaleString("es-CO")}`, 165, y);

    y += 9; // más aire entre líneas, queda elegante
  });

  // ========================================
  // TOTAL EN ROSA
  // ========================================
  y += 15;
  doc.setFillColor(245, 158, 11);
  doc.rect(110, y, 80, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(`TOTAL: $ ${total.toLocaleString("es-CO")}`, 118, y + 10);

  // ========================================
  // FOOTER CON DATOS DE LA TIENDA
  // ========================================
  const footerY = pageHeight - 35;
  doc.setFillColor(250, 250, 250);
  doc.rect(0, footerY - 10, pageWidth, 40, "F");

  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text("PetShop Amigo Fiel ®", 20, footerY);
  doc.text("Carrera #30, Bogotá D.C.", 20, footerY + 8);
  doc.text("Tel / WhatsApp: +57 313 357 4711", 20, footerY + 16);
  doc.text("Instagram: @petshopamigofiel", 20, footerY + 24);

  doc.setTextColor(236, 72, 153);
  doc.setFontSize(18);
  doc.text("❤️", pageWidth - 25, footerY + 12);

  // ========================================
  // GUARDAR CON NOMBRE DEL CLIENTE
  // ========================================
  const nombreLimpio = datosCliente.nombre
    .replace(/[^a-zA-Z0-9]/g, "_")
    .slice(0, 20);
  doc.save(`Pedido_${nombreLimpio}_${fechaArchivo}.pdf`);
}
