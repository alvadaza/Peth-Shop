import React, { useState, useEffect } from "react";
import { AuthContext } from "./auth";
import { supabase } from "../supabase/supabase";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Función para cargar los datos del perfil
  const cargarPerfil = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("nombre, telefono")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error cargando perfil:", error);
      return null;
    }

    return data; // { nombre: "Juan", telefono: "123..." } o null si no existe
  };

  // Cargar sesión + perfil
  useEffect(() => {
    const cargarSesion = async () => {
      const { data } = await supabase.auth.getSession();
      const supabaseUser = data?.session?.user ?? null;

      if (supabaseUser) {
        const perfil = await cargarPerfil(supabaseUser.id);
        setUser({
          ...supabaseUser,
          nombre: perfil?.nombre || "Usuario", // AQUÍ ESTÁ LA MAGIA
          telefono: perfil?.telefono || null,
        });
      } else {
        setUser(null);
      }
      setCargando(false);
    };

    cargarSesion();

    // Escuchar cambios de autenticación
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const supabaseUser = session?.user ?? null;

        if (supabaseUser) {
          const perfil = await cargarPerfil(supabaseUser.id);
          setUser({
            ...supabaseUser,
            nombre: perfil?.nombre || "Usuario",
            telefono: perfil?.telefono || null,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    // Después de login, cargamos el perfil
    const perfil = await cargarPerfil(data.user.id);
    setUser({
      ...data.user,
      nombre: perfil?.nombre || "Usuario",
      telefono: perfil?.telefono || null,
    });

    return data.user;
  };

  const register = async (email, password, nombre, telefono) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const user = data.user;

    // Insertar en profiles
    const { error: errorInsert } = await supabase.from("profiles").insert([
      {
        id: user.id,
        nombre,
        telefono,
      },
    ]);

    if (errorInsert) throw errorInsert;

    // Después de registrarse, también cargamos el perfil
    setUser({
      ...user,
      nombre: nombre,
      telefono: telefono,
    });

    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, cargando }}>
      {cargando ? <div className="loading">Cargando...</div> : children}
    </AuthContext.Provider>
  );
}
