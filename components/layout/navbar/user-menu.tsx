"use client";

import { Menu, Transition } from "@headlessui/react";
import { UserIcon, ArrowLeftOnRectangleIcon, ShoppingBagIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useAuth } from "components/auth/auth-context";
import Link from "next/link";
import { Fragment } from "react";
import clsx from "clsx";

export default function UserMenu() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-11 w-11 animate-pulse rounded-md bg-neutral-100" />
    );
  }

  if (!user) {
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

  const userInitials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase();

  const userAvatar = user.user_metadata?.avatar_url;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-all hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={user.user_metadata?.full_name || "Avatar"}
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <span className="text-xs font-semibold text-neutral-600">{userInitials}</span>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-neutral-200 bg-white p-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* Header */}
          <div className="px-3 py-2 border-b border-neutral-100 mb-2">
            <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Conta</p>
            <p className="text-sm font-semibold text-neutral-900 truncate">
              {user.user_metadata?.full_name || "Usuário"}
            </p>
            <p className="text-xs text-neutral-500 truncate">{user.email}</p>
          </div>

          <div className="space-y-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/perfil"
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                    active ? "bg-neutral-50 text-black" : "text-neutral-600"
                  )}
                >
                  <ShoppingBagIcon className="h-4 w-4" />
                  Meus Pedidos
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/perfil"
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                    active ? "bg-neutral-50 text-black" : "text-neutral-600"
                  )}
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                  Configurações
                </Link>
              )}
            </Menu.Item>

            <div className="h-px bg-neutral-100 my-1" />

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={clsx(
                    "flex w-full items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-red-600",
                    active ? "bg-red-50" : ""
                  )}
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                  Sair da loja
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
