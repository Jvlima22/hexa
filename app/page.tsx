import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
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

  // Fallback visual caso a Shopify esteja vazia agora
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

      <ProductRow
        title="Rumo ao Hexa"
        subtitle="Juntos em busca de um sonho!"
        products={products.slice(0, 12)}
        collectionPath="/search/frontpage"
      />

      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
