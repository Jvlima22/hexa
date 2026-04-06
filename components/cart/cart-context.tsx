"use client";

import type { Cart, CartItem, Product, ProductVariant } from "lib/store/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CART_STORAGE_KEY = "hexa_cart";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: "ADD_ITEM";
      payload: { variant: ProductVariant; product: Product };
    }
  | { type: "INIT_CART"; payload: Cart };

type CartContextType = {
  cart: Cart;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: (variant: ProductVariant, product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function createEmptyCart(): Cart {
  return {
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "BRL" },
      totalAmount: { amount: "0", currencyCode: "BRL" },
      totalTaxAmount: { amount: "0", currencyCode: "BRL" },
    },
  };
}

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount,
      },
    },
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(quantity, variant.price.amount);

  return {
    id: existingItem?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
}

function updateCartTotals(
  lines: CartItem[]
): Pick<Cart, "totalQuantity" | "cost"> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "BRL";

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "INIT_CART":
      return action.payload;

    case "UPDATE_ITEM": {
      const { merchandiseId, updateType } = action.payload;
      const updatedLines = state.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...state,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...state.cost,
            totalAmount: { ...state.cost.totalAmount, amount: "0" },
          },
        };
      }

      return {
        ...state,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }

    case "ADD_ITEM": {
      const { variant, product } = action.payload;
      const existingItem = state.lines.find(
        (item) => item.merchandise.id === variant.id
      );
      const updatedItem = createOrUpdateCartItem(existingItem, variant, product);
      const updatedLines = existingItem
        ? state.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item
          )
        : [...state.lines, updatedItem];

      return {
        ...state,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, createEmptyCart());

  // Carrega do localStorage na montagem
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Cart;
        dispatch({ type: "INIT_CART", payload: parsed });
      }
    } catch {
      // localStorage indisponível ou dado corrompido
    }
  }, []);

  // Salva no localStorage a cada mudança
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // localStorage indisponível
    }
  }, [cart]);

  const updateCartItemFn = (merchandiseId: string, updateType: UpdateType) => {
    dispatch({ type: "UPDATE_ITEM", payload: { merchandiseId, updateType } });
  };

  const addCartItem = (variant: ProductVariant, product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: { variant, product } });
  };

  return (
    <CartContext.Provider
      value={{ cart, updateCartItem: updateCartItemFn, addCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
