import { Product } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  cart: Product[];
  cartLength: number;
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
      cartLength: 0,

      addToCart: (item) =>
        set((state) => {
          if (state.cart.find((i) => i._id === item._id)) return state; // prevent duplicate
          const updatedCart = [...state.cart, item];
          return { cart: updatedCart, cartLength: updatedCart.length };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const updatedCart = state.cart.filter((item) => item._id !== id);
          return { cart: updatedCart, cartLength: updatedCart.length };
        }),

      isInCart: (id) => get().cart.some((item) => item._id === id),

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

      clearCart: () => set({ cart: [], cartLength: 0 }),
    }),
    { name: "cart-storage" }
  )
);
