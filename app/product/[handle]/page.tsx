import { GridTileImage } from "components/grid/tile";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/store";
import type { Image } from "lib/store/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Sistema de Fallback para Produtos de Demonstração (MOCK)
const getMockProduct = (handle: string) => {
  const mockProducts: Record<string, any> = {
    'camisa-i-2024': {
      title: 'Camisa Seleção Brasileira I 2026/27',
      description: 'A nova camisa titular da Seleção Brasileira traz a tecnologia Dri-FIT ADV e um design inspirado na garra do povo brasileiro. Feita com tecido leve e respirável para máxima performance.',
      image: 'https://imgnike-a.akamaihd.net/1920x1920/09681000A4.jpg'
    },
    'camisa-ii-2024': {
      title: 'Camisa Seleção Brasileira II 2026/27',
      description: 'A camisa reserva para a jornada rumo ao hexa. Com cores vibrantes e detalhes técnicos superiores, este manto é essencial para todo torcedor.',
      image: 'https://imgnike-a.akamaihd.net/360x360/10977200.jpg'
    },
    'camisa-i-2024-player': {
      title: 'Camisa Seleção Brasileira I 2026/27 Jogador',
      description: 'Versão idêntica à utilizada pelos atletas em campo. Corte atlético e ventilação estratégica para o mais alto nível de competição.',
      image: 'https://imgnike-a.akamaihd.net/1920x1920/09681000A4.jpg'
    },
    'camisa-treino-2024': {
      title: 'Camisa de Treino Brasil 2026/27',
      description: 'Conforto e estilo para os dias de preparação. Tecido que absorve o suor e mantém você seco durante as atividades.',
      image: 'https://imgnike-a.akamaihd.net/360x360/097830NXA4.jpg'
    },
    'camisa-iii-2024': {
      title: 'Camiseta Brasil Jordan Goalie Manga Longa',
      description: 'Estilo autêntico Jordan unido à paixão pela Seleção. Manga longa para proteção e atitude dentro e fora de campo.',
      image: 'https://imgnike-a.akamaihd.net/360x360/097830NXA4.jpg'
    }
  };

  const mock = mockProducts[handle];
  if (!mock) return null;

  return {
    id: `mock-${handle}`,
    handle,
    availableForSale: true,
    title: mock.title,
    description: mock.description,
    descriptionHtml: `<p>${mock.description}</p>`,
    options: [
      {
        id: 'size-option',
        name: 'Tamanho',
        values: ['P', 'M', 'G', 'GG']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '219.90', currencyCode: 'BRL' },
      maxVariantPrice: { amount: '499.00', currencyCode: 'BRL' }
    },
    featuredImage: { url: mock.image, altText: mock.title, width: 1000, height: 1000 },
    images: [{ url: mock.image, altText: mock.title, width: 1000, height: 1000 }],
    variants: [
      { id: 'v1', title: 'P', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'P' }], price: { amount: '219.90', currencyCode: 'BRL' } },
      { id: 'v2', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'M' }], price: { amount: '219.90', currencyCode: 'BRL' } },
      { id: 'v3', title: 'G', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'G' }], price: { amount: '219.90', currencyCode: 'BRL' } },
      { id: 'v4', title: 'GG', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'GG' }], price: { amount: '219.90', currencyCode: 'BRL' } }
    ],
    seo: { title: mock.title, description: mock.description },
    tags: [] as string[],
    updatedAt: new Date().toISOString()
  };
};

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = (await getProduct(params.handle)) || getMockProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = (await getProduct(params.handle)) || getMockProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-8 md:p-12 lg:flex-row lg:gap-12 shadow-sm">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        <RelatedProducts id={product.id} />
      </div>
      <Footer />
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
