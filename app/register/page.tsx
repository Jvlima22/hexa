"use client";

import { supabase } from "lib/supabase";
import LoadingDots from "components/loading-dots";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (password !== confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });
      if (error) throw error;
      toast.success("Conta criada! Verifique seu email para confirmar.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Criar conta
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Cadastre-se para começar a comprar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label
                htmlFor="register-name"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Nome completo
              </label>
              <input
                id="register-name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
              />
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Email
              </label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Senha
              </label>
              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
              />
            </div>

            <div>
              <label
                htmlFor="register-confirm"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Confirmar senha
              </label>
              <input
                id="register-confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repita a senha"
                className="premium-input w-full rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400"
              />
            </div>

            {/* Password strength indicator */}
            {password.length > 0 && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= i * 3
                          ? password.length >= 12
                            ? "bg-green-500"
                            : password.length >= 8
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          : "bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-neutral-400">
                  {password.length < 6
                    ? "Muito curta"
                    : password.length < 8
                      ? "Fraca"
                      : password.length < 12
                        ? "Média"
                        : "Forte"}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-full bg-brand-secondary px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <LoadingDots className="bg-white" /> : "Criar conta"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-neutral-500">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-medium text-neutral-900 underline-offset-4 hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
