import React, { useState } from "react";
import {
  LockOutlined,
  EmailOutlined,
  Visibility,
  VisibilityOff,
  LoginOutlined,
} from "@mui/icons-material";
import { supabase } from "../libs/supabase";
import { useNavigate } from "react-router"; // Cambiado a react-router-dom
import { useAppDispatch } from "../redux/hooks";
import { signIn } from "../redux/sessionSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Iniciar sesión con Supabase
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (!data?.user || !data?.session) {
        setError("No se pudo obtener la información del usuario");
        setLoading(false);
        return;
      }

      // 2. Guardar la sesión en Redux
      dispatch(
        signIn({
          user: data.user,
          session: data.session,
        }),
      );

      console.log("Sesión guardada en Redux:", {
        user: data.user,
        session: data.session,
      });

      // 3. Redirigir al home
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header con Icono */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <LockOutlined sx={{ fontSize: 32 }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
          <p className="text-gray-500 text-sm">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        {/* Mostrar error si existe */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={onSubmitForm}>
          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <EmailOutlined sx={{ fontSize: 20 }} />
              </div>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={onChangeInput}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                placeholder="ejemplo@correo.com"
                disabled={loading}
              />
            </div>
          </div>

          {/* Campo Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <LockOutlined sx={{ fontSize: 20 }} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onChangeInput}
                required
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                placeholder="••••••••"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                disabled={loading}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: 20 }} />
                ) : (
                  <Visibility sx={{ fontSize: 20 }} />
                )}
              </button>
            </div>
          </div>

          {/* Botón de Acción */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-lg shadow-blue-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <LoginOutlined sx={{ fontSize: 20 }} />
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t pt-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
            Sistema de Bodega v1.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

