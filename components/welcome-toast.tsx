"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("🛍️ Bem-vindo à Na Rede!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            Esta é uma loja de alto desempenho, com SSR, alimentada por Shopify,
            Next.js e Vercel.{" "}
            <a
              href="https://vercel.com/templates/next.js/nextjs-commerce"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Faça o deploy da sua própria loja
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
