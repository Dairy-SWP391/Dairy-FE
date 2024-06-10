import { create } from "zustand";

export type Category = {
  id: number;
  name: string;
  path: string;
  child_category: (Omit<Category, "child_category"> & {
    parent_category_id: number;
  })[];
};

type CategoryStore = {
  category: Category[];
  categoryPath: { name: string; path: string }[];
  setCategory: (category: Category[]) => void;
  setCategoryPath: (categoryPath: { name: string; path: string }[]) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  category: [],
  categoryPath: [],
  setCategory: (category) => set({ category }),
  setCategoryPath: (categoryPath) => set({ categoryPath })
}));
