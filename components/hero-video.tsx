"use client";

import { useRef, useEffect } from "react";

export default function HeroVideo() {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (desktopRef.current) {
      desktopRef.current.playbackRate = 0.8; // Reprodução levemente mais lenta para um ar mais premium
    }
    if (mobileRef.current) {
      mobileRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <div className="relative w-full h-[100dvh] md:h-[70vh] lg:h-[85vh] overflow-hidden bg-black select-none pointer-events-none mb-8 md:mb-12">
      
      {/* Overlay de Gradiente Suave para Manter Elegância */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      
      {/* Vídeo Oficial de DESKTOP (Invisível no cel) */}
      <video
        ref={desktopRef}
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block w-full h-full object-cover transition-opacity duration-1000"
      >
        <source 
          src="/assets/videos/banner-bnt-camisa-i-ptbr-v3-desk (1).mp4" 
          type="video/mp4" 
        />
        Seu navegador não suporta a tag de vídeo.
      </video>

      {/* Vídeo Oficial de MOBILE (Invisível no PC) */}
      <video
        ref={mobileRef}
        autoPlay
        loop
        muted
        playsInline
        className="block md:hidden w-full h-full object-cover transition-opacity duration-1000"
      >
        <source 
          src="/assets/videos/narede-mobile.mp4" 
          type="video/mp4" 
        />
        Seu navegador não suporta a tag de vídeo.
      </video>

      {/* Conteúdo Opcional */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 bg-black/5">
        {/* Aqui podemos inserir um logo grande ou uma frase de impacto futuramente */}
      </div>

    </div>
  );
}
