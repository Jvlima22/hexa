"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/store/types";
import { useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return options.map((option) => (
    <form key={option.id} className="mb-6">
      <dl>
        <dt className="mb-3 flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-black">
            {option.name}
          </span>
          <span className="text-xs text-neutral-400 font-medium">
            — Selecione um tamanho
          </span>
        </dt>
        <dd className="flex flex-wrap gap-2">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            const optionParams: Record<string, string> = {};
            searchParams.forEach((v, k) => (optionParams[k] = v));
            optionParams[optionNameLowerCase] = value;

            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value),
                ),
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale,
              ),
            );

            const isActive = searchParams.get(optionNameLowerCase) === value;

            return (
              <button
                formAction={() => updateOption(optionNameLowerCase, value)}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? " (Indisponível)" : ""}`}
                className={clsx(
                  "relative flex min-w-[52px] h-12 items-center justify-center rounded-xl border-2 px-4 text-sm font-black transition-all duration-200 select-none",
                  {
                    // Ativo — verde da seleção brasileira
                    "border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20 scale-105":
                      isActive,
                    // Disponível
                    "border-neutral-200 bg-white text-black hover:border-green-600 hover:text-green-700 hover:shadow-md cursor-pointer":
                      !isActive && isAvailableForSale,
                    // Indisponível — riscado
                    "relative cursor-not-allowed opacity-40 bg-neutral-50 text-neutral-400 border-neutral-100 overflow-hidden":
                      !isAvailableForSale,
                  },
                )}
              >
                {/* Linha diagonal para tamanho esgotado */}
                {!isAvailableForSale && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="absolute w-full h-px bg-neutral-400 rotate-45 origin-center" />
                  </span>
                )}
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
