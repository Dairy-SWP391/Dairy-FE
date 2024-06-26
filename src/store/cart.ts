import { create } from "zustand";

export type Cart = {
  id: number;
  name: string;
  price: number;
  sale?: number;
  quantity: number;
  max_quantity: number;
  image: string;
};

type CartStore = {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  setCart: (cart) => {
    set({ cart });
    const cartLocal = cart.reduce(
      (acc, item) => {
        acc.push({ id: item.id, quantity: item.quantity });
        return acc;
      },
      [] as { id: number; quantity: number }[]
    );
    localStorage.setItem("cart", JSON.stringify(cartLocal));
  }
}));
