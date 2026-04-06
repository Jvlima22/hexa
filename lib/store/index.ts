// Camada de dados da loja — substitui lib/shopify/index.ts
// Busca produtos e coleções do Supabase em vez do Shopify.

import { createClient } from '@supabase/supabase-js';
import type { Collection, Menu, Page, Product } from './types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- Menus estáticos (defina aqui suas rotas de navegação) ---
const MENUS: Record<string, Menu[]> = {
  'next-js-frontend-header-menu': [
    { title: 'Camisas', path: '/search?q=camisa' },
    { title: 'Novidades', path: '/search?sort=latest-desc' },
    { title: 'Promoções', path: '/search?sort=price-asc' },
  ],
  'next-js-frontend-footer-menu': [
    { title: 'Sobre nós', path: '/sobre' },
    { title: 'Contato', path: '/contato' },
    { title: 'Política de Privacidade', path: '/privacidade' },
  ],
};

export async function getMenu(handle: string): Promise<Menu[]> {
  return MENUS[handle] || [];
}

// --- Produtos ---
export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  let queryBuilder = supabase
    .from('products')
    .select('*')
    .eq('available_for_sale', true);

  if (query) {
    queryBuilder = queryBuilder.ilike('title', `%${query}%`);
  }

  // Ordenação
  if (sortKey === 'PRICE') {
    queryBuilder = queryBuilder.order('price', { ascending: !reverse });
  } else if (sortKey === 'CREATED_AT') {
    queryBuilder = queryBuilder.order('created_at', { ascending: !reverse });
  } else if (sortKey === 'BEST_SELLING') {
    queryBuilder = queryBuilder.order('sales_count', { ascending: false });
  } else {
    queryBuilder = queryBuilder.order('created_at', { ascending: false });
  }

  const { data, error } = await queryBuilder;
  if (error || !data) return [];

  return data.map(mapProduct);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('handle', handle)
    .single();

  if (error || !data) return undefined;
  return mapProduct(data);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  // Busca outros produtos da mesma coleção (exceto o atual)
  const { data: currentProduct } = await supabase
    .from('products')
    .select('collection_handle')
    .eq('id', productId)
    .single();

  if (!currentProduct?.collection_handle) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('collection_handle', currentProduct.collection_handle)
    .neq('id', productId)
    .eq('available_for_sale', true)
    .limit(8);

  if (error || !data) return [];
  return data.map(mapProduct);
}

// --- Coleções ---
export async function getCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('title');

  if (error || !data) return [];
  return data.map(mapCollection);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('handle', handle)
    .single();

  if (error || !data) return undefined;
  return mapCollection(data);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  // Coleções "hidden-*" usadas na homepage — busca os produtos mais recentes
  if (collection.startsWith('hidden-')) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('available_for_sale', true)
      .order('created_at', { ascending: false })
      .limit(collection === 'hidden-homepage-featured-items' ? 3 : 10);

    if (error || !data) return [];
    return data.map(mapProduct);
  }

  let queryBuilder = supabase
    .from('products')
    .select('*')
    .eq('collection_handle', collection)
    .eq('available_for_sale', true);

  if (sortKey === 'PRICE') {
    queryBuilder = queryBuilder.order('price', { ascending: !reverse });
  } else {
    queryBuilder = queryBuilder.order('created_at', { ascending: false });
  }

  const { data, error } = await queryBuilder;
  if (error || !data) return [];
  return data.map(mapProduct);
}

// --- Páginas ---
export async function getPages(): Promise<Page[]> {
  return [];
}

export async function getPage(handle: string): Promise<Page | undefined> {
  return undefined;
}

// --- Funções de Carrinho (agora geridas no cliente via localStorage) ---
export async function createCart() {
  return { id: undefined };
}
export async function getCart() {
  return undefined;
}
export async function addToCart(_lines: any[]) {}
export async function removeFromCart(_lineIds: string[]) {}
export async function updateCart(_lines: any[]) {}

// --- Mapeadores de dados do Supabase para os tipos da loja ---
function mapProduct(row: any): Product {
  const price = row.price?.toString() || '0';
  const currency = row.currency_code || 'BRL';

  return {
    id: row.id,
    handle: row.handle,
    availableForSale: row.available_for_sale ?? true,
    title: row.title,
    description: row.description || '',
    descriptionHtml: row.description_html || row.description || '',
    options: (row.options || []).map((opt: any) => ({
      ...opt,
      id: opt.id || opt.name.toLowerCase(),
    })),
    priceRange: {
      maxVariantPrice: { amount: price, currencyCode: currency },
      minVariantPrice: { amount: price, currencyCode: currency },
    },
    variants: row.variants?.length
      ? row.variants
      : [
          {
            id: `${row.id}-default`,
            title: 'Padrão',
            availableForSale: row.available_for_sale ?? true,
            selectedOptions: [{ name: 'Título', value: 'Padrão' }],
            price: { amount: price, currencyCode: currency },
          },
        ],
    featuredImage: {
      url: row.featured_image_url || '',
      altText: row.featured_image_alt || row.title,
      width: 800,
      height: 800,
    },
    images: row.images?.length
      ? row.images
      : [
          {
            url: row.featured_image_url || '',
            altText: row.title,
            width: 800,
            height: 800,
          },
        ],
    seo: {
      title: row.seo_title || row.title,
      description: row.seo_description || row.description || '',
    },
    tags: row.tags || [],
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

function mapCollection(row: any): Collection {
  return {
    handle: row.handle,
    title: row.title,
    description: row.description || '',
    seo: {
      title: row.seo_title || row.title,
      description: row.seo_description || row.description || '',
    },
    updatedAt: row.updated_at || new Date().toISOString(),
    path: `/search/${row.handle}`,
  };
}
