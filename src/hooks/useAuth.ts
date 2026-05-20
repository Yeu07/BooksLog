import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/utils/supabase/client";

export function useAuth() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);

    if (error) setMessage(`Error: ${error.message}`);
    else setMessage("¡Registro exitoso! Revisa tu correo.");
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) setMessage(`Error: ${error.message}`);
    else {
      router.push("/");
      router.refresh();
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setMessage(`Error con Google: ${error.message}`);
      setLoading(false);
    }
  };

  return { loading, message, setMessage, signUp, signIn, signInWithGoogle };
}
