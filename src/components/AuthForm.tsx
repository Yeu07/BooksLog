"use client";

import { useState } from "react";
import { createClient } from "../app/utils/supabase/client";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  Card,
  CardHeader,
  CardFooter,
  Input,
  Separator,
  Button,
  Link,
} from "@heroui/react";

export default function AuthForm() {
  const supabase = createClient();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isSignUp) {
      if (password !== confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) setMessage(`Error: ${error.message}`);
      else setMessage("¡Registro exitoso! Revisa tu correo.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMessage(`Error: ${error.message}`);
      else setMessage("¡Sesión iniciada con éxito!");
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage(`Error con Google: ${error.message}`);
      setLoading(false);
    }
  };

  const visibilityButton = (
    <button
      className="focus:outline-none p-2 text-default-400 hover:text-default-600 transition-colors"
      type="button"
      onClick={toggleVisibility}
      aria-label="toggle password visibility"
    >
      {isVisible ? (
        <FiEye className="w-5 h-5" />
      ) : (
        <FiEyeOff className="w-5 h-5" />
      )}
    </button>
  );

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader className="flex flex-col gap-1 pb-0 pt-2 px-4 items-start">
          <h2 className="text-2xl font-bold">
            {isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}
          </h2>
          <p className="text-sm text-default-500">
            {isSignUp
              ? "Registra tus lecturas y mantén tu progreso."
              : "Bienvenido de nuevo a tu biblioteca personal."}
          </p>
        </CardHeader>

        <Card.Content className="gap-4 mt-4">
          <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
            <Input
              required
              placeholder="tu@email.com"
              type="email"
              variant="primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative w-full">
              <Input
                required
                placeholder="Contraseña"
                type={isVisible ? "text" : "password"}
                variant="primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center">
                {visibilityButton}
              </div>
            </div>

            {isSignUp && (
              <div className="relative w-full">
                <Input
                  required
                  placeholder="Confirmar Contraseña"
                  type={isVisible ? "text" : "password"}
                  variant="primary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center">
                  {visibilityButton}
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              isPending={loading}
              className="w-full mt-2"
            >
              {isSignUp ? "Registrarse" : "Ingresar"}
            </Button>
          </form>

          {message && (
            <p className="text-sm text-center text-primary font-medium mt-2">
              {message}
            </p>
          )}

          <div className="flex items-center gap-4 py-2">
            <Separator className="flex-1" />
            <p className="text-tiny text-default-500">O</p>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="primary"
            isPending={loading}
            onClick={handleGoogleAuth}
            className="w-full"
          >
            <div className="flex items-center justify-center gap-2">
              {!loading && (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              <span>Continuar con Google</span>
            </div>
          </Button>
        </Card.Content>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-default-500">
            {isSignUp ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
            <Link
              className="text-sm cursor-pointer"
              onPress={() => {
                setIsSignUp(!isSignUp);
                setMessage("");
                setConfirmPassword("");
              }}
            >
              {isSignUp ? "Inicia sesión" : "Regístrate"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
