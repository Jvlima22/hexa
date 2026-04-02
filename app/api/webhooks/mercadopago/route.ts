import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("data.id");
    const type = searchParams.get("type");

    if (type === "payment" && id) {
      // 1. Você precisará buscar detalhes completos do pagamento na API do MP
      // usando o 'id' para evitar fraudes em webhooks falsificados.
      
      // 2. Verificar o status em result.status (ex: 'approved')
      
      // 3. Atualizar no seu banco de dados (Supabase)
      console.log(`[Webhook] Notificação de Pagamento recebida. ID: ${id}`);
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error("Erro processando webhook:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
