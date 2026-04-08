"use client";
// Premium Login Page with Google OAuth

import { supabase } from "lib/supabase";
import LoadingDots from "components/loading-dots";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Bem-vindo de volta!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/` },
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || "Erro ao entrar com Google.");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Entrar
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Acesse sua conta para continuar comprando
          </p>
        </div>

        {/* Botão Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="group mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          {googleLoading ? (
            <LoadingDots className="bg-neutral-500" />
          ) : (
            <>
              <GoogleIcon />
              Continuar com Google
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">ou</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="premium-input w-full rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700"
              >
                Senha
              </label>
              <Link
                href="/esqueci-senha"
                className="text-xs text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Esqueceu?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="premium-input w-full rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-brand-secondary px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-primary hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <LoadingDots className="bg-white" /> : "Entrar"}
          </button>
        </form>

        {/* Rodapé */}
        <p className="mt-8 text-center text-sm text-neutral-500">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
