"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    if (window.innerHeight < 650) return;
    toast(
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://logodetimes.com/times/selecao-brasileira-brasil-novo-logo-2019/logo-selecao-brasileira-brasil-novo-logo-2019-4096.png"
          alt="Logo"
          style={{ width: "1.5em", height: "1.5em", objectFit: "contain" }}
        />
        <span>Bem-vindo ao NAREDE.com</span>
      </div>,
      {
        id: "welcome-toast",
        duration: Infinity,
        description: (
          <>
            Sua loja oficial de camisas e uniformes da Seleção Brasileira, com
            entrega rápida e segura.
          </>
        ),
      },
    );
  }, []);

  return null;
}
