"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/store/types";
import { useState } from "react";
import { VariantSelector } from "./variant-selector";

// Ícones SVG inline para bandeiras de pagamento
function VisaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <text
        x="50%"
        y="22"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="Arial"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#252525" />
      <circle cx="18" cy="16" r="10" fill="#EB001B" />
      <circle cx="30" cy="16" r="10" fill="#F79E1B" />
      <ellipse cx="24" cy="16" rx="4" ry="9" fill="#FF5F00" />
    </svg>
  );
}

function PixIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#32BCAD" />
      <text
        x="50%"
        y="22"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="bold"
        fontFamily="Arial"
      >
        PIX
      </text>
    </svg>
  );
}

function BoletoIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#F5F5F5" stroke="#ddd" />
      <rect x="8" y="8" width="2" height="16" fill="#333" />
      <rect x="12" y="8" width="4" height="16" fill="#333" />
      <rect x="18" y="8" width="2" height="16" fill="#333" />
      <rect x="22" y="8" width="6" height="16" fill="#333" />
      <rect x="30" y="8" width="2" height="16" fill="#333" />
      <rect x="34" y="8" width="4" height="16" fill="#333" />
      <rect x="40" y="8" width="2" height="16" fill="#333" />
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#007BC1" />
      <text
        x="50%"
        y="22"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="bold"
        fontFamily="Arial"
      >
        AMEX
      </text>
    </svg>
  );
}

const DEFAULT_SIZES = ["PP", "P", "M", "G", "GG", "XG"];

export function ProductDescription({ product }: { product: Product }) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const amount = parseFloat(product.priceRange.minVariantPrice.amount);
  const installment = (amount / 3).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Usa os tamanhos do banco, ou os padrão como fallback
  const sizeOption = product.options?.find(
    (o) => o.name.toLowerCase() === "tamanho" || o.name.toLowerCase() === "size"
  );
  const sizes = sizeOption?.values?.length ? sizeOption.values : DEFAULT_SIZES;

  return (
    <>
      {/* Título e Preço */}
      <div className="mb-6 border-b border-neutral-100 pb-6">
        <h1 className="mb-4 text-2xl md:text-4xl font-black uppercase tracking-tight text-black leading-tight">
          {product.title}
        </h1>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-neutral-400 line-through">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: product.priceRange.minVariantPrice.currencyCode,
            }).format(amount * 1.33)}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-black">
              <Price
                amount={product.priceRange.minVariantPrice.amount}
                currencyCode={product.priceRange.minVariantPrice.currencyCode}
              />
            </span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              33% OFF
            </span>
          </div>
          <span className="text-xs text-neutral-500">
            ou 3x de <strong>{installment}</strong> sem juros
          </span>
        </div>
      </div>

      {/* Seletor de Tamanhos */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-black">Tamanho</span>
          {selectedSize ? (
            <span className="text-xs text-green-600 font-bold">— {selectedSize} selecionado</span>
          ) : (
            <span className="text-xs text-neutral-400 font-medium">— Selecione um tamanho</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`flex min-w-[52px] h-12 items-center justify-center rounded-xl border-2 px-4 text-sm font-black transition-all duration-200 select-none ${
                selectedSize === size
                  ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20 scale-105"
                  : "border-neutral-200 bg-white text-black hover:border-green-600 hover:text-green-700 hover:shadow-md cursor-pointer"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Descrição Colapsável */}
      {product.descriptionHtml ? (
        <div className="mb-6 border border-neutral-100 rounded-xl overflow-hidden">
          <button
            onClick={() => setDescriptionOpen(!descriptionOpen)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-black hover:bg-neutral-50 transition-colors"
          >
            <span className="uppercase tracking-wide text-xs">
              Descrição do produto
            </span>
            <span
              className={`text-xl leading-none transition-transform duration-200 ${descriptionOpen ? "rotate-45" : ""}`}
            >
              +
            </span>
          </button>
          {descriptionOpen && (
            <div className="px-4 pb-4 border-t border-neutral-100">
              <Prose
                className="text-sm leading-relaxed text-neutral-600 pt-3"
                html={product.descriptionHtml}
              />
            </div>
          )}
        </div>
      ) : null}

      {/* Botão Adicionar ao Carrinho */}
      <div className="mt-4">
        <AddToCart product={product} />
      </div>

      {/* Selos de Confiança */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 rounded-xl bg-neutral-50 p-3 text-center">
          <span className="text-xl">🚚</span>
          <span className="text-[10px] font-bold text-neutral-600 leading-tight">
            Frete grátis acima de R$ 299
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-neutral-50 p-3 text-center">
          <span className="text-xl">🔄</span>
          <span className="text-[10px] font-bold text-neutral-600 leading-tight">
            Troca garantida em 30 dias
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-neutral-50 p-3 text-center">
          <span className="text-xl">🔒</span>
          <span className="text-[10px] font-bold text-neutral-600 leading-tight">
            Compra 100% segura
          </span>
        </div>
      </div>

      {/* Bandeiras de Pagamento */}
      <div className="mt-5 border border-neutral-100 rounded-xl p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">
          Formas de pagamento aceitas
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <VisaIcon />
          <MastercardIcon />
          <AmexIcon />
          <PixIcon />
          <BoletoIcon />
        </div>
        <p className="mt-3 text-xs text-neutral-500">
          💳 Parcele em até <strong>3x sem juros</strong> no cartão ou pague com{" "}
          <strong>desconto no Pix</strong>
        </p>
      </div>
    </>
  );
}
