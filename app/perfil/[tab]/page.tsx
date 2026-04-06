"use client";

import { useParams } from "next/navigation";
import { 
  PedidosSection, 
  RastreioSection, 
  CuponsSection, 
  FavoritosSection, 
  ClubeSection, 
  EnderecosSection, 
  SuporteSection 
} from "components/profile/sections";

export default function ProfileTabPage() {
  const params = useParams();
  const tab = params.tab as string;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionRenderer tab={tab} />
    </div>
  );
}

function SectionRenderer({ tab }: { tab: string }) {
  switch (tab) {
    case "pedidos":
      return (
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">Meus Pedidos</h1>
            <p className="mt-2 text-sm text-neutral-500 font-medium">Histórico completo de suas compras.</p>
          </div>
          <PedidosSection />
        </>
      );
    case "rastreio":
      return (
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">Rastrear Pedido</h1>
            <p className="mt-2 text-sm text-neutral-500 font-medium">Acompanhe seu pacote em tempo real.</p>
          </div>
          <RastreioSection />
        </>
      );
    case "cupons":
      return (
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">Meus Cupons</h1>
            <p className="mt-2 text-sm text-neutral-500 font-medium">Seus descontos e vantagens acumuladas.</p>
          </div>
          <CuponsSection />
        </>
      );
    case "favoritos":
      return (
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">Lista de Desejos</h1>
            <p className="mt-2 text-sm text-neutral-500 font-medium">Seus produtos favoritos salvos aqui.</p>
          </div>
          <FavoritosSection />
        </>
      );
    case "clube":
      return (
         <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">Clube Hexa</h1>
            <p className="mt-2 text-sm text-neutral-500 font-medium">Seu nível atual e benefícios exclusivos.</p>
          </div>
          <ClubeSection />
        </>
      );
    case "enderecos":
      return (
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">Endereços</h1>
            <p className="mt-2 text-sm text-neutral-500 font-medium">Gerencie seus endereços para entrega rápida.</p>
          </div>
          <EnderecosSection />
        </>
      );
    case "suporte":
      return (
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">Suporte</h1>
            <p className="mt-2 text-sm text-neutral-500 font-medium">Como podemos ajudar você hoje?</p>
          </div>
          <SuporteSection />
        </>
      );
    default:
      return <PedidosSection />;
  }
}
