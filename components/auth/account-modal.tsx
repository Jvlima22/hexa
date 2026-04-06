"use client";

import { Dialog, Transition } from "@headlessui/react";
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
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "components/auth/auth-context";
import {
  ClubeSection,
  CuponsSection,
  EnderecosSection,
  FavoritosSection,
  PedidosSection,
  RastreioSection,
  SuporteSection,
} from "components/profile/sections";
import Link from "next/link";
import { Fragment, useState } from "react";

type ViewType =
  | "menu"
  | "pedidos"
  | "rastreio"
  | "cupons"
  | "favoritos"
  | "clube"
  | "enderecos"
  | "suporte";

export default function AccountModal() {
  const { user, signOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>("menu");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setActiveView("menu"), 300); // Reseta a view após fechar
  };

  // Se não estiver logado, o botão apenas redireciona para o login
  if (!user && !loading) {
    return (
      <Link
        href="/login"
        prefetch={true}
        aria-label="Entrar"
        className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors hover:border-neutral-400 hover:bg-neutral-50"
      >
        <UserIcon className="h-4 w-4" />
      </Link>
    );
  }

  // Dados do avatar
  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase();

  const userAvatar = user?.user_metadata?.avatar_url;

  return (
    <>
      <button
        onClick={openModal}
        aria-label="Abrir menu da conta"
        className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-all hover:border-neutral-400 hover:bg-neutral-50"
      >
        {userAvatar ? (
          <img
            src={userAvatar}
            alt="Perfil"
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <span className="text-xs font-bold text-neutral-600">
            {userInitials}
          </span>
        )}
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeModal} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-[92vw] max-w-[390px] bg-white p-6 shadow-xl flex flex-col h-full border-l border-neutral-100">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-2 md:mb-1 mb-0">
                  <div className="flex items-center gap-2">
                    {activeView !== "menu" && (
                      <button
                        onClick={() => setActiveView("menu")}
                        className="p-1 -ml-1 hover:bg-neutral-50 rounded-md transition-colors text-neutral-500 hover:text-black"
                      >
                        <ArrowLeftIcon className="h-4 w-4" />
                      </button>
                    )}
                    <h2 className="text-base font-semibold text-neutral-900 leading-none">
                      {activeView === "menu"
                        ? "Minha conta"
                        : activeView.charAt(0).toUpperCase() +
                          activeView.slice(1)}
                    </h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-1 hover:bg-neutral-50 rounded-md transition-colors text-neutral-500 hover:text-black"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  {activeView === "menu" ? (
                    <>
                      {/* User Profile Info */}
                      <div className="mb-4 flex items-center gap-3 p-3 rounded-xl bg-neutral-50/50 border border-neutral-100">
                        <div className="h-12 w-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center overflow-hidden shadow-sm">
                          {userAvatar ? (
                            <img
                              src={userAvatar}
                              alt="Perfil"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-bold text-neutral-600 tracking-tight">
                              {userInitials}
                            </span>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-semibold text-sm text-neutral-900 truncate leading-tight">
                            {user?.user_metadata?.full_name || "Usuário"}
                          </h3>
                          <p className="text-xs text-neutral-500 truncate mt-1">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="pb-2">
                          <p className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                            Compras
                          </p>
                          <button
                            onClick={() => setActiveView("pedidos")}
                            className="flex w-full items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <ShoppingBagIcon className="h-4 w-4 text-neutral-400 group-hover:text-black" />
                              <span className="text-sm font-medium text-neutral-600 group-hover:text-black">
                                Meus pedidos
                              </span>
                            </div>
                          </button>
                          <button
                            onClick={() => setActiveView("rastreio")}
                            className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all group text-neutral-600 hover:text-black"
                          >
                            <TruckIcon className="h-4 w-4 text-neutral-400 group-hover:text-black" />
                            <span className="text-sm font-medium">
                              Rastrear pedido
                            </span>
                          </button>
                        </div>

                        <div className="py-2 border-t border-neutral-100">
                          <p className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                            Vantagens
                          </p>
                          <button
                            onClick={() => setActiveView("cupons")}
                            className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all group text-neutral-600 hover:text-black"
                          >
                            <TicketIcon className="h-4 w-4 text-neutral-400 group-hover:text-black" />
                            <span className="text-sm font-medium">
                              Meus cupons
                            </span>
                          </button>
                          <button
                            onClick={() => setActiveView("favoritos")}
                            className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all group text-neutral-600 hover:text-black"
                          >
                            <HeartIcon className="h-4 w-4 text-neutral-400 group-hover:text-black" />
                            <span className="text-sm font-medium">
                              Lista de desejos
                            </span>
                          </button>
                          <button
                            onClick={() => setActiveView("clube")}
                            className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all group text-neutral-600 hover:text-black"
                          >
                            <SparklesIcon className="h-4 w-4 text-neutral-400 group-hover:text-black" />
                            <span className="text-sm font-medium">
                              Clube de vantagens
                            </span>
                          </button>
                        </div>

                        <div className="py-2 border-t border-neutral-100">
                          <p className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                            Configurações
                          </p>
                          <button
                            onClick={() => setActiveView("enderecos")}
                            className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all group text-neutral-600 hover:text-black"
                          >
                            <MapPinIcon className="h-4 w-4 text-neutral-400 group-hover:text-black" />
                            <span className="text-sm font-medium">
                              Endereços salvos
                            </span>
                          </button>
                          <button
                            onClick={() => setActiveView("suporte")}
                            className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all group text-neutral-600 hover:text-black"
                          >
                            <ChatBubbleLeftRightIcon className="h-4 w-4 text-neutral-400 group-hover:text-black" />
                            <span className="text-sm font-medium">Suporte</span>
                          </button>
                        </div>
                      </nav>

                      {/* Footer / Logout (APENAS NO MENU PRINCIPAL) */}
                      <div className="border-t border-neutral-100 pt-5 mt-auto">
                        <button
                          onClick={() => {
                            signOut();
                            closeModal();
                          }}
                          className="flex w-full items-center justify-center gap-2 p-3 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
                        >
                          <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                          Sair da Loja
                        </button>
                        <p className="mt-4 text-center text-[10px] text-neutral-400 font-medium uppercase tracking-widest opacity-60">
                          NAREDE.com
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar py-2">
                      {activeView === "pedidos" && <PedidosSection />}
                      {activeView === "rastreio" && <RastreioSection />}
                      {activeView === "cupons" && <CuponsSection />}
                      {activeView === "favoritos" && <FavoritosSection />}
                      {activeView === "clube" && <ClubeSection />}
                      {activeView === "enderecos" && <EnderecosSection />}
                      {activeView === "suporte" && <SuporteSection />}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
