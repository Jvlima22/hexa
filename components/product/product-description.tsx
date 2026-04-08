import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b border-neutral-100 pb-6">
        <h1 className="mb-4 text-4xl font-black uppercase tracking-tight text-black leading-tight">
          {product.title}
        </h1>
        <div className="mr-auto w-auto rounded-full bg-brand-secondary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-brand-secondary/20">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-8 text-base leading-relaxed text-neutral-600"
          html={product.descriptionHtml}
        />
      ) : null}
      <div className="mt-8">
        <AddToCart product={product} />
      </div>
    </>
  );
}
