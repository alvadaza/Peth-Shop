import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabase";

export function useDatos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError(null);

      // Cargar productos
      const { data: productosData, error: errorProductos } = await supabase
        .from("productos")
        .select("*")
        .order("nombre");

      if (errorProductos) throw errorProductos;

      // Cargar categorías
      const { data: categoriasData, error: errorCategorias } = await supabase
        .from("categorias")
        .select("*")
        .order("nombre");

      if (errorCategorias) throw errorCategorias;

      setProductos(productosData || []);
      setCategorias(categoriasData || []);
    } catch (err) {
      console.error("Error cargando datos:", err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // Función para recargar datos
  const recargarDatos = async () => {
    await cargarDatos();
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return {
    productos,
    categorias,
    cargando,
    error,
    recargarDatos, // ✅ Exportar la función
  };
}
