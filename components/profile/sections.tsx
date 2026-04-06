"use client";

import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
  PlusIcon,
  ShoppingBagIcon,
  SparklesIcon,
  TicketIcon,
  TruckIcon
} from "@heroicons/react/24/outline";

// Helper para manter a largura idêntica em todos
const SectionCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className="w-full px-1 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className={`w-full rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  </div>
);

// 📦 Pedidos
export function PedidosSection() {
  return (
    <SectionCard>
      <div className="flex flex-col items-center justify-center py-10 text-center bg-neutral-50/30 rounded-xl border border-neutral-50">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-neutral-100 shadow-sm">
          <ShoppingBagIcon className="h-6 w-6 text-neutral-300" />
        </div>
        <h3 className="mt-4 text-xs font-bold text-neutral-900 tracking-tight px-6 uppercase tracking-widest leading-none">
          Sem pedidos recentes
        </h3>
        <p className="mt-2 text-[9px] text-neutral-400 uppercase tracking-widest leading-relaxed px-10">
          Suas compras aparecerão aqui em breve.
        </p>
      </div>
    </SectionCard>
  );
}

// 🎫 Cupons
export function CuponsSection() {
  return (
    <SectionCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TicketIcon className="h-5 w-5 text-neutral-400" />
          <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest">
            Cupom Disponível
          </span>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          Ativo
        </span>
      </div>
      <div className="py-2 border-y border-neutral-50 border-dashed text-center">
        <h3 className="text-xl font-black text-neutral-900 tracking-tighter italic">
          BEMVINDO10
        </h3>
        <p className="text-[9px] text-neutral-500 uppercase tracking-wider mt-1 font-medium">
          10% OFF na primeira compra (acima de R$199).
        </p>
      </div>
      <button className="w-full rounded-xl bg-neutral-900 py-3 text-[10px] font-bold text-white uppercase tracking-widest transition-opacity hover:opacity-90">
        COPIAR CÓDIGO
      </button>
    </SectionCard>
  );
}

// 🚚 Rastreio
export function RastreioSection() {
  return (
    <SectionCard className="space-y-5">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">
          Código de Rastreio
        </label>
        <input
          type="text"
          placeholder="Ex: BR123456789"
          className="premium-input w-full rounded-xl px-4 py-3 text-sm"
        />
      </div>
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3.5 text-[10px] font-bold text-white shadow-sm hover:bg-neutral-800 transition-all uppercase tracking-widest">
        <TruckIcon className="h-4 w-4" />
        BUSCAR PACOTE
      </button>
    </SectionCard>
  );
}

// ❤️ Desejos
export function FavoritosSection() {
  return (
    <SectionCard>
      <div className="flex flex-col items-center justify-center py-10 bg-neutral-50/30 rounded-xl border border-neutral-50 text-center">
        <HeartIcon className="h-10 w-10 text-neutral-100" />
        <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-neutral-300">
          Sua lista está vazia
        </p>
        <button className="mt-3 text-[9px] font-bold text-neutral-900 underline underline-offset-4 uppercase tracking-widest">
          Ver Vitrine
        </button>
      </div>
    </SectionCard>
  );
}

// 🌟 Clube
export function ClubeSection() {
  return (
    <div className="w-full px-1 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="relative w-full rounded-2xl border border-neutral-100 bg-neutral-900 p-6 text-white shadow-lg overflow-hidden">
        <SparklesIcon className="h-8 w-8 text-yellow-400 mb-4" />
        <h1 className="text-xl font-bold tracking-tight">Clube Hexa</h1>
        <p className="mt-2 text-[10px] text-neutral-400 leading-relaxed font-medium uppercase tracking-wide">
          Acumule <strong>PONTOS</strong> em cada compra e suba de nível.
        </p>
        <div className="mt-6 flex items-baseline gap-2 border-t border-white/10 pt-4">
          <span className="text-3xl font-black">0</span>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Pontos Atuais
          </span>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-none" />
      </div>
    </div>
  );
}

// 📍 Endereços
export function EnderecosSection() {
  return (
    <SectionCard>
      <button className="flex items-center gap-2 rounded-xl border-2 border-dashed border-neutral-100 p-8 text-[10px] font-bold text-neutral-400 hover:border-black hover:text-black transition-all w-full justify-center uppercase tracking-widest bg-neutral-50/20">
        <PlusIcon className="h-5 w-5" />
        Novo Endereço
      </button>
    </SectionCard>
  );
}

// 💬 Suporte
export function SuporteSection() {
  return (
    <SectionCard className="space-y-3">
      <a
        href="#"
        className="flex w-full items-center gap-4 rounded-xl border border-neutral-50 bg-neutral-50/50 p-4 transition-all hover:border-neutral-200 hover:bg-neutral-100 group"
      >
        <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center border border-neutral-100 group-hover:shadow-sm transition-all text-neutral-400 group-hover:text-black">
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest">
            WhatsApp Suporte
          </h4>
          <p className="text-[9px] text-neutral-400 mt-0.5 uppercase tracking-tight font-medium">
            Falar com especialista
          </p>
        </div>
      </a>
      <a
        href="#"
        className="flex w-full items-center gap-4 rounded-xl border border-neutral-50 bg-neutral-50/50 p-4 transition-all hover:border-neutral-200 hover:bg-neutral-100 group"
      >
        <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center border border-neutral-100 group-hover:shadow-sm transition-all text-neutral-400 group-hover:text-black">
          <ShoppingBagIcon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest">
            Políticas de Troca
          </h4>
          <p className="text-[9px] text-neutral-400 mt-0.5 uppercase tracking-tight font-medium">
            Regras e Devoluções
          </p>
        </div>
      </a>
    </SectionCard>
  );
}
