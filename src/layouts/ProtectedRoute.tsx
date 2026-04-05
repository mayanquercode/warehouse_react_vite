
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { supabase } from '../libs/supabase';
import type { Session } from '@supabase/supabase-js';

type Props = {
  children: React.ReactElement | React.ReactElement[]
  allowedRoles: string[]
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Revisar si hay sesión activa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando...</p>;

  // 2. Si no hay sesión, mandar al Login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 3. Extraer el rol de los metadatos (el que pusimos con SQL)
  const userRole = session.user.user_metadata.role;

  // 4. Si el rol no está en la lista permitida, mandarlo a una página de error
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};