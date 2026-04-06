"use client";

import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  MapPinIcon,
  ShoppingBagIcon,
  SparklesIcon,
  TicketIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useAuth } from "components/auth/auth-context";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const MENU_ITEMS = [
  {
    id: "pedidos",
    label: "Meus Pedidos",
    icon: ShoppingBagIcon,
    path: "/perfil/pedidos",
  },
  {
    id: "rastreio",
    label: "Rastrear Pedido",
    icon: TruckIcon,
    path: "/perfil/rastreio",
  },
  {
    id: "cupons",
    label: "Meus Cupons",
    icon: TicketIcon,
    path: "/perfil/cupons",
  },
  {
    id: "favoritos",
    label: "Lista de Desejos",
    icon: HeartIcon,
    path: "/perfil/favoritos",
  },
  {
    id: "clube",
    label: "Clube de Vantagens",
    icon: SparklesIcon,
    path: "/perfil/clube",
  },
  {
    id: "enderecos",
    label: "Endereços Salvos",
    icon: MapPinIcon,
    path: "/perfil/enderecos",
  },
  {
    id: "suporte",
    label: "Suporte",
    icon: ChatBubbleLeftRightIcon,
    path: "/perfil/suporte",
  },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut, loading } = useAuth();
  const params = useParams();
  const router = useRouter();
  const activeTab = (params.tab as string) || "pedidos";

  if (loading) return null; // Ou um esqueleto de carregamento

  if (!user && !loading) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header mobile */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-neutral-500"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar para loja
          </Link>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar (Desktop) / Nav (Mobile) */}
          <aside className="w-full shrink-0 md:w-72">
            <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
              {/* Perfil Info */}
              <div className="mb-4 flex items-center gap-3 p-4 border-b border-neutral-100">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 font-bold text-neutral-600 text-sm">
                  {user?.user_metadata?.full_name?.[0] ||
                    user?.email?.[0]?.toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-bold text-neutral-900">
                    Olá,{" "}
                    {user?.user_metadata?.full_name?.split(" ")[0] || "Usuário"}
                  </p>
                  <p className="truncate text-[10px] text-neutral-400">
                    Conta validada
                  </p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                {MENU_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={clsx(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all group",
                        isActive
                          ? "bg-black text-white shadow-lg shadow-black/10"
                          : "text-neutral-500 hover:bg-neutral-50 hover:text-black",
                      )}
                    >
                      <item.icon
                        className={clsx(
                          "h-5 w-5",
                          isActive
                            ? "text-white"
                            : "text-neutral-400 group-hover:text-black",
                        )}
                      />
                      {item.label}
                    </Link>
                  );
                })}

                <div className="my-2 h-px bg-neutral-100 mx-4" />

                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 text-red-400" />
                  Sair da minha conta
                </button>
              </nav>
            </div>

            <Link
              href="/"
              className="mt-6 hidden items-center gap-2 text-sm font-medium text-neutral-400 hover:text-black md:flex px-4"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="min-h-[600px] rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
