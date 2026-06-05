"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";
import {
  CartItem,
  StoreProduct,
} from "@/types/database";

interface CartContextType {
  items: CartItem[];
  cartCount: number;

  addToCart: (
    product: StoreProduct
  ) => void;

  increaseQuantity: (
    productId: number
  ) => void;

  decreaseQuantity: (
    productId: number
  ) => void;

  getQuantity: (
    productId: number
  ) => number;
}

const CartContext =
  createContext<CartContextType | null>(
    null
  );

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<
    CartItem[]
  >([]);

  const addToCart = (
    product: StoreProduct
  ) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (
  productId: number
) => {
  setItems((prev) =>
    prev.map((item) => {
      if (
        item.product.id === productId
      ) {
        if (
          item.quantity >=
          item.product.stock
        ) {
          return item;
        }

        return {
          ...item,
          quantity:
            item.quantity + 1,
        };
      }

      return item;
    })
  );
};

  const decreaseQuantity = (
    productId: number
  ) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  const getQuantity = (
    productId: number
  ) => {
    const item = items.find(
      (item) =>
        item.product.id === productId
    );

    return item?.quantity || 0;
  };

  const cartCount = items.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be inside CartProvider"
    );
  }

  return context;
}