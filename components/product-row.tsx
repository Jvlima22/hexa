"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { GridTileImage } from "components/grid/tile";
import { Product } from "lib/shopify/types";
import Link from "next/link";
import { useRef, useState } from "react";

interface ProductRowProps {
  title: string;
  subtitle?: string;
  products: Product[];
  collectionPath: string;
}

export default function ProductRow({
  title,
  subtitle,
  products,
}: ProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const showNavigation = products.length > 4;

  // Monitora o progresso do scroll (0 a 1)
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(isNaN(progress) ? 0 : progress);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Número de pontos (Mapeado pelo total de produtos)
  const dotsCount = Math.max(3, Math.min(5, products.length)); // Mínimo 3, Máximo 5 para não poluir
  const activeDotIndex = Math.round(scrollProgress * (dotsCount - 1));

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Header Centralizado */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm md:text-base text-neutral-500 font-semibold tracking-wide">
              {subtitle}
            </p>
          )}
        </div>

        {/* Container do Scroll com Setas Laterais */}
        <div className="relative group/nav -mx-8 md:-mx-12">
          {showNavigation && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-8 top-[44%] -translate-y-1/2 z-20 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-neutral-100 text-black transition-all duration-300 opacity-0 group-hover/nav:opacity-100 hover:scale-110 hover:bg-white active:scale-95"
              >
                <ChevronLeftIcon className="h-6 w-6 stroke-[3]" />
              </button>

              <button
                onClick={() => scroll("right")}
                className="absolute right-8 top-[44%] -translate-y-1/2 z-20 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-neutral-100 text-black transition-all duration-300 opacity-0 group-hover/nav:opacity-100 hover:scale-110 hover:bg-white active:scale-95"
              >
                <ChevronRightIcon className="h-6 w-6 stroke-[3]" />
              </button>
            </>
          )}

          {/* Container do Scroll */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-2 overflow-x-auto pt-10 pb-8 px-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          >
            {products.map((product) => {
              const amount = parseInt(
                product.priceRange.minVariantPrice.amount,
              );
              const installments = (amount / 3).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
              const isOutOfStock = !product.availableForSale;

              return (
                <div
                  key={product.handle}
                  className="min-w-[290px] md:min-w-[360px] p-4 pb-0 flex-none snap-start group/card overflow-visible"
                >
                  <Link href={`/product/${product.handle}`} className="block">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100 border border-neutral-100 transition-all duration-500 group-hover/card:scale-[1.03] group-hover/card:shadow-xl group-hover/card:z-10">
                      {!isOutOfStock && (
                        <span className="absolute top-3 left-3 z-10 bg-brand-accent text-brand-secondary text-[10px] font-black px-2 py-1 rounded">
                          33% OFF
                        </span>
                      )}
                      {isOutOfStock && (
                        <span className="absolute top-3 left-3 z-10 bg-neutral-900 text-white text-[10px] font-black px-2 py-1 rounded">
                          Esgotado
                        </span>
                      )}
                      <GridTileImage
                        src={product.featuredImage?.url}
                        alt={product.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 80vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="mt-4 space-y-1">
                      <h3 className="line-clamp-1 text-sm md:text-base font-bold text-neutral-800 group-hover/card:text-black">
                        {product.title}
                      </h3>

                      <div className="flex flex-col">
                        {!isOutOfStock && (
                          <span className="text-[10px] md:text-xs text-neutral-400 line-through leading-none">
                            R$ 329,90
                          </span>
                        )}
                        <span className="text-base md:text-lg font-black text-black">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency:
                              product.priceRange.minVariantPrice.currencyCode,
                          }).format(amount)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-neutral-500 font-medium">
                        <CreditCardIcon className="h-3.5 w-3.5" />
                        <span>ou 3x de {installments} sem juros</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Pagination INDICATOR (BOLINHAS) */}
          {showNavigation && (
            <div className="flex items-center justify-center gap-2 mt-0 pb-4">
              {[...Array(dotsCount)].map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === activeDotIndex
                      ? "w-8 bg-black"
                      : "w-1.5 bg-neutral-200",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
