import { create } from "zustand";

export type CategoryType = {
  id: number;
  name: string;
  path: string;
  child_category: (Omit<CategoryType, "child_category"> & {
    parent_category_id: number;
  })[];
};

type CategoryStore = {
  category: CategoryType[];
  categoryPath: { name: string; path: string }[];
  setCategory: (category: CategoryType[]) => void;
  setCategoryPath: (categoryPath: { name: string; path: string }[]) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  category: [],
  categoryPath: [],
  setCategory: (category) => set(() => ({ category })),
  setCategoryPath: (categoryPath) => set(() => ({ categoryPath }))
}));
