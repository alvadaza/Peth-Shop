import React, { useState, useEffect } from "react";
import { AuthContext } from "./auth";
import { supabase } from "../supabase/supabase";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Función segura para cargar el perfil
  const cargarPerfil = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("nombre, telefono")
        .eq("id", userId)
        .maybeSingle(); // ← IMPORTANTE: maybeSingle() nunca da error si no existe

      if (error && error.code !== "PGRST116") throw error;
      return data; // será null si no existe el perfil
    } catch (err) {
      console.error("Error cargando perfil:", err);
      return null;
    }
  };

  // Carga el usuario completo (auth + perfil)
  const cargarUsuario = async (supabaseUser) => {
    if (!supabaseUser) {
      setUser(null);
      setCargando(false);
      return;
    }

    const perfil = await cargarPerfil(supabaseUser.id);

    setUser({
      ...supabaseUser,
      nombre: perfil?.nombre || supabaseUser.email.split("@")[0],
      telefono: perfil?.telefono || null,
    });
    setCargando(false);
  };

  useEffect(() => {
    // 1. Cargar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      cargarUsuario(session?.user ?? null);
    });

    // 2. Escuchar cambios en tiempo real
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      cargarUsuario(session?.user ?? null);
    });

    // Cleanup
    return () => {
      subscription?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    await cargarUsuario(data.user);
    return data.user;
  };

  // REGISTER
  const register = async (email, password, nombre, telefono) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const user = data.user;

    // Insertar perfil
    await supabase.from("profiles").insert({
      id: user.id,
      nombre,
      telefono,
    });

    await cargarUsuario(user);
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, cargando }}>
      {cargando ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            color: "#7d2ae8",
            zIndex: 9999,
          }}
        >
          Cargando...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
