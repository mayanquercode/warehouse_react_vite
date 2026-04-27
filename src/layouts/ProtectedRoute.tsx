import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { supabase } from "../libs/supabase";
import type { Session } from "@supabase/supabase-js";

type Props = {
  children: React.ReactElement | React.ReactElement[];
  allowedRoles: string[];
};

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtener sesión inicial
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // 2. Escuchar cambios en auth (CLAVE 🔥)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Cargando...</p>;

  // 3. No hay sesión → login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 4. Validar rol (seguro)
  const userRole = session.user.user_metadata?.role;

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};