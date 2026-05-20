"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Input,
  Separator,
  Button,
  Link,
  Form,
} from "@heroui/react";
import { useAuth } from "@/src/hooks/useAuth";
import { PasswordInput } from "@/src/components/ui/PasswordInput";
import { GoogleSignInButton } from "@/src/components/auth/GoogleSignInButton";

export default function LoginPage() {
  const { loading, message, setMessage, signUp, signIn, signInWithGoogle } =
    useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        return;
      }
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setMessage("");
    setConfirmPassword("");
  };

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
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              required
              placeholder="tu@email.com"
              type="email"
              variant="primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isSignUp && (
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar Contraseña"
              />
            )}

            <Button
              type="submit"
              variant="primary"
              isPending={loading}
              className="w-full mt-2"
            >
              {isSignUp ? "Registrarse" : "Ingresar"}
            </Button>
          </Form>

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

          <GoogleSignInButton onClick={signInWithGoogle} isPending={loading} />
        </Card.Content>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-default-500">
            {isSignUp ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
            <Link className="text-sm cursor-pointer" onPress={toggleMode}>
              {isSignUp ? "Inicia sesión" : "Regístrate"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
