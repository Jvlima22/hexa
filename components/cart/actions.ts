"use server";

// Carrinho agora é 100% client-side (localStorage).
// Estas server actions existem por compatibilidade com o useActionState do React.

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  // Item adicionado diretamente no contexto do lado do cliente
  return null;
}

export async function removeItem(prevState: any, merchandiseId: string) {
  return null;
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  return null;
}

export async function redirectToCheckout() {
  // O checkout é gerido via Mercado Pago no modal do carrinho
}

export async function createCartAndSetCookie() {
  // Sem necessidade: carrinho gerido via localStorage
}
