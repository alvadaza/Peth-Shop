import React, { useState } from "react";
import { useDatos } from "../hooks/useDatos";
import { supabase } from "../supabase/supabase";
import Header from "../componentes/Header/Header";
import ProductosGrid from "../componentes/ProductosGrid/ProductosGrid";
import GaleriaModal from "../componentes/GaleriaModal/GaleriaModal";
import CartModal from "../componentes/CartModal/CartModal";
import DatosClienteModal from "../componentes/DatosClienteModal/DatosClienteModal";
import AlertModal from "../componentes/AlertModal/AlertModal";
import ConfirmModal from "../componentes/ConfirmModal/ConfirmModal";
import Footer from "../componentes/Footer/Footer";
import Tsearch from "../componentes/Tosearch/Tosearch";
import Filters from "../componentes/Filter/Filter";
import { useCart } from "../context/CartContext";
import "./Main.css";

function Main({
  modalAbierto,
  productoSeleccionado,
  onAbrirModal,
  onCerrarModal,
  searchTerm,
  categoriaActiva,
  setCategoriaActiva,
}) {
  const { carrito, setCarrito } = useCart();
  const [search, setSearch] = useState("");

  // ✅ Función para cambiar categoría
  const cambiarCategoria = (categoriaId) => {
    setCategoriaActiva(categoriaId);
    // Opcional: limpiar búsqueda cuando cambias de categoría
    // setSearch("");
  };

  const [alerta, setAlerta] = useState({
    visible: false,
    mensaje: "",
    tipo: "success",
  });
  const [confirmacion, setConfirmacion] = useState({
    visible: false,
    titulo: "",
    mensaje: "",
    onConfirmar: null,
  });

  // productos filtrando
  const { productos, categorias, cargando, error, recargarDatos } = useDatos(); // ✅ Agregar recargarDatos

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      !categoriaActiva || producto.categoria_id?.toString() === categoriaActiva;

    const texto = search.toLowerCase().trim();

    const coincideBusqueda =
      texto === "" ||
      producto.nombre.toLowerCase().includes(texto) ||
      producto.descripcion?.toLowerCase().includes(texto) ||
      producto.precio?.toString().includes(texto);

    return coincideCategoria && coincideBusqueda;
  });

  // FUNCIÓN PRINCIPAL MÁS SIMPLE
  const guardarPedidoEnBD = async (datosCliente) => {
    try {
      console.log("💾 Iniciando guardado de pedido...", datosCliente);

      // VALIDAR FORMULARIO
      if (!datosCliente?.nombre?.trim())
        throw new Error("El nombre es obligatorio");
      if (!datosCliente?.direccion?.trim())
        throw new Error("La dirección es obligatoria");
      if (!datosCliente?.telefono?.trim())
        throw new Error("El teléfono es obligatorio");

      // VALIDAR CARRITO
      if (!carrito || carrito.length === 0) {
        throw new Error("El carrito está vacío");
      }

      const total = carrito.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
      );

      // -----------------------------------------
      // 1️⃣ INSERTAR PEDIDO — SEGURO + LIMPIO
      // -----------------------------------------
      const { data: pedidoData, error: errorPedido } = await supabase
        .from("pedidos")
        .insert([
          {
            cliente: datosCliente.nombre.trim(),
            direccion: datosCliente.direccion.trim(),
            telefono: datosCliente.telefono.trim(),
            productos: carrito,
            total,
            fecha: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (errorPedido) throw new Error(errorPedido.message);

      const pedidoId = pedidoData?.id;
      console.log("🆔 Pedido guardado correctamente:", pedidoId);

      // -----------------------------------------
      // 2️⃣ ACTUALIZAR STOCK — CONTROL DE FALLOS
      // -----------------------------------------
      for (const item of carrito) {
        const nuevoStock = Math.max(0, (item.stock ?? 0) - item.cantidad);

        const { error: errorStock } = await supabase
          .from("productos")
          .update({ stock: nuevoStock })
          .eq("id", item.id);

        if (errorStock) {
          console.error("❌ Error actualizando stock", errorStock);

          // 🔥 ROLLBACK: BORRAR EL PEDIDO
          await supabase.from("pedidos").delete().eq("id", pedidoId);

          throw new Error(
            `Error actualizando stock de "${item.nombre}". El pedido fue revertido.`
          );
        }
      }

      // -----------------------------------------
      // 3️⃣ RECARGAR Y LIMPIAR
      // -----------------------------------------
      await recargarDatos();
      setCarrito([]);
      localStorage.removeItem("carrito");

      mostrarAlerta("Pedido realizado con éxito", "success");

      return { success: true, pedidoId };
    } catch (error) {
      console.error("❌ Error guardando pedido:", error);
      mostrarAlerta(error.message || "Error inesperado", "error");
      return { success: false, error: error.message };
    }
  };

  // Mostrar loading
  if (cargando) {
    return (
      <main className="main-container">
        <div className="cargando">
          <p>🔄 Cargando productos desde la base de datos...</p>
        </div>
      </main>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <main className="main-container">
        <div className="error-carga">
          <h3>❌ Error cargando los datos</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      </main>
    );
  }

  const obtenerNombreCategoria = () => {
    if (!categoriaActiva) return "";
    const categoria = categorias.find(
      (cat) => cat.id.toString() === categoriaActiva
    );
    return categoria ? categoria.nombre : "";
  };

  const mostrarAlerta = (mensaje, tipo = "success") => {
    setAlerta({ visible: true, mensaje, tipo });
  };

  const cerrarAlerta = () => {
    setAlerta({ ...alerta, visible: false });
  };

  const mostrarConfirmacion = (titulo, mensaje, onConfirmar) => {
    setConfirmacion({
      visible: true,
      titulo,
      mensaje,
      onConfirmar,
    });
  };

  const cerrarConfirmacion = () => {
    setConfirmacion({ ...confirmacion, visible: false });
  };

  const confirmarAccion = () => {
    if (confirmacion.onConfirmar) {
      confirmacion.onConfirmar();
    }
    cerrarConfirmacion();
  };

  // ✅ Función de vaciar carrito con confirmación personalizada
  const vaciarCarrito = () => {
    if (carrito.length === 0) {
      mostrarAlerta("Tu carrito ya está vacío", "info");
      return;
    }

    mostrarConfirmacion(
      "Vaciar Carrito",
      "¿Estás seguro de que quieres vaciar todo el carrito? Esta acción no se puede deshacer.",
      () => {
        setCarrito([]);
        mostrarAlerta("Carrito vaciado correctamente", "info");
      }
    );
  };

  // ✅ Función para eliminar del carrito
  const eliminarDelCarrito = (productoId) => {
    const producto = carrito.find((item) => item.id === productoId);

    mostrarConfirmacion(
      "Eliminar Producto",
      `¿Estás seguro de que quieres eliminar "${producto?.nombre}" del carrito?`,
      () => {
        setCarrito(carrito.filter((item) => item.id !== productoId));
        mostrarAlerta(`${producto?.nombre} eliminado del carrito`, "info");
      }
    );
  };

  const agregarAlCarrito = async (producto, cantidad = 1) => {
    try {
      const stock = Number(producto.stock ?? 0);
      const itemEnCarrito = carrito.find((i) => i.id === producto.id);
      const yaEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

      if (yaEnCarrito + cantidad > stock) {
        const puedeAgregar = Math.max(0, stock - yaEnCarrito);

        if (puedeAgregar <= 0) {
          mostrarAlerta(
            `No hay más unidades disponibles de "${producto.nombre}".`,
            "error"
          );
          return;
        }

        cantidad = puedeAgregar;
        mostrarAlerta(
          `Solo se agregaron ${cantidad} unidades de "${producto.nombre}" por stock disponible.`,
          "warning"
        );
      }

      if (itemEnCarrito) {
        setCarrito(
          carrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          )
        );
      } else {
        setCarrito([
          ...carrito,
          {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen_url,
            cantidad: cantidad,
            stock: producto.stock,
          },
        ]);
      }

      if (cantidad > 0) {
        mostrarAlerta(
          `${cantidad} ${producto.nombre} agregado${
            cantidad > 1 ? "s" : ""
          } correctamente al carrito`,
          "success"
        );
      }

      onCerrarModal();
    } catch (error) {
      console.error("Error en agregarAlCarrito:", error);
      mostrarAlerta(
        "Ocurrió un error al agregar el producto al carrito. Intenta nuevamente.",
        "error"
      );
    }
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    const producto = carrito.find((item) => item.id === productoId);

    if (!producto) return;

    const stockDisponible = Number(producto.stock ?? 0);

    if (nuevaCantidad > stockDisponible) {
      mostrarAlerta(
        `No puedes agregar más de ${stockDisponible} unidades de "${producto.nombre}"`,
        "error"
      );
      return;
    }

    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setCarrito(
        carrito.map((item) =>
          item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  const procederAPedido = () => {
    if (carrito.length === 0) {
      mostrarAlerta(
        "Tu carrito está vacío. Agrega algunos productos primero.",
        "warning"
      );
      return;
    }
    onCerrarModal();
    onAbrirModal("datosCliente");
  };

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <>
      <Header
        onAbrirCarrito={() => onAbrirModal("carrito")}
        totalItems={totalItems}
      />
      <Tsearch search={search} setSearch={setSearch} />
      <Filters
        categoriaActiva={categoriaActiva}
        onCambiarCategoria={cambiarCategoria}
      />

      <main className="main-container">
        <AlertModal
          visible={alerta.visible}
          mensaje={alerta.mensaje}
          tipo={alerta.tipo}
          onCerrar={cerrarAlerta}
        />
        <ConfirmModal
          visible={confirmacion.visible}
          titulo={confirmacion.titulo}
          mensaje={confirmacion.mensaje}
          onConfirmar={confirmarAccion}
          onCancelar={cerrarConfirmacion}
        />

        {/* ✅ Mostrar información de filtros activos */}
        {(searchTerm || categoriaActiva) && (
          <div className="filters-active-info">
            <p>
              {productosFiltrados.length > 0
                ? `🔍 ${productosFiltrados.length} producto${
                    productosFiltrados.length > 1 ? "s" : ""
                  } encontrado${productosFiltrados.length > 1 ? "s" : ""}`
                : `❌ No se encontraron productos`}

              {/* Mostrar categoría activa */}
              {categoriaActiva && (
                <span className="active-category">
                  {" "}
                  en <strong>{obtenerNombreCategoria()}</strong>
                </span>
              )}

              {/* Mostrar término de búsqueda */}
              {searchTerm && (
                <span className="active-search">
                  {" "}
                  para "<strong>{searchTerm}</strong>"
                </span>
              )}
            </p>
          </div>
        )}

        {/* ✅ Solo UN ProductosGrid usando productosFiltrados */}
        <ProductosGrid
          productos={productosFiltrados}
          onAbrirModal={onAbrirModal}
        />

        <GaleriaModal
          abierto={modalAbierto === "galeria"}
          producto={productoSeleccionado}
          onCerrar={onCerrarModal}
          onAgregarCarrito={agregarAlCarrito}
        />

        <CartModal
          abierto={modalAbierto === "carrito"}
          carrito={carrito}
          onCerrar={onCerrarModal}
          onEliminarItem={eliminarDelCarrito}
          onActualizarCantidad={actualizarCantidad}
          onVaciarCarrito={vaciarCarrito}
          onProcederPedido={procederAPedido}
          mostrarAlerta={mostrarAlerta}
          cerrarAlerta={cerrarAlerta}
          alerta={alerta}
        />

        {/* ✅ Pasar la función guardarPedidoEnBD al DatosClienteModal */}
        <DatosClienteModal
          abierto={modalAbierto === "datosCliente"}
          onCerrar={onCerrarModal}
          carrito={carrito}
          setCarrito={setCarrito}
          onGuardarPedido={guardarPedidoEnBD} // ✅ Nueva prop
          mostrarAlerta={mostrarAlerta} // ✅ Pasar mostrarAlerta también
        />
      </main>
      <Footer />
    </>
  );
}

export default Main;
