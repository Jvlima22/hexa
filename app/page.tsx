import { CategoryGrid } from "components/grid/category-grid";
import HeroVideo from "components/hero-video";
import Footer from "components/layout/footer";
import ProductRow from "components/product-row";
import { getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  // Buscando produtos reais
  let products = await getCollectionProducts({ collection: "frontpage" });

  // Fallback visual caso a Shopify/Supabase esteja vazia agora
  if (!products || products.length === 0) {
    products = [
      {
        handle: "camisa-i-2024",
        title: "Camisa Seleção Brasileira I 2026/27",
        featuredImage: {
          url: "https://imgnike-a.akamaihd.net/360x360/09780200.jpg",
          altText: "",
          width: 1000,
          height: 1000,
        },
        priceRange: {
          minVariantPrice: { amount: "219.90", currencyCode: "BRL" },
        },
        availableForSale: true,
      },
      {
        handle: "camisa-ii-2024",
        title: "Camisa Seleção Brasileira II 2026/27",
        featuredImage: {
          url: "https://imgnike-a.akamaihd.net/360x360/10977200.jpg",
          altText: "",
          width: 1000,
          height: 1000,
        },
        priceRange: {
          minVariantPrice: { amount: "229.90", currencyCode: "BRL" },
        },
        availableForSale: true,
      },
      {
        handle: "camisa-i-2024-player",
        title: "Camisa Seleção Brasileira I 2026/27 Jogador",
        featuredImage: {
          url: "https://imgnike-a.akamaihd.net/1920x1920/09681000A4.jpg",
          altText: "",
          width: 1000,
          height: 1000,
        },
        priceRange: {
          minVariantPrice: { amount: "279.90", currencyCode: "BRL" },
        },
        availableForSale: true,
      },
      {
        handle: "camisa-iii-2024",
        title: "Camisa Seleção Brasileira III 2026/27",
        featuredImage: {
          url: "https://imgnike-a.akamaihd.net/360x360/097830NXA4.jpg",
          altText: "",
          width: 1000,
          height: 1000,
        },
        priceRange: {
          minVariantPrice: { amount: "499.90", currencyCode: "BRL" },
        },
        availableForSale: false,
      },
      {
        handle: "camisa-treino-2024",
        title: "Camisa de Treino Brasil 2026/27",
        featuredImage: {
          url: "https://imgnike-a.akamaihd.net/360x360/097830NXA4.jpg",
          altText: "",
          width: 1000,
          height: 1000,
        },
        priceRange: {
          minVariantPrice: { amount: "499.90", currencyCode: "BRL" },
        },
        availableForSale: false,
      },
    ] as any[];
  }

  return (
    <>
      <HeroVideo />

      <section className="w-full pt-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-10 lg:px-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
              Rumo ao Hexa
            </h2>
            <p className="mt-2 text-sm md:text-base text-neutral-500 font-semibold tracking-wide">
              Juntos em busca de um sonho!
            </p>
          </div>
        </div>
      </section>

      <ProductRow
        title="Mantos da seleção brasileira"
        subtitle="Confira os novos mantos oficiais"
        collection="todos"
        collectionPath="/search/frontpage"
      />

      <CategoryGrid />

      {/* Busca dinâmica por Categoria/Coleção no Supabase */}
      <ProductRow
        title="Mantos masculinos"
        subtitle="O melhor da tecnologia Nike para eles"
        collection="masculino"
        collectionPath="/search/masculino"
      />

      <ProductRow
        title="Mantos femininos"
        subtitle="Estilo e performance para elas"
        collection="feminino"
        collectionPath="/search/feminino"
      />

      <ProductRow
        title="Mantos infantis"
        subtitle="Para os futuros craques do Brasil"
        collection="infantil"
        collectionPath="/search/infantil"
      />

      <Footer />
    </>
  );
}
