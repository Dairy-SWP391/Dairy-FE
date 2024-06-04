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
  cart: [
    {
      id: 1,
      name: "Thực phẩm bổ sung phô mai Con Bò Cười vuông Belcube vị truyền thống 78g",
      price: 49000,
      quantity: 1,
      max_quantity: 10,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
    {
      id: 2,
      name: "Váng sữa Mixxi - Vanila Plus 75g - Lốc 4",
      price: 64000,
      quantity: 1,
      sale: 10,
      max_quantity: 10,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
    {
      id: 3,
      name: "Sữa chua trái cây Hoff Organic Vị Chuối 6x55g",
      price: 49000,
      quantity: 2,
      sale: 20,
      max_quantity: 10,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
    {
      id: 4,
      name: "Sữa GrowPLUS+ Sữa non Vàng 800g trên 1 tuổi",
      price: 49000,
      quantity: 1,
      max_quantity: 10,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
    {
      id: 5,
      name: "Thực phẩm bổ sung phô mai Con Bò Cười vuông Belcube vị truyền thống 78g",
      price: 49000,
      quantity: 1,
      max_quantity: 10,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
  ],
  setCart: (cart) => set({ cart }),
}));
