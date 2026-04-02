import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextRequest, NextResponse } from "next/server";
import { getCart } from "lib/shopify";

// Usamos as credenciais (que por enquanto estarão vazias/mockadas no seu .env)
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "TEST-mock-token",
});

export async function POST(request: NextRequest) {
  try {
    // 1. Em um cenário real com Shopify, você buscaria o carrinho do usuário:
    // const cartId = request.cookies.get("cartId")?.value;
    // const cart = await getCart(cartId); 

    // Para evitar que a requisição quebre devido à falta de credenciais do Shopify
    // ou se você for migrar as chamadas do carrinho para o Supabase,
    // nós devemos extrair os dados lendo o body da requisição do checkout.
    const body = await request.json();

    if (!body || !body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
    }

    const preference = new Preference(client);

    // 2. Mapeamento dos itens do carrinho para o formato do Mercado Pago
    // Lembre-se: O Mercado Pago exige Unit Price numérico.
    const items = body.items.map((item: any) => ({
      id: item.id || "item-ID-1234",
      title: item.title || "Produto",
      quantity: Number(item.quantity) || 1,
      unit_price: Number(item.price) || 0,
      currency_id: 'BRL'
    }));

    // 3. Criação da Referência
    const result = await preference.create({
      body: {
        items: items,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/error`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pending`
        },
        auto_return: 'approved',
        // notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago` // Apenas para Produção com URL pública
      }
    });

    // Retorna o init_point (URL de pagamento do Checkout Pro)
    return NextResponse.json({ 
      id: result.id, 
      init_point: result.init_point 
    });

  } catch (error) {
    console.error("Erro ao criar preferência do Mercado Pago:", error);
    return NextResponse.json({ error: "Falha ao gerar pagamento" }, { status: 500 });
  }
}
