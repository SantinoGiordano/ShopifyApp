import { Product } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  toggleCartItem: (item: Product) => void;
  totalPrice: number;
  calculateTotalPrice: (products: Product[]) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          if (state.cart.find((i) => i._id === item._id)) return state; // prevent duplicate
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        })),
      isInCart: (id) => {
        return get().cart.some((item) => item._id === id);
      },
      toggleCartItem: (item) => {
        const { isInCart, addToCart, removeFromCart } = get();
        if (isInCart(item._id)) {
          removeFromCart(item._id);
        } else {
          addToCart(item);
        }
      },
      totalPrice: 0,
      calculateTotalPrice: (products: Product[]) =>
        set((state) => {
          const price = state.cart.reduce((acc, item) => {
            const match = products.find((p) => p._id === item._id);
            return match ? acc + match.price : acc;
          }, 0);
          return { totalPrice: price };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // key for localStorage
    }
  )
);
