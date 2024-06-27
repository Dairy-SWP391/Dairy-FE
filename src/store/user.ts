import { create } from "zustand";

export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  role: "ADMIN" | "MEMBER";
  status: "UNVERIFIED" | "VERIFIED";
  avatar_url: string;
};

type UserStore = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user) => {
    set({ user });
  }
}));
