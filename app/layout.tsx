import { CartProvider } from "components/cart/cart-context";
import { AuthProvider } from "components/auth/auth-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import WhatsAppButton from "components/whatsapp-button";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { baseUrl } from "lib/utils";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR" className={GeistSans.variable}>
      <body className="bg-white text-black selection:bg-brand-accent">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>
              {children}
              <Toaster closeButton />
              <WelcomeToast />
              <WhatsAppButton />
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
